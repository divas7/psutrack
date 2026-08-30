export type PhaseStatus = 'completed' | 'active' | 'upcoming';
export type PhaseName =
  | 'notification_out' | 'application_open' | 'application_closed'
  | 'admit_card' | 'exam_date' | 'result' | 'final_joining';

export type Branch =
  | 'Electrical' | 'Mechanical' | 'Civil' | 'CSE/IT' | 'Electronics'
  | 'Chemical' | 'Mining' | 'Metallurgy' | 'Management' | 'Finance'
  | 'HR' | 'Aerospace' | 'Geology' | 'Science' | 'All Branches';

export interface Phase {
  name: PhaseName;
  label: string;
  status: PhaseStatus;
  date?: string;
  link?: string;
  notes?: string;
}

export interface PostDetail {
  postName: string;
  branch: Branch;
  vacancies: number;
  gateRequired: boolean;
  minQualification: string;
}

export interface Recruitment {
  id: string;
  title: string;
  postName: string;
  totalVacancies: number;
  posts: PostDetail[];
  qualifications: string[];
  gateRequired: boolean;
  currentPhase: PhaseName;
  phases: Phase[];
  sourceUrl: string;
  lastUpdated: string;
  applicationDeadline?: string;
}

export interface SalaryInfo {
  grade: string;
  payScale: string;
  ctcRange: string;
  inHandRange: string;
  hasBond: boolean;
  bondAmount?: string;
  bondPeriod?: string;
  perks: string[];
  source: string;
}

export interface PSU {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  category: 'Maharatna' | 'Navratna' | 'Miniratna' | 'Bank' | 'Defence' | 'Research';
  sector: string;
  logoEmoji: string;
  careerUrl: string;
  color: string;
  branches: Branch[];
  salary: SalaryInfo;
  activeRecruitments: number;
  recruitments: Recruitment[];
  typicalLocations: string[];
}

const PHASE_ORDER: PhaseName[] = [
  'notification_out',
  'application_open',
  'application_closed',
  'admit_card',
  'exam_date',
  'result',
  'final_joining'
];

const PHASE_LABELS: Record<PhaseName, string> = {
  notification_out: 'Notification Out',
  application_open: 'Application Open',
  application_closed: 'Application Closed',
  admit_card: 'Admit Card',
  exam_date: 'Exam Date',
  result: 'Result',
  final_joining: 'Final Joining'
};

const makePhases = (
  current: PhaseName,
  dates?: Partial<Record<PhaseName, string>>,
  links?: Partial<Record<PhaseName, string>>
): Phase[] => {
  const currentIndex = PHASE_ORDER.indexOf(current);
  return PHASE_ORDER.map((name, index) => {
    let status: PhaseStatus = 'upcoming';
    if (index < currentIndex) status = 'completed';
    else if (index === currentIndex) status = 'active';

    return {
      name,
      label: PHASE_LABELS[name],
      status,
      date: dates?.[name],
      link: links?.[name]
    };
  });
};

