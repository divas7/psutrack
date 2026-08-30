import re
from dateutil import parser as dateutil_parser
from datetime import date
from typing import Optional

# Common date formats seen on Indian PSU websites
INDIAN_DATE_PATTERNS = [
    r'\d{2}/\d{2}/\d{4}',        # 15/08/2025
    r'\d{2}-\d{2}-\d{4}',        # 15-08-2025
    r'\d{2}\.\d{2}\.\d{4}',      # 15.08.2025
    r'\d{1,2}(?:st|nd|rd|th)?\s+\w+,?\s+\d{4}',  # 15th August, 2025
    r'\w+\s+\d{1,2},?\s+\d{4}',  # August 15, 2025
    r'\d{4}-\d{2}-\d{2}',        # 2025-08-15 (ISO)
]

def normalize_date(raw: str) -> Optional[str]:
    """
    Takes a messy date string and returns YYYY-MM-DD.
    Returns None if parsing fails.
    """
    if not raw:
        return None
    # Clean up the string
    cleaned = raw.strip().replace('\n', ' ').replace('  ', ' ')
    # Remove common suffixes
    cleaned = re.sub(r'(st|nd|rd|th)\b', '', cleaned, flags=re.IGNORECASE)
    try:
        parsed = dateutil_parser.parse(cleaned, dayfirst=True)
        return parsed.strftime('%Y-%m-%d')
    except Exception:
        # Try extracting just the date portion with regex
        for pattern in INDIAN_DATE_PATTERNS:
            match = re.search(pattern, cleaned, re.IGNORECASE)
            if match:
                try:
                    parsed = dateutil_parser.parse(match.group(), dayfirst=True)
                    return parsed.strftime('%Y-%m-%d')
                except Exception:
                    continue
        return None

def extract_date_range(text: str) -> tuple[Optional[str], Optional[str]]:
    """
    Extract start and end dates from text like:
    'Apply from 01/09/2025 to 30/09/2025'
    Returns (start_date, end_date) as YYYY-MM-DD strings.
    """
    dates = []
    for pattern in INDIAN_DATE_PATTERNS:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for m in matches:
            normalized = normalize_date(m)
            if normalized:
                dates.append(normalized)
    dates = sorted(set(dates))
    if len(dates) >= 2:
        return dates[0], dates[-1]
    elif len(dates) == 1:
        return dates[0], None
    return None, None
