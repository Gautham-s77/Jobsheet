# 🎯 Quick Reference Guide

## 📁 File Structure Summary

```
job-tracker-app/
│
├── 📄 README.md ......................... Main documentation
├── 📄 SETUP_GUIDE.md .................... Step-by-step setup
├── 📄 QUICK_REFERENCE.md ............... This file
├── 📄 package.json ...................... Root scripts
├── 📄 .gitignore ....................... Files to ignore in Git
│
├── 📁 server/
│   ├── 📄 package.json ................. Backend dependencies
│   ├── 📄 .env.example ................. Environment template
│   ├── 📄 .env ......................... Your actual env (NEVER COMMIT)
│   └── 📁 src/
│       ├── 📄 app.js ................... Main Express server
│       ├── 📁 controllers/ ............ Request handlers
│       │   ├── jobController.js ...... Job CRUD logic
│       │   ├── profileController.js . Profile logic
│       │   └── messageController.js . Message generation
│       ├── 📁 routes/ ................. API endpoints
│       │   ├── jobRoutes.js .......... /api/jobs routes
│       │   ├── profileRoutes.js ..... /api/profile routes
│       │   └── messageRoutes.js ..... /api/message routes
│       ├── 📁 models/ ................. Database schemas
│       │   ├── Job.js ................ Job schema
│       │   └── Profile.js ............ Profile schema
│       ├── 📁 services/ ............... Business logic
│       │   └── messageService.js .... Message template logic
│       └── 📁 utils/ .................. Helpers
│           └── db.js ................. MongoDB connection
│
├── 📁 client/
│   ├── 📄 package.json ................. Frontend dependencies
│   ├── 📄 vite.config.js .............. Vite configuration
│   ├── 📄 tailwind.config.js .......... Tailwind configuration
│   ├── 📄 postcss.config.js ........... PostCSS configuration
│   ├── 📄 .env.example ................ Environment template
│   ├── 📄 .env ........................ Your actual env
│   ├── 📄 index.html .................. HTML entry point
│   └── 📁 src/
│       ├── 📄 main.jsx ................ React entry point
│       ├── 📄 App.jsx ................. Root React component
│       ├── 📄 index.css ............... Global styles
│       ├── 📁 components/ ............ Reusable components
│       │   ├── Navbar.jsx ........... Navigation bar
│       │   ├── JobForm.jsx ......... Job form for add/edit
│       │   ├── JobTable.jsx ........ Jobs list table
│       │   └── MessageModal.jsx .... Message popup
│       ├── 📁 pages/ ................. Full pages
│       │   ├── Dashboard.jsx ....... Jobs dashboard
│       │   └── Profile.jsx ......... Profile management
│       ├── 📁 services/ .............. API calls
│       │   ├── jobService.js ...... Job API functions
│       │   ├── profileService.js .. Profile API functions
│       │   └── messageService.js .. Message API functions
│       └── 📁 hooks/ ................. Custom React hooks
│           ├── useJobs.js ......... Jobs hook
│           └── useProfile.js ...... Profile hook
│
└── 📁 public/ ......................... Static assets (if any)
```

## 🔑 Key Files to Know

| File | Purpose | Modify When |
|------|---------|-------------|
| `server/.env` | Backend config | Changing MongoDB, port |
| `client/.env` | Frontend config | Changing API URL |
| `server/src/app.js` | Express setup | Adding new middleware |
| `client/src/App.jsx` | App routes | Adding new pages |
| `server/src/services/messageService.js` | Message template | Changing message format |
| `server/src/models/Job.js` | Job data structure | Adding job fields |

## 🚀 Quick Commands

### Start Everything
```bash
# From root directory
npm run dev
```

### Start Backend Only
```bash
cd server
npm start                 # Regular mode
npm run dev              # Development mode with auto-reload
```

### Start Frontend Only
```bash
cd client
npm run dev              # Development
npm run build            # Production build
npm run preview          # Preview build
```

### Install Dependencies
```bash
# All at once
npm run install-all

# Individual
cd server && npm install
cd client && npm install
```

## 📡 API Endpoints Cheat Sheet

### Jobs
```
GET    /api/jobs              → Get all jobs
POST   /api/jobs              → Create new job
PUT    /api/jobs/:id          → Update job
DELETE /api/jobs/:id          → Delete job
```

**Create/Update Body:**
```json
{
  "companyName": "Google",
  "role": "Engineer",
  "jobLink": "https://careers.google.com/...",
  "source": "LinkedIn",
  "status": "Applied",
  "notes": "Optional notes"
}
```

### Profile
```
GET    /api/profile           → Get user profile
PUT    /api/profile           → Update profile
```

**Update Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123"
}
```

### Messages
```
POST   /api/message/generate  → Generate message
```

**Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439011",
  "contactName": "Jane Smith"
}
```

**Response:**
```json
{
  "message": "Hi Jane Smith,\n\nI found a role at Google..."
}
```

