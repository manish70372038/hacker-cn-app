# 📰 HackerNews MERN App

A full-stack MERN application that scrapes the **top 10 stories** from [Hacker News](https://news.ycombinator.com), stores them in MongoDB, and serves them via a REST API with JWT authentication and bookmark functionality.

---

## 🚀 Live Demo

> Coming soon / [Add your deployed URL here]

---

## ✨ Features

- 🔍 **Web Scraper** — Automatically scrapes top 10 HN stories on server start, refreshes every 15 minutes
- 🔐 **JWT Authentication** — Register & login with secure token-based auth
- 📖 **Story Feed** — View all stories sorted by points (descending)
- 🔖 **Bookmarks** — Toggle bookmarks on stories (auth required)
- 📄 **Pagination** — `GET /api/stories?page=1&limit=10`
- ⚛️ **React Frontend** — Clean UI with Context API for auth state management

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Scraping | Axios, Cheerio |

---

## 📁 Folder Structure

```
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── storyController.js
│   │   └── scraperController.js
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── models/
│   │   ├── User.js
│   │   └── Story.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── storyRoutes.js
│   │   └── scraperRoutes.js
│   ├── scraper/
│   │   └── scraper.js           # Cheerio scraper logic
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Stories.jsx
    │   │   └── Bookmarks.jsx
    │   ├── components/
    │   │   └── StoryCard.jsx
    │   └── App.jsx
    └── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🏃 How to Run Locally

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hackernews-mern.git
cd hackernews-mern
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create `.env` file as shown above, then:

```bash
npm run dev
```

The server starts at `http://localhost:5000`.  
On startup, the scraper **automatically fetches the top 10 HN stories** and saves them to MongoDB.

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## 📡 API Reference

### Auth

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login & get JWT token | ❌ |

**Register Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Login Body:**
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

---

### Scraper

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/scrap` | Manually trigger scrape | ❌ |

---

### Stories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/stories` | Get all stories (sorted by points) | ❌ |
| GET | `/api/stories?page=1&limit=10` | Paginated stories | ❌ |
| GET | `/api/stories/:id` | Get single story | ❌ |
| POST | `/api/stories/:id/bookmark` | Toggle bookmark | ✅ |

**Authorization Header (for protected routes):**
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔖 How Bookmarking Works

1. Login to get your JWT token
2. Send a `POST` request to `/api/stories/:id/bookmark` with the token
3. First call → bookmarks the story
4. Second call → removes the bookmark (toggle)
5. View all bookmarked stories on the `/bookmarks` page (login required)

---

## 🕐 Auto Scrape Schedule

The scraper runs automatically:

- ✅ **On every server start** — fresh data immediately
- ✅ **Every 15 minutes** — keeps stories updated

No manual intervention needed.

---

## 🧪 Testing the APIs

You can test all endpoints using [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/).

1. Register a user → `POST /api/auth/register`
2. Login → `POST /api/auth/login` → copy the `token`
3. Fetch stories → `GET /api/stories`
4. Bookmark a story → `POST /api/stories/:id/bookmark` with `Authorization: Bearer <token>`
5. Trigger manual scrape → `POST /api/scrap`

---

## 📌 Notes

- Stories are always **limited to the top 10** from Hacker News
- Stories are sorted by **points in descending order**
- Scraper uses `deleteMany` + `insertMany` to ensure fresh data on every run

---

## 👨‍💻 Author

**Manish**  
Full Stack Developer (MERN)  
[GitHub](https://github.com/manish70372038) · [LinkedIn](https://www.linkedin.com/in/manish-kumar-258073337/)