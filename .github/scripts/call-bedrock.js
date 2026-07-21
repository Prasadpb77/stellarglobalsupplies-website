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
            "text": `MANDATORY INSTRUCTIONS - FOLLOW EXACTLY:\n\n1. You are a CODE GENERATOR, not a conversational AI\n2. Output ONLY the structured format below\n3. NO explanations, NO pleasantries, NO introductory text\n4. Start your response IMMEDIATELY with "FILE:"\n\nREQUIRED OUTPUT FORMAT:\nFILE: <filepath>\nEXISTS: <yes/no>\nACTION: <create/update/skip>\nCONTENT:\n<code or diff>\n\nFILES TO GENERATE:\n- app/blog/page.tsx (blog listing page)\n- app/blog/[slug]/page.tsx (individual blog post page)\n- components/Navbar.tsx (add Blog navigation link)\n\nBLOG CONTENT:\n${blogContent}\n\nBLOG SLUG: ${blogSlug}\n\nNOW OUTPUT THE STRUCTURED RESPONSE STARTING WITH "FILE:":`
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
  
  // Call Bedrock using AWS CLI - base64 encode the JSON body
  const requestJson = fs.readFileSync(requestFile, 'utf8');
  const base64Body = Buffer.from(requestJson).toString('base64');
  
  const command = `aws bedrock-runtime invoke-model \\
    --cli-binary-format raw-in-base64-out \\
    --model-id amazon.nova-pro-v1:0 \\
    --body "${base64Body}" \\
    --region ${process.env.AWS_REGION} \\
    ${responseFile}`;
  
  console.log('Calling Bedrock Nova Pro...');
  
  // Execute command - response will be written to responseFile
  execSync(command, { stdio: 'inherit' });
  
  // Read the response from the file
  const response = JSON.parse(fs.readFileSync(responseFile, 'utf8'));
  
  // Extract the text from the response - Bedrock returns it in a specific structure
  let text = '';
  if (response.output && response.output.message && response.output.message.content) {
    text = response.output.message.content[0]?.text || '';
  }
  
  // If no text found, try alternative paths
  if (!text && response.body) {
    const bodyResponse = JSON.parse(response.body);
    text = bodyResponse.output?.message?.content?.[0]?.text || '';
  }
  
  if (!text) {
    console.error('No text found in Bedrock response:', JSON.stringify(response, null, 2));
    process.exit(1);
  }
  
  fs.writeFileSync('/tmp/blog-implementation.txt', text);
  console.log('Generated implementation saved to /tmp/blog-implementation.txt');
  
} catch (error) {
  console.error('Error calling Bedrock:', error.message);
  process.exit(1);
}
