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
            "text": `You are a code generator. Output ONLY the following format, nothing else:\n\nFILE: app/blog/page.tsx\nEXISTS: no\nACTION: create\nCONTENT:\n[TypeScript code here]\n\nFILE: app/blog/[slug]/page.tsx\nEXISTS: no\nACTION: create\nCONTENT:\n[TypeScript code here]\n\nFILE: components/Navbar.tsx\nEXISTS: yes\nACTION: update\nCONTENT:\n[TypeScript diff here]\n\nBlog content to implement:\n${blogContent}\n\nBlog slug: ${blogSlug}\n\nStart now with FILE:`
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
