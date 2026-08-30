import io
import requests
from typing import Optional
import logging

logger = logging.getLogger(__name__)

def extract_text_from_pdf_url(url: str, max_pages: int = 5) -> Optional[str]:
    """
    Download a PDF from URL and extract text using PyMuPDF.
    Returns extracted text or None on failure.
    Works on text PDFs only (not scanned image PDFs).
    """
    try:
        import fitz  # PyMuPDF
    except ImportError:
        logger.error("PyMuPDF not installed. Run: pip install PyMuPDF")
        return None
    
    try:
        resp = requests.get(url, timeout=30, verify=False, 
                           headers={'User-Agent': 'Mozilla/5.0'})
        resp.raise_for_status()
        
        pdf_bytes = resp.content
        doc = fitz.open(stream=pdf_bytes, filetype='pdf')
        
        text_parts = []
        for page_num in range(min(max_pages, len(doc))):
            page = doc[page_num]
            text_parts.append(page.get_text())
        
        doc.close()
        return '\n'.join(text_parts)
    
    except Exception as e:
        logger.error(f"PDF extraction failed for {url}: {e}")
        return None

def is_scanned_pdf(text: str) -> bool:
    """
    Heuristic: if extracted text is very short relative to a typical notification,
    it's likely a scanned image PDF (no selectable text).
    """
    return len(text.strip()) < 200
