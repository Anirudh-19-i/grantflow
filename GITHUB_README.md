# AlgoInt Grant Tracker

A modern web application for managing Algorand-based grants with email authentication and multi-wallet support. Built with React and integrated with AlgoSDK for blockchain interactions.

## 🌟 Features

- **Email Authentication** - Secure login with demo credentials support
- **Multi-Wallet Integration**
  - Demo Wallet (LocalNet)
  - Mnemonic Phrase Import
  - Private Key Import
- **Grant Management**
  - Create new grants with validation
  - Approve grant milestones
  - Claim funds
  - View grant status and history
- **Account Management**
  - Real-time Algo balance display
  - Wallet connection/disconnection
  - Session persistence
- **Professional UI**
  - Responsive design
  - Modern gradient styling
  - Clear error handling
  - Loading states and animations

## 🏗️ Project Structure

```
algoint/
├── frontend/                    # React web application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── contexts/           # React Context for state management
│   │   │   ├── AuthContext.js
│   │   │   └── WalletContext.js
│   │   ├── services/           # Blockchain interaction layer
│   │   │   └── WalletService.js
│   │   ├── pages/              # Application pages
│   │   │   ├── Login.js
│   │   │   ├── WalletConnect.js
│   │   │   └── Dashboard.js
│   │   ├── components/         # Reusable React components
│   │   │   ├── GrantForm.js
│   │   │   ├── GrantList.js
│   │   │   ├── AccountBalance.js
│   │   │   └── ProtectedRoute.js
│   │   ├── styles/             # CSS stylesheets
│   │   │   ├── Login.css
│   │   │   ├── WalletConnect.css
│   │   │   ├── Dashboard.css
│   │   │   └── (component styles)
│   │   ├── App.js              # Root component with routing
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
├── smart_contracts/            # Python/PyTeal smart contracts
│   ├── hello_world/
│   │   ├── contract.py
│   │   └── deploy_config.py
│   └── artifacts/              # Compiled contracts
│
├── README.md
└── documentation files
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (16+)
- **npm** or **yarn**
- **AlgoKit** (for LocalNet)
- **Python** (3.9+) - for smart contracts
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/algoint.git
cd algoint
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Set up environment variables** (if needed)
```bash
# Create .env file in frontend directory
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
REACT_APP_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

4. **Start AlgoKit LocalNet** (in another terminal)
```bash
algokit localnet start
```

5. **Start the React development server**
```bash
npm start
```

The app will be available at [`http://localhost:3000`](http://localhost:3000)

## 🔐 Demo Credentials

For testing the application:

- **Email:** `demo@example.com`
- **Password:** `demo123`

After login, select "Demo Wallet" to connect without needing to import mnemonics or private keys.

## 📱 Application Flow

```
Login Page
    ↓
Wallet Connection (Choose: Demo / Mnemonic / Private Key)
    ↓
Dashboard (Create, Approve, Claim Grants)
    ↓
Account Balance & Grant Management
```

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router v6** - Client-side routing
- **algosdk 2.7.0** - Algorand blockchain SDK

### State Management
- **React Context API** - Global state for Auth and Wallet
- **Custom Hooks** - `useAuth()`, `useWallet()`

### Styling
- **CSS3** - Pure CSS with modern styling
- **Responsive Design** - Mobile and desktop optimized

### Backend Integration
- **AlgoKit LocalNet** - Local Algorand network for testing
- **HTTP/REST** - Communication with algod

## 📚 Key Components

### AuthContext
Manages user authentication and session persistence.
```javascript
const { user, isLogin, login, logout } = useAuth();
```

### WalletContext
Manages wallet connection and balance tracking.
```javascript
const { wallet, balance, connectWallet, disconnectWallet } = useWallet();
```

### WalletService
Wraps AlgoSDK for blockchain operations.
```javascript
const walletService = new WalletService();
await walletService.testConnection();
await walletService.getAccountInfo(address);
```

## 🔄 Workflow

1. **Login** - Authenticate with email/password
2. **Connect Wallet** - Choose wallet type and connect
3. **View Dashboard** - See account balance and existing grants
4. **Create Grant** - Fill form and submit new grant
5. **Manage Grants** - Approve milestones and claim funds

## 🐛 Troubleshooting

### Port 3000 Already in Use
The app will automatically try port 3001. Access at [`http://localhost:3001`](http://localhost:3001)

### LocalNet Connection Failed
Ensure AlgoKit LocalNet is running:
```bash
algokit localnet start
```

### npm Dependency Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Available Scripts

### `npm start`
Runs the app in development mode with hot reload.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
Exposes all configuration (one-way operation).

## 🔒 Security Notes

- Demo credentials are for testing only
- Private keys should never be committed to version control
- Use environment variables for sensitive data
- Always validate user input on both client and server

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React apps (easy setup with GitHub)
- **Netlify** - Great UI and analytics
- **GitHub Pages** - Free static hosting
- **AWS/Azure** - Enterprise solutions

### Environment Setup for Production
```bash
REACT_APP_ALGOD_SERVER=your-algod-server.com
REACT_APP_ALGOD_PORT=443
REACT_APP_ALGOD_TOKEN=your-token-here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Learning Resources

- [Algorand Developer Docs](https://developer.algorand.org/)
- [AlgoSDK JavaScript](https://github.com/algorand/js-algorand-sdk)
- [React Documentation](https://react.dev)
- [AlgoKit Documentation](https://algorandfoundation.github.io/algokit-cli/)

## 🐞 Issues & Support

For bugs, feature requests, or questions:
1. Check existing issues
2. Create a detailed bug report with steps to reproduce
3. Include error messages and environment details

## 📞 Contact

- **Developer:** AlgoInt Team
- **Email:** developer@algoint.app
- **Website:** algoint.app

## 🙏 Acknowledgments

- Algorand Foundation for the fantastic SDK
- React team for the amazing framework
- AlgoKit for streamlined development

---

**Happy coding! 🚀**
