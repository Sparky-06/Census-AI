/**
 * Census AI — Help & FAQs Mock Data
 */

export const FAQS = [
  {
    q: 'How does Census AI calculate the Priority Score for complaints?',
    a: 'When a citizen uploads a photo and location, our AI vision analysis engine evaluates the severity, size, public safety risk, and traffic impact of the civic hazard. Scores from 70-100 are designated High Priority (immediate action required), 40-69 as Medium Priority (review & assessment), and 0-39 as Low Priority (scheduled routine maintenance).'
  },
  {
    q: 'What are the required fields to file a civic complaint?',
    a: 'You only need to provide an Evidence Photo and the Location of the incident (e.g. street name and landmark). An optional detailed description can be provided to give additional context to municipal field teams.'
  },
  {
    q: 'How do I track the progress of my filed complaint?',
    a: 'You can use the Track Complaint section by entering your unique Complaint ID (or UUID). The portal will display real-time status: Reported, Assigned, In Progress, Resolved, or Verified.'
  },
  {
    q: 'What is the standard SLA for civic grievance redressal?',
    a: 'Emergency issues like open manholes, main water pipeline bursts, or exposed electrical cables have a 12 to 24-hour SLA. Standard street repairs and lighting repairs are resolved within 24 to 48 hours.'
  },
  {
    q: 'Who can I contact in case of an emergency civic hazard?',
    a: 'For life-threatening civic emergencies, contact the Municipal Disaster & Emergency Helpline at 112 or the Water Supply Emergency Hotline at 1916.'
  }
];

export const ESCALATION_MATRIX = [
  { level: 'Level 1 (0 - 24 hrs)', role: 'Ward Junior Engineer / Field Inspector', contact: 'ward.inspector@census-ai.gov.in' },
  { level: 'Level 2 (24 - 48 hrs)', role: 'Assistant Executive Engineer (Zonal Office)', contact: 'aee.zone@census-ai.gov.in' },
  { level: 'Level 3 (48 - 72 hrs)', role: 'Executive Engineer / Zonal Commissioner', contact: 'zonal.commissioner@census-ai.gov.in' },
  { level: 'Level 4 (> 72 hrs)', role: 'Joint Commissioner (Grievance Redressal)', contact: 'jc.grievance@census-ai.gov.in' },
];
