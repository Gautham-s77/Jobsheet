# 🚀 Complete Setup Guide - Job Tracker & Referral Assistant

This guide will walk you through setting up the entire application from scratch.

## Step 1: Prerequisites ✅

Before starting, make sure you have:

### 1.1 Install Node.js
- Download from https://nodejs.org/ (LTS version recommended)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 1.2 Create MongoDB Database
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new organization (or use default)
4. Create a new project (e.g., "job-tracker")
5. Create a cluster:
   - Choose **M0 Free** tier
   - Select your preferred region
   - Click "Create Cluster"
6. Wait 5-10 minutes for cluster to be ready

## Step 2: Get MongoDB Connection String 🔗

1. In MongoDB Atlas, go to **Clusters** → Click your cluster
2. Click **"Connect"** button
3. Choose **"Drivers"** tab
4. Select **"Node.js"** and version **4.x**
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

**Note:** Save this for later (Step 3.2)

## Step 3: Backend Setup 🔧

### 3.1 Navigate to Server Directory

```bash
cd server
```

### 3.2 Create .env File

Create a file named `.env` in the `server/` folder:

```
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority
NODE_ENV=development
```

**⚠️ IMPORTANT:**
- Replace `YOUR_USERNAME` with your MongoDB username
- Replace `YOUR_PASSWORD` with your MongoDB password
- Replace `cluster` with your actual cluster name (from the copied connection string)

### 3.3 Install Backend Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- mongoose (database)
- dotenv (environment variables)
- cors (cross-origin requests)

### 3.4 Test Backend (Optional)

```bash
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

Press `Ctrl+C` to stop the server.

## Step 4: Frontend Setup 🎨

### 4.1 Navigate to Client Directory

From root directory:
```bash
cd client
```

### 4.2 Create .env File

Create a file named `.env` in the `client/` folder:

```
VITE_API_URL=http://localhost:5000/api
```

### 4.3 Install Frontend Dependencies

```bash
npm install
```

This will install:
- react (UI library)
- axios (HTTP requests)
- tailwindcss (styling)
- vite (build tool)

## Step 5: Run the Application 🎯

### Option A: Run Both Servers Separately (Easier for Debugging)

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

You should see: `VITE v... ready in ... ms` and a link like `http://localhost:5173`

### Option B: Run Both Servers Together

From root directory (requires `concurrently` to be installed):

```bash
npm run dev
```

Both servers will start automatically.

## Step 6: First Use 📝

### 6.1 Open the Application

Open your browser and go to: **http://localhost:5173**

You should see the Job Tracker app with:
- Navigation bar with "Dashboard" and "Profile" buttons
- "Dashboard" page showing "Add New Job" button

### 6.2 Set Up Your Profile First

1. Click **"Profile"** in the navigation bar
2. Enter your details:
   - **Name:** Your full name
   - **Email:** Your email address
   - **Phone:** Your phone number
3. Click **"💾 Save Profile"**

You should see: ✅ Profile updated successfully!

**Why?** This information is needed for referral messages.

### 6.3 Add Your First Job

1. Click **"Dashboard"**
2. Click **"➕ Add New Job"**
3. Fill in the form:
   - **Company Name:** Google
   - **Role:** Software Engineer
   - **Job Link:** https://careers.google.com/jobs/results/...
   - **Source:** LinkedIn
   - **Status:** Saved
   - **Notes:** Great opportunity
4. Click **"Add Job"**

You should see the job appear in the table!

### 6.4 Generate a Referral Message

1. In your newly created job row, click **"💬 Message"** button
2. Enter a contact name (e.g., "John Smith")
3. Click **"Generate Message"**
4. See the personalized message
5. Click **"📋 Copy to Clipboard"**

The message is now copied to your clipboard!

## Step 7: Troubleshooting 🔧

### Problem: "Cannot connect to MongoDB"

**Solution:**
1. Check your MongoDB URI in `.env`
2. Make sure you've replaced `<username>` and `<password>`
3. Check that your IP is whitelisted in MongoDB Atlas:
   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - Click "Confirm"

### Problem: Frontend doesn't load

**Solution:**
1. Make sure both servers are running
2. Check if port 5173 is in use:
   ```bash
   lsof -i :5173
   ```
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try a different browser

### Problem: "Error: connect ECONNREFUSED 127.0.0.1:5000"

**Solution:**
1. Backend server might not be running
2. Start backend with: `cd server && npm start`
3. Check if port 5000 is available

### Problem: Can't generate messages

**Solution:**
1. Make sure you've saved your profile first
2. Make sure job has all required fields
3. Check browser console (F12) for error messages

## Step 8: MongoDB Atlas Tips 💡

### Add More Data Safely

1. In MongoDB Atlas → "Collections"
2. You can see all your jobs and profiles
3. Understand the data structure

### Backup Your Data

MongoDB Atlas automatically backs up your data, but you can also:
1. Export data as JSON
2. Keep important records separately

### Monitor Database

1. Click "Metrics" tab to see usage
2. Free tier includes up to 512MB storage
3. You can add more if needed (paid plans start at $9/month)

## Step 9: Development Tips 💻

### Use Chrome DevTools

1. Press F12 in your browser
2. **Console tab:** See errors and logs
3. **Network tab:** See API calls being made
4. **Application tab:** See stored data

### Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Cannot read property '_id'` | Job not found | Refresh page |
| `Cannot POST /api/jobs` | Backend not running | Start backend server |
| `Failed to fetch` | CORS error | Check `VITE_API_URL` |
| `Validation error: email` | Invalid email format | Use proper email |

### Useful Browser Tools

- **React DevTools:** Chrome extension to inspect React components
- **Redux DevTools:** Debug state (if using Redux)
- **Postman:** Test API endpoints outside frontend

## Step 10: Next Steps 🎓

After setup is working:

1. **Customize the UI**
   - Modify colors in `client/tailwind.config.js`
   - Change fonts in `client/src/index.css`

2. **Add Features**
   - Interview preparation tracker
   - Job statistics dashboard
   - Email notifications

3. **Deploy**
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify

4. **Security**
   - Add authentication (JWT)
   - Validate all inputs
   - Use HTTPS in production

## Helpful Links 🔗

- **MongoDB Documentation:** https://docs.mongodb.com/manual/
- **Express.js Guide:** https://expressjs.com/
- **React Documentation:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite Documentation:** https://vitejs.dev/

## Getting Help 🆘

If you get stuck:

1. **Check the README.md** - Main documentation
2. **Look at code comments** - Most code has explanations
3. **Check browser console** - Error messages provide clues
4. **Review MongoDB Atlas** - Make sure database is connected
5. **Restart servers** - Sometimes a fresh start helps

## Congratulations! 🎉

You've successfully set up a full-stack MERN application!

### What You've Built:
✅ Backend with Express and MongoDB
✅ Frontend with React and Tailwind
✅ Job tracking system
✅ Referral message generator
✅ User profile management

### What's Next:
- Use the app to track your job search
- Generate referral messages for your network
- Monitor your progress through the dashboard
- Customize it further if needed

---

**Happy Job Hunting! 🚀**

Feel free to reach out if you need help with any part of the setup.
