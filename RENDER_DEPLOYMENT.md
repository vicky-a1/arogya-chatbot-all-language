# 🚀 Arogya AI - Render Deployment Guide

## 📋 Pre-Deployment Checklist

- ✅ GitHub repository ready
- ✅ API keys obtained (at least GROQ_API_KEY)
- ✅ All tests passing
- ✅ Application validated

## 🌐 Deploy to Render (Recommended)

### Step 1: Prepare Repository
1. **Fork/Clone** this repository to your GitHub account
2. **Ensure** all files are committed and pushed

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the **arogya-ai** repository

### Step 4: Configure Service Settings

#### Basic Settings:
- **Name**: `arogya-ai` (or your preferred name)
- **Region**: `Oregon (US West)` (recommended for performance)
- **Branch**: `main` or `master`
- **Runtime**: `Node`

#### Build & Deploy Settings:
- **Build Command**: 
  ```bash
  npm ci --only=production --no-optional --no-audit --prefer-offline && npm run build
  ```
- **Start Command**: 
  ```bash
  node --max-old-space-size=512 server.js
  ```

#### Advanced Settings:
- **Instance Type**: `Starter` (free tier) or `Standard` (for production)
- **Auto-Deploy**: `Yes` (recommended)
- **Health Check Path**: `/api/health`

### Step 5: Environment Variables
Add these environment variables in Render dashboard:

#### Required:
```
NODE_ENV=production
GROQ_API_KEY=your_groq_api_key_here
```

#### Optional (for enhanced reliability):
```
PERPLEXITY_API_KEY=your_perplexity_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NODE_OPTIONS=--max-old-space-size=512
```

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (usually 2-5 minutes)
3. Your app will be available at: `https://your-app-name.onrender.com`

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Go to your service settings
2. Add your custom domain
3. Configure DNS records as instructed

### Scaling (Paid Plans)
- **Horizontal Scaling**: Multiple instances
- **Vertical Scaling**: More CPU/RAM
- **Auto-scaling**: Based on traffic

### Monitoring
- **Logs**: Available in Render dashboard
- **Metrics**: CPU, Memory, Response time
- **Alerts**: Configure for downtime/errors

## 🧪 Post-Deployment Testing

### 1. Health Check
```bash
curl https://your-app-name.onrender.com/api/health
```
Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "version": "1.0.0",
  "environment": "production"
}
```

### 2. API Keys Status
```bash
curl https://your-app-name.onrender.com/api/keys
```

### 3. Main Application
Visit: `https://your-app-name.onrender.com`

Test features:
- ✅ Language selection
- ✅ Chat functionality
- ✅ PDF generation
- ✅ Emergency detection
- ✅ Mobile responsiveness

## 🔒 Security Best Practices

### Environment Variables
- ✅ Never commit API keys to repository
- ✅ Use Render's environment variable system
- ✅ Rotate API keys regularly

### HTTPS
- ✅ Render provides HTTPS by default
- ✅ All traffic is encrypted
- ✅ Security headers configured

### Rate Limiting
- ✅ Built-in rate limiting active
- ✅ Protection against abuse
- ✅ API endpoint protection

## 📊 Performance Optimization

### Memory Management
- ✅ Node.js memory limit: 512MB
- ✅ Efficient garbage collection
- ✅ Memory leak prevention

### Caching
- ✅ Static file caching
- ✅ Compression enabled
- ✅ CDN-ready assets

### Database
- ✅ No database required
- ✅ Stateless architecture
- ✅ Session-based conversations

## 🚨 Troubleshooting

### Common Issues:

#### 1. Build Fails
**Problem**: npm install errors
**Solution**: 
- Check Node.js version compatibility
- Verify package.json syntax
- Clear npm cache: `npm cache clean --force`

#### 2. App Crashes on Start
**Problem**: Missing environment variables
**Solution**:
- Verify GROQ_API_KEY is set
- Check all required environment variables
- Review application logs

#### 3. API Not Working
**Problem**: Invalid API keys
**Solution**:
- Verify API keys are correct
- Check API key permissions
- Test with curl/Postman

#### 4. Slow Performance
**Problem**: Memory/CPU limits
**Solution**:
- Upgrade to Standard plan
- Optimize memory usage
- Enable compression

### Getting Help:
1. **Render Logs**: Check deployment and runtime logs
2. **Health Check**: Monitor `/api/health` endpoint
3. **GitHub Issues**: Report bugs in repository
4. **Render Support**: Contact Render support team

## 🎯 Production Checklist

After deployment, verify:

- ✅ **Application loads** without errors
- ✅ **Health check** returns 200 OK
- ✅ **API keys** are working
- ✅ **Chat functionality** works
- ✅ **PDF generation** works
- ✅ **Language switching** works
- ✅ **Emergency detection** works
- ✅ **Mobile responsive** design
- ✅ **HTTPS** is active
- ✅ **Performance** is acceptable

## 🔄 Continuous Deployment

With auto-deploy enabled:
1. **Push to GitHub** → Automatic deployment
2. **Pull requests** → Preview deployments
3. **Main branch** → Production deployment
4. **Rollback** → Previous version if needed

## 💰 Cost Estimation

### Free Tier (Starter):
- ✅ 750 hours/month free
- ✅ Automatic sleep after 15 min inactivity
- ✅ Perfect for testing/demo

### Paid Tier (Standard - $7/month):
- ✅ Always-on service
- ✅ No sleep mode
- ✅ Better performance
- ✅ Custom domains
- ✅ Priority support

---

## 🎉 Congratulations!

Your Arogya AI application is now deployed on Render and ready to help users with their health consultations!

**Live URL**: `https://your-app-name.onrender.com`

Share your deployment and help make healthcare more accessible! 🏥✨