const { execSync } = require('child_process');
const fs = require('fs');

const requestFile = '/tmp/bedrock-request.json';
const responseFile = '/tmp/bedrock-response.json';

// Get blog FILE PATH (not raw content) and slug from command line arguments
const blogFilePath = process.argv[2];
const blogSlug = process.argv[3];

if (!blogFilePath || !blogSlug) {
  console.error('Usage: call-bedrock.js <blog-file-path> <blog-slug>');
  process.exit(1);
}

// Read blog content from file (avoids shell escaping issues with large content)
if (!fs.existsSync(blogFilePath)) {
  console.error(`❌ Blog file not found: ${blogFilePath}`);
  process.exit(1);
}
const blogContent = fs.readFileSync(blogFilePath, 'utf-8');

try {
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
            "text": `Generate code for a Next.js blog. Output ONLY file paths and code using EXACTLY this format for each file. Do NOT add any explanation before or after.\n\nRequired output format per file:\nFILE: <relative/path/to/file>\nEXISTS: yes|no\nACTION: create|update|skip\nCONTENT:\n<full file content here, no markdown fences>\n\nFiles to generate:\n1. app/blog/page.tsx - Blog listing page\n2. app/blog/[slug]/page.tsx - Individual blog post page\n3. lib/blog.ts - Blog utility functions\n4. components/BlogPostPreview.tsx - Blog preview card component\n5. content/blog/${blogSlug}.md - Blog markdown file (ACTION: skip if already exists)\n\nBlog content:\n${blogContent}\n\nSlug: ${blogSlug}\n\nStart immediately with FILE:`
          }
        ]
      }
    ],
    "inferenceConfig": {
      "maxTokens": 8000,
      "temperature": 0.1,
      "topP": 0.8
    }
  };

  fs.writeFileSync(requestFile, JSON.stringify(request, null, 2));
  
  const command = `aws bedrock-runtime invoke-model \
    --cli-binary-format raw-in-base64-out \
    --model-id amazon.nova-pro-v1:0 \
    --body fileb://${requestFile} \
    --region ${process.env.AWS_REGION} \
    ${responseFile}`;
  
  console.log('Calling Bedrock Nova Pro...');
  execSync(command, { stdio: 'inherit' });
  
  const responseBody = fs.readFileSync(responseFile, 'utf8');
  const response = JSON.parse(responseBody);
  
  let text = '';
  
  if (response.body) {
    const decodedBody = Buffer.from(response.body, 'base64').toString('utf8');
    const bodyJson = JSON.parse(decodedBody);
    text = bodyJson.output?.message?.content?.[0]?.text || bodyJson.content || bodyJson.completion || '';
  }
  
  if (!text) {
    if (response.output?.message?.content?.[0]?.text) {
      text = response.output.message.content[0].text;
    } else if (response.content) {
      text = response.content;
    } else if (response.completion) {
      text = response.completion;
    }
  }
  
  if (!text) {
    console.error('No text found in Bedrock response. Full response:', JSON.stringify(response, null, 2));
    process.exit(1);
  }
  
  fs.writeFileSync('/tmp/blog-implementation.txt', text);
  console.log('Generated implementation saved to /tmp/blog-implementation.txt');
  
} catch (error) {
  console.error('Error calling Bedrock:', error.message);
  process.exit(1);
}