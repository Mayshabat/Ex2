# Ex2 – AI Trends News Aggregator (MVP)

## 📌 Project Overview
This project is a lightweight (MVP) web application that aggregates **trending AI and Machine Learning projects** from GitHub and presents them in a clean, Apple-inspired interface.

The application allows users to generate short AI-powered summaries for each project using an external LLM (Groq), with the user’s API key stored **locally in the browser only**.

The project is based on **end-to-end JavaScript technologies**, optimized for **Vercel**, and follows the course requirements strictly (no UI libraries).

---

## 🚀 Features (MVP)
- Fetch trending AI/ML GitHub repositories from the **last 24 hours**
- Feed-based UI with reusable project cards
- Project details: repository name, description, stars, and link
- AI-powered summaries (up to 3 lines per project)
- User-provided API key stored in **LocalStorage**
- No backend storage of API keys
- Server-side API routes using Next.js (App Router)
- In-memory server caching (5 minutes) to limit external API calls
- Minimalist, Apple-inspired design using **vanilla CSS only**

---

## 🧠 Tech Stack
- **Framework:** Next.js (App Router)
- **Frontend:** React (Functional Components)
- **Backend:** Next.js API Routes (Serverless)
- **Language:** TypeScript
- **Styling:** Vanilla CSS / CSS Modules
- **APIs:**
  - GitHub REST API
  - Groq LLM API
- **Storage:** LocalStorage (client-side only)
- **Deployment:** Vercel

---

## 🗂️ Application Pages
- `/` – Main feed displaying trending AI GitHub repositories
- `/settings` – Settings page to save the Groq API key locally

---

## 🔌 API Routes

### GET `/api/trending`
Fetches trending AI-related GitHub repositories (sorted by stars, last 24 hours).

**Response example:**
```json
{
  "projects": [
    {
      "id": 1,
      "name": "owner/repo",
      "description": "Project description",
      "stars": 12345,
      "url": "https://github.com/owner/repo"
    }
  ]
}
```

### POST `/api/summarize`
Generates an AI summary for a given project description using the Groq API and a user-provided API key.

### GET `/api/huggingface`
Returns trending Hugging Face models sorted by downloads (optional / bonus endpoint).

---

## ⚙️ How to Run Locally
```bash
npm install
npm run dev

🌐 Deployment

The application is deployed on Vercel.

🔗 Live URL:
(add Vercel link here)

👥 Authors

May Shabat

Partner Name