import re
from scraper.base_scraper import BaseScraper

class IOCLScraper(BaseScraper):
    """Scraper for IOCL (Indian Oil Corporation Limited) career portal."""
    PSU_NAME = "IOCL"
    CAREER_URL = "https://iocl.com/latest-job-opening"

    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []

        soup = self.parse_html(html)
        recruitments = []

        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            if any(kw in text.lower() for kw in ['officer', 'engineer', 'apprentice', 'recruitment', 'gate']):
                href = a['href']
                full_url = href if href.startswith('http') else f"https://iocl.com{href}"
                recruitments.append({
                    'psu_id': self.PSU_ID,
                    'title': f"IOCL {text[:60]}",
                    'post_name': text[:100],
                    'total_vacancies': None,
                    'qualifications': ['B.Tech', 'B.E', 'Diploma'],
                    'gate_based': 'gate' in text.lower(),
                    'source_url': full_url,
                    'current_phase': 'application_open',
                    'phases': [
                        {'phase_name': 'notification_out', 'phase_status': 'completed'},
                        {'phase_name': 'application_open', 'phase_status': 'active', 'source_link': full_url}
                    ]
                })
        return recruitments[:10]
