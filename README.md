# 🚀 OpportunityRadar — ET AI Hackathon 2026

OpportunityRadar is a **full-stack, AI-driven institutional-grade stock market analysis platform** built for the everyday Indian investor.

Designed for the **ET Markets AI Hackathon 2026 (PS6)**, it bridges the gap between retail traders and quantitative analysts using:
- 📊 Live market data  
- 📈 Advanced technical pattern detection  
- 🤖 Natural language sentiment analysis powered by Claude AI  

---

## 🏗️ Technical Architecture

### 🎨 Frontend (React + Vite)
- **Framework:** React 18 + Vite (fast HMR)
- **Styling:** Vanilla CSS with variables (Glassmorphism UI)
- **State Management:** @tanstack/react-query
- **Visualization:**
  - TradingView Lightweight Charts
  - Recharts
  - Custom Dynamic SVG overlays

---

### ⚙️ Backend (FastAPI + Python)
- **Framework:** FastAPI (Python 3.10+)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy (Async)
- **Migrations:** Alembic
- **AI Integration:** Anthropic Claude API
- **Security:**
  - JWT Authentication
  - python-jose
  - passlib (bcrypt)

---

## ⚡ Quick Start Guide

### 1️⃣ Backend Setup (FastAPI)
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000# From root directory
npm install

# Start development server
npm run dev



## 🌟 Core Differentiators

OpportunityRadar is not just a screener — it's a Convergence Engine.

⚡ Multi-Signal Convergence Badges

Detects when multiple signals (e.g., Volume Surge + Bulk Deals) occur together, boosting confidence using historical win rates.

🤖 AI Source Citation Badges

Every AI-generated insight includes:
Hoverable citations
Transparent data sources (NSE, BSE, SEBI)
📈 SVG Pattern Bounding Boxes
Automatic chart overlays
Highlights breakouts, reversals, and formations
Powered by custom ResizeObserver logic
⚖️ Judge Mode Resilience
?mode=judge-demo flag
Uses cached/mock data during network instability
Ensures smooth live demo performance

# Team members
| Name                  | Role                     | Focus                       |
| --------------------- | ------------------------ | --------------------------- |
| Ashutosh Nayak        | Lead Full-Stack Engineer | FastAPI + React Integration |
| Siddharth Kumar Jena  | AI & Data Engineer       | Claude API + TA-Lib Logic   |
| Sushree Adyasha Sahoo | UI/UX Designer           | Glassmorphism + Animations  |
| Ayutayam sutar        | DevOps & QA              | Deployment + CI/CD          |


## 💡Vision
To empower every Indian investor with tools previously accessible only to institutional traders — combining:
Data intelligence
AI reasoning
Visual clarity


## 🙏 Acknowledgements
- Google Gemini  
- Antigravity  
- Anthropic Claude AI  
- TradingView Lightweight Charts  
- FastAPI  
- React + Vite  
- Netlify  
- Render  
