from abc import ABC, abstractmethod
import httpx
import requests
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
    REQUEST_DELAY: float = 2.0  # Seconds between requests
    
    def __init__(self):
        try:
            self.ua = UserAgent()
            user_agent = self.ua.random
        except Exception:
            user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            
        self.logger = logging.getLogger(self.__class__.__name__)
        self.headers = {
            'User-Agent': user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
    
    def fetch_html(self, url: str, verify_ssl: bool = False) -> Optional[str]:
        """Fetch raw HTML from a URL with retry logic using httpx and requests fallback."""
        for attempt in range(3):
            try:
                with httpx.Client(verify=verify_ssl, timeout=30, follow_redirects=True) as client:
                    resp = client.get(url, headers=self.headers)
                    if resp.status_code == 200:
                        time.sleep(self.REQUEST_DELAY)
                        return resp.text
            except Exception as e:
                self.logger.warning(f"httpx attempt {attempt+1} failed for {url}: {e}")
                
            # Fallback to requests if httpx fails
            try:
                resp = requests.get(url, headers=self.headers, timeout=30, verify=False)
                if resp.status_code == 200:
                    time.sleep(self.REQUEST_DELAY)
                    return resp.text
            except Exception as e:
                self.logger.warning(f"requests attempt {attempt+1} failed for {url}: {e}")
                
            time.sleep(3 * (attempt + 1))
            
        self.logger.error(f"All fetch attempts failed for {url}")
        return None
    
    def parse_html(self, html: str) -> BeautifulSoup:
        """Parse HTML string into BeautifulSoup object."""
        return BeautifulSoup(html, 'html.parser')
    
    @abstractmethod
    def scrape(self) -> list[dict]:
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
