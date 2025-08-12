const fs = require('fs');
const path = require('path');

describe('Arogya AI Basic Tests', () => {
  describe('File Structure', () => {
    test('should have all required files', () => {
      const requiredFiles = [
        'server.js',
        'package.json',
        'public/index.html',
        'public/script.js',
        'public/styles.css'
      ];

      requiredFiles.forEach(file => {
        expect(fs.existsSync(path.join(__dirname, '..', file))).toBe(true);
      });
    });

    test('should have valid package.json', () => {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      const packageJson = JSON.parse(packageContent);

      expect(packageJson.name).toBe('arogya-ai');
      expect(packageJson.version).toBe('1.0.0');
      expect(packageJson.main).toBe('server.js');
    });
  });

  describe('HTML Structure', () => {
    test('should have valid HTML structure', () => {
      const htmlPath = path.join(__dirname, '..', 'public', 'index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      expect(htmlContent).toContain('<!DOCTYPE html>');
      expect(htmlContent).toContain('Arogya AI');
      expect(htmlContent).toContain('id="chatMessages"');
      expect(htmlContent).toContain('id="messageInput"');
    });
  });

  describe('JavaScript Structure', () => {
    test('should have valid JavaScript structure', () => {
      const jsPath = path.join(__dirname, '..', 'public', 'script.js');
      const jsContent = fs.readFileSync(jsPath, 'utf8');

      expect(jsContent).toContain('DOMContentLoaded');
      expect(jsContent).toContain('API_KEYS');
      expect(jsContent).toContain('translations');
      expect(jsContent).toContain('function initializeApp');
    });

    test('should have balanced braces', () => {
      const jsPath = path.join(__dirname, '..', 'public', 'script.js');
      const jsContent = fs.readFileSync(jsPath, 'utf8');

      const openBraces = (jsContent.match(/{/g) || []).length;
      const closeBraces = (jsContent.match(/}/g) || []).length;

      expect(openBraces).toBe(closeBraces);
    });
  });

  describe('CSS Structure', () => {
    test('should have valid CSS structure', () => {
      const cssPath = path.join(__dirname, '..', 'public', 'styles.css');
      const cssContent = fs.readFileSync(cssPath, 'utf8');

      expect(cssContent).toContain(':root');
      expect(cssContent).toContain('--primary-color');
      expect(cssContent).toContain('.container');
    });

    test('should have balanced CSS braces', () => {
      const cssPath = path.join(__dirname, '..', 'public', 'styles.css');
      const cssContent = fs.readFileSync(cssPath, 'utf8');

      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;

      expect(openBraces).toBe(closeBraces);
    });
  });

  describe('Environment Configuration', () => {
    test('should have environment example file', () => {
      const envExamplePath = path.join(__dirname, '..', '.env.example');
      expect(fs.existsSync(envExamplePath)).toBe(true);

      const envContent = fs.readFileSync(envExamplePath, 'utf8');
      expect(envContent).toContain('GROQ_API_KEY');
      expect(envContent).toContain('PERPLEXITY_API_KEY');
    });
  });
});