## 🛠️ Troubleshooting Checklist

### Backend Won't Start
- [ ] Check `.env` file exists and has `MONGODB_URI`
- [ ] MongoDB URI has correct username/password
- [ ] Port 5000 is not in use
- [ ] MongoDB cluster is active in Atlas
- [ ] IP whitelist includes your IP

### Frontend Won't Load
- [ ] Backend is running (`http://localhost:5000/health`)
- [ ] `.env` file has `VITE_API_URL=http://localhost:5000/api`
- [ ] Port 5173 is not in use
- [ ] Browser cache is cleared

### Can't Generate Messages
- [ ] Profile is saved (go to Profile page)
- [ ] Job ID is valid
- [ ] Contact name is not empty
- [ ] Backend is responding to API calls

### Jobs Not Showing
- [ ] Backend is running
- [ ] MongoDB is connected
- [ ] Check browser console for errors
- [ ] Try refreshing the page

## 💾 Database Fields

### Job Document
```javascript
{
  _id: ObjectId,
  companyName: String,
  role: String,
  jobLink: String,
  source: "LinkedIn" | "Naukri" | "Indeed" | "Other",
  status: "Saved" | "Applied" | "Referral Requested" | "Interview" | "Rejected",
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Profile Document
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Tailwind Classes Used

| Class | What It Does |
|-------|-------------|
| `btn` | Button base styles |
| `btn-primary` | Blue button |
| `btn-secondary` | Gray button |
| `btn-danger` | Red button |
| `input-field` | Styled input |
| `card` | Bordered container |
| `table-row` | Table row with hover |

## 📝 Common Code Patterns

### Adding a New API Endpoint

1. **Create Controller** in `server/src/controllers/`
```javascript
export const myHandler = async (req, res) => {
  try {
    // Your logic
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
```

2. **Create Route** in `server/src/routes/`
```javascript
import express from "express";
import { myHandler } from "../controllers/myController.js";

const router = express.Router();
router.post("/my-endpoint", myHandler);
export default router;
```

3. **Add to app.js**
```javascript
import myRoutes from "./routes/myRoutes.js";
app.use("/api/my", myRoutes);
```

### Adding a New React Component

1. **Create Component** in `src/components/`
```javascript
const MyComponent = ({ prop }) => {
  return <div>{prop}</div>;
};
export default MyComponent;
```

2. **Use in Page**
```javascript
import MyComponent from "../components/MyComponent.jsx";

const Dashboard = () => {
  return <MyComponent prop="value" />;
};
```

## 🔐 Security Checklist

- [ ] Never commit `.env` file
- [ ] Don't share MongoDB URI
- [ ] Use HTTPS in production
- [ ] Validate all form inputs
- [ ] Use environment variables for secrets
- [ ] Add rate limiting in production

## 📚 Documentation Files

| File | Contains |
|------|----------|
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Step-by-step setup |
| `QUICK_REFERENCE.md` | This file |
| Code comments | Inline explanations |

## 🎯 Common Tasks

### Add a New Job Field
1. Update `server/src/models/Job.js` (add field to schema)
2. Update `client/src/components/JobForm.jsx` (add input)
3. Restart servers
4. Test creating a job

### Change Message Template
1. Edit `server/src/services/messageService.js`
2. Modify the template string
3. Restart backend
4. Test generating message

### Change Color Scheme
1. Edit `client/tailwind.config.js`
2. Modify colors in `theme.extend.colors`
3. Or edit CSS in `client/src/index.css`
4. Restart frontend

### Add New Page
1. Create file in `client/src/pages/`
2. Export component
3. Import in `client/src/App.jsx`
4. Add navigation in `Navbar.jsx`

## 🚀 Performance Tips

- Load jobs only when needed
- Cache profile data in state
- Minimize re-renders with React hooks
- Use debouncing for search (if added)
- Lazy load images if added

## 🆘 Getting Unstuck

1. **Check Code Comments** - Most code has explanations
2. **Read Error Messages** - They tell you what's wrong
3. **Check Browser Console** - F12 → Console tab
4. **Check Server Logs** - Terminal where you started it
5. **Check Network Tab** - See API requests
6. **Restart Everything** - Kill servers, start fresh
7. **Google the Error** - Likely someone had it before

## ✅ First-Time Checklist

- [ ] Node.js installed
- [ ] MongoDB cluster created
- [ ] Both `.env` files created
- [ ] Dependencies installed (`npm run install-all`)
- [ ] Backend starts without errors
- [ ] Frontend loads in browser
- [ ] Can add jobs
- [ ] Can generate messages
- [ ] Can update profile

## 🎓 Learning Resources

- **Node.js:** https://nodejs.org/docs/
- **Express:** https://expressjs.com/
- **MongoDB:** https://docs.mongodb.com/
- **React:** https://react.dev/learn
- **Tailwind:** https://tailwindcss.com/docs

---

**Need Help?** Check the README.md or SETUP_GUIDE.md for more details!
