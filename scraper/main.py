#!/usr/bin/env python3
"""
PSUTrack Scraper Orchestrator
Runs all PSU scrapers, detects changes, and updates the database.
This script is called by GitHub Actions twice daily (8 AM and 8 PM IST).

Usage:
    python -m scraper.main
    python -m scraper.main --psu ongc  # Run single scraper
    python -m scraper.main --dry-run   # Don't write to DB
"""

import argparse
import logging
import sys
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | %(levelname)-8s | %(name)s | %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger('PSUTrack')

# Import all scrapers
from scraper.scrapers.ongc import ONGCScraper
from scraper.scrapers.ntpc import NTPCScraper
# from scraper.scrapers.bhel import BHELScraper  # Add as you build them

from scraper.db import get_client, get_existing_recruitment, upsert_recruitment, log_scraper_run
from scraper.utils.change_detector import detect_changes

# Registry of all active scrapers
SCRAPER_REGISTRY = {
    'ongc': ONGCScraper,
    'ntpc': NTPCScraper,
    # Add more here as you build them:
    # 'bhel': BHELScraper,
    # 'iocl': IOCLScraper,
    # 'hal': HALScraper,
}

def run_scraper(scraper_class, db_client, dry_run: bool = False) -> dict:
    """Run a single scraper and handle DB updates."""
    scraper = scraper_class()
    run_result = scraper.run()
    
    total_changes = 0
    
    if not dry_run and run_result['status'] == 'success':
        for recruitment in run_result['results']:
            # Check for existing record
            existing = get_existing_recruitment(
                db_client, recruitment.get('psu_id', ''), recruitment['title']
            )
            # Detect changes
            changes = detect_changes(existing, recruitment)
            if changes:
                total_changes += len(changes)
                logger.info(f"  Changes detected: {[c['type'] for c in changes]}")
                # TODO: Trigger notifications for affected users here
            
            # Upsert to DB
            upsert_recruitment(db_client, recruitment.copy())
        
        # Log the run
        log_scraper_run(
            db_client,
            psu_id=run_result['psu_id'],
            status=run_result['status'],
            items_found=run_result['items_found'],
            items_changed=total_changes,
        )
    
    return {**run_result, 'changes': total_changes}

def main():
    parser = argparse.ArgumentParser(description='PSUTrack Scraper')
    parser.add_argument('--psu', type=str, help='Run only this PSU scraper (e.g. ongc)')
    parser.add_argument('--dry-run', action='store_true', help='Run scrapers but do not write to DB')
    args = parser.parse_args()
    
    logger.info(f"=== PSUTrack Scraper Run === {datetime.now().strftime('%Y-%m-%d %H:%M:%S IST')}")
    
    # Get DB client (skip in dry-run)
    db_client = None
    if not args.dry_run:
        try:
            db_client = get_client()
            logger.info("✓ Connected to Supabase")
        except Exception as e:
            logger.error(f"DB connection failed: {e}")
            sys.exit(1)
    else:
        logger.info("DRY RUN — no DB writes")
    
    # Determine which scrapers to run
    if args.psu:
        if args.psu not in SCRAPER_REGISTRY:
            logger.error(f"Unknown PSU: {args.psu}. Available: {list(SCRAPER_REGISTRY.keys())}")
            sys.exit(1)
        scrapers_to_run = {args.psu: SCRAPER_REGISTRY[args.psu]}
    else:
        scrapers_to_run = SCRAPER_REGISTRY
    
    # Run all scrapers
    summary = []
    for psu_key, scraper_class in scrapers_to_run.items():
        logger.info(f"\n--- Scraping {psu_key.upper()} ---")
        result = run_scraper(scraper_class, db_client, dry_run=args.dry_run)
        summary.append(result)
    
    # Print summary
    logger.info("\n=== Run Summary ===")
    for s in summary:
        status_icon = '✓' if s['status'] == 'success' else '✗'
        logger.info(f"  {status_icon} {s['psu_name']}: {s['items_found']} found, {s['changes']} changed ({s['elapsed_seconds']}s)")
    
    failed = [s for s in summary if s['status'] == 'failed']
    if failed:
        logger.warning(f"\n{len(failed)} scraper(s) failed: {[s['psu_name'] for s in failed]}")
        sys.exit(1)
    else:
        logger.info(f"\nAll {len(summary)} scraper(s) completed successfully.")

if __name__ == '__main__':
    main()
