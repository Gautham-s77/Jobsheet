# 🚀 Deployment Guide

This guide covers deploying your Job Tracker application to production.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] `.env` files created with production values
- [ ] No sensitive data in code
- [ ] Dependencies installed and working
- [ ] Code is clean and commented
- [ ] Error handling is in place

## Option 1: Deploy Backend to Heroku ✅

### 1.1 Prerequisites
- Heroku account (https://www.heroku.com/)
- Heroku CLI installed
- GitHub repository (optional but recommended)

### 1.2 Create Heroku App

```bash
cd server

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Check it was created
heroku apps
```

### 1.3 Set Environment Variables

```bash
# Set production MongoDB URI
heroku config:set MONGODB_URI="your_production_mongodb_uri"

# Set port
heroku config:set PORT=5000

# Set Node environment
heroku config:set NODE_ENV=production

# View all config
heroku config
```

### 1.4 Deploy Code

```bash
# Option A: Using Git
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Option B: Direct deployment
heroku deploy:git

# Check logs
heroku logs --tail
```

### 1.5 Test Backend

```bash
# Your backend is now at:
# https://your-app-name.herokuapp.com

# Test health endpoint
curl https://your-app-name.herokuapp.com/health
```

---

## Option 2: Deploy Frontend to Vercel ✅

### 2.1 Prerequisites
- Vercel account (https://vercel.com/)
- GitHub repository with your code

### 2.2 Connect Repository

1. Go to https://vercel.com/
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repo
5. Click "Import"

### 2.3 Set Environment Variables

In Vercel Project Settings:

1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   Name: VITE_API_URL
   Value: https://your-backend.herokuapp.com/api
   ```
3. Save

### 2.4 Deploy

Vercel automatically deploys on push to main branch.

Your frontend is now at: `https://your-project.vercel.app`

---

## Option 3: Deploy Backend to Railway 🚂

### 3.1 Connect GitHub

1. Go to https://railway.app/
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Authorize and select your repo

### 3.2 Configure Environment

1. Add "Raw Editor" in Railway
2. Paste your production `.env` content
3. Add MongoDB service or use MongoDB Atlas

### 3.3 Deploy

Railway auto-deploys on git push.

---

## Option 4: Deploy Frontend to Netlify 🌐

### 4.1 Connect Repository

1. Go to https://netlify.com/
2. Click "New site from Git"
3. Select GitHub
4. Choose your repository

### 4.2 Configure Build

Set build settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### 4.3 Set Environment Variables

In Site Settings → Build & Deploy:

```
VITE_API_URL = https://your-backend-url/api
```

### 4.4 Deploy

Netlify auto-deploys on git push.

---

## Option 5: Docker Deployment 🐳

### 5.1 Create Backend Dockerfile

In `server/` create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### 5.2 Create Frontend Dockerfile

In `client/` create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 5.3 Create docker-compose.yml

In root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: ${MONGODB_URI}
      NODE_ENV: production
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    environment:
      VITE_API_URL: http://localhost:5000/api

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 5.4 Run with Docker

```bash
docker-compose up -d
```

---

## Production Checklist

- [ ] Backend deployed and working
- [ ] Frontend deployed and working
- [ ] API calls working between frontend and backend
- [ ] Database connected
- [ ] Environment variables set
- [ ] HTTPS enabled (automatic on Vercel/Netlify)
- [ ] CORS configured for production domain
- [ ] Error logging enabled
- [ ] Monitoring set up
- [ ] Backups configured

---

## Environment Variables for Production

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url/api
```

---

## Post-Deployment Testing

1. **Test Health Endpoint**
   ```bash
   curl https://your-backend.herokuapp.com/health
   ```

2. **Test Frontend**
   - Open https://your-frontend-url.com
   - Test all features
   - Check browser console for errors

3. **Test API Integration**
   - Add a job from frontend
   - Check if it appears in database
   - Generate a message
   - Verify everything works

---

## Monitoring & Logging

### Heroku Logs
```bash
heroku logs --tail
```

### Vercel Logs
- In dashboard → "Deployments" → View logs

### Railway Logs
- In dashboard → "Deployments" → View logs

---

## Common Issues & Solutions

### Issue: 404 on Frontend
**Solution:** Check that API endpoint is correct in environment variables

### Issue: CORS Error
**Solution:** Update `CLIENT_URL` in backend .env

### Issue: MongoDB Connection Error
**Solution:** Check MongoDB URI, whitelist IP in Atlas

### Issue: Build Fails on Vercel
**Solution:** Check build command, install all dependencies

### Issue: Backend Times Out
**Solution:** Check database connection, add timeout handling

---

## Database Backup

### MongoDB Atlas Backups
1. Go to "Backup" in cluster
2. Enable "Continuous Backup"
3. Create snapshots manually if needed

### Export Data
```bash
# Export jobs collection
mongoexport --uri "mongodb+srv://user:pass@cluster.mongodb.net/db" \
  --collection jobs \
  --out jobs.json
```

---

## Scaling for Production

### Optimize Backend
- Add caching (Redis)
- Implement rate limiting
- Add request logging
- Monitor performance

### Optimize Frontend
- Code splitting
- Image optimization
- Lazy loading
- Caching strategies

### Database
- Create indexes on frequently queried fields
- Archive old data
- Monitor database size
- Scale cluster if needed

---

## Security for Production

1. **Enable HTTPS** - Automatically on Vercel/Netlify
2. **Use Environment Variables** - Never commit secrets
3. **CORS Configuration** - Only allow trusted origins
4. **Rate Limiting** - Prevent abuse
5. **Input Validation** - On both frontend and backend
6. **Authentication** - Add JWT tokens (optional)
7. **Logging** - Monitor unusual activity

---

## Domain Setup

### Connect Custom Domain to Vercel
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records per instructions

### Connect Custom Domain to Heroku
1. Add domain to Heroku app
2. Update DNS records
3. Configure SSL

---

## Performance Optimization

### Frontend
- Minimize bundle size
- Lazy load components
- Optimize images
- Use production build

### Backend
- Index database queries
- Implement caching
- Optimize algorithms
- Monitor response times

---

## Rollback Plan

If something goes wrong:

**Heroku:**
```bash
heroku rollbacks:history
heroku rollback
```

**Vercel:**
- Go to Deployments
- Click previous deployment
- Promote it to Production

**GitHub:**
```bash
git revert <commit-hash>
git push
```

---

## Useful Deployment Links

- **Heroku:** https://www.heroku.com/
- **Vercel:** https://vercel.com/
- **Netlify:** https://netlify.com/
- **Railway:** https://railway.app/
- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Docker:** https://www.docker.com/

---

## Support & Resources

- Check deployment platform documentation
- Monitor logs for errors
- Test thoroughly before production
- Keep backups of important data
- Have a rollback plan

---

**Ready to go live? 🚀**

Choose your deployment platform and follow the steps above. Good luck!
