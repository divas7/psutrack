from scraper.base_scraper import BaseScraper

class CoalIndiaScraper(BaseScraper):
    """Scraper for Coal India Limited career portal."""
    PSU_NAME = "Coal India"
    CAREER_URL = "https://www.coalindia.in/career-cil/"

    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []

        soup = self.parse_html(html)
        recruitments = []

        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            if any(kw in text.lower() for kw in ['management trainee', 'mining', 'recruitment', 'notice']):
                href = a['href']
                full_url = href if href.startswith('http') else f"https://www.coalindia.in{href}"
                recruitments.append({
                    'psu_id': self.PSU_ID,
                    'title': f"Coal India {text[:60]}",
                    'post_name': text[:100],
                    'total_vacancies': None,
                    'qualifications': ['B.Tech Mining', 'B.Tech Mechanical'],
                    'gate_based': False,
                    'source_url': full_url,
                    'current_phase': 'application_open',
                    'phases': [
                        {'phase_name': 'notification_out', 'phase_status': 'completed'},
                        {'phase_name': 'application_open', 'phase_status': 'active', 'source_link': full_url}
                    ]
                })
        return recruitments[:10]
