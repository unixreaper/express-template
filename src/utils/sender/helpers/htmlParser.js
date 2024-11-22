const fs = require('fs');
const path = require('path');

/**
 * Parse HTML file and replace placeholders with actual values
 * @param {string} filePath - Path to the HTML template
 * @param {Object} variables - Key-value pairs to replace in the template
 * @returns {string} - Parsed HTML content
 */
function parseHtml(filePath, variables) {
  try {
    // Resolve the full path to the HTML template
    const fullPath = path.resolve(filePath);

    // Read the HTML template
    const template = fs.readFileSync(fullPath, 'utf-8');

    // Replace placeholders with the corresponding variables
    return template.replace(/\$\{(.*?)\}/g, (_, key) => variables[key] || '');
  } catch (error) {
    console.error('Error reading or parsing HTML template:', error.message);
    throw error;
  }
}

module.exports = parseHtml;
