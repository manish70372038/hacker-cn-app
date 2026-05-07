# Hacker News Scraper & Bookmark Manager

A professional mini full-stack web application built using the **MERN stack**. This project scrapes top stories from Hacker News, allows users to register/login, and manage their personal bookmarks with a premium dark-themed experience.

## 🚀 Key Features

- **Automated Web Scraper:** Automatically fetches the top 10 stories from Hacker News on server startup using `Cheerio`.
- **Manual Scrape API:** A dedicated `POST /api/scrape` endpoint to refresh the news database on demand.
- **JWT Authentication:** Secure user registration and login system with persistent sessions using LocalStorage.
- **Dynamic Bookmarking:** Interactive toggle system that updates the UI instantly (Bookmark/Saved) without page reloads.
- **Protected Bookmarks Page:** A clean, private space for users to manage their saved stories.
- **Modern Dark UI:** Fully responsive, glass-morphism inspired dark theme with clickable external links to original articles.
- **State Management:** Uses React Context API to handle authentication and bookmark states globally.

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS3 (Custom Dark Theme), Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Scraping:** Cheerio & Axios
- **Security:** JSON Web Tokens (JWT) & BcryptJS

## 📁 Scalable Folder Structure

- `models/`: Database schemas for Users and Stories.
- `routes/`: API endpoint definitions.
- `controllers/`: Core logic for scraping, authentication, and bookmarking.
- `middleware/`: JWT verification for protected routes.
- `context/`: React Context for global auth state.

## ⚙️ How to Run Locally

### 1. Clone the Project
```bash
git clone <your-github-repo-link>
cd <project-folder-name>
