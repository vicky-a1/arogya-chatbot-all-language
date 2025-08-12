#!/usr/bin/env node

/**
 * Arogya AI - Application Validation Script
 * This script validates the entire application for errors and completeness
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🔍 Arogya AI - Application Validation\n');

let validationErrors = 0;
let validationWarnings = 0;

function logError(message) {
    console.log(`❌ ERROR: ${message}`);
    validationErrors++;
}

function logWarning(message) {
    console.log(`⚠️  WARNING: ${message}`);
    validationWarnings++;
}

function logSuccess(message) {
    console.log(`✅ ${message}`);
}

// 1. File Structure Validation
console.log('📁 Validating file structure...');

const requiredFiles = [
    { path: 'server.js', description: 'Main server file' },
    { path: 'package.json', description: 'Package configuration' },
    { path: 'public/index.html', description: 'Main HTML file' },
    { path: 'public/script.js', description: 'Frontend JavaScript' },
    { path: 'public/styles.css', description: 'CSS styles' },
    { path: '.env.example', description: 'Environment template' },
    { path: 'README.md', description: 'Documentation' }
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file.path)) {
        logSuccess(`${file.description} exists`);
    } else {
        logError(`${file.description} missing: ${file.path}`);
    }
});

// 2. Package.json Validation
console.log('\n📦 Validating package.json...');

try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.name === 'arogya-ai') {
        logSuccess('Package name is correct');
    } else {
        logError('Package name is incorrect');
    }
    
    if (packageJson.main === 'server.js') {
        logSuccess('Main entry point is correct');
    } else {
        logError('Main entry point should be server.js');
    }
    
    const requiredScripts = ['start', 'dev', 'test'];
    requiredScripts.forEach(script => {
        if (packageJson.scripts && packageJson.scripts[script]) {
            logSuccess(`Script '${script}' is defined`);
        } else {
            logError(`Script '${script}' is missing`);
        }
    });
    
    const requiredDependencies = ['express', 'dotenv', 'cors', 'helmet'];
    requiredDependencies.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            logSuccess(`Dependency '${dep}' is present`);
        } else {
            logError(`Dependency '${dep}' is missing`);
        }
    });
    
} catch (error) {
    logError('package.json is invalid JSON');
}

// 3. HTML Validation
console.log('\n🌐 Validating HTML structure...');

try {
    const htmlContent = fs.readFileSync('public/index.html', 'utf8');
    
    if (htmlContent.includes('<!DOCTYPE html>')) {
        logSuccess('HTML5 doctype is present');
    } else {
        logError('HTML5 doctype is missing');
    }
    
    if (htmlContent.includes('Arogya AI')) {
        logSuccess('Application title is present');
    } else {
        logError('Application title is missing');
    }
    
    const requiredElements = [
        'chatMessages',
        'messageInput',
        'sendButton',
        'userInfoSection',
        'actionButtons',
        'loadingOverlay'
    ];
    
    requiredElements.forEach(elementId => {
        if (htmlContent.includes(`id="${elementId}"`)) {
            logSuccess(`Element '${elementId}' is present`);
        } else {
            logError(`Element '${elementId}' is missing`);
        }
    });
    
} catch (error) {
    logError('Cannot read index.html');
}

// 4. JavaScript Validation
console.log('\n⚡ Validating JavaScript...');

try {
    const jsContent = fs.readFileSync('public/script.js', 'utf8');
    
    // Check for syntax balance
    const openBraces = (jsContent.match(/{/g) || []).length;
    const closeBraces = (jsContent.match(/}/g) || []).length;
    
    if (openBraces === closeBraces) {
        logSuccess('JavaScript braces are balanced');
    } else {
        logError(`JavaScript braces are unbalanced: ${openBraces} open, ${closeBraces} close`);
    }
    
    const openParens = (jsContent.match(/\(/g) || []).length;
    const closeParens = (jsContent.match(/\)/g) || []).length;
    
    if (openParens === closeParens) {
        logSuccess('JavaScript parentheses are balanced');
    } else {
        logError(`JavaScript parentheses are unbalanced: ${openParens} open, ${closeParens} close`);
    }
    
    // Check for required functions
    const requiredFunctions = [
        'initializeApp',
        'loadAPIKeys',
        'sendMessage',
        'generateReport',
        'startNewConsultation',
        'changeLanguage',
        'saveUserInfo',
        'callAIModel'
    ];
    
    requiredFunctions.forEach(func => {
        if (jsContent.includes(`function ${func}`) || jsContent.includes(`${func} =`) || jsContent.includes(`async function ${func}`)) {
            logSuccess(`Function '${func}' is defined`);
        } else {
            logError(`Function '${func}' is missing`);
        }
    });
    
    // Check for required variables
    const requiredVariables = [
        'API_KEYS',
        'translations',
        'emergencyKeywords',
        'currentLanguage'
    ];
    
    requiredVariables.forEach(variable => {
        if (jsContent.includes(variable)) {
            logSuccess(`Variable '${variable}' is defined`);
        } else {
            logError(`Variable '${variable}' is missing`);
        }
    });
    
} catch (error) {
    logError('Cannot read script.js');
}

// 5. CSS Validation
console.log('\n🎨 Validating CSS...');

try {
    const cssContent = fs.readFileSync('public/styles.css', 'utf8');
    
    // Check for CSS balance
    const openBraces = (cssContent.match(/{/g) || []).length;
    const closeBraces = (cssContent.match(/}/g) || []).length;
    
    if (openBraces === closeBraces) {
        logSuccess('CSS braces are balanced');
    } else {
        logError(`CSS braces are unbalanced: ${openBraces} open, ${closeBraces} close`);
    }
    
    // Check for CSS variables
    if (cssContent.includes(':root')) {
        logSuccess('CSS custom properties are defined');
    } else {
        logWarning('CSS custom properties not found');
    }
    
    // Check for responsive design
    if (cssContent.includes('@media')) {
        logSuccess('Responsive design media queries found');
    } else {
        logWarning('No responsive design media queries found');
    }
    
} catch (error) {
    logError('Cannot read styles.css');
}

// 6. Environment Configuration
console.log('\n🔧 Validating environment configuration...');

if (fs.existsSync('.env')) {
    logSuccess('.env file exists');
    
    try {
        const envContent = fs.readFileSync('.env', 'utf8');
        
        if (envContent.includes('GROQ_API_KEY')) {
            logSuccess('GROQ_API_KEY is configured');
        } else {
            logWarning('GROQ_API_KEY not found in .env');
        }
        
        if (envContent.includes('PERPLEXITY_API_KEY')) {
            logSuccess('PERPLEXITY_API_KEY is configured');
        } else {
            logWarning('PERPLEXITY_API_KEY not found in .env');
        }
        
    } catch (error) {
        logError('Cannot read .env file');
    }
} else {
    logWarning('.env file not found - will use environment variables');
}

// 7. Server Configuration Validation
console.log('\n🖥️  Validating server configuration...');

try {
    const serverContent = fs.readFileSync('server.js', 'utf8');
    
    if (serverContent.includes('express')) {
        logSuccess('Express.js is imported');
    } else {
        logError('Express.js import is missing');
    }
    
    if (serverContent.includes('helmet')) {
        logSuccess('Security middleware (helmet) is configured');
    } else {
        logError('Security middleware is missing');
    }
    
    if (serverContent.includes('/api/health')) {
        logSuccess('Health check endpoint is configured');
    } else {
        logError('Health check endpoint is missing');
    }
    
    if (serverContent.includes('/api/keys')) {
        logSuccess('API keys endpoint is configured');
    } else {
        logError('API keys endpoint is missing');
    }
    
} catch (error) {
    logError('Cannot read server.js');
}

// 8. Test Configuration
console.log('\n🧪 Validating test configuration...');

if (fs.existsSync('__tests__')) {
    logSuccess('Test directory exists');
    
    const testFiles = fs.readdirSync('__tests__');
    if (testFiles.length > 0) {
        logSuccess(`${testFiles.length} test file(s) found`);
    } else {
        logWarning('No test files found');
    }
} else {
    logWarning('Test directory not found');
}

if (fs.existsSync('jest.config.js')) {
    logSuccess('Jest configuration exists');
} else {
    logWarning('Jest configuration not found');
}

// Summary
console.log('\n📊 Validation Summary');
console.log('='.repeat(50));

if (validationErrors === 0 && validationWarnings === 0) {
    console.log('🎉 Perfect! No errors or warnings found.');
    console.log('✅ Application is ready for deployment.');
} else if (validationErrors === 0) {
    console.log(`⚠️  ${validationWarnings} warning(s) found, but no critical errors.`);
    console.log('✅ Application should work correctly.');
} else {
    console.log(`❌ ${validationErrors} error(s) and ${validationWarnings} warning(s) found.`);
    console.log('🔧 Please fix the errors before running the application.');
}

console.log('\n🚀 To start the application:');
console.log('   npm start');
console.log('\n🧪 To run tests:');
console.log('   npm test');
console.log('\n📖 For more information, see README.md');

process.exit(validationErrors > 0 ? 1 : 0);