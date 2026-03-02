# Frontend Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 16+ and npm 8+
- AlgoKit LocalNet running
- All smart contracts built

### Step 1: Install Dependencies (1 min)
```bash
cd frontend
npm install
```

### Step 2: Configure Environment (1 min)
```bash
cp .env.example .env.local
```

No changes needed - it's already configured for LocalNet!

### Step 3: Start the App (1 min)
```bash
npm start
```

The app opens at `http://localhost:3000`

### Step 4: Use the App (2 min)

You should see:
- ✅ **Green connection status** - Connected to LocalNet
- 💰 **Account balance** - 10.00 Algo (deployer account)
- 📝 **Create New Grant** form on the left
- 📊 **Active Grants** list on the right (2 sample grants)

Try these actions:
1. **View Sample Grants** - See 2 pre-loaded example grants
2. **Create a Grant** - Fill in a student address and amount
3. **Approve Milestone** - Click button to approve a grant
4. **Claim Funds** - Click button to claim approved funds

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html              # Web page
├── src/
│   ├── components/
│   │   ├── AlgorandClient.js    # Blockchain connection
│   │   ├── GrantForm.js         # Create grants form
│   │   ├── GrantList.js         # Display grants
│   │   └── AccountBalance.js    # Account info
│   ├── styles/
│   │   ├── GrantForm.css
│   │   ├── GrantList.css
│   │   └── AccountBalance.css
│   ├── App.js                   # Main app
│   ├── App.css                  # Global styles
│   └── index.js                 # React entry
├── package.json                 # Dependencies
├── .env.example                 # Environment template
└── README.md                    # Full docs
```

## 🔧 Available Commands

```bash
# Start development server (auto-reload)
npm start                   # Runs on:3000

# Build for production
npm run build              # Creates optimized build/

# Run tests
npm test                   # Runs test suite

# This removes all abstraction - don't do unless needed
npm run eject              # ⚠️ Permanent!
```

## 🎯 Features Included

✅ **Create Grants**
- Enter student address
- Set grant amount (0.1 to 9.9 Algo)
- Submit to create

✅ **Manage Grants**
- See all active grants
- Approve milestones (sponsor action)
- Claim funds (student action)
- View grant details

✅ **Account Info**
- Deployer account balance
- Contract information
- Available blockchain methods

✅ **UX Features**
- Real-time connection status
- Form validation with errors
- Success notifications
- Mobile-responsive design
- Error handling with retry

## 🔗 Integration Points

The frontend is ready to connect to:

1. **Smart Contract** - Through AlgorandClient
2. **Backend API** - Update .env.local with API_URL
3. **Database** - Via backend endpoints (future)

## 📱 Testing on Mobile

### Test in Browser DevTools
1. Open DevTools (F12)
2. Click device icon (toggle device toolbar)
3. Choose device or set dimensions:
   - Mobile: 375x667
   - Tablet: 768x1024
   - Desktop: 1440x900

The app responds to all screen sizes.

## 🚀 Common Tasks

### Create a Test Grant
1. Fill Student Address: Copy a test address from terminal
2. Fill Amount: Enter 1.5
3. Click "Create Grant"
4. See it appear in the list!

### Test Grant Workflow
1. Click a grant card
2. Click "Approve Milestone"
3. Button changes to "Claim Funds"
4. Click "Claim Funds"
5. Status changes to "Claimed"

### Check Console for Debugging
1. Open DevTools (F12)
2. Go to Console tab
3. All app events logged there
4. Look for errors or connection issues

## ⚙️ Configuration

### LocalNet Variables (Already Set)
```
REACT_APP_ALGOD_TOKEN=aaaaaaaaaa...
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
```

### Change LocalNet Settings
Edit `.env.local`:
```bash
REACT_APP_ALGOD_SERVER=http://192.168.1.100  # Your IP
REACT_APP_ALGOD_PORT=4001
```

### Connect to TestNet (Future)
```bash
REACT_APP_ALGOD_SERVER=https://testnet-api.algonode.cloud
REACT_APP_ALGOD_TOKEN=<get-from-algonode>
```

## 🐛 Troubleshooting

### Port 3000 Already In Use
```bash
npm start -- --port 3001  # Use different port
```

### Module not found
```bash
rm -rf node_modules
npm install               # Reinstall
```

### Styles not loading
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Rebuild: `npm run build` then `npm start`

### Can't connect to LocalNet
```bash
# Check LocalNet is running
algokit localnet status

# If not running
algokit localnet start

# Check port 4001 is open
netstat -an | grep 4001  # Linux/Mac
netstat -an | findstr 4001  # Windows
```

### App shows "Disconnected"
1. ✅ Is LocalNet running? (`algokit localnet start`)
2. ✅ Is .env.local correct? (Check server/port)
3. ✅ Did you restart `npm start` after .env changes?
4. ✅ Check browser console for errors (F12)

## 📊 Next Steps

### Short Term
1. ✅ Verify frontend runs locally
2. ✅ Test all UI interactions
3. ✅ Create sample grants
4. ✅ Approve and claim grants

### Medium Term
1. Create backend API server
2. Connect frontend to real contract methods
3. Add database persistence
4. Implement user authentication

### Long Term
1. Deploy to web server
2. Add advanced features (analytics, reporting)
3. Create mobile app version
4. Integrate with MainNet

## 💡 Tips & Tricks

### Fast Reload
- Save file → Auto-reloads in browser (no manual refresh needed)
- Edit CSS → See changes instantly

### Check Network Requests
1. F12 → Network tab
2. Look for API calls (should see connection tests)
3. Check response status (should be 200)

### View Account Info
1. Check browser console (F12)
2. Type: `console.log(JSON.stringify(accountInfo, null, 2))`
3. See full account object

### Test with Multiple Addresses
1. Generate test addresses: Use `algokit account generate`
2. Fund them: Use AlgoKit dispenser
3. Copy addresses into form

## 📚 Documentation Files

- **README.md** - Full documentation
- **DEPLOYMENT.md** - How to deploy online
- **COMPONENTS.md** - Component details
- **QUICK_START.md** - This file!

## 🎓 Learning Resources

- [React Docs](https://react.dev/)
- [Algorand SDK](https://github.com/algorand/js-algorand-sdk)
- [AlgoKit Docs](https://developer.algorand.org/algokit/)
- [CSS Guide](./src/styles/)

## 🏁 You're Ready!

Your Grant Tracker frontend is fully functional! 

```
npm start
```

**The app will open automatically.** Explore and enjoy! 🚀

---

**Questions?** Check README.md or DEPLOYMENT.md  
**Issues?** See Troubleshooting section above  
**Ready to deploy?** See DEPLOYMENT.md  

Happy coding! 🎉
