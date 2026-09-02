import os
import requests
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# PSU Emojis lookup for email rendering
PSU_EMOJIS = {
    'ONGC': '🛢️', 'NTPC': '⚡', 'BHEL': '⚙️', 'IOCL': '🔥', 'GAIL': '🌿',
    'HAL': '✈️', 'BEL': '📡', 'SAIL': '🏗️', 'POWER-GRID': '🔌', 'POWER GRID': '🔌',
    'ISRO': '🚀', 'DRDO': '🛡️', 'COAL-INDIA': '⛏️', 'COAL INDIA': '⛏️',
    'HPCL': '⛽', 'BARC': '⚛️', 'SBI': '🏦'
}

def send_run_summary_email(summary: list):
    """
    Sends a beautifully formatted, executive-style HTML email report via Resend API.
    """
    api_key = os.environ.get('RESEND_API_KEY')
    to_email = os.environ.get('NOTIFICATION_EMAIL')
    
    if not api_key:
        logger.info("ℹ️ RESEND_API_KEY not set. Skipping email summary.")
        return
        
    if not to_email:
        logger.info("ℹ️ NOTIFICATION_EMAIL not set. Skipping email summary.")
        return

    now_str = datetime.now().strftime('%d %b %Y, %I:%M %p IST')
    
    total_psus = len(summary)
    total_notices = sum(s.get('items_found', 0) for s in summary)
    total_changes = sum(s.get('changes', 0) for s in summary)
    successful_runs = sum(1 for s in summary if s.get('status') == 'success')

    # Build clean HTML rows
    rows_html = ""
    for s in summary:
        name = s.get('psu_name', '').upper()
        emoji = PSU_EMOJIS.get(name, '🏛️')
        status = s.get('status')
        found = s.get('items_found', 0)
        changes = s.get('changes', 0)
        elapsed = s.get('elapsed_seconds', 0)
        
        status_tag = '<span style="color: #34D399; font-weight: 600; font-size: 12px; background: rgba(52,211,153,0.1); padding: 3px 8px; border-radius: 4px;">🟢 Active</span>' if status == 'success' else '<span style="color: #F87171; font-weight: 600; font-size: 12px; background: rgba(248,113,113,0.1); padding: 3px 8px; border-radius: 4px;">🔴 Offline</span>'
        
        changes_tag = f'<span style="color: #FBBF24; font-size: 12px; font-weight: 600;">⚡ {changes} new</span>' if changes > 0 else '<span style="color: #71717A; font-size: 12px;">No change</span>'

        rows_html += f"""
        <tr style="border-bottom: 1px solid #1C1C1F;">
            <td style="padding: 12px 14px; font-weight: 600; color: #F4F4F5; font-size: 14px;">
                <span style="margin-right: 8px;">{emoji}</span> {name}
            </td>
            <td style="padding: 12px 14px;">{status_tag}</td>
            <td style="padding: 12px 14px; color: #A1A1AA; font-size: 13px;">{found} notice{"" if found == 1 else "s"}</td>
            <td style="padding: 12px 14px;">{changes_tag}</td>
            <td style="padding: 12px 14px; color: #71717A; font-size: 12px; text-align: right;">{elapsed}s</td>
        </tr>
        """

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #09090B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #09090B; padding: 32px 12px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="100%" style="max-width: 600px; background-color: #111113; border: 1px solid #1C1C1F; border-radius: 12px; overflow: hidden; text-align: left;">
                        
                        <!-- Header Banner -->
                        <tr>
                            <td style="padding: 28px 28px 20px 28px; border-bottom: 1px solid #1C1C1F; background: linear-gradient(180deg, #18181B 0%, #111113 100%);">
                                <table role="presentation" width="100%">
                                    <tr>
                                        <td>
                                            <div style="font-size: 20px; font-weight: 700; color: #F4F4F5; letter-spacing: -0.5px;">
                                                <span style="color: #818CF8;">⚡ PSUTrack</span> Intelligence
                                            </div>
                                            <div style="font-size: 13px; color: #71717A; margin-top: 4px;">
                                                Automated Scraper Report · {now_str}
                                            </div>
                                        </td>
                                        <td align="right">
                                            <span style="background: rgba(34,197,94,0.12); color: #34D399; border: 1px solid rgba(34,197,94,0.2); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                                                ✓ System Healthy
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Summary Cards Row -->
                        <tr>
                            <td style="padding: 20px 28px; background-color: #09090B; border-bottom: 1px solid #1C1C1F;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="25%" style="padding: 10px; background: #111113; border: 1px solid #1C1C1F; border-radius: 8px; text-align: center;">
                                            <div style="font-size: 11px; color: #71717A; font-weight: 600; text-transform: uppercase;">Covered</div>
                                            <div style="font-size: 18px; font-weight: 700; color: #F4F4F5; margin-top: 4px;">{total_psus} PSUs</div>
                                        </td>
                                        <td width="4%"></td>
                                        <td width="30%" style="padding: 10px; background: #111113; border: 1px solid #1C1C1F; border-radius: 8px; text-align: center;">
                                            <div style="font-size: 11px; color: #71717A; font-weight: 600; text-transform: uppercase;">Total Notices</div>
                                            <div style="font-size: 18px; font-weight: 700; color: #F4F4F5; margin-top: 4px;">{total_notices}</div>
                                        </td>
                                        <td width="4%"></td>
                                        <td width="37%" style="padding: 10px; background: #111113; border: 1px solid #1C1C1F; border-radius: 8px; text-align: center;">
                                            <div style="font-size: 11px; color: #71717A; font-weight: 600; text-transform: uppercase;">Phase Updates</div>
                                            <div style="font-size: 18px; font-weight: 700; color: #818CF8; margin-top: 4px;">{total_changes} Detected</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- PSU Table -->
                        <tr>
                            <td style="padding: 0;">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                                    <thead>
                                        <tr style="background: #18181B; color: #71717A; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em;">
                                            <th style="padding: 10px 14px; text-align: left;">PSU</th>
                                            <th style="padding: 10px 14px; text-align: left;">Status</th>
                                            <th style="padding: 10px 14px; text-align: left;">Notices</th>
                                            <th style="padding: 10px 14px; text-align: left;">Activity</th>
                                            <th style="padding: 10px 14px; text-align: right;">Speed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows_html}
                                    </tbody>
                                </table>
                            </td>
                        </tr>

                        <!-- Call to Action Footer -->
                        <tr>
                            <td style="padding: 28px; text-align: center; border-top: 1px solid #1C1C1F; background-color: #111113;">
                                <a href="https://psutrack.vercel.app" target="_blank" style="display: inline-block; background-color: #6366F1; color: #FFFFFF; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; box-shadow: 0 2px 8px rgba(99,102,241,0.25);">
                                    Open PSUTrack Portal →
                                </a>
                                <div style="font-size: 12px; color: #71717A; margin-top: 16px;">
                                    Automated 2× Daily Scraper · PSUTrack India
                                </div>
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    payload = {
        'from': 'PSUTrack Scraper <onboarding@resend.dev>',
        'to': [to_email],
        'subject': f'⚡ PSUTrack Report: {total_psus} PSUs Checked ({total_changes} updates) — {now_str}',
        'html': html_content
    }

    try:
        resp = requests.post(
            'https://api.resend.com/emails',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json=payload,
            timeout=12
        )
        if resp.status_code in [200, 201]:
            logger.info(f"✅ Executive summary email sent successfully to {to_email}")
        else:
            logger.warning(f"Resend API response: {resp.status_code} {resp.text}")
    except Exception as e:
        logger.error(f"Failed to send run summary email: {e}")
