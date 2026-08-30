from scraper.base_scraper import BaseScraper
from scraper.utils.date_normalizer import normalize_date, extract_date_range
from bs4 import BeautifulSoup
import re

class NTPCScraper(BaseScraper):
    """
    Scraper for NTPC career portal.
    Target URL: https://careers.ntpc.co.in
    
    NTPC uses a modern web app. We use Playwright to render the page,
    then parse the HTML with BeautifulSoup.
    """
    PSU_NAME = "NTPC"
    CAREER_URL = "https://careers.ntpc.co.in"
    
    def scrape(self) -> list[dict]:
        try:
            from playwright.sync_api import sync_playwright
        except ImportError:
            self.logger.error("Playwright not installed. Run: pip install playwright && playwright install chromium")
            return []
        
        html = None
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.set_extra_http_headers(self.headers)
            try:
                page.goto(self.CAREER_URL, wait_until='networkidle', timeout=30000)
                # Wait for job listings to appear
                page.wait_for_timeout(3000)
                html = page.content()
            except Exception as e:
                self.logger.error(f"Playwright error: {e}")
            finally:
                browser.close()
        
        if not html:
            raise ConnectionError(f"Failed to load {self.CAREER_URL}")
        
        soup = self.parse_html(html)
        recruitments = []
        
        # Parse job listings from the rendered HTML
        # (Selectors would need to be calibrated against the live site)
        job_items = soup.select('div.job-item, tr.job-row, li.vacancy-item')
        for item in job_items:
            title_el = item.select_one('h3, h4, .title, .job-title, td:first-child')
            link_el = item.select_one('a[href]')
            date_el = item.select_one('.date, .last-date, td:last-child')
            
            if not title_el:
                continue
            
            title = title_el.get_text(strip=True)
            link = link_el['href'] if link_el else self.CAREER_URL
            date_str = date_el.get_text(strip=True) if date_el else None
            end_date = normalize_date(date_str) if date_str else None
            
            recruitments.append({
                'psu_id': self.PSU_ID,
                'title': f"NTPC {title}",
                'post_name': title,
                'total_vacancies': None,
                'qualifications': ['B.Tech', 'B.E'],
                'gate_based': 'gate' in title.lower(),
                'source_url': link if link.startswith('http') else f"https://careers.ntpc.co.in{link}",
                'current_phase': 'application_open',
                'phases': [
                    {'phase_name': 'notification_out', 'phase_status': 'completed'},
                    {'phase_name': 'application_open', 'phase_status': 'active',
                     'end_date': end_date, 'source_link': link},
                ]
            })
        
        return recruitments
