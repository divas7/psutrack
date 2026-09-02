import re
from scraper.base_scraper import BaseScraper
from scraper.utils.date_normalizer import normalize_date

class BHELScraper(BaseScraper):
    """Scraper for BHEL (Bharat Heavy Electricals Limited) career portal."""
    PSU_NAME = "BHEL"
    CAREER_URL = "https://careers.bhel.in"

    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []
        
        soup = self.parse_html(html)
        recruitments = []
        
        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            if any(kw in text.lower() for kw in ['engineer', 'trainee', 'notice', 'advt', 'recruitment']):
                href = a['href']
                full_url = href if href.startswith('http') else f"https://careers.bhel.in/{href.lstrip('/')}"
                recruitments.append({
                    'psu_id': self.PSU_ID,
                    'title': f"BHEL {text[:60]}",
                    'post_name': text[:100],
                    'total_vacancies': None,
                    'qualifications': ['B.Tech', 'B.E'],
                    'gate_based': 'gate' in text.lower(),
                    'source_url': full_url,
                    'current_phase': 'exam_date',
                    'phases': [
                        {'phase_name': 'notification_out', 'phase_status': 'completed'},
                        {'phase_name': 'application_open', 'phase_status': 'completed'},
                        {'phase_name': 'exam_date', 'phase_status': 'active', 'source_link': full_url}
                    ]
                })
        return recruitments[:10]
