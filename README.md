# Blogify - Blog App

A modern, full-stack blog application with an admin dashboard, AI-powered content generation, and comment moderation. Built with React, Node.js, Express, and MongoDB.
[live link of website](https://blog-website-frontend-sigma.vercel.app/)

## ✨ Features

- **User-Friendly Blog Platform:** Browse, search, and filter blogs by category.
- **Rich Text Editor:** Create and edit blogs with a Quill editor.
- **AI Content Generation:** Generate blog drafts using Google Gemini AI.
- **Admin Dashboard:** Manage blogs, comments, and analytics.
- **Comment Moderation:** Approve or reject user comments.
- **Image Uploads:** Optimized image storage with ImageKit.
- **JWT Authentication:** Secure admin login and protected routes.
- **Responsive Design:** Mobile-first UI with Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Quill.js
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer
- **AI Integration:** Google Gemini API
- **Image Storage:** ImageKit

## 📦 API Endpoints

### Blog Routes (/api/blog)

- **GET /all** - Get all published blogs
- **POST /add** - Add new blog (requires auth)
- **GET /:blogId** - Get specific blog
- **POST /delete** - Delete blog (requires auth)
- **POST /toggle-publish** - Toggle blog publish status (requires auth)
- **POST /add-comment** - Add comment to blog
- **POST /comments** - Get blog comments
- **POST /generate** - Generate AI content (requires auth)

### Admin Routes (/api/admin)

- **POST /login** - Admin authentication
- **GET /blogs** - Get all blogs for admin (requires auth)
- **GET /comments** - Get all comments (requires auth)
- **GET /dashboard** - Get dashboard statistics (requires auth)
- **POST /delete-comment** - Delete comment (requires auth)
- **POST /approve-comment** - Approve comment (requires auth)

## 🚀 Deployment

The application is configured for deployment on Vercel with the included vercel.json configuration files for both client and server.

## 📫 Contact

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/vatshal-negi-916a0a229/)
