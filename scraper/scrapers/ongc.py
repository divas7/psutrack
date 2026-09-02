import re
from scraper.base_scraper import BaseScraper
from scraper.utils.date_normalizer import normalize_date

class ONGCScraper(BaseScraper):
    """
    Scraper for ONGC (Oil and Natural Gas Corporation) career portal.
    Target URL: https://ongcindia.com/web/eng/career
    """
    PSU_NAME = "ONGC"
    CAREER_URL = "https://ongcindia.com/web/eng/career"
    
    PHASE_KEYWORDS = {
        'notification_out': ['notification', 'advertisement', 'advt', 'recruitment notice'],
        'application_open': ['apply online', 'online application', 'registration open'],
        'application_closed': ['application closed', 'last date passed'],
        'admit_card': ['admit card', 'hall ticket', 'call letter'],
        'exam_date': ['written test', 'cbt', 'computer based test', 'examination date'],
        'result': ['result', 'merit list', 'shortlist', 'selected candidates'],
        'final_joining': ['joining', 'appointment', 'offer letter'],
    }
    
    def _detect_phase(self, text: str) -> str:
        text_lower = text.lower()
        for phase, keywords in self.PHASE_KEYWORDS.items():
            if any(kw in text_lower for kw in keywords):
                return phase
        return 'notification_out'
    
    def scrape(self) -> list[dict]:
        html = self.fetch_html(self.CAREER_URL)
        if not html:
            self.logger.warning(f"Could not reach {self.CAREER_URL}. Returning empty list.")
            return []
        
        soup = self.parse_html(html)
        recruitments = []
        
        career_links = []
        for a in soup.find_all('a', href=True):
            text = a.get_text(strip=True)
            href = a['href']
            if any(kw in text.lower() for kw in ['recruit', 'vacancy', 'trainee', 'engineer', 'officer']):
                career_links.append({'text': text, 'href': href})
        
        for link in career_links[:10]:
            year_match = re.search(r'20\d{2}', link['text'])
            year = year_match.group() if year_match else '2025'
            
            phase = self._detect_phase(link['text'])
            full_url = link['href'] if link['href'].startswith('http') else f"https://ongcindia.com{link['href']}"
            
            recruitments.append({
                'psu_id': self.PSU_ID,
                'title': f"ONGC Recruitment {year}",
                'post_name': link['text'][:100],
                'total_vacancies': None,
                'qualifications': ['B.Tech', 'B.E'],
                'gate_based': 'gate' in link['text'].lower(),
                'source_url': full_url,
                'current_phase': phase,
                'phases': [
                    {'phase_name': phase, 'phase_status': 'active',
                     'source_link': full_url, 'notes': link['text']}
                ]
            })
        
        return recruitments
