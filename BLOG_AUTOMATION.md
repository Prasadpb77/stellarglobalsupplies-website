# Blog Automation System

## Overview

This project includes an automated blog system that uses **AWS Bedrock Nova Pro** to intelligently implement blog functionality when new markdown files are added to the `content/blog/` folder.

## How It Works

### 1. Content Creation
Add a new markdown file to `content/blog/` with the following format:

```markdown
---
title: "Your Blog Post Title"
date: "2026-07-20"
excerpt: "A brief description of your blog post for SEO and previews."
image: "https://example.com/your-image.jpg"
author: "Stellar Global Supplies"
tags:
  - supply chain
  - B2B procurement
  - industrial supplies
---

## Main Heading

Your blog content here with **bold text** and other markdown formatting.

### Subheading

More content...
```

### 2. Automatic Processing

When you push a new `.md` file to the `content/blog/` folder on the `main` branch:

1. **GitHub Actions workflow triggers** (`.github/workflows/blog-automation.yml`)
2. **Detects the new blog file** automatically
3. **Configures AWS credentials** using OIDC (no secrets needed)
4. **Calls Amazon Bedrock Nova Pro** with:
   - The blog content
   - Company context from `ai_context/` files
   - Instructions to generate SEO-optimized, marketing-focused code
5. **Generates/updates** necessary files:
   - Blog listing page (if new)
   - Individual blog post pages
   - Updates navigation
6. **Commits changes** with message: `feat: add blog post - [title]`
7. **Triggers deployment** workflow automatically

### 3. SEO & Marketing Features

The generated blog implementation includes:

- ✅ **SEO Optimization**
  - Dynamic meta titles and descriptions
  - Open Graph tags for social sharing
  - Twitter Card metadata
  - JSON-LD structured data
  - Canonical URLs
  - Semantic HTML

- ✅ **Marketing Focus**
  - Prominent CTAs to Stellar Global Supplies
  - Contact information integration
  - Product mentions where relevant
  - Professional branding throughout

- ✅ **User Experience**
  - Responsive design (mobile-friendly)
  - Fast static generation (SSG)
  - Clean, modern UI with Tailwind CSS
  - Blog cards with images and tags
  - Author information display

## File Structure

```
content/
  blog/
    └── your-blog-post.md          ← Add new blog posts here

app/
  blog/
    ├── page.tsx                    ← Blog listing (auto-generated)
    └── [slug]/
        └── page.tsx                ← Individual blog post (auto-generated)

components/
  ├── BlogCard.tsx                  ← Blog card component
  └── Navbar.tsx                    ← Updated with Blog link

lib/
  └── blog.ts                       ← Blog utility functions

.github/
  workflows/
  └── blog-automation.yml           ← Main automation workflow
  scripts/
  ├── process-blog.js               ← Process blog markdown
  └── apply-blog-changes.js         ← Apply AI-generated changes
```

## Required GitHub Secrets

Ensure these secrets are configured in your GitHub repository:

| Secret | Description | Required |
|--------|-------------|----------|
| `AWS_ROLE_ARN` | IAM role ARN for AWS OIDC authentication | Yes (already exists) |
| `AWS_REGION` | AWS region (e.g., `ap-south-1`) | Yes (already exists) |

### AWS IAM Permissions

Your AWS role needs the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel"
      ],
      "Resource": "arn:aws:bedrock:*:*:model/amazon.nova-pro-v1:0"
    }
  ]
}
```

## Workflow Details

### Trigger Conditions

The workflow triggers on:
- Push to `main` branch with changes in `content/blog/**`
- Manual trigger via `workflow_dispatch`

### No Artifacts

This workflow does **not** save any artifacts to the repository. All processing happens in temporary directories and changes are committed directly.

### Smart File Checking

The workflow intelligently checks for existing files:
- Only creates files that don't exist
- Only updates files when necessary
- Preserves existing code and customizations

## Usage Examples

### Adding a New Blog Post

1. Create a new markdown file in `content/blog/`:
   ```bash
   content/blog/my-new-post.md
   ```

2. Commit and push to main:
   ```bash
   git add content/blog/my-new-post.md
   git commit -m "feat: add new blog post about industrial supplies"
   git push origin main
   ```

3. The workflow will automatically:
   - Detect the new file
   - Generate blog implementation
   - Commit changes
   - Trigger deployment

### Manual Trigger

You can also manually trigger the workflow from the GitHub Actions tab:
1. Go to Actions → Blog Automation with AWS Bedrock Nova Pro
2. Click "Run workflow"
3. Optionally specify a specific blog file
4. Click "Run workflow"

## Blog Post Best Practices

### Content Guidelines
- Write compelling, informative content
- Include relevant keywords for SEO
- Mention Stellar Global Supplies naturally
- Include clear CTAs where appropriate
- Use markdown formatting for readability

### Image Guidelines
- Use high-quality, relevant images
- Recommended size: 1200x630px (OG image ratio)
- Use absolute URLs or relative paths
- Optimize images for web (compress before uploading)

### Tag Strategy
- Use 3-5 relevant tags per post
- Include industry-specific keywords
- Use consistent tagging across posts
- Examples: `supply chain`, `B2B procurement`, `industrial supplies`

## Troubleshooting

### Workflow Not Triggering

Check:
1. File is in `content/blog/` directory
2. File has `.md` extension
3. Changes are pushed to `main` branch
4. Workflow file is valid YAML

### Build Errors

If the build fails after workflow runs:
1. Check the workflow logs for errors
2. Verify generated files are valid TypeScript/JSX
3. Ensure all imports are correct
4. Run `npm run build` locally to test

### AWS Bedrock Errors

If Bedrock calls fail:
1. Verify `AWS_ROLE_ARN` is correct
2. Check IAM permissions include `bedrock:InvokeModel`
3. Ensure Bedrock is available in your AWS region
4. Check AWS service quotas

## Development

### Local Testing

Test the blog system locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000/blog
```

### Adding New Blog Posts Locally

1. Add markdown file to `content/blog/`
2. Run `npm run build` to generate static pages
3. Test locally before pushing

## Performance

- **Static Generation**: All blog pages are pre-rendered at build time
- **Fast Loading**: Optimized images and minimal JavaScript
- **SEO Friendly**: Full meta tags and structured data
- **CDN Ready**: Works seamlessly with S3 + CloudFront

## Marketing Integration

The blog system is designed to promote Stellar Global Supplies:

- **CTAs**: Every blog post includes contact CTAs
- **Branding**: Consistent use of company name and logo
- **Contact Info**: Phone, email, and location displayed
- **Product Focus**: Content relates to industrial supplies
- **Professional Tone**: Builds trust and authority

## Support

For issues or questions:
1. Check the workflow logs in GitHub Actions
2. Review the generated code in the commit
3. Consult the Next.js documentation
4. Check AWS Bedrock documentation

## License

Proprietary - Stellar Global Supplies