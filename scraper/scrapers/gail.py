from scraper.base_scraper import BaseScraper

class GAILScraper(BaseScraper):
    """Scraper for GAIL (India) Limited career portal."""
    PSU_NAME = "GAIL"
    CAREER_URL = "https://gailonline.com"

    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []

        soup = self.parse_html(html)
        recruitments = []

        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            if any(kw in text.lower() for kw in ['executive', 'trainee', 'engineer', 'career', 'recruitment']):
                href = a['href']
                full_url = href if href.startswith('http') else f"https://gailonline.com/{href.lstrip('/')}"
                recruitments.append({
                    'psu_id': self.PSU_ID,
                    'title': f"GAIL {text[:60]}",
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
