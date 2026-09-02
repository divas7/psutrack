from scraper.base_scraper import BaseScraper
from scraper.utils.date_normalizer import normalize_date

class NTPCScraper(BaseScraper):
    """
    Scraper for NTPC career portal.
    Target URL: https://careers.ntpc.co.in
    """
    PSU_NAME = "NTPC"
    CAREER_URL = "https://careers.ntpc.co.in"
    
    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        
        # Try playwright if httpx/requests didn't get dynamic SPA content
        if not html or len(html) < 500:
            try:
                from playwright.sync_api import sync_playwright
                with sync_playwright() as p:
                    browser = p.chromium.launch(headless=True)
                    page = browser.new_page()
                    page.set_extra_http_headers(self.headers)
                    page.goto(self.CAREER_URL, wait_until='domcontentloaded', timeout=20000)
                    page.wait_for_timeout(2000)
                    html = page.content()
                    browser.close()
            except Exception as e:
                self.logger.warning(f"Playwright fetch fallback failed: {e}")
        
        if not html:
            self.logger.warning(f"Could not load {self.CAREER_URL}. Returning empty list.")
            return []
        
        soup = self.parse_html(html)
        recruitments = []
        
        job_items = soup.select('div.job-item, tr.job-row, li.vacancy-item, a[href*="job"]')
        for item in job_items:
            title_el = item.select_one('h3, h4, .title, .job-title, td:first-child') or item
            title = title_el.get_text(strip=True)
            if not title or len(title) < 5:
                continue
            
            link = item.get('href', self.CAREER_URL) if item.name == 'a' else self.CAREER_URL
            
            recruitments.append({
                'psu_id': self.PSU_ID,
                'title': f"NTPC {title[:60]}",
                'post_name': title[:100],
                'total_vacancies': None,
                'qualifications': ['B.Tech', 'B.E'],
                'gate_based': 'gate' in title.lower(),
                'source_url': link if link.startswith('http') else f"https://careers.ntpc.co.in{link}",
                'current_phase': 'application_open',
                'phases': [
                    {'phase_name': 'notification_out', 'phase_status': 'completed'},
                    {'phase_name': 'application_open', 'phase_status': 'active',
                     'source_link': link},
                ]
            })
        
        return recruitments
