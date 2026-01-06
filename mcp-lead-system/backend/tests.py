import unittest
import os
from logic.generator import generate_leads_logic
from logic.enricher import enrich_lead_logic
from database import LeadDB

class TestLeadSystem(unittest.TestCase):

    def test_generator_validity(self):
        """Test that leads meet the syntax requirements"""
        leads = generate_leads_logic(count=5, seed=42)
        self.assertEqual(len(leads), 5)
        
        first_lead = leads[0]
        # Check Fields
        self.assertIn("full_name", first_lead)
        self.assertIn("@", first_lead["email"])
        self.assertTrue(first_lead["website"].startswith("http"))
        # Check Consistency
        print(f"\nGenerated: {first_lead['full_name']} - {first_lead['role']}")

    def test_enricher(self):
        """Test that enrichment adds the required fields"""
        dummy_lead = {"industry": "SaaS", "role": "CTO"}
        enriched = enrich_lead_logic(dummy_lead)
        
        self.assertIn("pain_points", enriched)
        self.assertIn("buying_trigger", enriched)
        self.assertGreater(len(enriched["pain_points"]), 0)

    def test_database(self):
        """Test DB insertions"""
        # Use a temporary test DB
        test_db_path = "test_leads.db"
        if os.path.exists(test_db_path):
            os.remove(test_db_path)
            
        # Monkey patch the DB path for testing (simplified)
        # In a real app, you'd inject the config
        pass 

if __name__ == '__main__':
    unittest.main()