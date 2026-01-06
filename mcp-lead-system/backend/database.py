# Database handler for SQLite

import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'data', 'leads.db')

def init_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT, company_name TEXT, role TEXT, industry TEXT,
        website TEXT, email TEXT, linkedin_url TEXT, country TEXT,
        status TEXT DEFAULT 'NEW',
        enrichment_data TEXT,
        email_content_a TEXT, email_content_b TEXT,
        linkedin_content_a TEXT, linkedin_content_b TEXT,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        logs TEXT
    )
    ''')
    conn.commit()
    conn.close()

class LeadDB:
    def __init__(self):
        if not os.path.exists(DB_PATH):
            init_db()
        self.conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row

    def add_leads(self, leads):
        cursor = self.conn.cursor()
        count = 0
        for lead in leads:
            cursor.execute("SELECT id FROM leads WHERE email = ?", (lead['email'],))
            if cursor.fetchone(): continue
            
            cursor.execute('''
            INSERT INTO leads (full_name, company_name, role, industry, website, email, linkedin_url, country, status, logs) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'NEW', ?)
            ''', (lead['full_name'], lead['company_name'], lead['role'], lead['industry'], lead['website'], lead['email'], lead['linkedin_url'], lead['country'], f"Created at {datetime.now()}"))
            count += 1
        self.conn.commit()
        return count

    def get_leads_by_status(self, status, limit=10):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM leads WHERE status = ? LIMIT ?", (status, limit))
        return [dict(row) for row in cursor.fetchall()]

    def update_lead_enrichment(self, lead_id, data):
        self.conn.execute("UPDATE leads SET enrichment_data = ?, status = 'ENRICHED', last_updated = CURRENT_TIMESTAMP WHERE id = ?", (json.dumps(data), lead_id))
        self.conn.commit()

    def update_lead_messages(self, lead_id, msgs):
        self.conn.execute("UPDATE leads SET email_content_a = ?, email_content_b = ?, linkedin_content_a = ?, linkedin_content_b = ?, status = 'MESSAGED', last_updated = CURRENT_TIMESTAMP WHERE id = ?", (msgs.get('email_a'), msgs.get('email_b'), msgs.get('linkedin_a'), msgs.get('linkedin_b'), lead_id))
        self.conn.commit()

    def update_lead_status(self, lead_id, status, log=""):
        self.conn.execute("UPDATE leads SET status = ?, logs = logs || ?, last_updated = CURRENT_TIMESTAMP WHERE id = ?", (status, f"\n{log}", lead_id))
        self.conn.commit()

    def get_stats(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT status, COUNT(*) as count FROM leads GROUP BY status")
        return {row['status']: row['count'] for row in cursor.fetchall()}

    def get_recent_leads(self, limit=500): 
        cursor = self.conn.cursor()
        # Order by ID descending so the NEWEST generated leads always appear at the top
        cursor.execute("SELECT * FROM leads ORDER BY id DESC LIMIT ?", (limit,))
        return [dict(row) for row in cursor.fetchall()]

    def close(self):
        self.conn.close()

if __name__ == "__main__":
    init_db()

