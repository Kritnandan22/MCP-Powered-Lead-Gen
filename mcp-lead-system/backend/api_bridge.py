# FastAPI Agent/Bridge for n8n

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse  # <--- NEW IMPORT
from pydantic import BaseModel
# We import the functions directly, so we call them like normal python functions
from mcp_server import generate_leads, enrich_leads_batch, generate_messages_batch, send_outreach_batch
from database import LeadDB
import uvicorn
import json
import csv       # <--- NEW IMPORT
import io        # <--- NEW IMPORT

app = FastAPI()

# Enable CORS so Frontend can talk to Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenRequest(BaseModel):
    count: int = 5
    seed: int = 42
    industry: str = "" 

class ProcessRequest(BaseModel):
    limit: int = 5
    dry_run: bool = True
    mode: str = "offline"

@app.post("/agent/generate")
async def api_generate(req: GenRequest):
    # Pass industry to the function
    res = generate_leads(count=req.count, seed=req.seed, industry=req.industry)
    return json.loads(res)

@app.post("/agent/enrich")
async def api_enrich(req: ProcessRequest):
    res = enrich_leads_batch(limit=req.limit, mode=req.mode)
    return json.loads(res)

@app.post("/agent/prepare-messages")
async def api_messages(req: ProcessRequest):
    res = generate_messages_batch(limit=req.limit)
    return json.loads(res)

@app.post("/agent/send")
async def api_send(req: ProcessRequest):
    res = send_outreach_batch(limit=req.limit, dry_run=req.dry_run)
    return json.loads(res)

@app.get("/leads")
async def get_leads():
    db = LeadDB()
    try:
        # Increase limit to 500 so you can see large batches
        return {"leads": db.get_recent_leads(limit=500), "stats": db.get_stats()}
    finally:
        db.close()

# --- NEW ENDPOINT FOR CSV EXPORT ---
@app.get("/export/csv")
async def export_leads_csv():
    """Bonus: Export all leads to CSV"""
    db = LeadDB()
    try:
        # Get all leads
        cursor = db.conn.cursor()
        cursor.execute("SELECT * FROM leads ORDER BY id DESC")
        rows = cursor.fetchall()
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write Header
        if rows:
            writer.writerow(rows[0].keys())
            
        # Write Data
        for row in rows:
            writer.writerow(list(row))
            
        output.seek(0)
        
        return StreamingResponse(
            io.BytesIO(output.getvalue().encode()),
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=leads_export.csv"}
        )
    finally:
        db.close()

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

