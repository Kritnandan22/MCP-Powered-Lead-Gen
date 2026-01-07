# MCP-Powered Lead Gen & Outreach Orchestrator

## 1. Project Overview & Goals
A full-stack, autonomous lead generation and outreach system built for B2B sales pipelines. The goal: automate every stage from synthetic lead generation to multi-channel outreach, with robust monitoring and safe testing.

---

## 2. Architecture Diagram & Component Breakdown

```
+-------------------+      +-------------------+      +-------------------+
|   React Frontend  |<---->|   FastAPI Backend |<---->|   SQLite Database |
+-------------------+      +-------------------+      +-------------------+
        |                        |                        |
        v                        v                        v
+-------------------+      +-------------------+      +-------------------+
|   n8n Workflow    |<---->|   MCP Tools       |<---->|   SMTP Server     |
+-------------------+      +-------------------+      +-------------------+
```

- **Frontend:** React (Vite, Tailwind) dashboard for pipeline control and monitoring.
- **Backend:** FastAPI exposes MCP tools, handles enrichment, messaging, and outreach.
- **Database:** SQLite for persistent state and lead storage.
- **Orchestration:** n8n automates pipeline stages via API calls.
- **Messaging:** SMTP for real email delivery (Live Mode).

---

## 3. Backend Implementation

### API Bridge (FastAPI)
- Exposes endpoints for: generate, enrich, prepare-messages, send, export CSV.
- Handles CORS for frontend communication.

### Data Model
- **LeadDB:** SQLite wrapper for CRUD operations on leads, enrichment, and message status.
- **Lead Structure:**
  - `id`, `full_name`, `email`, `company_name`, `industry`, `role`, `enrichment_data`, `message_data`, `status`

### MCP Integration
- **MCP Tools:**
  - `generate_leads`: Uses Faker, industry mappings, random seed.
  - `enrich_leads_batch`: Dual-mode (offline/AI), persona, pain points, triggers.
  - `generate_messages_batch`: Strict word limits, A/B variants, CTA enforcement.
  - `send_outreach_batch`: Dry/Live mode, retry logic, rate limiting.

### Enrichment Logic
- **Offline Mode:** Rule-based, deterministic, fast.
- **AI Mode:** Mocked LLM output, dynamic confidence, extra insights.

### Example: Enrichment Function
```python
def enrich_lead_logic(lead, mode="offline"):
    # ...
    if mode == "offline":
        # Rule-based
        ...
    else:
        # AI-mocked
        ...
    return {...}
```

---

## 4. Frontend Implementation

### React Structure
- **Controls.jsx:** Pipeline actions, batch size, industry filter, enrichment mode, dry/live toggle.
- **Dashboard:** Real-time counters, lead list, CSV export, search.
- **State Management:** useState, useEffect for API calls and UI updates.

### UI Features
- **Dry/Live Toggle:**
  - `isLiveMode` state, visual switch, passes `dry_run` to backend.
- **Batch/Industry Controls:**
  - Dropdowns, input fields, random seed for unique lead generation.
- **CSV Export:**
  - Backend endpoint streams all leads as CSV.

---

## 5. Workflow Automation (n8n)
- **Workflow Stages:**
  - Generate → Enrich → Draft → Send
- **Integration:**
  - n8n calls FastAPI endpoints, monitors status, handles errors.
- **Export:**
  - `workflow/n8n_workflow.json` for import and demo.

---

## 6. DevOps & Version Control

### Git & GitHub
- **Init:** `git init`, `.gitignore` for venv, node_modules, build outputs.
- **Branching:** `main` branch, SSH authentication for secure pushes.
- **Merge Conflicts:**
  - Resolved in README.md, used `git pull --rebase`, `git rebase --continue`.
- **Remote Setup:**
  - `git remote set-url origin git@github.com:Kritnandan22/MCP-Powered-Lead-Gen.git`

### Example: .gitignore
```
.venv/
node_modules/
dist/
.env
__pycache__/
*.pyc
```

---

## 7. Security & Reliability
- **SMTP Credentials:** Stored in `.env`, never committed.
- **Dry Run Mode:** Prevents accidental real sends during testing.
- **Rate Limiting:** Max 10 emails/min (configurable, demo uses 0.5s for speed).
- **Retry Logic:** Up to 3 attempts per email, with backoff.
- **Error Handling:** Status updates, logs, and dashboard feedback.

---

## 8. Example Code Snippets

### Send Outreach (Retry + Rate Limit)
```python
def send_outreach_batch(limit=5, dry_run=True):
    DELAY_SECONDS = 0.5
    for lead in leads:
        success = False
        for attempt in range(3):
            if send_message_logic(...):
                success = True
                break
            time.sleep(1)
        time.sleep(DELAY_SECONDS)
```

### Frontend Dry/Live Toggle
```jsx
<div onClick={() => setIsLiveMode(!isLiveMode)}>
  {isLiveMode ? '🔴 LIVE MODE' : '🟢 DRY RUN'}
</div>
```

---

## 9. How to Run, Test, and Extend

### Run Backend
```bash
cd backend
python api_bridge.py
```

### Run Frontend
```bash
cd frontend
npm run dev
```

### Import n8n Workflow
- Open n8n UI, import `workflow/n8n_workflow.json`, execute.

### Extend
- Add new enrichment logic, message templates, or pipeline stages in MCP tools.
- Customize dashboard UI in React.
- Integrate with real SMTP or LinkedIn APIs for production.

---
