# 🚀 Vercel Deployment Guide for GrantFlow Dashboard

## Quick Summary

GrantFlow is a **fully static HTML5 application** with embedded CSS and JavaScript. No build step required. Perfect for Vercel!

---

## Prerequisites

- ✅ GitHub repository created and pushed (with all files)
- ✅ [Vercel account](https://vercel.com) (free tier works)
- ✅ Git and GitHub configured

---

## Deployment Steps

### Step 1: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in
3. Click **"New Project"**
4. Select **"Import Git Repository"**
5. Search for and select your `algoint` repository
6. Click **"Import"**

### Step 2: Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
VITE_APP_ID = 1001
VITE_ALGORAND_SERVER = localhost
VITE_ALGORAND_PORT = 4001
VITE_ALGORAND_INDEXER_SERVER = localhost
VITE_ALGORAND_INDEXER_PORT = 8980
```

**For Testnet (Production):**
```
VITE_APP_ID = YOUR_TESTNET_APP_ID
VITE_ALGORAND_SERVER = testnet-api.algonode.cloud
VITE_ALGORAND_PORT = 443
VITE_ALGORAND_INDEXER_SERVER = testnet-idx.algonode.cloud
VITE_ALGORAND_INDEXER_PORT = 443
```

### Step 3: Configure Build Settings

**Root Directory:** `frontend`

**Build Command:** (leave empty or use default)
```
npm run build
```

**Output Directory:** 
```
./
```

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. You'll see: ✅ **Deployment successful!**
4. Get your live URL: `https://YOUR-PROJECT.vercel.app`

---

## Project Setup

### Already Included:

✅ **package.json** — Node.js metadata and scripts
✅ **vercel.json** — Vercel-specific configuration
✅ **frontend/index.html** — The complete dashboard application
✅ **.env.example** — Environment variable template

### File Structure for Vercel:

```
algoint/
├── frontend/
│   ├── index.html         ← Main dashboard (served by Vercel)
│   ├── index.html.backup  ← Version backup
│   └── package.json       ← Frontend metadata
│
├── vercel.json            ← Vercel configuration
├── .env.example           ← Environment template
├── package.json           ← Root package.json
│
├── smart_contracts/       ← Ignored on Vercel
├── .venv/                 ← Ignored on Vercel
└── README_GRANTFLOW.md    ← Documentation
```

---

## Configuration Details

### vercel.json Explained

```json
{
  "buildCommand": "echo 'Static HTML - no build needed'",
  "public": false,
  "cleanUrls": true,
  "env": ["VITE_APP_ID", "VITE_ALGORAND_SERVER", ...],
  "builds": [{...}],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "frontend/index.html"
    }
  ]
}
```

**Key Settings:**
- `buildCommand` — No build required (static HTML)
- `cleanUrls` — Pretty URLs (no .html extension)
- `routes` — Serve index.html for all routes (SPA support)
- `env` — Expose environment variables to frontend

### package.json

```json
{
  "name": "grantflow-dashboard",
  "version": "1.0.0",
  "scripts": {
    "dev": "python -m http.server 3000",
    "build": "echo 'Static HTML application - no build required'"
  }
}
```

---

## Environment Variables

### Dashboard Credentials (Pre-configured)

No API keys needed! Demo users are hardcoded in index.html:

| Role | Email | Password |
|------|-------|----------|
| 🎓 Student | student@university.edu | password |
| 🏛️ Organizer | organizer@grantflow.io | admin123 |

### Algorand Network (Optional)

If you want to connect to real Algorand blockchain:

```env
# LocalNet (Development)
VITE_ALGORAND_SERVER=localhost
VITE_ALGORAND_PORT=4001
VITE_APP_ID=1001

# TestNet (Production)
VITE_ALGORAND_SERVER=testnet-api.algonode.cloud
VITE_ALGORAND_PORT=443
VITE_APP_ID=YOUR_TESTNET_APP_ID
```

---

## Deployment Checklist

Before deploying, verify:

- [ ] GitHub repository created with all files
- [ ] `frontend/package.json` exists
- [ ] `vercel.json` exists in root
- [ ] `.env.example` with all needed variables
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Environment variables configured
- [ ] Root directory set to `frontend` (if needed)

---

## After Deployment

### Verify Your Site

1. Visit your Vercel URL: `https://YOUR-PROJECT.vercel.app`
2. See GrantFlow dashboard load
3. Log in with demo credentials:
   - Email: `student@university.edu`
   - Password: `password`

### Test Features

- ✅ View grants on Grants tab
- ✅ See dashboard analytics
- ✅ Check transaction history
- ✅ Review DAO proposals
- ✅ Switch between Student/Organizer roles
- ✅ Try create grant (organizer only)
- ✅ Approve milestones (organizer only)
- ✅ Vote on proposals (organizer only)

---

## Custom Domain

To add custom domain (optional):

1. Go to Vercel Project Settings → Domains
2. Enter your domain (e.g., `grantflow.example.com`)
3. Update DNS records as shown
4. Wait 5-10 minutes for propagation

---

## Troubleshooting

### Issue: "Cannot find index.html"

**Solution:** Ensure in Vercel settings:
- Root Directory: `frontend` (or leave empty if frontend/index.html is in root)
- Rebuild and redeploy

### Issue: Blank page loads

**Solution:**
1. Check browser console (F12 → Console tab)
2. Verify environment variables are set
3. Check network tab for failed requests
4. Try `vercel env pull` to sync environment variables

### Issue: "Static Deployment Failed"

**Solution:**
1. Verify `frontend/index.html` exists
2. Check vercel.json syntax (use JSON validator)
3. Try rebuilding: In Vercel dashboard → Deployments → Redeploy

### Issue: Styles/scripts not loading

**Solution:**
- Dashboard is single file (embedded CSS/JS)
- Check browser console for errors
- Verify file was deployed (check in Vercel file preview)

---

## Local Development vs Vercel

### Local (Before pushing)
```bash
python serve_frontend.py
# http://localhost:3000
```

### Vercel (After deployment)
```
https://YOUR-PROJECT.vercel.app
```

**No code changes needed!** Same code runs everywhere.

---

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update dashboard colors"
git push origin main

# Vercel automatically redeploys within 1-2 minutes
# Check deployment status in Vercel dashboard
```

---

## Environment Management

### For Different Environments:

**Vercel Dashboard → Settings → Environment Variables**

```env
# Development
VITE_APP_ID=1001
VITE_ALGORAND_SERVER=localhost

# Production
VITE_ALGORAND_SERVER=testnet-api.algonode.cloud
```

Both environments available in Vercel dashboard.

---

## Performance & Analytics

Once deployed, Vercel provides:

✅ **Response times**
✅ **Error rates**
✅ **Web Core Vitals**
✅ **Geographic distribution**
✅ **Traffic analytics**

View in: Vercel Dashboard → Analytics

---

## Security

✅ **HTTPS enabled** (automatic)
✅ **DDoS protection** (automatic)
✅ **Environment variables** (encrypted)
✅ **GitHub integration** (secure tokens)

---

## Next Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Vercel configuration for deployment"
   git push origin main
   ```

2. **Connect to Vercel:** (see Step 1)

3. **Wait for deployment:** 1-2 minutes

4. **Share your URL:** `https://YOUR-PROJECT.vercel.app`

---

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues:** Check repository issues
- **GrantFlow Team:** See README_GRANTFLOW.md for contact

---

## Summary

| Aspect | Status |
|--------|--------|
| Build Required | ❌ No — Static HTML |
| Node.js Needed | ❌ No — Only on Vercel |
| Environment Variables | ✅ Optional (demo works without) |
| Custom Domain | ✅ Yes (free and paid plans) |
| SSL/HTTPS | ✅ Automatic |
| Deployment Time | ⚡ 1-2 minutes |
| Cost | 💰 Free tier available |

---

**Your GrantFlow Dashboard is ready for Vercel deployment! 🎉**

**Version:** 1.0  
**Last Updated:** March 3, 2026  
**Status:** Production Ready
