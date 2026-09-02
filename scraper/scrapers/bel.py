from scraper.base_scraper import BaseScraper

class BELScraper(BaseScraper):
    """Scraper for BEL (Bharat Electronics Limited) career portal."""
    PSU_NAME = "BEL"
    CAREER_URL = "https://bel-india.in/careers/"

    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []

        soup = self.parse_html(html)
        recruitments = []

        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            if any(kw in text.lower() for kw in ['probationary', 'engineer', 'project engineer', 'recruitment']):
                href = a['href']
                full_url = href if href.startswith('http') else f"https://bel-india.in{href}"
                recruitments.append({
                    'psu_id': self.PSU_ID,
                    'title': f"BEL {text[:60]}",
                    'post_name': text[:100],
                    'total_vacancies': None,
                    'qualifications': ['B.Tech', 'B.E'],
                    'gate_based': False,
                    'source_url': full_url,
                    'current_phase': 'notification_out',
                    'phases': [
                        {'phase_name': 'notification_out', 'phase_status': 'active', 'source_link': full_url}
                    ]
                })
        return recruitments[:10]
