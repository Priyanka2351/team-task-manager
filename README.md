# Team Task Manager

A beginner-friendly full-stack task management app built with Node.js, Express, MongoDB, and vanilla HTML/CSS/JS.

---

## 📁 Folder Structure

```
team-task-manager/
├── models/
│   └── Task.js          ← Mongoose schema & model
├── routes/
│   └── tasks.js         ← Express API routes
├── public/
│   ├── index.html       ← Frontend page
│   ├── css/
│   │   └── style.css    ← Styles
│   └── js/
│       └── app.js       ← Frontend JavaScript
├── .env                 ← Environment variables (do not commit)
├── .env.example         ← Template for .env
├── .gitignore
├── package.json
└── server.js            ← Main entry point
```

---

## ⚙️ Setup Instructions

### Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (LTS version recommended).

---

### Step 2 — Set up MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas and sign up for a free account.
2. Create a **free cluster** (choose any cloud provider & region).
3. Click **"Database Access"** → Add a new database user with a username and password.
4. Click **"Network Access"** → Add IP Address → choose **"Allow access from anywhere"** (0.0.0.0/0).
5. Click **"Clusters"** → click **"Connect"** → choose **"Connect your application"**.
6. Copy the connection string. It will look like:
   ```
   mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/
   ```

---

### Step 3 — Configure Environment Variables

1. Open the `.env` file in the project root.
2. Replace the placeholder with your actual MongoDB connection string:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```
   > Replace `yourUsername` and `yourPassword` with your actual MongoDB Atlas credentials.

---

### Step 4 — Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

---

### Step 5 — Run the App

```bash
npm start
```

You should see:
```
✅ Connected to MongoDB Atlas
🚀 Server running at http://localhost:3000
```

Then open your browser and go to: **http://localhost:3000**

---

### (Optional) Development Mode with Auto-Restart

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you save changes.

---

## 🔌 API Reference

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Get all tasks            |
| POST   | /api/tasks       | Create a new task        |
| PUT    | /api/tasks/:id   | Toggle task status       |

### Example POST body
```json
{ "title": "Design the login page" }
```

---

## 🧠 Tech Stack

| Layer     | Technology           |
|-----------|----------------------|
| Runtime   | Node.js              |
| Framework | Express.js           |
| Database  | MongoDB Atlas        |
| ODM       | Mongoose             |
| Frontend  | HTML, CSS, Vanilla JS|
| Config    | dotenv               |
