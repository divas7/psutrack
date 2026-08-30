# PSUTrack

PSUTrack is a unified PSU recruitment tracker for India. It scrapes career portals of various Public Sector Undertakings (PSUs) such as ONGC, NTPC, etc., and provides real-time updates and notifications about new recruitments, admit cards, and results.

## Tech Stack

- **Backend / Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Scraping Engine:** Python (BeautifulSoup, Playwright, PyMuPDF)
- **Automation:** GitHub Actions
- **Notifications:** Resend (Email)

## Project Structure

```
psutrack/
├── .github/workflows/
│   └── scrape.yml        # GitHub Actions workflow to run scrapers daily
├── scraper/              # Python Scraping Engine
│   ├── scrapers/         # Individual PSU Scrapers
│   │   ├── ongc.py
│   │   ├── ntpc.py
│   │   └── ...
│   ├── utils/            # Helper Utilities
│   │   ├── date_normalizer.py
│   │   ├── change_detector.py
│   │   └── pdf_parser.py
│   ├── base_scraper.py   # Base class for all scrapers
│   ├── db.py             # Supabase interactions
│   ├── main.py           # Orchestrator script
│   └── requirements.txt  # Python dependencies
├── supabase/
│   └── schema.sql        # Database schema and seed data
├── .env.example          # Example environment variables
└── README.md             # This file
```

## Setup Instructions

### 1. Database Setup (Supabase)
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the SQL Editor and run the contents of `supabase/schema.sql`.
3. Obtain your `Project URL` and `Service Role Key` from the project settings.

### 2. Local Scraper Setup
1. Clone the repository and navigate to the project root.
2. Create a virtual environment and install the dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r scraper/requirements.txt
   playwright install chromium
   ```
3. Copy `.env.example` to `.env` and fill in the required variables (especially `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`).
4. Run the scraper:
   ```bash
   python -m scraper.main --dry-run
   ```

### 3. GitHub Actions Setup
1. Fork or push this repository to GitHub.
2. Go to the repository settings -> Secrets and variables -> Actions.
3. Add the following repository secrets:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
4. The workflow in `.github/workflows/scrape.yml` will now run automatically twice a day.

## How to Add a New PSU Scraper

1. Create a new file in `scraper/scrapers/`, e.g., `bhel.py`.
2. Inherit from `BaseScraper` and implement the `scrape()` method.
3. Import and add your new scraper to `SCRAPER_REGISTRY` in `scraper/main.py`.
4. Run the scraper locally with the `--psu bhel` flag to test.

## Environment Variables Reference

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase Anon Key (for frontend).
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (for scraper).
- `RESEND_API_KEY`: API key for Resend email service.
- `RESEND_FROM_EMAIL`: Sender email address for notifications.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to add a new scraper or improve existing functionality.
