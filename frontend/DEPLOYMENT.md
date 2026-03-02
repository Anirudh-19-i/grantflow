# Frontend Deployment Guide

## Overview

The **Grant Tracker Frontend** is a professional React-based web application that provides a user-friendly interface for managing student grants and funding through the Algorand blockchain.

## Features

✅ **Real-time Connection Status** - Visual indicator showing LocalNet connectivity  
✅ **Grant Creation** - Intuitive form to create new grants  
✅ **Grant Management** - View, approve, and claim grants  
✅ **Account Balance** - Display deployer account information  
✅ **Contract Information** - View smart contract details  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Error Handling** - Graceful error messages and retry functionality  

## Prerequisites

- **Node.js** 16.0+ and npm 8.0+
- **AlgoKit LocalNet** running (for LocalNet development)
- **Algorand SDK** configured in `.env.local`

## Installation

### 1. Install Dependencies

```bash
cd frontend
npm install
```

This installs all required packages:
- `react` 18.2 - UI framework
- `react-dom` 18.2 - React rendering
- `react-scripts` 5.0 - Build tools
- `axios` 1.6 - HTTP client
- `algosdk` 2.7 - Algorand SDK
- `algokit-utils` 4.0 - AlgoKit utilities
- `dotenv` - Environment configuration

### 2. Configure Environment

Create a `.env.local` file in the `frontend` directory:

```env
REACT_APP_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
REACT_APP_INDEXER_SERVER=http://localhost
REACT_APP_INDEXER_PORT=8980
REACT_APP_APP_ID=1001
```

## Running

### Development Mode

```bash
npm start
```

- Starts the app on `http://localhost:3000`
- Automatically reloads on code changes
- Open in browser and start using the grant tracker

### Production Build

```bash
npm run build
```

- Creates optimized production build in `build/` directory
- Minified and bundled for deployment
- Ready for hosting on web servers

### Testing

```bash
npm test
```

- Runs test suite using Jest
- Tests React components and functionality
- Useful for development validation

## Deployment Options

### Option 1: GitHub Pages (Free)

```bash
npm install gh-pages --save-dev
```

Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/grant-tracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Deploy:
```bash
npm run deploy
```

### Option 2: Netlify (Recommended)

1. Push code to GitHub
2. Connect repo at netlify.com
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy automatically on push

Environment variables in Netlify dashboard:
```
REACT_APP_ALGOD_TOKEN=aaaaaaaaaa...
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
REACT_APP_INDEXER_SERVER=http://localhost
REACT_APP_INDEXER_PORT=8980
REACT_APP_APP_ID=1001
```

### Option 3: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel`
4. Set environment variables in Vercel dashboard
5. Auto-deploys on GitHub push

### Option 4: Traditional Server (AWS, DigitalOcean, etc.)

```bash
# Build the app
npm run build

# Copy build folder to server
scp -r build/ user@server:/var/www/grant-tracker/

# Server configuration (nginx example)
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/grant-tracker/build;
    try_files $uri /index.html;
}

# Restart nginx
sudo systemctl restart nginx
```

## File Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # App icon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── AlgorandClient.js       # Blockchain client wrapper
│   │   ├── GrantForm.js            # Create grant form
│   │   ├── GrantList.js            # Display grants
│   │   └── AccountBalance.js       # Account information
│   ├── styles/
│   │   ├── GrantForm.css           # Form component styling
│   │   ├── GrantList.css           # List component styling
│   │   └── AccountBalance.css      # Account component styling
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── .env.local             # Environment variables (not in git)
└── .gitignore            # Git ignore rules
```

## Component Architecture

### App.js (Main Container)
- Manages application state
- Initializes AlgorandClient
- Handles grant creation/updates
- Renders sidebar and main content

### AlgorandClient.js (Blockchain Bridge)
- Connects to LocalNet Algod node
- Manages account information
- Provides blockchain utilities
- Formats Algo amounts

### GrantForm.js (Create Grants)
- Form validation
- Student address input
- Grant amount input
- Error handling
- Success notifications

### GrantList.js (View & Manage)
- Display all grants
- Grant card UI
- Approve button functionality
- Claim funds button
- Status indicators
- Expandable details

### AccountBalance.js (Account Info)
- Deployer account display
- Balance in Algo
- Account address
- Contract information
- Available methods

## Connecting to Blockchain

The frontend connects to Algorand through `AlgorandClient.js`:

```javascript
const client = new AlgorandClient();
const connection = await client.testConnection();

if (connection.success) {
  // Connected to LocalNet
  const accountInfo = await client.getAccountInfo();
}
```

## Development Workflow

1. **Start LocalNet**
   ```bash
   algokit localnet start
   ```

2. **Start frontend**
   ```bash
   npm start
   ```

3. **Make changes** to components
4. **Test in browser** at `localhost:3000`
5. **Check console** for errors
6. **Rebuild** if needed: `npm run build`

## Troubleshooting

### "Unable to connect to LocalNet"
- Ensure AlgoKit LocalNet is running: `algokit localnet start`
- Check .env.local has correct server address
- Verify Algod is on port 4001

### Components not rendering
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear browser cache
- Check browser console for errors

### Build fails
- Update Node.js to 16.0+
- Clear npm cache: `npm cache clean --force`
- Rebuild: `npm run build`

### Styling issues
- Ensure CSS files are imported in components
- Check CSS file paths are correct
- Clear browser cache and rebuild

## API Integration (Future)

When creating a backend server, update `AlgorandClient.js`:

```javascript
// Instead of direct blockchain calls
const grant = await fetch('/api/grants/create', {
  method: 'POST',
  body: JSON.stringify(grantData)
});
```

## Security Notes

🔒 Never commit `.env.local` to version control  
🔒 Use secrets management for production (AWS Secrets, etc.)  
🔒 Validate all inputs on frontend AND backend  
🔒 Use HTTPS in production  
🔒 Implement authentication for sponsor accounts  

## Performance Optimization

- Code splitting using React.lazy()
- Image optimization
- Bundle size analysis: `npm run build -- --stats`
- Service Worker for PWA capabilities

## Next Steps

1. **Backend API** - Create Node.js/Express server
2. **Database** - Store grant metadata
3. **Authentication** - Add user login
4. **Smart Contract** - Link to real blockchain
5. **Testing** - Add Jest/React Testing Library tests
6. **CI/CD** - Automate deployment with GitHub Actions

## Support & Documentation

- Component documentation: See individual .js files
- Styling reference: See CSS files for classes
- Algorand docs: https://developer.algorand.org/
- React docs: https://react.dev/
- AlgoKit docs: https://developer.algorand.org/algokit/

## License

This project is part of the Grant Tracker System and follows the same license terms.

---

**Last Updated:** March 2024  
**Version:** 1.0.0  
**Status:** Production Ready
