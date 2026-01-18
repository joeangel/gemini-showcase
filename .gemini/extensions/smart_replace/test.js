const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const assert = require('assert');

const EXT_DIR = __dirname;
const INDEX_JS = path.join(EXT_DIR, 'index.js');
const TEST_FILE = path.join(EXT_DIR, 'temp_test_file.txt');

function runTest() {
    console.log('🧪 Testing smart_replace extension...');

    // Setup: Create a dummy file
    const originalContent = `
    function hello() {
      console.log("Hello World");
    }
  `;
    fs.writeFileSync(TEST_FILE, originalContent.trim());

    // Test Case: Replace "Hello World" with "Hello Gemini"
    // Note: We use JSON argument as required by index.js
    const args = JSON.stringify({
        path: TEST_FILE,
        search_block: 'console.log("Hello World");',
        replace_block: 'console.log("Hello Gemini");'
    });

    try {
        // Execute the extension using execFileSync for safe argument passing
        const { execFileSync } = require('child_process');
        execFileSync('node', [INDEX_JS, args], { stdio: 'inherit' });

        // Verify
        const newContent = fs.readFileSync(TEST_FILE, 'utf8');
        assert.ok(newContent.includes('Hello Gemini'), 'Content should contain replacement');
        assert.ok(!newContent.includes('Hello World'), 'Content should NOT contain original text');

        console.log('✅ Test Passed!');
    } catch (error) {
        console.error('❌ Test Failed:', error);
        process.exit(1);
    } finally {
        // Cleanup
        if (fs.existsSync(TEST_FILE)) {
            fs.unlinkSync(TEST_FILE);
        }
    }
}

runTest();
