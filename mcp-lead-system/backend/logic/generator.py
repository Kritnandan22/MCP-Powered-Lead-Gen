from faker import Faker
import random
import re

fake = Faker()

# --- 1. CONFIGURATION & CONSISTENCY RULES ---

# Industry-Specific Roles to ensure "Realistic" data
ROLES_BY_INDUSTRY = {
    "SaaS": [
        "CTO", "VP of Engineering", "Product Manager", "Head of Growth", 
        "DevOps Lead", "Solutions Architect", "Chief Product Officer"
    ],
    "Manufacturing": [
        "Supply Chain Manager", "Plant Director", "Head of Operations", 
        "Procurement Manager", "Logistics Coordinator", "Quality Assurance Lead"
    ],
    "Healthcare": [
        "Medical Director", "Clinical Lead", "Practice Manager", 
        "Head of Patient Services", "Chief Medical Officer", "Hospital Administrator"
    ],
    "FinTech": [
        "Head of Risk", "Compliance Officer", "CFO", "Director of Fintech",
        "Blockchain Lead", "Chief Investment Officer", "Fraud Analyst"
    ],
    "E-commerce": [
        "Head of Digital Marketing", "E-commerce Director", "Supply Chain Lead", 
        "Customer Experience VP", "Brand Manager", "Fulfillment Director"
    ],
    "Biotech": [
        "Head of R&D", "Lab Director", "Clinical Trial Manager", 
        "Chief Scientific Officer", "Regulatory Affairs Director"
    ]
}

INDUSTRIES = list(ROLES_BY_INDUSTRY.keys())
GENERIC_ROLES = ["CEO", "Founder", "Managing Director", "VP of Sales"]

# --- 2. HELPER FUNCTIONS ---

def clean_string(text: str) -> str:
    """Removes special characters for URL/Email generation."""
    # Convert 'Acme, Inc.' -> 'acmeinc'
    return re.sub(r'[^a-zA-Z0-9]', '', text).lower()

def generate_valid_lead(seed: int, industry_filter: str = None) -> dict:
    """Generates a single, scientifically consistent lead."""
    
    # 1. Determine Industry & Role
    # FIX: Case-insensitive matching
    matched_industry = None
    if industry_filter:
        for ind in ROLES_BY_INDUSTRY.keys():
            if ind.lower() == industry_filter.lower():
                matched_industry = ind
                break

    if matched_industry:
        industry = matched_industry
        role = random.choice(ROLES_BY_INDUSTRY[industry])
    else:
        # Fallback if industry not found
        industry = random.choice(INDUSTRIES)
        # 80% chance of industry-specific role, 20% generic C-suite
        if random.random() < 0.8:
            role = random.choice(ROLES_BY_INDUSTRY[industry])
        else:
            role = random.choice(GENERIC_ROLES)

    # 2. Generate Company & Valid Website
    company_name = fake.company()
    # Ensure website syntax is valid (no spaces, valid TLD)
    company_slug = clean_string(company_name)
    website = f"https://www.{company_slug}.com"

    # 3. Generate Name & Valid Email
    first_name = fake.first_name()
    last_name = fake.last_name()
    full_name = f"{first_name} {last_name}"
    
    # Email Syntax: first.last@company.com (Matches company!)
    email = f"{clean_string(first_name)}.{clean_string(last_name)}@{company_slug}.com"

    # 4. Generate Valid LinkedIn URL
    # LinkedIn Syntax: linkedin.com/in/firstname-lastname-randomdigits
    linkedin_slug = f"{clean_string(first_name)}-{clean_string(last_name)}-{random.randint(100, 999)}"
    linkedin_url = f"https://linkedin.com/in/{linkedin_slug}"

    return {
        "full_name": full_name,
        "company_name": company_name,
        "role": role,
        "industry": industry,
        "website": website,
        "email": email,
        "linkedin_url": linkedin_url,
        "country": fake.country(),
    }

# --- 3. MAIN LOGIC ---

def generate_leads_logic(count: int = 200, seed: int = 42, industry_filter: str = None) -> list:
    """
    Generates a list of synthetic leads.
    """
    # Reproducibility: Set the seed
    Faker.seed(seed)
    random.seed(seed)
    
    leads = []
    for _ in range(count):
        leads.append(generate_valid_lead(seed, industry_filter))
    
    return leads

