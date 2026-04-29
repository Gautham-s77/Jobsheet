# 📋 Job Tracker & Referral Assistant

A full-stack MERN application to help you track job applications and generate professional referral request messages.

## 🎯 Features

- ✅ **Job Management** - Add, edit, delete, and track job applications
- ✅ **Multiple Status Tracking** - Track jobs across different stages (Saved, Applied, Referral Requested, Interview, Rejected)
- ✅ **Referral Message Generator** - Generate personalized referral request messages using a fixed template
- ✅ **User Profile** - Store your contact information for message generation
- ✅ **Copy to Clipboard** - Easily copy generated messages
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Clean UI** - Built with Tailwind CSS for a modern look

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** account - [Create free cluster at MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone/Download the Project

```bash
cd job-tracker-app
```

### 2. Install Dependencies

```bash
# Install root dependencies (for running both servers concurrently)
npm run install-all
```

This command will:
- Install dependencies in root folder
- Install backend dependencies in `server/` folder
- Install frontend dependencies in `client/` folder

### 3. Environment Setup

#### Backend Configuration

Create a `.env` file in the `server/` directory:

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your MongoDB connection string:

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-tracker?retryWrites=true&w=majority
NODE_ENV=development
```

**How to get MongoDB URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Drivers"
4. Copy the connection string
5. Replace `<password>` and `<username>` with your credentials

#### Frontend Configuration

Create a `.env` file in the `client/` directory:

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Application

From the root directory:

```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

Open your browser and navigate to `http://localhost:5173`

## 📖 How to Use

### 1. Set Up Your Profile

1. Click on **"Profile"** in the navbar
2. Enter your:
   - Full Name
   - Email
   - Phone Number
3. Click **"Save Profile"**

> ℹ️ This information will be used in all generated referral messages

### 2. Add a Job

1. Click on **"Dashboard"**
2. Click **"➕ Add New Job"**
3. Fill in the job details:
   - **Company Name** - Name of the company
   - **Role** - Job title/position
   - **Job Link** - Link to the job posting
   - **Source** - Where you found it (LinkedIn, Naukri, Indeed, Other)
   - **Status** - Current stage of your application
   - **Notes** - Any additional notes (optional)
4. Click **"Add Job"**

### 3. Generate a Referral Message

1. In the Dashboard, find the job you want to request a referral for
2. Click **"💬 Message"** button
3. Enter the **contact person's name** (the person at the company)
4. Click **"Generate Message"**
5. Review the message
6. Click **"📋 Copy to Clipboard"** to copy the message
7. Paste it in your email or messaging app

### 4. Track Your Progress

- Update job status as you progress through the application process
- Click **"Edit"** to modify job details
- Click **"Delete"** to remove a job from your list

## 📁 Project Structure

```
job-tracker-app/
├── server/                      # Backend
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API routes
│   │   ├── models/              # Database schemas
│   │   ├── services/            # Business logic
│   │   ├── utils/               # Helper functions
│   │   └── app.js               # Express server
│   ├── package.json
│   └── .env.example
│
├── client/                      # Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API services
│   │   ├── hooks/               # Custom hooks
│   │   ├── App.jsx              # Main component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── public/
│   ├── package.json
│   └── .env.example
│
├── package.json                 # Root package.json
└── .gitignore
```

## 🔌 API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create a new job
- `PUT /api/jobs/:id` - Update a job
- `DELETE /api/jobs/:id` - Delete a job

### Profile

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Messages

- `POST /api/message/generate` - Generate referral message
  - Body: `{ jobId, contactName }`
  - Returns: `{ message: "generated message string" }`

## 🔒 Security Notes

- The `.env` file contains sensitive information - **Never commit it to Git**
- Always use environment variables for credentials
- The `.gitignore` file is already configured to exclude sensitive files

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:5000/health

# Get all jobs
curl http://localhost:5000/api/jobs

# Get profile
curl http://localhost:5000/api/profile
```

### Test Frontend

1. Open http://localhost:5173 in your browser
2. Check browser console (F12 → Console) for any errors
3. Network tab shows API calls being made

## 📱 Features Explained

### Message Template

The referral message uses a **fixed template**:

```
Hi [Contact Name],

I found a role at [Company Name] that fits my profile and was wondering if you could help with a referral 🙂

Name: [Your Name]

Email: [Your Email]

Phone: [Your Phone]

Job Link: [Job Link]

I've attached my resume here. Happy to share anything else if needed.

Thanks a lot!
```

All placeholders are **automatically filled** from your profile and job details.

### Status Tracking

Track jobs through these stages:
- **Saved** - Job found and saved for later
- **Applied** - Application submitted
- **Referral Requested** - Requested a referral from someone
- **Interview** - Got an interview
- **Rejected** - Application rejected

## 🐛 Troubleshooting

### MongoDB Connection Error

- ❌ `Failed to connect to MongoDB`
- ✅ Check your MongoDB URI in `.env`
- ✅ Verify your IP is whitelisted in MongoDB Atlas
- ✅ Check username and password are correct

### Frontend Not Loading

- ❌ `Cannot GET /`
- ✅ Make sure frontend server is running on port 5173
- ✅ Check if `npm run dev` is still running
- ✅ Clear browser cache (Ctrl+Shift+Delete)

### API Not Responding

- ❌ `Failed to fetch from API`
- ✅ Check if backend is running on port 5000
- ✅ Verify `VITE_API_URL` in frontend `.env`
- ✅ Check browser console for CORS errors

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## 📚 Code Quality

The code follows these principles:
- ✅ **Clean Code** - Readable variable names and structure
- ✅ **Comments** - Clear explanations for beginners
- ✅ **Error Handling** - Try-catch blocks and proper error messages
- ✅ **Async/Await** - Modern JavaScript patterns
- ✅ **Separation of Concerns** - Controllers, services, routes separated

## 🚢 Deployment

### Deploy Backend (Heroku Example)

1. Create a Heroku account
2. Install Heroku CLI
3. Push code to Heroku
4. Set environment variables

### Deploy Frontend (Vercel Example)

1. Create a Vercel account
2. Connect your GitHub repository
3. Set `VITE_API_URL` to your backend URL
4. Deploy

## 📝 Future Enhancements

- 🔐 JWT Authentication
- 🌙 Dark Mode
- 📊 Job Statistics Dashboard
- 🔔 Email Notifications
- 🎯 Interview Preparation Guide
- 📅 Calendar Integration
- 💾 Export to CSV/PDF

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips & Tricks

1. **Keyboard Shortcuts** - Use Tab to navigate forms quickly
2. **Copy Messages** - Generated messages are ready to paste
3. **Edit Jobs** - Keep notes updated as you progress
4. **Profile Update** - Update your phone/email if it changes

## ❓ FAQ

**Q: Can I use this without MongoDB Atlas?**
A: Yes, you can use a local MongoDB instance. Just change the `MONGODB_URI`.

**Q: Is my data secure?**
A: Data is stored in MongoDB. Keep your connection string private.

**Q: Can I customize the message template?**
A: Currently, the template is fixed. You can modify it in `server/src/services/messageService.js`.

**Q: What if I forget my profile?**
A: Messages won't generate without a profile. Go to Profile page and set it up.

## 🤝 Contributing

Found a bug? Want to improve something? Feel free to:
1. Report issues
2. Suggest features
3. Submit pull requests

## 📞 Support

For issues or questions:
- Check the Troubleshooting section
- Review the code comments
- Check MongoDB documentation
- Review Vite documentation

---

**Happy Job Hunting! 🎉**

Made with ❤️ for job seekers everywhere.
