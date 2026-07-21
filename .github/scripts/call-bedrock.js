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
            "text": `Generate code for a Next.js blog. Output ONLY file paths and code, nothing else.\n\nExample output format:\nFILE: app/blog/page.tsx\nEXISTS: no\nACTION: create\nCONTENT:\nimport React from 'react';\n// ... code here ...\n\nFILE: app/blog/[slug]/page.tsx\nEXISTS: no\nACTION: create\nCONTENT:\nimport React from 'react';\n// ... code here ...\n\nBlog: ${blogContent}\nSlug: ${blogSlug}\n\nStart with FILE:`
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
  
  // Execute command - response is written to responseFile
  execSync(command, { stdio: 'inherit' });
  
  // Read the response from the file
  const responseBody = fs.readFileSync(responseFile, 'utf8');
  const response = JSON.parse(responseBody);
  
  console.log('Bedrock response structure:', JSON.stringify(response, null, 2).substring(0, 500));
  
  // Extract the text from the response
  let text = '';
  
  // With --cli-binary-format raw-in-base64-out, the body is base64 encoded
  if (response.body) {
    // The body is base64 encoded, decode it
    const decodedBody = Buffer.from(response.body, 'base64').toString('utf8');
    const bodyJson = JSON.parse(decodedBody);
    text = bodyJson.output?.message?.content?.[0]?.text || bodyJson.content || bodyJson.completion || '';
  }
  
  // Try other response structures if body not found
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
