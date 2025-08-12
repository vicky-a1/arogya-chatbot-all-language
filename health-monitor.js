#!/usr/bin/env node

/**
 * Arogya AI - Production Health Monitor
 * Monitors application health and performance in production
 */

const http = require('http');
const https = require('https');

const config = {
  url: process.env.HEALTH_CHECK_URL || 'http://localhost:10000',
  interval: parseInt(process.env.HEALTH_CHECK_INTERVAL) || 30000, // 30 seconds
  timeout: parseInt(process.env.HEALTH_CHECK_TIMEOUT) || 5000, // 5 seconds
  retries: parseInt(process.env.HEALTH_CHECK_RETRIES) || 3
};

let consecutiveFailures = 0;
let totalChecks = 0;
let totalFailures = 0;

console.log('🏥 Arogya AI Health Monitor Started');
console.log(`📊 Monitoring: ${config.url}/api/health`);
console.log(`⏱️  Interval: ${config.interval / 1000}s`);
console.log(`⏰ Timeout: ${config.timeout / 1000}s`);
console.log(`🔄 Retries: ${config.retries}`);
console.log('─'.repeat(50));

function makeRequest(url, timeout) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const startTime = Date.now();
    
    const req = client.get(`${url}/api/health`, { timeout }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        
        try {
          const healthData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            responseTime,
            data: healthData
          });
        } catch (error) {
          reject(new Error(`Invalid JSON response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.setTimeout(timeout);
  });
}

async function performHealthCheck() {
  totalChecks++;
  const timestamp = new Date().toISOString();
  
  for (let attempt = 1; attempt <= config.retries; attempt++) {
    try {
      const result = await makeRequest(config.url, config.timeout);
      
      if (result.status === 200 && result.data.status === 'healthy') {
        consecutiveFailures = 0;
        
        console.log(`✅ [${timestamp}] Health check passed`);
        console.log(`   📊 Response time: ${result.responseTime}ms`);
        console.log(`   ⏱️  Uptime: ${Math.round(result.data.uptime)}s`);
        console.log(`   📈 Success rate: ${((totalChecks - totalFailures) / totalChecks * 100).toFixed(1)}%`);
        
        // Performance warnings
        if (result.responseTime > 2000) {
          console.log(`   ⚠️  Slow response time: ${result.responseTime}ms`);
        }
        
        return;
      } else {
        throw new Error(`Unhealthy status: ${result.status} - ${result.data.status}`);
      }
    } catch (error) {
      if (attempt === config.retries) {
        consecutiveFailures++;
        totalFailures++;
        
        console.log(`❌ [${timestamp}] Health check failed (attempt ${attempt}/${config.retries})`);
        console.log(`   🔥 Error: ${error.message}`);
        console.log(`   📉 Consecutive failures: ${consecutiveFailures}`);
        console.log(`   📊 Total failure rate: ${(totalFailures / totalChecks * 100).toFixed(1)}%`);
        
        // Alert thresholds
        if (consecutiveFailures >= 3) {
          console.log(`🚨 ALERT: ${consecutiveFailures} consecutive failures detected!`);
        }
        
        if (consecutiveFailures >= 5) {
          console.log(`💥 CRITICAL: Service appears to be down!`);
          
          // In production, you might want to:
          // - Send notifications (email, Slack, etc.)
          // - Trigger auto-restart
          // - Scale up instances
          // - Switch to backup service
        }
      } else {
        console.log(`⚠️  [${timestamp}] Attempt ${attempt} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
    }
  }
}

// Perform initial health check
performHealthCheck();

// Set up periodic health checks
const healthCheckInterval = setInterval(performHealthCheck, config.interval);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Health monitor shutting down...');
  clearInterval(healthCheckInterval);
  
  console.log('📊 Final Statistics:');
  console.log(`   Total checks: ${totalChecks}`);
  console.log(`   Total failures: ${totalFailures}`);
  console.log(`   Success rate: ${((totalChecks - totalFailures) / totalChecks * 100).toFixed(1)}%`);
  console.log('👋 Health monitor stopped');
  
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Health monitor crashed:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled rejection in health monitor:', reason);
  process.exit(1);
});