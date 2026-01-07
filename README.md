<<<<<<< HEAD
# MCP-Powered-Lead-Gen
=======
# MCP-Powered Lead Gen & Outreach Orchestrator

A fully autonomous, full-stack lead generation pipeline powered by the **Model Context Protocol (MCP)**.  
This system orchestrates the entire lifecycle of outbound sales — from synthetic lead generation and enrichment to personalized message drafting and multi-channel outreach — monitored via a modern React dashboard.

---

## Features

### Synthetic Lead Generation
- Generates 200+ realistic B2B leads using Python and Faker
- Valid, syntactically correct:
  - Emails
  - LinkedIn URLs
  - Company websites
- Industry-specific role and title mappings
- Reproducible generation using a random seed

### Dual-Mode Enrichment
**Offline Mode**
- Rule-based heuristics
- Zero-cost, deterministic enrichment

**AI Mode**
- Mocked LLM-style reasoning
- Persona inference, pain points, buying triggers
- Fully compliant with free-tier constraints

### Hyper-Personalization
- Personalized outreach content per lead
- A/B variants for:
  - Cold email
  - LinkedIn DM
- Content references enriched attributes (industry, persona, pain points)
- Strict word limits enforced

### Safe Outreach System
**Dry Run Mode**
- Simulates email and LinkedIn sends
- Writes previews to logs and database
- No external messages sent

**Live Mode**
- Real SMTP email sending
- Configurable rate limiting
- Retry logic (up to 3 attempts)
- Structured error handling

### Professional Monitoring Dashboard
- Real-time pipeline tracking:
NEW → ENRICHED → MESSAGED → SENT → FAILED
- Toggle between Dry Run and Live modes
- Interactive data grid
- CSV export support

---

## Tech Stack & Free Resources

This project is built entirely using free and open-source tools to meet assignment constraints.

### Backend
- Python 3.12+
- FastAPI (API bridge)
- MCP (Model Context Protocol SDK)
- SQLite (persistent state management)

### Frontend
- React (Vite)
- Tailwind CSS
- Lucide React (icons)

### Data & Messaging
- Faker (synthetic data generation)
- smtplib (Python standard library SMTP client)

### Orchestration
- n8n (self-hosted / desktop)

---

## Why These Tools?

- **SQLite**  
Lightweight, zero-configuration database ideal for demos and state persistence.

- **FastAPI**  
High-performance backend framework used to expose MCP tools to the frontend and n8n.

- **Faker**  
Industry-standard library for realistic synthetic data without paid APIs.

- **n8n**  
Visual, node-based automation demonstrating MCP-driven orchestration clearly.

---

## Dependencies

### Backend (Python)
- fastapi
- uvicorn
- mcp
- faker
- pydantic
- python-dotenv
- requests

### Frontend (Node.js)
- react
- react-dom
- vite
- axios
- tailwindcss
- lucide-react

---

## Installation & Setup

### 1. Backend Setup

Navigate to the backend folder:

```bash
cd backend
Create and activate a virtual environment:
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
Install dependencies:
pip install fastapi uvicorn mcp faker pydantic python-dotenv requests
Create a .env file inside backend/:
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Default execution mode
EXECUTION_MODE=dry_run
```

### 2. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
Install dependencies:
npm install
```

### Running the System

1. Start Backend (MCP Server + API Bridge)

```bash
# From backend/
python api_bridge.py
```

Backend runs at:
http://localhost:8000

2. Start Frontend Dashboard

```bash
# From frontend/
npm run dev
```

Frontend runs at:
http://localhost:5173

### Running the n8n Workflow

An n8n workflow export is included to demonstrate external orchestration.

#### Steps

1. Install n8n (desktop, npm, or Docker)
2. Open n8n UI
3. Import workflow:
   - Go to Workflows → Import from File
   - Select workflow/n8n_workflow.json
4. Ensure backend is running
5. Click Execute Workflow

#### Workflow Stages

- Generate Leads
- Enrich Leads
- Draft Messages
- Send Outreach

Each stage invokes MCP tools sequentially.

### Dry Run vs Live Mode

#### Dry Run (Default)
- Safe testing mode
- No real messages sent
- Logs simulated sends

**How to use:**
- Toggle dashboard to Dry Run
- Click Simulate Send

**Backend logs example:**
[DRY RUN] Would send EMAIL to test@example.com

#### Live Mode (Real Sending)

**Requirements:**
- Valid SMTP credentials
- Manual confirmation in UI

**How to use:**
- Switch toggle to Live Mode
- Click Send For Real

**Note:**
Generated emails are fake by default. To test successfully, replace a lead’s email in SQLite with your real email.

### Example Outputs

#### Monitoring Dashboard
- Live pipeline counters
- Lead status updates
- Interactive table view

#### Personalized Messages
- Email A/B variants
- LinkedIn DM variants
- Persona-aware content

#### n8n Orchestration
- Visual execution trace
- Retry and failure handling
- MCP tool calls per step

---

## Project Structure (High Level)

```
backend/
  ├── api_bridge.py
  ├── mcp_server/
  ├── db/
frontend/
  ├── src/
workflow/
  └── n8n_workflow.json
```

---

## Images

### Monitoring Dashboard
![Monitoring Dashboard](images/dashboard.png)

### Lead Management
![Lead Management](images/lead_management.png)

### Workflow Execution
![Workflow Execution](images/workflow_execution.png)
>>>>>>> 3030ffc (Add README and remove non-code artifacts)
