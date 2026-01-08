# Ex2 – AI Trends Aggregator

A Next.js web application that displays trending AI-related GitHub repositories
and allows users to generate short AI-powered summaries for each project using Groq.

---

## Features
- Fetches trending GitHub repositories (topic: AI, sorted by stars)
- Server-side API routes using Next.js App Router
- Card-based UI for each project
- “Summarize” button for AI-generated summaries
- Summaries powered by Groq LLM
- API key is stored only in the browser (LocalStorage)
- No backend storage of API keys
- API responses are cached for a short duration to avoid excessive external API requests.

---

## Tech Stack
- Next.js (App Router)
- React
- TypeScript
- Groq API
- GitHub REST API

---

## Pages
- `/` – Main page showing trending AI GitHub projects
- `/settings` – Page to save Groq API key (stored locally in the browser)

---

## API Routes

### GET `/api/trending`
Fetches the top AI GitHub repositories from the GitHub API.

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

