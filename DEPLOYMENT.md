# Deploy to Vercel - Step by Step Guide

## Prerequisites
1. **Install Node.js** (if not already installed)
   - Download from [https://nodejs.org/](https://nodejs.org/)
   - Choose the LTS version
   - Install and restart your terminal

## Method 1: Deploy via Vercel Website (Recommended)

### Step 1: Prepare Your Repository
1. Make sure your code is pushed to GitHub
2. Your repository should be public or you need to connect your GitHub account to Vercel

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your `lounge-hopper-india` repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

### Step 3: Add Environment Variables
After deployment, go to your project settings in Vercel:

1. Navigate to **Settings** → **Environment Variables**
2. Add these variables:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: `https://bgluvhaacblcwnxmwzvr.supabase.co`
   - **Environment**: Production, Preview, Development

3. Add another variable:
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnbHV2aGFhY2JsY3dueG13enZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzM2MjIsImV4cCI6MjA2NzAwOTYyMn0.jMdMuuu77LDp7Kau-NEgZZrOCWMF2VyYh3D6RKMCCXI`
   - **Environment**: Production, Preview, Development

4. Click "Save"
5. Redeploy your project

## Method 2: Deploy via Command Line

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login and Deploy
```bash
# Login to Vercel
vercel login

# Deploy (run in your project folder)
vercel
```

### Step 3: Follow the prompts
- Link to existing project or create new
- Set project name
- Confirm settings

## What Happens After Deployment

1. **Your app will be live** at a URL like: `https://your-project-name.vercel.app`
2. **Automatic deployments** - Every time you push to GitHub, Vercel will automatically redeploy
3. **Custom domain** - You can add your own domain in Vercel settings

## Troubleshooting

### If the app doesn't load data:
- Check that environment variables are set correctly
- Verify Supabase connection in browser console
- Make sure your Supabase database is accessible

### If build fails:
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check Vercel build logs for specific errors

## Your App Features After Deployment
✅ Lounge search by credit card  
✅ Lounge search by city  
✅ Lounge search by network  
✅ Real-time data from Supabase  
✅ Responsive design  
✅ Beautiful UI with animations  

Your app will be fully functional and accessible to anyone with the URL! 