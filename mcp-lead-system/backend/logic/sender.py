import time
import random
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_message_logic(lead_email: str, content: str, channel: str = "email", dry_run: bool = True) -> bool:
    """Simulates sending a message."""
    time.sleep(0.1) # Simulated delay
    
    if dry_run:
        logger.info(f"[DRY RUN] Processed {channel} for {lead_email}")
        return True
    
    # 10% chance of random failure in live mode
    if random.random() < 0.1:
        return False
        
    return True

# Outreach simulation logic

