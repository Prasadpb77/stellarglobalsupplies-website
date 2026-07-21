#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Process a blog markdown file and prepare it for implementation
 */
function processBlogFile(blogFilePath) {
  try {
    // Read the blog file
    const blogContent = fs.readFileSync(blogFilePath, 'utf-8');
    
    // Extract frontmatter and content
    const frontmatterMatch = blogContent.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      console.error(`❌ Invalid blog format in ${blogFilePath}: Missing frontmatter`);
      process.exit(1);
    }
    
    const frontmatter = frontmatterMatch[1];
    const content = blogContent.replace(frontmatterMatch[0], '').trim();
    
    // Parse frontmatter
    const metadata = {};
    const lines = frontmatter.split('\n');
    
    let currentKey = null;
    let currentArray = [];
    
    for (const line of lines) {
      const keyValueMatch = line.match(/^(\w+):\s*(.+)$/);
      
      if (keyValueMatch) {
        // Save previous array if exists
        if (currentKey && currentArray.length > 0) {
          metadata[currentKey] = currentArray;
          currentArray = [];
        }
        
        currentKey = keyValueMatch[1];
        const value = keyValueMatch[2].trim();
        
        // Handle arrays
        if (value === '[') {
          currentArray = [];
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Inline array
          const items = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
          metadata[currentKey] = items;
          currentKey = null;
        } else {
          // String value
          metadata[currentKey] = value.replace(/^["']|["']$/g, '');
          currentKey = null;
        }
      } else if (line.startsWith('- ') && currentKey) {
        // Array item
        currentArray.push(line.replace('- ', '').trim().replace(/^["']|["']$/g, ''));
      }
    }
    
    // Save last array if exists
    if (currentKey && currentArray.length > 0) {
      metadata[currentKey] = currentArray;
    }
    
    // Extract slug from filename
    const slug = path.basename(blogFilePath, '.md');
    
    // Validate required fields
    const requiredFields = ['title', 'date', 'excerpt', 'image', 'author'];
    const missingFields = requiredFields.filter(field => !metadata[field]);
    
    if (missingFields.length > 0) {
      console.error(`❌ Missing required fields in ${blogFilePath}: ${missingFields.join(', ')}`);
      process.exit(1);
    }
    
    // Ensure tags is an array
    if (!metadata.tags) {
      metadata.tags = [];
    }
    
    console.log(`✅ Processed blog file: ${blogFilePath}`);
    console.log(`   Title: ${metadata.title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Date: ${metadata.date}`);
    console.log(`   Tags: ${metadata.tags.join(', ')}`);
    
    // Return processed data
    return {
      filePath: blogFilePath,
      slug,
      metadata,
      content
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${blogFilePath}:`, error.message);
    process.exit(1);
  }
}

// Get blog file path from command line argument
const blogFilePath = process.argv[2];

if (!blogFilePath) {
  console.error('Usage: node process-blog.js <blog-file-path>');
  process.exit(1);
}

// Process the blog file
const result = processBlogFile(blogFilePath);

// Output result as JSON for the next step
console.log('\n---PROCESSED_DATA---');
console.log(JSON.stringify(result, null, 2));