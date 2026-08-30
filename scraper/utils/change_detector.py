from typing import Optional

def detect_changes(old: Optional[dict], new: dict) -> list[dict]:
    """
    Compare old and new recruitment records.
    Returns a list of change dicts that will be used to trigger notifications.
    """
    if old is None:
        return [{'type': 'NEW_RECRUITMENT', 'message': f"New recruitment found: {new.get('title')}"}]
    
    changes = []
    
    # Phase change
    if old.get('current_phase') != new.get('current_phase'):
        changes.append({
            'type': 'PHASE_CHANGE',
            'from_phase': old.get('current_phase'),
            'to_phase': new.get('current_phase'),
            'message': f"{new.get('title')}: moved from {old.get('current_phase')} to {new.get('current_phase')}"
        })
    
    # New link appeared (e.g., admit card download link added)
    old_phases = {p['phase_name']: p for p in old.get('phases', [])}
    for phase in new.get('phases', []):
        old_phase = old_phases.get(phase['phase_name'])
        if old_phase and not old_phase.get('source_link') and phase.get('source_link'):
            changes.append({
                'type': 'LINK_ADDED',
                'phase': phase['phase_name'],
                'link': phase['source_link'],
                'message': f"{new.get('title')}: {phase['phase_name']} link is now available"
            })
        # Date change
        if old_phase and old_phase.get('end_date') != phase.get('end_date'):
            changes.append({
                'type': 'DATE_CHANGE',
                'phase': phase['phase_name'],
                'old_date': old_phase.get('end_date'),
                'new_date': phase.get('end_date'),
                'message': f"{new.get('title')}: deadline changed to {phase.get('end_date')}"
            })
    
    return changes
