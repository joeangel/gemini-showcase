const fs = require('fs');
const path = require('path');

async function main() {
  const args = JSON.parse(process.argv[2]);
  const filePath = args.path;
  const searchBlock = args.search_block;
  const replaceBlock = args.replace_block;

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Normalize strings for comparison (ignore varying whitespace)
  // We escape special regex characters and turn whitespace runs into \s+
  const createFuzzyRegex = (str) => {
    const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace logic: any run of whitespace becomes \s+ (checking for newlines specifically if needed, but \s+ is usually good for fuzzy)
    // However, we want to respect line breaks somewhat.
    // Let's try a simple approach first: 
    // 1. Trim line ends in search block
    // 2. Be flexible with indentation
    
    // Simpler approach: normalize multiple spaces/tabs/newlines to a generic whitespace token
    return escaped.replace(/\s+/g, '\\s+');
  };

  const fuzzySearch = createFuzzyRegex(searchBlock);
  const regex = new RegExp(fuzzySearch, 'm'); // multiline might not be needed if \s+ covers newlines

  // Attempt match
  const match = content.match(regex);

  if (!match) {
    // Fallback: Try a line-by-line fuzzy match (ignoring leading/trailing whitespace on each line)
    // This is more expensive but robust
    console.error("Error: Could not find the search block using fuzzy matching.");
    
    // Debug info
    console.error("--- Search Block ---");
    console.error(searchBlock);
    console.error("--- End Search Block ---");
    process.exit(1);
  }

  // Perform replacement
  // We need to be careful to preserve the *surrounding* indentation if possible, 
  // but usually replaceBlock should include necessary indentation or we assume standard formatting.
  // For now, simple replacement of the matched string.
  
  const newContent = content.replace(regex, replaceBlock);
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Successfully replaced content in ${filePath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
