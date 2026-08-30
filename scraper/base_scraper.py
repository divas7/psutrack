from abc import ABC, abstractmethod
import httpx
import logging
import time
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from typing import Optional

class BaseScraper(ABC):
    """
    Base class for all PSU scrapers.
    Each PSU gets its own subclass in scrapers/<psu_name>.py
    """
    PSU_ID: str = ""    # Supabase UUID of this PSU
    PSU_NAME: str = ""  # Human-readable name
    CAREER_URL: str = "" # The URL to scrape
    REQUEST_DELAY: float = 3.0  # Seconds between requests (be respectful)
    
    def __init__(self):
        self.ua = UserAgent()
        self.logger = logging.getLogger(self.__class__.__name__)
        self.headers = {
            'User-Agent': self.ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
    
    def fetch_html(self, url: str, verify_ssl: bool = False) -> Optional[str]:
        """Fetch raw HTML from a URL with retry logic."""
        for attempt in range(3):
            try:
                with httpx.Client(verify=verify_ssl, timeout=30) as client:
                    resp = client.get(url, headers=self.headers)
                    resp.raise_for_status()
                    time.sleep(self.REQUEST_DELAY)
                    return resp.text
            except Exception as e:
                self.logger.warning(f"Attempt {attempt+1} failed for {url}: {e}")
                time.sleep(5 * (attempt + 1))
        self.logger.error(f"All 3 attempts failed for {url}")
        return None
    
    def parse_html(self, html: str) -> BeautifulSoup:
        """Parse HTML string into BeautifulSoup object."""
        return BeautifulSoup(html, 'lxml')
    
    @abstractmethod
    def scrape(self) -> list[dict]:
        """
        Main scraping method. Must be implemented by each PSU subclass.
        Returns a list of recruitment dicts matching the DB schema:
        [
            {
                'psu_id': str,
                'title': str,
                'post_name': str,
                'total_vacancies': int | None,
                'qualifications': list[str],
                'gate_based': bool,
                'source_url': str,
                'current_phase': str,  # phase enum value
                'phases': [
                    {
                        'phase_name': str,
                        'phase_status': str,  # pending|active|completed
                        'start_date': str | None,  # YYYY-MM-DD
                        'end_date': str | None,
                        'source_link': str | None,
                        'notes': str | None,
                    }
                ]
            }
        ]
        """
        pass
    
    def run(self) -> dict:
        """Run the scraper and return results + metadata for logging."""
        self.logger.info(f"Starting scrape for {self.PSU_NAME}")
        start_time = time.time()
        try:
            results = self.scrape()
            elapsed = round(time.time() - start_time, 2)
            self.logger.info(f"{self.PSU_NAME}: found {len(results)} recruitments in {elapsed}s")
            return {
                'psu_id': self.PSU_ID,
                'psu_name': self.PSU_NAME,
                'status': 'success',
                'items_found': len(results),
                'results': results,
                'elapsed_seconds': elapsed,
                'error': None,
            }
        except Exception as e:
            elapsed = round(time.time() - start_time, 2)
            self.logger.error(f"{self.PSU_NAME} scraper failed: {e}")
            return {
                'psu_id': self.PSU_ID,
                'psu_name': self.PSU_NAME,
                'status': 'failed',
                'items_found': 0,
                'results': [],
                'elapsed_seconds': elapsed,
                'error': str(e),
            }
