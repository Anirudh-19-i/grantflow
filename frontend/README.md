# Grant Tracker Frontend

A modern, professional React web application for transparent grant and funding management on the Algorand blockchain.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your settings

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features

### Account Management
- 👤 Display deployer account information
- 💰 Show real-time account balance in Algos
- 📊 View contract information and methods

### Grant Management
- ➕ Create new grants with student addresses
- ✅ Approve milestone funding as sponsor
- 💳 Claim approved funds as student
- 📝 View detailed grant information
- 🔄 Real-time grant status updates

### User Experience
- 🎨 Professional, modern UI design
- 📱 Fully responsive on mobile and desktop
- 🔌 Live connection status indicator
- ⚠️ Comprehensive error handling
- 🔄 One-click retry for connection issues

### Technical Features
- ⚡ Fast React component rendering
- 🔗 Blockchain integration via AlgoKit
- 🎯 Form validation with error messages
- 📦 Production-ready build system
- 🧪 Testing setup ready

## 📦 Project Structure

```
frontend/
├── public/
│   └── index.html                 # Entry HTML
├── src/
│   ├── components/
│   │   ├── AlgorandClient.js      # Blockchain client
│   │   ├── GrantForm.js           # Create grant form
│   │   ├── GrantList.js           # Grant list display
│   │   └── AccountBalance.js      # Account info display
│   ├── styles/
│   │   ├── GrantForm.css          # Form styles
│   │   ├── GrantList.css          # List styles
│   │   └── AccountBalance.css     # Account styles
│   ├── App.js                     # Main app component
│   ├── App.css                    # Global styles
│   ├── index.js                   # React entry point
│   └── index.css                  # Base styles
├── package.json                   # Dependencies
├── DEPLOYMENT.md                  # Deployment guide
└── README.md                      # This file
```

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode. App reloads when you save changes.

### `npm run build`
Builds the app for production to the `build` folder. Code is minified and optimized.

### `npm test`
Runs the test suite in watch mode.

### `npm run eject`
⚠️ One-way operation! Exposes all configuration files.

## ⚙️ Configuration

### Environment Variables

Create `.env.local`:

```env
# Algorand LocalNet Configuration
REACT_APP_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
REACT_APP_INDEXER_SERVER=http://localhost
REACT_APP_INDEXER_PORT=8980

# Smart Contract Configuration
REACT_APP_APP_ID=1001

# Optional: API Server
REACT_APP_API_URL=http://localhost:3001
```

## 🔗 Component Guide

### AlgorandClient
Manages blockchain connections and operations.

```javascript
const client = new AlgorandClient();
const connection = await client.testConnection();
const accountInfo = await client.getAccountInfo(address);
```

### GrantForm
Form to create new grants with validation.

```javascript
<GrantForm 
  onGrantCreated={handleGrantCreated}
  algorandClient={client}
  isLoading={false}
/>
```

### GrantList
Displays grants with approve and claim actions.

```javascript
<GrantList 
  grants={grants}
  onApprove={handleApprove}
  onClaim={handleClaim}
  algorandClient={client}
/>
```

### AccountBalance
Shows account information and contract details.

```javascript
<AccountBalance 
  algorandClient={client}
  isConnected={true}
/>
```

## 🎨 Styling

The application uses modern CSS with:
- 🎨 CSS custom properties for theming
- 📱 Mobile-first responsive design
- ✨ Smooth animations and transitions
- 🎯 Professional color scheme
- ♿ Accessible color contrast

### Color Palette

- **Primary**: #2563eb (Blue)
- **Secondary**: #059669 (Green)
- **Danger**: #dc2626 (Red)
- **Warning**: #d97706 (Orange)
- **Background**: #f9fafb (Light Gray)

## 🔐 Security Considerations

- Never commit `.env.local` with real credentials
- Validate all user inputs
- Use environment variables for sensitive data
- Implement rate limiting in production
- Use HTTPS in production
- Sanitize user inputs for blockchain addresses

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- **Local Development** - npm start
- **GitHub Pages** - Free hosting
- **Netlify** - Recommended (easiest)
- **Vercel** - Alternative serverless
- **Traditional Servers** - AWS, DigitalOcean, etc.

## 📱 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari, Chrome Android

## 🐛 Troubleshooting

### Connection Issues
```bash
# Ensure LocalNet is running
algokit localnet start

# Check .env.local configuration
# Verify Algod is on port 4001
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

### Styling Problems
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS file imports in components
- Verify file paths are correct
- Rebuild: `npm run build`

## 📚 Documentation

- [React Documentation](https://react.dev/)
- [Algorand SDK](https://github.com/algorand/js-algorand-sdk)
- [AlgoKit](https://developer.algorand.org/algokit/)
- [CSS Guide](./src/styles/README.md)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/my-feature`
4. Submit pull request

## 📝 License

Part of the Grant Tracker System project.

## 🔗 Related Projects

- **Smart Contract**: See `../smart_contracts/`
- **Backend API**: Coming soon
- **Documentation**: See `../` directory

## ✉️ Support

For issues, feature requests, or questions:
1. Check existing documentation
2. Review component code comments
3. Check browser console for errors
4. Refer to Algorand SDK documentation

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: March 2024  
**Maintainer**: Grant Tracker Team