export const PSUS: PSU[] = [
  {
    id: 'ongc',
    slug: 'ongc',
    name: 'ONGC',
    fullName: 'Oil and Natural Gas Corporation',
    category: 'Maharatna',
    sector: 'Oil & Gas',
    logoEmoji: '🛢️',
    careerUrl: 'https://ongcindia.com/web/eng/career',
    color: '#CC2229',
    branches: ['Petroleum', 'Mechanical', 'Chemical', 'Electrical', 'Civil', 'Electronics', 'CSE/IT', 'Mining', 'Geology', 'Finance', 'HR', 'Management'] as any,
    salary: {
      grade: 'E-1 (IDA)',
      payScale: '₹60,000–1,80,000',
      ctcRange: '₹22–26 LPA',
      inHandRange: '₹92,000–1,05,000/month',
      hasBond: false,
      perks: ['14-day ON/OFF offshore cycle with helicopter transit', '100% cashless family medical', 'Furniture & gadget reimbursements', 'Offshore duty allowance ₹1,500–3,000/day', 'PRP bonus ₹2.5–4.5L annually', 'Company township (Dehradun, Nazira)'],
      source: 'Reddit r/india, Glassdoor India'
    },
    activeRecruitments: 1,
    typicalLocations: ['Mumbai High (Offshore)', 'Dehradun', 'Nazira (Assam)', 'Rajahmundry', 'Ahmedabad', 'Kakinada'],
    recruitments: [
      {
        id: 'ongc-get-2025',
        title: 'ONGC GET 2025',
        postName: 'Graduate Executive Trainee',
        totalVacancies: 223,
        qualifications: ['B.Tech', 'CA/CMA/MBA'],
        gateRequired: true,
        currentPhase: 'application_open',
        sourceUrl: 'https://ongcindia.com/web/eng/career',
        lastUpdated: new Date().toISOString(),
        applicationDeadline: '2025-09-30',
        posts: [
          { postName: 'GET (Petroleum)', branch: 'Petroleum' as any, vacancies: 60, gateRequired: true, minQualification: 'B.Tech Petroleum/Chemical' },
          { postName: 'GET (Mechanical)', branch: 'Mechanical', vacancies: 45, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'GET (Electrical)', branch: 'Electrical', vacancies: 38, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'GET (Civil)', branch: 'Civil', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Civil' },
          { postName: 'GET (Electronics)', branch: 'Electronics', vacancies: 20, gateRequired: true, minQualification: 'B.Tech ECE' },
          { postName: 'GET (Finance)', branch: 'Finance', vacancies: 20, gateRequired: false, minQualification: 'CA/CMA/MBA Finance' },
          { postName: 'GET (HR)', branch: 'HR', vacancies: 15, gateRequired: false, minQualification: 'MBA HR' }
        ],
        phases: makePhases('application_open', { notification_out: '2025-08-15', application_open: '2025-09-01' })
      }
    ]
  },
  {
    id: 'ntpc',
    slug: 'ntpc',
    name: 'NTPC',
    fullName: 'NTPC Limited',
    category: 'Maharatna',
    sector: 'Power',
    logoEmoji: '⚡',
    careerUrl: 'https://careers.ntpc.co.in',
    color: '#003A8C',
    branches: ['Electrical', 'Mechanical', 'Civil', 'Electronics', 'CSE/IT', 'Mining', 'Chemical', 'HR', 'Finance'],
    salary: {
      grade: 'E-1→E-2 (IDA)',
      payScale: '₹40,000→₹50,000–1,60,000',
      ctcRange: '₹12–15.5 LPA',
      inHandRange: '₹65,000–92,000/month',
      hasBond: true,
      bondAmount: '₹2,50,000',
      bondPeriod: '3 years (+ 1 year training)',
      perks: ['Self-contained luxury townships (Vindhyanagar, Singrauli)', 'Subsidized DPS/KV schools in plant township', 'Excellent work-life balance 8AM–4:30PM', 'Free plant power & transport', 'PRP bonus ₹1.5–2.8L annually'],
      source: 'Reddit r/jobsinindia, Glassdoor'
    },
    activeRecruitments: 1,
    typicalLocations: ['Vindhyachal (MP)', 'Singrauli (UP)', 'Korba (CG)', 'Sipat (CG)', 'Ramagundam (TS)', 'Barh (Bihar)'],
    recruitments: [
      {
        id: 'ntpc-et-2025',
        title: 'NTPC ET 2025',
        postName: 'Executive Trainee',
        totalVacancies: 150,
        qualifications: ['B.Tech'],
        gateRequired: true,
        currentPhase: 'admit_card',
        sourceUrl: 'https://careers.ntpc.co.in',
        lastUpdated: new Date().toISOString(),
        applicationDeadline: '2025-08-15',
        posts: [
          { postName: 'ET (Electrical)', branch: 'Electrical', vacancies: 65, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'ET (Mechanical)', branch: 'Mechanical', vacancies: 40, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'ET (Civil)', branch: 'Civil', vacancies: 20, gateRequired: true, minQualification: 'B.Tech Civil' },
          { postName: 'ET (Electronics)', branch: 'Electronics', vacancies: 15, gateRequired: true, minQualification: 'B.Tech ECE/Instrumentation' },
          { postName: 'ET (Mining)', branch: 'Mining', vacancies: 10, gateRequired: true, minQualification: 'B.Tech Mining' }
        ],
        phases: makePhases('admit_card', { admit_card: '2025-10-15' }, { admit_card: 'https://careers.ntpc.co.in' })
      }
    ]
  },
  {
    id: 'bhel',
    slug: 'bhel',
    name: 'BHEL',
    fullName: 'Bharat Heavy Electricals Limited',
    category: 'Maharatna',
    sector: 'Heavy Engineering',
    logoEmoji: '⚙️',
    careerUrl: 'https://careers.bhel.in',
    color: '#003366',
    branches: ['Mechanical', 'Electrical', 'Civil', 'Chemical', 'Metallurgy', 'Electronics', 'CSE/IT', 'HR', 'Finance'],
    salary: {
      grade: 'E-1 (IDA)',
      payScale: '₹50,000–1,60,000',
      ctcRange: '₹12.5–15 LPA',
      inHandRange: '₹68,000–92,000/month',
      hasBond: true,
      bondAmount: '₹2,00,000',
      bondPeriod: '3 years (+ 1 year training)',
      perks: ['Heritage townships (Trichy, Haridwar, Bhopal)', '5-day week 8AM–4:30PM manufacturing culture', 'Olympic-size sports facilities in township', 'Low stress vs private EPC', 'Free BHEL hospital network'],
      source: 'Reddit r/india, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Trichy (TN)', 'Haridwar', 'Bhopal', 'Hyderabad', 'Bangalore (EDN)', 'Ranipet'],
    recruitments: [
      {
        id: 'bhel-et-2025',
        title: 'BHEL Engineer Trainee 2025',
        postName: 'Engineer Trainee',
        totalVacancies: 120,
        qualifications: ['B.Tech'],
        gateRequired: false,
        currentPhase: 'exam_date',
        sourceUrl: 'https://careers.bhel.in',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Engineer Trainee (Mechanical)', branch: 'Mechanical', vacancies: 50, gateRequired: false, minQualification: 'B.Tech Mechanical' },
          { postName: 'Engineer Trainee (Electrical)', branch: 'Electrical', vacancies: 35, gateRequired: false, minQualification: 'B.Tech Electrical' },
          { postName: 'Engineer Trainee (Civil)', branch: 'Civil', vacancies: 15, gateRequired: false, minQualification: 'B.Tech Civil' },
          { postName: 'Engineer Trainee (Electronics)', branch: 'Electronics', vacancies: 12, gateRequired: false, minQualification: 'B.Tech ECE' },
          { postName: 'Engineer Trainee (Chemical)', branch: 'Chemical', vacancies: 8, gateRequired: false, minQualification: 'B.Tech Chemical' }
        ],
        phases: makePhases('exam_date', { exam_date: '2025-11-20' })
      }
    ]
  },
  {
    id: 'iocl',
    slug: 'iocl',
    name: 'IOCL',
    fullName: 'Indian Oil Corporation Limited',
    category: 'Maharatna',
    sector: 'Oil & Gas',
    logoEmoji: '🔥',
    careerUrl: 'https://iocl.com/latest-job-opening',
    color: '#E31E24',
    branches: ['Chemical', 'Mechanical', 'Electrical', 'Civil', 'Electronics', 'CSE/IT', 'Metallurgy', 'HR', 'Finance', 'Management'],
    salary: {
      grade: 'Grade A / E-2 (IDA)',
      payScale: '₹60,000–1,80,000',
      ctcRange: '₹16.5–19 LPA',
      inHandRange: '₹85,000–1,02,000/month',
      hasBond: true,
      bondAmount: '₹3,00,000',
      bondPeriod: '3 years',
      perks: ['60–90 litres petrol reimbursed monthly', 'Refinery township infrastructure (hospitals, schools, clubs)', '100% cashless family medical', 'Subsidized holiday homes across India', 'Furniture purchase reimbursement every 3–5 years'],
      source: 'Reddit r/india, Glassdoor'
    },
    activeRecruitments: 1,
    typicalLocations: ['Panipat Refinery (HR)', 'Mathura (UP)', 'Paradip (Odisha)', 'Koyali/Vadodara (GJ)', 'Haldia (WB)', 'Guwahati (Assam)'],
    recruitments: [
      {
        id: 'iocl-officer-2025',
        title: 'IOCL Officer Recruitment 2025',
        postName: 'Officer/Engineer',
        totalVacancies: 330,
        qualifications: ['B.Tech', 'CA/CMA', 'MBA'],
        gateRequired: true,
        currentPhase: 'application_open',
        sourceUrl: 'https://iocl.com/latest-job-opening',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Officer/Engineer (Chemical)', branch: 'Chemical', vacancies: 80, gateRequired: true, minQualification: 'B.Tech Chemical' },
          { postName: 'Officer/Engineer (Mechanical)', branch: 'Mechanical', vacancies: 65, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'Officer/Engineer (Electrical)', branch: 'Electrical', vacancies: 50, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'Officer/Engineer (Civil)', branch: 'Civil', vacancies: 30, gateRequired: true, minQualification: 'B.Tech Civil' },
          { postName: 'Officer/Engineer (Instrumentation)', branch: 'Electronics', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Instrumentation/ECE' },
          { postName: 'Officer (Finance)', branch: 'Finance', vacancies: 25, gateRequired: false, minQualification: 'CA/CMA' },
          { postName: 'Officer (HR)', branch: 'HR', vacancies: 20, gateRequired: false, minQualification: 'MBA HR' },
          { postName: 'Officer (Marketing)', branch: 'Management', vacancies: 15, gateRequired: false, minQualification: 'MBA Marketing' }
        ],
        phases: makePhases('application_open', { application_open: '2025-07-01' })
      }
    ]
  },
  {
    id: 'hal',
    slug: 'hal',
    name: 'HAL',
    fullName: 'Hindustan Aeronautics Limited',
    category: 'Navratna',
    sector: 'Aerospace & Defence',
    logoEmoji: '✈️',
    careerUrl: 'https://hal-india.co.in/Career_Dept.aspx',
    color: '#003087',
    branches: ['Aerospace', 'Mechanical', 'Electrical', 'Electronics', 'CSE/IT', 'Metallurgy', 'HR', 'Finance'],
    salary: {
      grade: 'Grade II (IDA)',
      payScale: '₹50,000–1,60,000',
      ctcRange: '₹14–16.5 LPA',
      inHandRange: '₹72,000–82,000/month',
      hasBond: true,
      bondAmount: '₹5,00,000',
      bondPeriod: '3 years post-training',
      perks: ['Work on LCA Tejas, Prachand LCH, AMCA programs', 'HAL townships in Bangalore & Nashik (Ozar)', 'Strict 5-day 8AM–4:45PM schedule', 'Subsidized departmental canteens & bus network', 'HAL Hospital with full family coverage'],
      source: 'Reddit r/jobsinindia, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bangalore (Aircraft/Helicopter/Engine Div)', 'Nashik/Ozar (Fighter jets)', 'Koraput (Odisha)', 'Lucknow', 'Kanpur', 'Hyderabad'],
    recruitments: [
      {
        id: 'hal-mt-2025',
        title: 'HAL MT 2025',
        postName: 'Management Trainee',
        totalVacancies: 85,
        qualifications: ['B.Tech'],
        gateRequired: false,
        currentPhase: 'result',
        sourceUrl: 'https://hal-india.co.in/Career_Dept.aspx',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'MT (Aeronautical)', branch: 'Aerospace', vacancies: 30, gateRequired: false, minQualification: 'B.Tech Aeronautical/Aerospace' },
          { postName: 'MT (Mechanical)', branch: 'Mechanical', vacancies: 25, gateRequired: false, minQualification: 'B.Tech Mechanical' },
          { postName: 'MT (Electronics)', branch: 'Electronics', vacancies: 20, gateRequired: false, minQualification: 'B.Tech ECE' },
          { postName: 'MT (Electrical)', branch: 'Electrical', vacancies: 10, gateRequired: false, minQualification: 'B.Tech Electrical' }
        ],
        phases: makePhases('result', { result: '2025-12-15' })
      }
    ]
  },
  {
    id: 'bel',
    slug: 'bel',
    name: 'BEL',
    fullName: 'Bharat Electronics Limited',
    category: 'Navratna',
    sector: 'Defence Electronics',
    logoEmoji: '📡',
    careerUrl: 'https://bel-india.in/careers/',
    color: '#004B87',
    branches: ['Electronics', 'Mechanical', 'CSE/IT', 'Electrical', 'Civil', 'HR', 'Finance'],
    salary: {
      grade: 'E-II (IDA)',
      payScale: '₹40,000–1,40,000',
      ctcRange: '₹12.5–13.8 LPA',
      inHandRange: '₹65,000–74,000/month',
      hasBond: true,
      bondAmount: '₹3,00,000',
      bondPeriod: '3 years',
      perks: ['Work on Akash missile radar, Naval sonars, EW systems', 'Jalahalli campus (Bangalore) — lush greenery', '5-day 8:30AM–5PM schedule', 'Full cashless family medical', 'Subsidized cafeteria & employee buses'],
      source: 'Glassdoor India, Reddit'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bangalore (Jalahalli HQ)', 'Ghaziabad (Radar/NCW)', 'Hyderabad (EW)', 'Chennai', 'Pune', 'Panchkula'],
    recruitments: [
      {
        id: 'bel-pe-2025',
        title: 'BEL Probationary Engineer 2025',
        postName: 'Probationary Engineer',
        totalVacancies: 120,
        qualifications: ['B.Tech'],
        gateRequired: false,
        currentPhase: 'notification_out',
        sourceUrl: 'https://bel-india.in/careers/',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Probationary Engineer (Electronics)', branch: 'Electronics', vacancies: 60, gateRequired: false, minQualification: 'B.Tech ECE' },
          { postName: 'Probationary Engineer (Mechanical)', branch: 'Mechanical', vacancies: 25, gateRequired: false, minQualification: 'B.Tech Mechanical' },
          { postName: 'Probationary Engineer (CSE)', branch: 'CSE/IT', vacancies: 20, gateRequired: false, minQualification: 'B.Tech CSE/IT' },
          { postName: 'Probationary Engineer (Electrical)', branch: 'Electrical', vacancies: 15, gateRequired: false, minQualification: 'B.Tech Electrical' }
        ],
        phases: makePhases('notification_out', { notification_out: '2025-06-10' })
      }
    ]
  },
  {
    id: 'sail',
    slug: 'sail',
    name: 'SAIL',
    fullName: 'Steel Authority of India Limited',
    category: 'Maharatna',
    sector: 'Steel',
    logoEmoji: '🏗️',
    careerUrl: 'https://www.sailcareers.com',
    color: '#003580',
    branches: ['Metallurgy', 'Mechanical', 'Electrical', 'Chemical', 'Civil', 'Mining', 'CSE/IT', 'HR', 'Finance'],
    salary: {
      grade: 'E-1 (IDA)',
      payScale: '₹50,000–1,60,000',
      ctcRange: '₹15.5–17.5 LPA',
      inHandRange: '₹72,000–95,000/month',
      hasBond: true,
      bondAmount: '₹2,50,000–3,00,000',
      bondPeriod: '3 years post-training',
      perks: ['Steel City bungalows (Bhilai, Bokaro, Rourkela)', 'Free SAIL Hospitals (state-of-the-art)', 'Golf courses & clubs in steel townships', 'Subsidized steel purchase for personal house', 'Secured community environment'],
      source: 'Quora, Reddit r/india'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bhilai (CG)', 'Bokaro (JH)', 'Rourkela (Odisha)', 'Durgapur (WB)', 'Burnpur/Asansol (WB)', 'Salem (TN)'],
    recruitments: [
      {
        id: 'sail-mt-2025',
        title: 'SAIL MT 2025',
        postName: 'Management Trainee',
        totalVacancies: 200,
        qualifications: ['B.Tech', 'MBA', 'CA/CMA'],
        gateRequired: true,
        currentPhase: 'application_closed',
        sourceUrl: 'https://www.sailcareers.com',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'MT-Technical (Metallurgy)', branch: 'Metallurgy', vacancies: 60, gateRequired: true, minQualification: 'B.Tech Metallurgy' },
          { postName: 'MT-Technical (Mechanical)', branch: 'Mechanical', vacancies: 50, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'MT-Technical (Electrical)', branch: 'Electrical', vacancies: 40, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'MT-Admin (HR)', branch: 'HR', vacancies: 25, gateRequired: false, minQualification: 'MBA HR' },
          { postName: 'MT-Admin (Finance)', branch: 'Finance', vacancies: 25, gateRequired: false, minQualification: 'CA/CMA/MBA Finance' }
        ],
        phases: makePhases('application_closed', { application_closed: '2025-05-15' })
      }
    ]
  },
  {
    id: 'gail',
    slug: 'gail',
    name: 'GAIL',
    fullName: 'GAIL (India) Limited',
    category: 'Maharatna',
    sector: 'Natural Gas',
    logoEmoji: '🌿',
    careerUrl: 'https://gailonline.com',
    color: '#006747',
    branches: ['Chemical', 'Mechanical', 'Electrical', 'Electronics', 'Civil', 'CSE/IT', 'Management', 'HR', 'Finance'],
    salary: {
      grade: 'E-2 (IDA)',
      payScale: '₹60,000–1,80,000',
      ctcRange: '₹17–20.5 LPA',
      inHandRange: '₹88,000–1,05,000/month',
      hasBond: false,
      perks: ['NO BOND — highest career flexibility among Maharatnas', 'Highest profit-per-employee in India → massive PRP (₹2.5–4.2L/year)', 'Townships at Pata Petrochemical complex & Vijaipur', 'Company lease up to ₹32,000 in Delhi NCR', 'Comprehensive Apollo/Fortis/Max cashless medical'],
      source: 'Reddit r/india, r/jobsinindia'
    },
    activeRecruitments: 1,
    typicalLocations: ['New Delhi / Noida (HQ)', 'Pata (Auraiya, UP)', 'Vijaipur (MP)', 'Vaghodia (GJ)', 'Mumbai', 'Hyderabad'],
    recruitments: [
      {
        id: 'gail-et-2025',
        title: 'GAIL ET 2025',
        postName: 'Executive Trainee',
        totalVacancies: 90,
        qualifications: ['B.Tech', 'CA/CMA'],
        gateRequired: true,
        currentPhase: 'exam_date',
        sourceUrl: 'https://gailonline.com',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'ET (Chemical)', branch: 'Chemical', vacancies: 30, gateRequired: true, minQualification: 'B.Tech Chemical' },
          { postName: 'ET (Mechanical)', branch: 'Mechanical', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'ET (Electrical)', branch: 'Electrical', vacancies: 20, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'ET (Instrumentation)', branch: 'Electronics', vacancies: 10, gateRequired: true, minQualification: 'B.Tech Instrumentation' },
          { postName: 'ET (Finance)', branch: 'Finance', vacancies: 5, gateRequired: false, minQualification: 'CA/CMA' }
        ],
        phases: makePhases('exam_date', { exam_date: '2025-08-20' })
      }
    ]
  },
  {
    id: 'power-grid',
    slug: 'power-grid',
    name: 'Power Grid',
    fullName: 'Power Grid Corporation of India',
    category: 'Maharatna',
    sector: 'Power Transmission',
    logoEmoji: '🔌',
    careerUrl: 'https://www.powergrid.in/job-opportunities',
    color: '#00539B',
    branches: ['Electrical', 'Electronics', 'Civil', 'CSE/IT', 'HR', 'Finance'],
    salary: {
      grade: 'E-1→E-2 (IDA)',
      payScale: '₹40,000→₹50,000–1,60,000',
      ctcRange: '₹14–17.5 LPA',
      inHandRange: '₹68,000–96,000/month',
      hasBond: true,
      bondAmount: '₹2,50,000',
      bondPeriod: '3 years (+ 1 year training)',
      perks: ['Peaceful gated substation townships with 24/7 uninterrupted power', 'Consistent Excellent MoU → top-tier PRP (₹2–3.5L/year)', 'Smartphone, broadband, laptop reimbursements', 'Strong promotion trajectory vs manufacturing PSUs', 'Full nuclear & extended family medical'],
      source: 'Reddit r/india'
    },
    activeRecruitments: 1,
    typicalLocations: ['Gurugram HQ (NCR)', 'Substations across all states', 'Regional HQs: Delhi, Nagpur, Kolkata, Bangalore, Shillong'],
    recruitments: [
      {
        id: 'pgcil-et-2025',
        title: 'PGCIL ET 2025',
        postName: 'Executive Trainee',
        totalVacancies: 150,
        qualifications: ['B.Tech'],
        gateRequired: true,
        currentPhase: 'final_joining',
        sourceUrl: 'https://www.powergrid.in/job-opportunities',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'ET (Electrical)', branch: 'Electrical', vacancies: 80, gateRequired: true, minQualification: 'B.Tech Electrical' },
          { postName: 'ET (Electronics)', branch: 'Electronics', vacancies: 30, gateRequired: true, minQualification: 'B.Tech ECE' },
          { postName: 'ET (Civil)', branch: 'Civil', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Civil' },
          { postName: 'ET (CSE)', branch: 'CSE/IT', vacancies: 15, gateRequired: true, minQualification: 'B.Tech CSE/IT' }
        ],
        phases: makePhases('final_joining', { final_joining: '2025-11-01' })
      }
    ]
  },
  {
    id: 'sbi',
    slug: 'sbi',
    name: 'SBI',
    fullName: 'State Bank of India',
    category: 'Bank',
    sector: 'Banking',
    logoEmoji: '🏦',
    careerUrl: 'https://sbi.co.in/web/careers',
    color: '#22409A',
    branches: ['Management', 'Finance', 'CSE/IT', 'All Branches'],
    salary: {
      grade: 'JMGS-I (IBA Scale)',
      payScale: '₹48,480–₹69,810',
      ctcRange: '₹12–14 LPA',
      inHandRange: '₹62,000–72,000/month',
      hasBond: false,
      perks: ['Job security and pension (Defined Benefit)', 'Transfer-based posting across India', 'Home loan at subsidized rates (staff rate)', 'Education loan for children at concessional rate', 'Housing rent leasing in all cities'],
      source: 'Reddit r/india, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Any city/town across India (transfer-based)', 'Corporate Centre Mumbai', 'LHO (Local Head Office) in every state capital'],
    recruitments: [
      {
        id: 'sbi-po-2025',
        title: 'SBI PO & SO 2025',
        postName: 'PO / SO / Clerk',
        totalVacancies: 10200,
        qualifications: ['Any Graduation', 'B.Tech'],
        gateRequired: false,
        currentPhase: 'application_open',
        sourceUrl: 'https://sbi.co.in/web/careers',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Probationary Officer (PO)', branch: 'All Branches', vacancies: 2000, gateRequired: false, minQualification: 'Any Graduation (min 60%)' },
          { postName: 'Junior Associate (Clerk)', branch: 'All Branches', vacancies: 8000, gateRequired: false, minQualification: 'Any Graduation' },
          { postName: 'Specialist Officer - IT', branch: 'CSE/IT', vacancies: 200, gateRequired: false, minQualification: 'B.Tech CSE/IT' }
        ],
        phases: makePhases('application_open', { application_open: '2025-06-15' })
      }
    ]
  },
  {
    id: 'isro',
    slug: 'isro',
    name: 'ISRO',
    fullName: 'Indian Space Research Organisation',
    category: 'Research',
    sector: 'Space & Defence',
    logoEmoji: '🚀',
    careerUrl: 'https://www.isro.gov.in/Careers.html',
    color: '#003087',
    branches: ['Mechanical', 'Electronics', 'CSE/IT', 'Electrical', 'Civil', 'Aerospace', 'Science'],
    salary: {
      grade: 'Scientist/Engineer SC — Level 10 (7th CPC CDA)',
      payScale: '₹56,100–1,77,500',
      ctcRange: '₹13–15.5 LPA',
      inHandRange: '₹85,000–98,000/month',
      hasBond: false,
      perks: ['NO BOND — direct recruits via GATE/ICRB', 'Highest societal prestige in India (Chandrayaan, Gaganyaan contributor)', 'CHSS: 100% free cashless medical for entire family', 'Green serene campuses with departmental bus transport', 'Merit-based promotion delinked from vacancies', 'Subsidized high-quality canteens'],
      source: 'Reddit r/cscareerquestions_india, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bangalore (URSC, ISTRAC, ISRO HQ)', 'Thiruvananthapuram (VSSC, LPSC)', 'Sriharikota (SDSC SHAR)', 'Ahmedabad (SAC)', 'Hyderabad (NRSC)'],
    recruitments: [
      {
        id: 'isro-sc-2025',
        title: 'ISRO Scientist/Engineer SC 2025',
        postName: 'Scientist/Engineer SC',
        totalVacancies: 65,
        qualifications: ['B.Tech'],
        gateRequired: true,
        currentPhase: 'notification_out',
        sourceUrl: 'https://www.isro.gov.in/Careers.html',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Scientist/Engineer SC (Mechanical)', branch: 'Mechanical', vacancies: 20, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'Scientist/Engineer SC (Electronics)', branch: 'Electronics', vacancies: 18, gateRequired: true, minQualification: 'B.Tech ECE' },
          { postName: 'Scientist/Engineer SC (CSE)', branch: 'CSE/IT', vacancies: 15, gateRequired: true, minQualification: 'B.Tech CSE/IT' },
          { postName: 'Scientist/Engineer SC (Electrical)', branch: 'Electrical', vacancies: 12, gateRequired: true, minQualification: 'B.Tech Electrical' }
        ],
        phases: makePhases('notification_out', { notification_out: '2025-04-01' })
      }
    ]
  },
  {
    id: 'drdo',
    slug: 'drdo',
    name: 'DRDO',
    fullName: 'Defence Research and Development Organisation',
    category: 'Defence',
    sector: 'Defence R&D',
    logoEmoji: '🛡️',
    careerUrl: 'https://rac.gov.in',
    color: '#4A1942',
    branches: ['Electronics', 'CSE/IT', 'Mechanical', 'Electrical', 'Aerospace', 'Chemical', 'Metallurgy', 'Science'],
    salary: {
      grade: 'Scientist B — Level 10 (7th CPC CDA)',
      payScale: '₹56,100–1,77,500',
      ctcRange: '₹13–15.5 LPA',
      inHandRange: '₹86,000–98,000/month',
      hasBond: true,
      bondAmount: '₹20,00,000',
      bondPeriod: '3 years post-induction training',
      perks: ['Group A Gazetted Officer status (GoI)', 'Time-bound promotions up to Scientist G (no vacancy-based constraint)', 'Sponsored M.Tech/PhD at IITs/IISc/DIAT Pune', 'CGHS medical for full family', '5-day work week with high research autonomy'],
      source: 'Reddit r/india, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bangalore (ADE, LRDE, CAIR, GTRE)', 'Hyderabad (DRDL, RCI, ASL)', 'Delhi NCR (SSPL, SAG, DRDO HQ)', 'Pune (ARDE, HEMRL)', 'Vizag (NSTL)', 'Chandipur (ITR)'],
    recruitments: [
      {
        id: 'drdo-sc-b-2025',
        title: 'DRDO Scientist B 2025',
        postName: 'Scientist B',
        totalVacancies: 115,
        qualifications: ['B.Tech'],
        gateRequired: true,
        currentPhase: 'result',
        sourceUrl: 'https://rac.gov.in',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Scientist B (Electronics)', branch: 'Electronics', vacancies: 40, gateRequired: true, minQualification: 'B.Tech ECE' },
          { postName: 'Scientist B (CSE)', branch: 'CSE/IT', vacancies: 35, gateRequired: true, minQualification: 'B.Tech CSE' },
          { postName: 'Scientist B (Mechanical)', branch: 'Mechanical', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'Scientist B (Aeronautics)', branch: 'Aerospace', vacancies: 15, gateRequired: true, minQualification: 'B.Tech Aeronautical' }
        ],
        phases: makePhases('result', { result: '2025-10-01' })
      }
    ]
  },
  {
    id: 'coal-india',
    slug: 'coal-india',
    name: 'Coal India',
    fullName: 'Coal India Limited',
    category: 'Maharatna',
    sector: 'Mining & Energy',
    logoEmoji: '⛏️',
    careerUrl: 'https://www.coalindia.in/career-cil/',
    color: '#2D2D2D',
    branches: ['Mining', 'Mechanical', 'Electrical', 'Civil', 'Geology', 'CSE/IT', 'HR', 'Finance'],
    salary: {
      grade: 'E-2→E-3 (IDA)',
      payScale: '₹50,000→₹60,000–1,80,000',
      ctcRange: '₹15.5–18 LPA',
      inHandRange: '₹72,000–1,02,000/month',
      hasBond: true,
      bondAmount: '₹3,00,000',
      bondPeriod: '5 years',
      perks: ['Historic British-era clubs with billiards, tennis, swimming in mining colonies', 'Free independent bungalows with lawns in colliery townships', 'Underground allowance +9–12% basic for mine engineers', 'Free coal & heavy electricity quota', 'Coal Mines PF (CMPF) + pension'],
      source: 'Quora, Reddit r/india'
    },
    activeRecruitments: 1,
    typicalLocations: ['Bilaspur/Korba (CG - SECL)', 'Dhanbad (JH - BCCL)', 'Ranchi (JH - CCL)', 'Singrauli (MP - NCL)', 'Nagpur (MH - WCL)', 'Bhubaneswar/Talcher (Odisha - MCL)'],
    recruitments: [
      {
        id: 'cil-mt-2025',
        title: 'Coal India MT 2025',
        postName: 'Management Trainee',
        totalVacancies: 300,
        qualifications: ['B.Tech', 'CA/CMA', 'MBA'],
        gateRequired: false,
        currentPhase: 'application_open',
        sourceUrl: 'https://www.coalindia.in/career-cil/',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'MT (Mining)', branch: 'Mining', vacancies: 120, gateRequired: false, minQualification: 'B.Tech Mining' },
          { postName: 'MT (Mechanical)', branch: 'Mechanical', vacancies: 60, gateRequired: false, minQualification: 'B.Tech Mechanical' },
          { postName: 'MT (Electrical)', branch: 'Electrical', vacancies: 50, gateRequired: false, minQualification: 'B.Tech Electrical' },
          { postName: 'MT (Civil)', branch: 'Civil', vacancies: 30, gateRequired: false, minQualification: 'B.Tech Civil' },
          { postName: 'MT (Finance)', branch: 'Finance', vacancies: 20, gateRequired: false, minQualification: 'CA/CMA' },
          { postName: 'MT (HR)', branch: 'HR', vacancies: 20, gateRequired: false, minQualification: 'MBA HR' }
        ],
        phases: makePhases('application_open', { application_open: '2025-09-05' })
      }
    ]
  },
  {
    id: 'hpcl',
    slug: 'hpcl',
    name: 'HPCL',
    fullName: 'Hindustan Petroleum Corporation Limited',
    category: 'Maharatna',
    sector: 'Oil & Gas',
    logoEmoji: '⛽',
    careerUrl: 'https://www.hindustanpetroleum.com/job-openings',
    color: '#005DAA',
    branches: ['Mechanical', 'Chemical', 'Electrical', 'Civil', 'Electronics', 'CSE/IT', 'HR', 'Finance', 'Management'],
    salary: {
      grade: 'Grade A / E-2 (IDA)',
      payScale: '₹50,000–1,60,000',
      ctcRange: '₹17–18.5 LPA',
      inHandRange: '₹70,000–93,000/month',
      hasBond: true,
      bondAmount: '₹3,00,000',
      bondPeriod: '3 years',
      perks: ['60–80 litres fuel reimbursed monthly', 'Company lease up to ₹35,000 in Mumbai postings', '100% cashless family medical', 'Furniture & IT device reimbursement every 3–5 years', 'Subsidized holiday homes at hill/coastal resorts'],
      source: 'Reddit r/india, Glassdoor'
    },
    activeRecruitments: 1,
    typicalLocations: ['Mumbai (Mahul Refinery & HQ)', 'Visakhapatnam Refinery', 'Delhi', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad'],
    recruitments: [
      {
        id: 'hpcl-officer-2025',
        title: 'HPCL Officer Recruitment 2025',
        postName: 'Officer / Engineer',
        totalVacancies: 180,
        qualifications: ['B.Tech', 'MBA', 'CA/CMA'],
        gateRequired: false,
        currentPhase: 'admit_card',
        sourceUrl: 'https://www.hindustanpetroleum.com/job-openings',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Engineer (Mechanical)', branch: 'Mechanical', vacancies: 50, gateRequired: false, minQualification: 'B.Tech Mechanical' },
          { postName: 'Engineer (Chemical)', branch: 'Chemical', vacancies: 40, gateRequired: false, minQualification: 'B.Tech Chemical' },
          { postName: 'Engineer (Electrical)', branch: 'Electrical', vacancies: 35, gateRequired: false, minQualification: 'B.Tech Electrical' },
          { postName: 'Engineer (Civil)', branch: 'Civil', vacancies: 20, gateRequired: false, minQualification: 'B.Tech Civil' },
          { postName: 'Officer (HR)', branch: 'HR', vacancies: 15, gateRequired: false, minQualification: 'MBA HR' },
          { postName: 'Officer (Finance)', branch: 'Finance', vacancies: 20, gateRequired: false, minQualification: 'CA/CMA' }
        ],
        phases: makePhases('admit_card', { admit_card: '2025-10-01' })
      }
    ]
  },
  {
    id: 'barc',
    slug: 'barc',
    name: 'BARC',
    fullName: 'Bhabha Atomic Research Centre',
    category: 'Research',
    sector: 'Nuclear R&D',
    logoEmoji: '⚛️',
    careerUrl: 'https://barcocesexam.in',
    color: '#00285E',
    branches: ['Mechanical', 'Electronics', 'CSE/IT', 'Electrical', 'Chemical', 'Metallurgy', 'Science'],
    salary: {
      grade: 'Scientific Officer C — Level 10+ (7th CPC CDA)',
      payScale: '₹59,500–1,77,500 (with advance increments)',
      ctcRange: '₹14.5–17 LPA',
      inHandRange: '₹74,000–1,05,000/month',
      hasBond: false,
      perks: ['Training stipend: flat ₹74,000/month during 1-year OCES', 'PRIS bonus: 20–40% annual departmental performance incentive', 'Anushaktinagar township (Mumbai) — finest nuclear city campus', 'BARC hospital system — legendary comprehensive family coverage', 'Book grant ₹30,000 at joining + research sabbaticals'],
      source: 'Reddit r/india, Quora'
    },
    activeRecruitments: 1,
    typicalLocations: ['Trombay, Mumbai (BARC Main Centre)', 'Kalpakkam (IGCAR, TN)', 'Mysuru (BRIT)', 'Hyderabad (NFC)', 'Tarapur (TAPS, MH)', 'Rawatbhata (RAPS, Rajasthan)'],
    recruitments: [
      {
        id: 'barc-oces-2025',
        title: 'BARC OCES 2025',
        postName: 'Scientific Officer C',
        totalVacancies: 72,
        qualifications: ['B.Tech'],
        gateRequired: true,
        currentPhase: 'exam_date',
        sourceUrl: 'https://barcocesexam.in',
        lastUpdated: new Date().toISOString(),
        posts: [
          { postName: 'Scientific Officer C (Mechanical)', branch: 'Mechanical', vacancies: 25, gateRequired: true, minQualification: 'B.Tech Mechanical' },
          { postName: 'Scientific Officer C (Electronics)', branch: 'Electronics', vacancies: 20, gateRequired: true, minQualification: 'B.Tech ECE' },
          { postName: 'Scientific Officer C (CSE)', branch: 'CSE/IT', vacancies: 15, gateRequired: true, minQualification: 'B.Tech CSE' },
          { postName: 'Scientific Officer C (Chemical)', branch: 'Chemical', vacancies: 12, gateRequired: true, minQualification: 'B.Tech Chemical/Chemistry' }
        ],
        phases: makePhases('exam_date', { exam_date: '2025-05-15' })
      }
    ]
  }
];
