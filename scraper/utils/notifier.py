import os
import requests
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

def send_run_summary_email(summary: list):
    """
    Sends a clean email summary via Resend API after every scraper run.
    Requires RESEND_API_KEY and NOTIFICATION_EMAIL environment variables.
    """
    api_key = os.environ.get('RESEND_API_KEY')
    to_email = os.environ.get('NOTIFICATION_EMAIL')
    
    if not api_key:
        logger.info("ℹ️ RESEND_API_KEY not set. Skipping email summary.")
        return
        
    if not to_email:
        logger.info("ℹ️ NOTIFICATION_EMAIL not set. Skipping email summary.")
        return

    now_str = datetime.now().strftime('%Y-%m-%d %H:%M IST')
    
    items_rows = ""
    for s in summary:
        status_badge = "🟢 Success" if s.get('status') == 'success' else "🔴 Issue"
        items_rows += f"""
        <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #3F3F46;"><b>{s.get('psu_name')}</b></td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #3F3F46;">{status_badge}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #3F3F46;">{s.get('items_found', 0)} notices</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #3F3F46;">{s.get('changes', 0)} changes</td>
        </tr>
        """

    html_content = f"""
    <div style="font-family: Arial, sans-serif; background-color: #09090B; color: #F4F4F5; padding: 24px; border-radius: 8px;">
        <h2 style="color: #818CF8; margin-top: 0;">⚡ PSUTrack Daily Scraper Summary</h2>
        <p style="color: #A1A1AA; font-size: 14px;">Automated run completed on <b>{now_str}</b></p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; color: #F4F4F5; font-size: 14px;">
            <thead>
                <tr style="background-color: #18181B; color: #71717A; text-transform: uppercase; font-size: 12px;">
                    <th style="padding: 8px 12px; text-align: left;">PSU Name</th>
                    <th style="padding: 8px 12px; text-align: left;">Status</th>
                    <th style="padding: 8px 12px; text-align: left;">Notices Found</th>
                    <th style="padding: 8px 12px; text-align: left;">Changes</th>
                </tr>
            </thead>
            <tbody>
                {items_rows}
            </tbody>
        </table>
        
        <p style="font-size: 13px; color: #71717A;">View your portal: <a href="https://psutrack.vercel.app" style="color: #818CF8;">psutrack.vercel.app</a></p>
    </div>
    """

    payload = {
        'from': 'PSUTrack Scraper <onboarding@resend.dev>',
        'to': [to_email],
        'subject': f'⚡ PSUTrack Scraper Summary — {now_str}',
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
            timeout=10
        )
        if resp.status_code in [200, 201]:
            logger.info(f"✅ Summary email sent successfully to {to_email}")
        else:
            logger.warning(f"Resend API response: {resp.status_code} {resp.text}")
    except Exception as e:
        logger.error(f"Failed to send run summary email: {e}")
