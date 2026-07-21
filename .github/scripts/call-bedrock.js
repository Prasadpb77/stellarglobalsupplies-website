const { execSync } = require('child_process');
const fs = require('fs');

const requestFile = '/tmp/bedrock-request.json';
const responseFile = '/tmp/bedrock-response.json';

// Get blog content and slug from command line arguments
const blogContent = process.argv[2];
const blogSlug = process.argv[3];

if (!blogContent || !blogSlug) {
  console.error('Usage: call-bedrock.js <blog-content> <blog-slug>');
  process.exit(1);
}

try {
  // Create the Bedrock request
  const request = {
    "system": [
      {
        "text": "You are an expert Next.js developer specializing in SEO-optimized blog implementations. You help companies create marketing-focused blog systems that promote their products and services."
      }
    ],
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "text": `CRITICAL: You must follow this EXACT format for your response. Do not add any conversational text, explanations, or pleasantries.\n\nAnalyze this blog post and generate/update the Next.js blog implementation:\n\n${blogContent}\n\nCompany: Stellar Global Supplies - Premium stainless steel, mild steel, and industrial supplies supplier based in Pune, India.\n\nRequirements:\n- Next.js 14 with App Router, TypeScript, Tailwind CSS, Static export (SSG)\n- SEO optimization with meta tags, Open Graph, and structured data\n- Marketing CTAs for Stellar Global Supplies\n- Blog slug: ${blogSlug}\n\nFiles to check/generate:\n- app/blog/page.tsx (blog listing)\n- app/blog/[slug]/page.tsx (blog post page)\n- components/Navbar.tsx (add Blog link if missing)\n\nOUTPUT FORMAT (follow exactly):\n\nFILE: path/to/file\nEXISTS: yes/no\nACTION: create/update/skip\nCONTENT:\n[full file content or diff]\n\nRepeat for each file. Start immediately with FILE:.`
          }
        ]
      }
    ],
    "inferenceConfig": {
      "maxTokens": 8000,
      "temperature": 0.2,
      "topP": 0.9
    }
  };

  // Write request to file
  fs.writeFileSync(requestFile, JSON.stringify(request, null, 2));
  
  // Call Bedrock using AWS CLI
  const command = `aws bedrock-runtime invoke-model \\
    --cli-binary-format raw-in-base64-out \\
    --model-id amazon.nova-pro-v1:0 \\
    --body fileb://${requestFile} \\
    --region ${process.env.AWS_REGION} \\
    ${responseFile}`;
  
  console.log('Calling Bedrock Nova Pro...');
  execSync(command, { stdio: 'inherit' });
  
  // Read and save the response
  const response = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
  const text = response.output?.message?.content?.[0]?.text || JSON.stringify(response);
  
  fs.writeFileSync('/tmp/blog-implementation.txt', text);
  console.log('Generated implementation saved to /tmp/blog-implementation.txt');
  
} catch (error) {
  console.error('Error calling Bedrock:', error.message);
  process.exit(1);
}
