# 🔥 AI Resume Roaster

An AI-powered resume analysis platform that scores resumes, matches them against job descriptions, identifies strengths and gaps, and delivers actionable feedback with a touch of humor.

## 🌐 Live Demo

**Frontend:** https://talentscope-ai-vilas2809s-projects.vercel.app
## ✨ Features

- Upload a resume in PDF format
- Paste a job description for role-specific analysis
- Get a **Resume Score**
- Get a **Job Match Score**
- View a concise **Match Summary**
- See **Matched Skills**
- See **Missing Skills**
- Get **Key Improvements**
- Identify **Weak Areas**
- Highlight **Top Strengths**
- Receive a light, non-offensive **AI Roast**
- Copy results instantly
- Clear and re-run analysis easily
- Fully deployed frontend and backend

## 🧠 Why This Project Stands Out

Most resume tools only provide generic suggestions. This project turns resume review into an interactive product experience by combining:

- AI-generated professional feedback
- job-description matching
- skills gap analysis
- production deployment
- clean, user-friendly UI

It demonstrates both **software engineering** and **product thinking**.

## 🛠️ Tech Stack

### Frontend
- Vanilla HTML, CSS, JavaScript
- Served via Nginx in production

### Backend
- FastAPI
- Python
- PyMuPDF
- SQLAlchemy + PostgreSQL (stores analysis history)

### AI
- Groq API (LLaMA 3.3 70B Versatile) for resume analysis
- Ollama (local, self-hosted) for local LLM experimentation

### Deployment
- Fully containerized: Docker + Docker Compose
- Traefik reverse proxy with HTTPS (self-signed for local/demo use)

## 📂 Project Structure

```text
TalentScope-ai/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── config.js
│   ├── docker-entrypoint.sh
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## ⚙️ How It Works

1. User uploads a PDF resume
2. User optionally pastes a job description
3. Backend extracts resume text from the PDF
4. Groq analyzes the resume and job fit
5. Frontend displays:
   - Resume Score
   - Job Match Score
   - Match Summary
   - Matched Skills
   - Missing Skills
   - Roast
   - Key Improvements
   - Weak Areas
   - Top Strengths

## 🚀 Run Locally (Docker Compose)

### 1. Clone the repository

```bash
git clone https://github.com/Vilas2809/talentscope-ai.git
cd TalentScope-ai
```

### 2. Configure the backend

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start the full stack

```bash
docker compose up -d --build
```

This starts:
- `db` — PostgreSQL (stores analysis history)
- `backend` — FastAPI, published on `http://localhost:8001`
- `frontend` — static site served by Nginx, published on `http://localhost:8090`
- `traefik` — reverse proxy terminating HTTPS (self-signed cert) at `https://talentscope.localhost:8443` (frontend) and `https://api.talentscope.localhost:8443` (backend)
- `ollama` — local LLM runtime on `http://localhost:11434`

Pull and run a local model once Ollama is up:

```bash
docker exec -it talentscope-ai-ollama-1 ollama pull llama3.2:3b
docker exec -it talentscope-ai-ollama-1 ollama run llama3.2:3b
```

## 🌍 Deployment

Fully containerized via Docker Compose, fronted by Traefik for HTTPS. Point `docker-compose.yml`'s Traefik labels at a real domain (and swap the self-signed cert for a Let's Encrypt resolver) to deploy on a real server or a platform like Coolify.

## 🔐 Environment Variables

### Backend
```env
GROQ_API_KEY=your_groq_api_key_here
DATABASE_URL=postgresql+psycopg2://talentscope:talentscope@db:5432/talentscope
```

### Frontend
```env
API_BASE_URL=https://api.talentscope.localhost:8443
```
Injected into `config.js` at container startup (see `frontend/docker-entrypoint.sh`).

## 📸 Example Output

- **Resume Score:** 85
- **Job Match Score:** 70
- **Match Summary:** A concise explanation of overall fit
- **Matched Skills:** Java, SQL, Data Structures
- **Missing Skills:** Spring Boot, Angular, JDBC
- **Roast:** Funny but non-offensive feedback
- **Key Improvements:** Practical suggestions to improve the resume
- **Weak Areas:** Important gaps in the profile
- **Top Strengths:** Strongest areas of the candidate

## 🧪 Challenges Solved

- Handling PDF uploads in a web app
- Extracting readable text from resumes
- Managing frontend-backend communication
- Fixing production CORS issues between Vercel and Render
- Debugging environment variable issues in deployment
- Designing a clean UI for structured AI results

## 📈 Future Improvements

- Downloadable PDF report
- Authentication and user history
- Resume comparison dashboard
- ATS keyword scoring
- Tone selector for roast style
- More detailed analytics and charts

## 👨‍💻 Author

**Vilas Reddy**

GitHub: https://github.com/Vilas2809

## 💼 Resume-Ready Project Summary

Built and deployed a full-stack AI-powered resume analysis platform using React, FastAPI, and Groq API, featuring resume scoring, job-description matching, skill-gap detection, and actionable feedback in a production-ready web application.

## ⭐ Support

If you like this project, consider giving it a star on GitHub.
