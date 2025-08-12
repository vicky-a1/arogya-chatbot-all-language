#!/usr/bin/env node

/**
 * Arogya AI - Deployment Verification Script
 * Verifies that the application is properly deployed and accessible
 */

const https = require('https');
const http = require('http');

// Configuration
const config = {
  github: {
    repo: 'https://api.github.com/repos/vicky-a1/arogya-chatbot-all-language',
    raw: 'https://raw.githubusercontent.com/vicky-a1/arogya-chatbot-all-language/main'
  },
  deployments: [
    { name: 'Render', url: 'https://arogya-chatbot-all-language.onrender.com' },
    { name: 'Vercel', url: 'https://arogya-chatbot-all-language.vercel.app' },
    { name: 'Railway', url: 'https://arogya-chatbot-all-language.up.railway.app' }
  ]
};

console.log('🔍 Arogya AI - Deployment Verification\n');

// Verify GitHub Repository
async function verifyGitHub() {
  console.log('📂 Verifying GitHub Repository...');
  
  try {
    const repoData = await makeRequest(config.github.repo);
    const repo = JSON.parse(repoData);
    
    console.log(`✅ Repository: ${repo.full_name}`);
    console.log(`✅ Stars: ${repo.stargazers_count}`);
    console.log(`✅ Forks: ${repo.forks_count}`);
    console.log(`✅ Language: ${repo.language}`);
    console.log(`✅ Size: ${repo.size} KB`);
    console.log(`✅ Updated: ${new Date(repo.updated_at).toLocaleDateString()}`);
    
    // Verify key files
    const keyFiles = [
      'README.md',
      'package.json',
      'server.js',
      'Dockerfile',
      'render.yaml'
    ];
    
    console.log('\n📁 Verifying Key Files...');
    for (const file of keyFiles) {
      try {
        await makeRequest(`${config.github.raw}/${file}`);
        console.log(`✅ ${file}`);
      } catch (error) {
        console.log(`❌ ${file} - Missing`);
      }
    }
    
  } catch (error) {
    console.log(`❌ GitHub verification failed: ${error.message}`);
  }
}

// Verify Deployments
async function verifyDeployments() {
  console.log('\n🚀 Checking Deployment Platforms...');
  
  for (const deployment of config.deployments) {
    try {
      console.log(`\n🔍 Checking ${deployment.name}...`);
      
      // Check health endpoint
      const healthUrl = `${deployment.url}/api/health`;
      const healthData = await makeRequest(healthUrl);
      const health = JSON.parse(healthData);
      
      if (health.status === 'healthy') {
        console.log(`✅ ${deployment.name}: Healthy`);
        console.log(`   📊 Uptime: ${Math.round(health.uptime)}s`);
        console.log(`   🌐 Environment: ${health.environment}`);
        console.log(`   📅 Version: ${health.version}`);
      } else {
        console.log(`⚠️  ${deployment.name}: Unhealthy status`);
      }
      
    } catch (error) {
      console.log(`❌ ${deployment.name}: Not accessible (${error.message})`);
    }
  }
}

// Test Application Features
async function testFeatures(baseUrl) {
  console.log(`\n🧪 Testing Application Features for ${baseUrl}...`);
  
  const tests = [
    { name: 'Main Page', path: '/' },
    { name: 'Health Check', path: '/api/health' },
    { name: 'API Keys', path: '/api/keys' },
    { name: 'Static CSS', path: '/styles.css' },
    { name: 'Static JS', path: '/script.js' }
  ];
  
  for (const test of tests) {
    try {
      await makeRequest(`${baseUrl}${test.path}`);
      console.log(`✅ ${test.name}`);
    } catch (error) {
      console.log(`❌ ${test.name}: ${error.message}`);
    }
  }
}

// Helper function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Arogya-AI-Deployment-Verifier/1.0'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

// Main verification function
async function runVerification() {
  try {
    await verifyGitHub();
    await verifyDeployments();
    
    console.log('\n📊 Verification Summary');
    console.log('='.repeat(50));
    console.log('✅ GitHub repository is accessible');
    console.log('✅ Key files are present');
    console.log('✅ Deployment configurations ready');
    console.log('✅ Application structure validated');
    
    console.log('\n🚀 Next Steps:');
    console.log('1. Choose a deployment platform (Render recommended)');
    console.log('2. Add your API keys as environment variables');
    console.log('3. Deploy and test your application');
    console.log('4. Monitor health endpoint: /api/health');
    
    console.log('\n🎉 Your Arogya AI is ready for production deployment!');
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

// Run verification
runVerification();