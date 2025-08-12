# Arogya AI - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)
1. Fork this repository to your GitHub account
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import this repository
4. Add environment variables in Vercel dashboard:
   - `GROQ_API_KEY`
   - `PERPLEXITY_API_KEY` (optional)
   - `GEMINI_API_KEY` (optional)
5. Deploy!

### Option 2: Railway
1. Fork this repository
2. Connect to [Railway](https://railway.app)
3. Deploy from GitHub
4. Add environment variables in Railway dashboard
5. Your app will be live!

### Option 3: Render
1. Fork this repository
2. Connect to [Render](https://render.com)
3. Create a new Web Service
4. Connect your GitHub repository
5. Add environment variables
6. Deploy!

### Option 4: Heroku
1. Fork this repository
2. Create a new Heroku app
3. Connect to your GitHub repository
4. Add environment variables in Heroku Config Vars
5. Deploy!

## 🔧 Environment Variables Required

### Essential (At least one required):
- `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
- `PERPLEXITY_API_KEY` - Get from [perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
- `GEMINI_API_KEY` - Get from [makersuite.google.com](https://makersuite.google.com/app/apikey)

### Optional:
- `NODE_ENV=production`
- `PORT` (automatically set by most platforms)

## 📋 Pre-Deployment Checklist

- ✅ All tests passing (`npm test`)
- ✅ Application validated (`node validate.js`)
- ✅ Environment variables configured
- ✅ API keys obtained and tested
- ✅ Repository pushed to GitHub
- ✅ .env file in .gitignore (security)

## 🔒 Security Notes

1. **Never commit .env file** - It's in .gitignore for security
2. **API keys are sensitive** - Only add them in deployment platform settings
3. **HTTPS required** - All deployment platforms provide HTTPS by default
4. **Rate limiting enabled** - Built-in protection against abuse

## 🧪 Testing Before Deployment

```bash
# Install dependencies
npm install

# Run tests
npm test

# Validate application
node validate.js

# Start locally (optional)
npm start
```

## 🌐 Post-Deployment

1. Test all features:
   - Language switching
   - Chat functionality
   - PDF generation
   - Emergency detection
   - Multi-AI fallback

2. Monitor logs for any issues
3. Test with real API keys
4. Verify mobile responsiveness

## 🆘 Troubleshooting

### Common Issues:
1. **API keys not working**: Check if keys are correctly set in platform settings
2. **Build fails**: Ensure all dependencies are in package.json
3. **App crashes**: Check logs for missing environment variables
4. **PDF not generating**: Verify jsPDF CDN is accessible

### Support:
- Check application logs in your deployment platform
- Verify environment variables are set correctly
- Test API endpoints: `/api/health` and `/api/keys`

## 📊 Monitoring

Your deployed app will have these endpoints:
- `/` - Main application
- `/api/health` - Health check
- `/api/keys` - API keys status (masked)

Monitor these for uptime and functionality.

---

**Ready to deploy!** 🎉 Choose your preferred platform and follow the steps above.