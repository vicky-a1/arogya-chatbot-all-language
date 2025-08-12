# Security Policy

## 🔒 Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes             |
| < 1.0   | ❌ No              |

## 🚨 Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. **DO NOT** create a public GitHub issue
Security vulnerabilities should be reported privately to protect users.

### 2. Report via Email
Send details to: **security@arogya-ai.com** (or create a private issue)

### 3. Include in Your Report
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)
- Your contact information

### 4. Response Timeline
- **24 hours**: Initial acknowledgment
- **72 hours**: Preliminary assessment
- **7 days**: Detailed response with timeline
- **30 days**: Security patch release (if applicable)

## 🛡️ Security Measures

### Application Security
- ✅ **Input Validation**: All user inputs are sanitized
- ✅ **XSS Protection**: Content Security Policy implemented
- ✅ **Rate Limiting**: API abuse prevention
- ✅ **HTTPS Only**: All traffic encrypted in production
- ✅ **Security Headers**: Comprehensive security headers
- ✅ **Dependency Scanning**: Regular vulnerability checks

### Data Protection
- ✅ **No Data Storage**: Conversations are not permanently stored
- ✅ **Local PDF Generation**: Reports generated client-side
- ✅ **API Key Security**: Environment variable protection
- ✅ **Session Management**: Stateless architecture
- ✅ **Privacy by Design**: Minimal data collection

### Infrastructure Security
- ✅ **Container Security**: Non-root user execution
- ✅ **Network Security**: Isolated container networking
- ✅ **Secret Management**: Secure environment variables
- ✅ **Access Control**: Principle of least privilege
- ✅ **Monitoring**: Health checks and logging

## 🔍 Security Best Practices

### For Users
- Keep your API keys secure and private
- Use HTTPS-enabled deployments only
- Regularly update your deployment
- Monitor your API usage
- Report suspicious activity

### For Developers
- Never commit secrets to version control
- Use environment variables for configuration
- Validate all inputs on both client and server
- Follow secure coding practices
- Keep dependencies updated

### For Deployers
- Use official Docker images only
- Enable HTTPS/TLS encryption
- Configure proper firewall rules
- Monitor application logs
- Implement backup strategies

## 🚫 Out of Scope

The following are considered out of scope for security reports:
- Issues in third-party dependencies (report to respective maintainers)
- Social engineering attacks
- Physical security issues
- Denial of service attacks on public deployments
- Issues requiring physical access to servers

## 🏆 Security Hall of Fame

We recognize security researchers who help improve our security:

*No reports yet - be the first!*

## 📞 Contact Information

- **Security Email**: security@arogya-ai.com
- **General Contact**: support@arogya-ai.com
- **GitHub Issues**: For non-security related issues only

## 🔄 Security Updates

Security updates will be:
- Released as patch versions (e.g., 1.0.1)
- Documented in release notes
- Announced via GitHub releases
- Communicated to known deployments

## 📋 Security Checklist

Before deploying Arogya AI:

- [ ] Environment variables are properly configured
- [ ] HTTPS is enabled and enforced
- [ ] API keys are kept secure and not exposed
- [ ] Regular security updates are planned
- [ ] Monitoring and logging are configured
- [ ] Backup and recovery procedures are in place
- [ ] Access controls are properly configured

## 🎯 Responsible Disclosure

We follow responsible disclosure practices:
1. Security issues are fixed before public disclosure
2. Credit is given to security researchers
3. Timeline is communicated clearly
4. Users are notified of security updates

Thank you for helping keep Arogya AI secure! 🛡️