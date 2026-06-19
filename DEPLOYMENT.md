# 🚀 Stellar Global Supplies — Deployment Guide

> **Stack:** Next.js 14 (Static Export) + Tailwind CSS + TypeScript  
> **Hosting:** AWS S3 (static files) + CloudFront CDN  
> **CI/CD:** GitHub Actions  
> **SEO:** JSON-LD structured data + full Open Graph + sitemap  

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Local Development Setup](#2-local-development-setup)
3. [AWS Infrastructure Setup](#3-aws-infrastructure-setup)
4. [GitHub Secrets Configuration](#4-github-secrets-configuration)
5. [CI/CD Pipeline Walkthrough](#5-cicd-pipeline-walkthrough)
6. [Custom Domain + HTTPS](#6-custom-domain--https)
7. [SEO Checklist](#7-seo-checklist)
8. [Image Optimisation Notes](#8-image-optimisation-notes)
9. [Performance Targets](#9-performance-targets)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Architecture Overview

```
Developer → GitHub (push to main)
                │
                ▼
    ┌───────────────────────┐
    │  GitHub Actions CI/CD │
    │  ─────────────────── │
    │  1. Lint + Type-check │
    │  2. next build (SSG)  │
    │  3. Upload /out → S3  │
    │  4. Invalidate CF CDN │
    └───────────────────────┘
                │
                ▼
    ┌───────────────────────────────────────────┐
    │                 AWS                       │
    │                                           │
    │  S3 Bucket (private)                      │
    │  └── /out/** (static HTML/CSS/JS/images)  │
    │                │                          │
    │  CloudFront Distribution                  │
    │  └── CDN edge → stellarglobalsupplies.com │
    │  └── ACM SSL certificate (HTTPS)          │
    └───────────────────────────────────────────┘
```

### Why S3 + CloudFront?

| Feature | Benefit |
|---------|---------|
| **Global CDN** | Sub-50ms load times across India and worldwide |
| **99.99% uptime** | AWS SLA-backed availability |
| **Cost** | ~₹50–200/month for typical SME traffic |
| **Security** | S3 bucket private; CloudFront is the only public entry point |
| **Cache strategy** | Immutable JS/CSS (1yr) + no-cache HTML (always fresh) |

---

## 2. Local Development Setup

### Prerequisites
- Node.js ≥ 20.x
- npm ≥ 10.x
- Git

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_ORG/stellar-global-supplies.git
cd stellar-global-supplies

# 2. Install dependencies
npm install

# 3. Copy CEO-approved images to public/img/
#    (see Image Optimisation Notes below)
cp -r /path/to/original/img/* public/img/

# 4. Start dev server
npm run dev
# → http://localhost:3000

# 5. Build static export locally (mirrors CI)
npm run build
# Output in /out directory

# 6. Preview the static export
npx serve out
# → http://localhost:3000
```

### Environment Variables

Create `.env.local` (never commit this file):

```env
# Site URL (used in layout metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Add Google Analytics, etc. here when ready:
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 3. AWS Infrastructure Setup

### Step 1 — Create the S3 Bucket

```bash
# Replace with your preferred bucket name (must be globally unique)
BUCKET=stellar-global-supplies
REGION=ap-south-1   # Mumbai — closest to Pune

# Create bucket
aws s3api create-bucket \
  --bucket $BUCKET \
  --region $REGION \
  --create-bucket-configuration LocationConstraint=$REGION

# Block all public access (CloudFront is the only public gateway)
aws s3api put-public-access-block \
  --bucket $BUCKET \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### Step 2 — Create CloudFront Origin Access Control (OAC)

```bash
aws cloudfront create-origin-access-control \
  --origin-access-control-config \
    "Name=stellar-s3-oac,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3"
```
Note the returned `Id` — you'll need it when creating the distribution.

### Step 3 — Create CloudFront Distribution

Use the AWS Console or the following CLI (fill in your OAC ID and bucket):

```json
// cloudfront-config.json — edit before use
{
  "Origins": {
    "Items": [{
      "Id": "S3-stellar-global-supplies",
      "DomainName": "stellar-global-supplies.s3.ap-south-1.amazonaws.com",
      "S3OriginConfig": { "OriginAccessIdentity": "" },
      "OriginAccessControlId": "YOUR_OAC_ID"
    }],
    "Quantity": 1
  },
  "DefaultCacheBehavior": {
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": { "Items": ["GET","HEAD"], "Quantity": 2 },
    "CachedMethods": { "Items": ["GET","HEAD"], "Quantity": 2 },
    "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6"
  },
  "DefaultRootObject": "index.html",
  "CustomErrorResponses": {
    "Items": [
      { "ErrorCode": 404, "ResponseCode": 404, "ResponsePagePath": "/404.html" },
      { "ErrorCode": 403, "ResponseCode": 200, "ResponsePagePath": "/index.html" }
    ],
    "Quantity": 2
  },
  "PriceClass": "PriceClass_200",
  "Enabled": true,
  "HttpVersion": "http2and3"
}
```

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### Step 4 — Attach S3 Bucket Policy (allow CloudFront OAC)

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowCloudFrontServicePrincipal",
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::stellar-global-supplies/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_ID"
      }
    }
  }]
}
```

```bash
aws s3api put-bucket-policy \
  --bucket stellar-global-supplies \
  --policy file://bucket-policy.json
```

### Step 5 — Create IAM Deployment User

**Least-privilege policy** — only S3 sync + CloudFront invalidation:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::stellar-global-supplies",
        "arn:aws:s3:::stellar-global-supplies/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidate",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DIST_ID"
    }
  ]
}
```

```bash
# Create user
aws iam create-user --user-name stellar-deploy

# Attach policy
aws iam put-user-policy \
  --user-name stellar-deploy \
  --policy-name StellarDeployPolicy \
  --policy-document file://iam-policy.json

# Create access keys
aws iam create-access-key --user-name stellar-deploy
# Save the AccessKeyId and SecretAccessKey → add to GitHub Secrets
```

---

## 4. GitHub Secrets Configuration

In your repository: **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | Value | Where to find |
|---|---|---|
| `AWS_ACCESS_KEY_ID` | From Step 5 above | IAM → stellar-deploy → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | From Step 5 above | Shown once on creation |
| `AWS_REGION` | `ap-south-1` | Your chosen region |
| `S3_BUCKET_NAME` | `stellar-global-supplies` | Your S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | `EXXXXXXXXXX` | CloudFront console → General tab |

---

## 5. CI/CD Pipeline Walkthrough

```
Push to main
    │
    ├─► Job 1: lint        ← ESLint + tsc --noEmit
    │       │
    │       ▼ (on success)
    ├─► Job 2: build       ← npm run build → uploads /out as artefact
    │       │
    │  (on PR only)
    ├─► Job 3: lighthouse  ← Perf/A11y/SEO audit against /out
    │
    │  (on push to main only)
    └─► Job 4: deploy
            ├── Configure AWS credentials
            ├── Sync _next/static (cache: 1 year, immutable)
            ├── Sync img/ (cache: 7 days)
            ├── Sync *.html (cache: no-cache)
            ├── Sync everything else (cache: 1 hour)
            ├── CloudFront CreateInvalidation (/*) 
            └── Wait for invalidation → print summary
```

### Cache Strategy Details

| Path pattern | Cache-Control | Reason |
|---|---|---|
| `/_next/static/**` | `public, max-age=31536000, immutable` | Content-hashed filenames — safe to cache forever |
| `/img/**` | `public, max-age=604800` | Images rarely change; 7-day cache saves bandwidth |
| `/**/*.html` | `no-cache, no-store` | Always fetch fresh HTML so users get new page versions immediately |
| Everything else | `public, max-age=3600` | Fonts, JSON, manifests — short cache |

### Manual Deploy Trigger

```bash
# Trigger a deploy from CLI without pushing code:
gh workflow run "Deploy to AWS S3 + CloudFront" --ref main
```

---

## 6. Custom Domain + HTTPS

### Step 1 — Request ACM Certificate (free)

> **Must be in `us-east-1`** — CloudFront only accepts certs from us-east-1

```bash
aws acm request-certificate \
  --domain-name stellarglobalsupplies.com \
  --subject-alternative-names "www.stellarglobalsupplies.com" \
  --validation-method DNS \
  --region us-east-1
```

Add the CNAME records shown in ACM to your DNS provider.  
Wait for status to become `ISSUED` (~5 minutes).

### Step 2 — Attach certificate to CloudFront

In CloudFront → General → Edit:
- **Alternate domain names (CNAMEs):** `stellarglobalsupplies.com`, `www.stellarglobalsupplies.com`
- **Custom SSL certificate:** Select the ACM cert from Step 1
- **Minimum TLS version:** TLSv1.2_2021

### Step 3 — Point DNS to CloudFront

In your domain registrar / Route 53:

```
Type   Name    Value
───────────────────────────────────────────────────────
A      @       ALIAS → dXXXXXXXX.cloudfront.net
CNAME  www     dXXXXXXXX.cloudfront.net
```

### Step 4 — Update metadata in `app/layout.tsx`

```typescript
metadataBase: new URL("https://stellarglobalsupplies.com"),
```

---

## 7. SEO Checklist

### Already implemented ✅

- [x] `<title>` with template (`%s | Stellar Global Supplies`)
- [x] Meta `description` — keyword-rich, 155 chars
- [x] Open Graph tags (title, description, image, locale `en_IN`)
- [x] Twitter Card (`summary_large_image`)
- [x] Canonical URL
- [x] JSON-LD structured data (Organization + WebSite + LocalBusiness)
- [x] `robots` meta allowing indexing
- [x] Lang attribute (`en-IN`)
- [x] `next/font` with `display=swap` (no FOIT)
- [x] `alt` attributes on all images
- [x] Semantic HTML (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<article>`)
- [x] ARIA labels and roles throughout
- [x] Skip-to-main-content link (WCAG 2.1 AA)
- [x] Mobile-responsive (Google mobile-first indexing)
- [x] Heading hierarchy (one `<h1>` per page)

### Post-deploy actions 📋

- [ ] Submit `sitemap.xml` to **Google Search Console**
- [ ] Submit to **Bing Webmaster Tools**
- [ ] Add `NEXT_PUBLIC_GA_ID` secret and enable Google Analytics
- [ ] Set `verification.google` token in `app/layout.tsx`
- [ ] Create `public/robots.txt`:

```txt
User-agent: *
Allow: /

Sitemap: https://stellarglobalsupplies.com/sitemap.xml
```

- [ ] Generate `sitemap.xml` (add `next-sitemap` package):

```bash
npm install next-sitemap
```

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://stellarglobalsupplies.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
};
```

---

## 8. Image Optimisation Notes

> ⚠️ **All CEO-mandated images are used exactly as supplied.**  
> Recommended pre-processing before placing in `public/img/`:

```bash
# Install sharp CLI for batch conversion
npm install -g sharp-cli

# Convert to WebP (70–80% smaller than JPEG)
for f in *.jpg *.jpeg *.png; do
  sharp "$f" -o "${f%.*}.webp" --webp-quality 82
done

# Or keep originals and let Next.js handle it locally
# (note: with `output: "export"`, next/image uses unoptimized mode for S3)
```

### Image naming convention used in code

The components reference images with URL-safe filenames (spaces → hyphens):

```
Original filename            →  public/img/ filename
─────────────────────────────────────────────────────
MS Angles.webp               →  MS-Angles.jpg
MS Round Pipes.jpeg          →  MS-Round-Pipes.jpg
SS Circles.jpg               →  SS-Circles.jpg
Grub Screws 1.jpg            →  Grub-Screws-1.jpg
Brass Hex Spacers Male...    →  Brass-Hex-Spacers.jpg
spring-dowel-pin.jpg         →  spring-dowel-pin.jpg  (already URL-safe)
```

Copy and rename script:

```bash
#!/bin/bash
SRC="/path/to/original/img"
DST="./public/img"
mkdir -p "$DST"

# Copy and rename with hyphen-normalisation
for f in "$SRC"/*; do
  name=$(basename "$f" | tr ' ' '-')
  cp "$f" "$DST/$name"
done

echo "✅ Images copied to $DST"
```

---

## 9. Performance Targets

| Metric | Target | How achieved |
|---|---|---|
| **Lighthouse Performance** | ≥ 90 | Static export, immutable asset caching, WebP images |
| **Lighthouse SEO** | ≥ 95 | Full metadata, structured data, semantic HTML |
| **Lighthouse Accessibility** | ≥ 92 | ARIA labels, focus styles, skip-link, color contrast |
| **LCP (Largest Contentful Paint)** | < 2.0s | `priority` on hero images, preconnect fonts |
| **CLS (Cumulative Layout Shift)** | < 0.05 | Fixed `fill` layout on all images + explicit dimensions |
| **FID / INP** | < 100ms | Minimal client-side JS, `"use client"` only where needed |
| **TTFB** | < 200ms | CloudFront Mumbai edge (closest to Pune target audience) |

---

## 10. Troubleshooting

### Build fails: "Module not found"

```bash
# Clean and reinstall
rm -rf node_modules .next out
npm install
npm run build
```

### Images 404 in production

1. Check filenames match exactly — case-sensitive on Linux/S3
2. Run the rename script in Section 8
3. Verify files were synced: `aws s3 ls s3://stellar-global-supplies/img/`

### CloudFront serving stale HTML

```bash
# Manual invalidation
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
  --paths "/*"
```

### HTTPS not working after domain setup

- Certificate must be in `us-east-1` region
- DNS propagation can take up to 48 hours
- Check: `curl -I https://stellarglobalsupplies.com`

### GitHub Actions: "No credentials provided"

- Verify all 5 secrets are set correctly in GitHub → Settings → Secrets
- IAM user must have the exact permissions in Section 3, Step 5
- Region must match (e.g., `ap-south-1` for Mumbai)

### Lighthouse score low on SEO

- Add `robots.txt` and `sitemap.xml` (see Section 7)
- Verify `metadataBase` URL matches deployed domain
- Check Google Search Console for crawl errors

---

## File Structure Reference

```
stellar-global-supplies/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← CI/CD pipeline
├── app/
│   ├── globals.css             ← Tailwind base + custom utilities
│   ├── layout.tsx              ← Root layout, SEO metadata, JSON-LD
│   └── page.tsx                ← Homepage (composes all sections)
├── components/
│   ├── Navbar.tsx              ← Sticky glass navbar + mobile menu
│   ├── Hero.tsx                ← Animated hero + carousel + glass cards
│   ├── TrustBar.tsx            ← Dark stats bar with count-up animation
│   ├── About.tsx               ← 2-col layout + 2×2 value bento
│   ├── BentoGrid.tsx           ← Why Choose Us 5-card bento
│   ├── Products.tsx            ← 3-tab product catalogue grid
│   ├── CTASection.tsx          ← Full-width CTA + contact cards
│   ├── Footer.tsx              ← 4-col dark footer
│   └── BackToTop.tsx           ← Floating scroll-to-top button
├── public/
│   ├── img/                    ← All CEO-approved product images
│   │   ├── logo.jpg
│   │   ├── MS-Angles.jpg
│   │   ├── SS-Circles.jpg
│   │   └── ...
│   └── site.webmanifest        ← PWA manifest
├── .lighthouserc.json          ← Lighthouse CI thresholds
├── next.config.js              ← Static export config
├── tailwind.config.ts          ← CEO brand colours + design tokens
├── tsconfig.json
└── package.json
```

---

## Brand Colour Reference (CEO-Mandated, Do Not Change)

| Name | Hex | Usage |
|---|---|---|
| **Primary** | `#00B98E` | CTAs, links, accents, badges |
| **Secondary** | `#FF6922` | Hover accents, alerts, secondary badges |
| **Light** | `#EFFDF5` | Page background, section alternates |
| **Dark** | `#0E2E50` | Headings, dark sections, footer |
| **White** | `#FFFFFF` | Cards, nav, glass surfaces |

---

*Last updated: June 2025 · Maintained by the Stellar Global Supplies dev team*
