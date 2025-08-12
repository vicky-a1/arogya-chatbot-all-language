#!/usr/bin/env node

/**
 * Arogya AI - Application Startup Script
 * This script ensures all dependencies are met and starts the application
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🚀 Starting Arogya AI Application...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.log('⚠️  .env file not found. Creating from .env.example...');
    if (fs.existsSync('.env.example')) {
        fs.copyFileSync('.env.example', '.env');
        console.log('✅ .env file created. Please edit it with your API keys.\n');
    } else {
        console.log('❌ .env.example not found. Please create .env manually.\n');
    }
}

// Check required files
const requiredFiles = [
    'server.js',
    'package.json',
    'public/index.html',
    'public/script.js',
    'public/styles.css'
];

console.log('🔍 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ Some required files are missing. Please ensure all files are present.');
    process.exit(1);
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('\n📦 Installing dependencies...');
    const npmInstall = spawn('npm', ['install'], { stdio: 'inherit' });
    
    npmInstall.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Dependencies installed successfully.\n');
            startServer();
        } else {
            console.log('❌ Failed to install dependencies.');
            process.exit(1);
        }
    });
} else {
    console.log('\n✅ Dependencies already installed.\n');
    startServer();
}

function startServer() {
    console.log('🌟 Starting Arogya AI server...\n');
    
    // Start the server
    const server = spawn('node', ['server.js'], { stdio: 'inherit' });
    
    server.on('close', (code) => {
        console.log(`\n🛑 Server stopped with code ${code}`);
    });
    
    server.on('error', (error) => {
        console.error('❌ Failed to start server:', error);
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down gracefully...');
        server.kill('SIGINT');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down gracefully...');
        server.kill('SIGTERM');
        process.exit(0);
    });
}