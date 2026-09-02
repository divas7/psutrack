import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional
import logging

load_dotenv()

logger = logging.getLogger(__name__)

def get_client() -> Optional[Client]:
    """
    Get a Supabase client using environment variables.
    Checks SUPABASE_URL, NEXT_PUBLIC_SUPABASE_URL
    and SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, NEXT_PUBLIC_SUPABASE_ANON_KEY.
    """
    url = os.environ.get('SUPABASE_URL') or os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
    key = (
        os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or 
        os.environ.get('SUPABASE_ANON_KEY') or 
        os.environ.get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    )
    
    if not url or not key:
        logger.error("❌ Missing Supabase Environment Variables!")
        logger.error("Please add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) to your GitHub Repository Secrets.")
        return None
        
    try:
        return create_client(url, key)
    except Exception as e:
        logger.error(f"❌ Failed to initialize Supabase client: {e}")
        return None

def get_existing_recruitment(client: Client, psu_id: str, title: str) -> Optional[dict]:
    """Fetch an existing recruitment record by PSU ID and title."""
    if not client:
        return None
    try:
        result = client.table('recruitments') \
            .select('*, phases(*)') \
            .eq('psu_id', psu_id) \
            .ilike('title', f'%{title[:30]}%') \
            .order('created_at', desc=True) \
            .limit(1) \
            .execute()
        return result.data[0] if result.data else None
    except Exception as e:
        logger.error(f"DB fetch error: {e}")
        return None

def upsert_recruitment(client: Client, recruitment: dict) -> Optional[str]:
    """Insert or update a recruitment record. Returns the recruitment ID."""
    if not client:
        return None
    try:
        phases = recruitment.pop('phases', [])
        result = client.table('recruitments') \
            .upsert(recruitment, on_conflict='psu_id,title') \
            .execute()
        rec_id = result.data[0]['id'] if result.data else None
        
        if rec_id and phases:
            for phase in phases:
                phase['recruitment_id'] = rec_id
            client.table('phases').upsert(phases, on_conflict='recruitment_id,phase_name').execute()
        
        return rec_id
    except Exception as e:
        logger.error(f"DB upsert error: {e}")
        return None

def log_scraper_run(client: Client, psu_id: str, status: str, 
                     items_found: int, items_changed: int, error: Optional[str] = None):
    """Log the result of a scraper run to the scraper_logs table."""
    if not client:
        return
    try:
        client.table('scraper_logs').insert({
            'psu_id': psu_id,
            'status': status,
            'items_found': items_found,
            'items_changed': items_changed,
            'error_message': error,
        }).execute()
    except Exception as e:
        logger.error(f"Failed to log scraper run: {e}")

def get_users_watching_psu(client: Client, psu_id: str) -> list[dict]:
    """Get all users who are watching a given PSU."""
    if not client:
        return []
    try:
        result = client.table('user_watchlist') \
            .select('user_id, notify_email') \
            .eq('psu_id', psu_id) \
            .eq('notify_email', True) \
            .execute()
        return result.data or []
    except Exception as e:
        logger.error(f"Failed to fetch watchers: {e}")
        return []
