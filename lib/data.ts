export type PhaseStatus = 'completed' | 'active' | 'upcoming';
export type PhaseName = 
  | 'notification_out'
  | 'application_open'
  | 'application_closed'
  | 'admit_card'
  | 'exam_date'
  | 'result'
  | 'final_joining';

export interface Phase {
  name: PhaseName;
  label: string; // human readable
  status: PhaseStatus;
  date?: string; // ISO string
  link?: string;
}

export interface Recruitment {
  id: string;
  title: string;
  postName: string;
  vacancies: number;
  qualifications: string[];
  gateRequired: boolean;
  currentPhase: PhaseName;
  phases: Phase[];
  sourceUrl: string;
  lastUpdated: string;
}

export interface PSU {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  category: 'Maharatna' | 'Navratna' | 'Miniratna' | 'Bank' | 'Defence';
  sector: string;
  logoEmoji: string; // Use relevant emoji as placeholder logo
  careerUrl: string;
  color: string; // brand color hex
  activeRecruitments: number;
  recruitments: Recruitment[];
}

const commonPhases = (current: PhaseName): Phase[] => {
  const order: PhaseName[] = [
    'notification_out',
    'application_open',
    'application_closed',
    'admit_card',
    'exam_date',
    'result',
    'final_joining'
  ];
  
  const labels: Record<PhaseName, string> = {
    notification_out: 'Notification Out',
    application_open: 'Application Open',
    application_closed: 'Application Closed',
    admit_card: 'Admit Card',
    exam_date: 'Exam Date',
    result: 'Result',
    final_joining: 'Final Joining'
  };

  const currentIndex = order.indexOf(current);

  return order.map((name, index) => {
    let status: PhaseStatus = 'upcoming';
    if (index < currentIndex) status = 'completed';
    if (index === currentIndex) status = 'active';

    return {
      name,
      label: labels[name],
      status,
      date: status !== 'upcoming' ? '2025-06-15' : undefined
    };
  });
};

export const PSUS: PSU[] = [
  {
    id: '1', slug: 'ongc', name: 'ONGC', fullName: 'Oil and Natural Gas Corporation',
    category: 'Maharatna', sector: 'Oil & Gas', logoEmoji: '🛢️', careerUrl: '#', color: '#CC2229', activeRecruitments: 1,
    recruitments: [
      { id: 'r1', title: 'ONGC GET 2025', postName: 'Graduate Executive Trainee', vacancies: 250, qualifications: ['B.Tech'], gateRequired: true, currentPhase: 'application_open', phases: commonPhases('application_open'), sourceUrl: '#', lastUpdated: '2 hours ago' }
    ]
  },
  {
    id: '2', slug: 'ntpc', name: 'NTPC', fullName: 'National Thermal Power Corporation',
    category: 'Maharatna', sector: 'Power', logoEmoji: '⚡', careerUrl: '#', color: '#003A8C', activeRecruitments: 1,
    recruitments: [
      { id: 'r2', title: 'NTPC ET 2025', postName: 'Executive Trainee', vacancies: 150, qualifications: ['B.Tech', 'M.Tech'], gateRequired: true, currentPhase: 'admit_card', phases: commonPhases('admit_card'), sourceUrl: '#', lastUpdated: '1 day ago' }
    ]
  },
  {
    id: '3', slug: 'bhel', name: 'BHEL', fullName: 'Bharat Heavy Electricals Limited',
    category: 'Maharatna', sector: 'Manufacturing', logoEmoji: '⚙️', careerUrl: '#', color: '#003366', activeRecruitments: 1,
    recruitments: [
      { id: 'r3', title: 'BHEL Engineer Trainee 2025', postName: 'Engineer Trainee', vacancies: 120, qualifications: ['B.Tech'], gateRequired: false, currentPhase: 'exam_date', phases: commonPhases('exam_date'), sourceUrl: '#', lastUpdated: '3 days ago' }
    ]
  },
  {
    id: '4', slug: 'iocl', name: 'IOCL', fullName: 'Indian Oil Corporation Limited',
    category: 'Maharatna', sector: 'Oil & Gas', logoEmoji: '🔥', careerUrl: '#', color: '#E31E24', activeRecruitments: 2,
    recruitments: [
      { id: 'r4', title: 'IOCL Officers via GATE', postName: 'Officers/Engineers', vacancies: 300, qualifications: ['B.Tech'], gateRequired: true, currentPhase: 'application_open', phases: commonPhases('application_open'), sourceUrl: '#', lastUpdated: '5 hours ago' }
    ]
  },
  {
    id: '5', slug: 'hal', name: 'HAL', fullName: 'Hindustan Aeronautics Limited',
    category: 'Navratna', sector: 'Defence & Aerospace', logoEmoji: '✈️', careerUrl: '#', color: '#003087', activeRecruitments: 1,
    recruitments: [
      { id: 'r5', title: 'HAL Management Trainee', postName: 'Management Trainee', vacancies: 85, qualifications: ['B.Tech'], gateRequired: false, currentPhase: 'result', phases: commonPhases('result'), sourceUrl: '#', lastUpdated: '1 week ago' }
    ]
  },
  {
    id: '6', slug: 'bel', name: 'BEL', fullName: 'Bharat Electronics Limited',
    category: 'Navratna', sector: 'Defence', logoEmoji: '📡', careerUrl: '#', color: '#004B87', activeRecruitments: 1,
    recruitments: [
      { id: 'r6', title: 'BEL Probationary Engineer', postName: 'Probationary Engineer', vacancies: 110, qualifications: ['B.Tech'], gateRequired: false, currentPhase: 'notification_out', phases: commonPhases('notification_out'), sourceUrl: '#', lastUpdated: 'Just now' }
    ]
  },
  {
    id: '7', slug: 'sail', name: 'SAIL', fullName: 'Steel Authority of India Limited',
    category: 'Maharatna', sector: 'Steel', logoEmoji: '🏗️', careerUrl: '#', color: '#003580', activeRecruitments: 0,
    recruitments: [
      { id: 'r7', title: 'SAIL MT 2025', postName: 'Management Trainee', vacancies: 200, qualifications: ['B.Tech'], gateRequired: true, currentPhase: 'application_closed', phases: commonPhases('application_closed'), sourceUrl: '#', lastUpdated: '2 weeks ago' }
    ]
  },
  {
    id: '8', slug: 'gail', name: 'GAIL', fullName: 'Gas Authority of India Limited',
    category: 'Maharatna', sector: 'Oil & Gas', logoEmoji: '🌿', careerUrl: '#', color: '#006747', activeRecruitments: 1,
    recruitments: [
      { id: 'r8', title: 'GAIL ET 2025', postName: 'Executive Trainee', vacancies: 90, qualifications: ['B.Tech'], gateRequired: true, currentPhase: 'exam_date', phases: commonPhases('exam_date'), sourceUrl: '#', lastUpdated: '1 month ago' }
    ]
  },
  {
    id: '9', slug: 'power-grid', name: 'Power Grid', fullName: 'Power Grid Corporation of India',
    category: 'Maharatna', sector: 'Power', logoEmoji: '🔌', careerUrl: '#', color: '#00539B', activeRecruitments: 1,
    recruitments: [
      { id: 'r9', title: 'PGCIL ET (Electrical)', postName: 'Executive Trainee', vacancies: 150, qualifications: ['B.Tech'], gateRequired: true, currentPhase: 'final_joining', phases: commonPhases('final_joining'), sourceUrl: '#', lastUpdated: '2 days ago' }
    ]
  },
  {
    id: '10', slug: 'sbi', name: 'SBI', fullName: 'State Bank of India',
    category: 'Bank', sector: 'Banking', logoEmoji: '🏦', careerUrl: '#', color: '#22409A', activeRecruitments: 1,
    recruitments: [
      { id: 'r10', title: 'SBI PO 2025', postName: 'Probationary Officer', vacancies: 2000, qualifications: ['Any Degree'], gateRequired: false, currentPhase: 'application_open', phases: commonPhases('application_open'), sourceUrl: '#', lastUpdated: '1 day ago' }
    ]
  },
  {
    id: '11', slug: 'isro', name: 'ISRO', fullName: 'Indian Space Research Organisation',
    category: 'Defence', sector: 'Space', logoEmoji: '🚀', careerUrl: '#', color: '#003087', activeRecruitments: 1,
    recruitments: [
      { id: 'r11', title: 'ISRO Scientist/Engineer', postName: 'Scientist/Engineer SC', vacancies: 65, qualifications: ['B.Tech', 'M.Tech'], gateRequired: false, currentPhase: 'notification_out', phases: commonPhases('notification_out'), sourceUrl: '#', lastUpdated: '10 hours ago' }
    ]
  },
  {
    id: '12', slug: 'drdo', name: 'DRDO', fullName: 'Defence Research and Development Organisation',
    category: 'Defence', sector: 'Defence R&D', logoEmoji: '🛡️', careerUrl: '#', color: '#4A1942', activeRecruitments: 1,
    recruitments: [
      { id: 'r12', title: 'DRDO RAC Scientist B', postName: 'Scientist B', vacancies: 130, qualifications: ['B.Tech', 'M.Sc'], gateRequired: true, currentPhase: 'result', phases: commonPhases('result'), sourceUrl: '#', lastUpdated: '4 days ago' }
    ]
  },
  {
    id: '13', slug: 'coal-india', name: 'Coal India', fullName: 'Coal India Limited',
    category: 'Maharatna', sector: 'Mining', logoEmoji: '⛏️', careerUrl: '#', color: '#1A1A1A', activeRecruitments: 1,
    recruitments: [
      { id: 'r13', title: 'CIL MT 2025', postName: 'Management Trainee', vacancies: 300, qualifications: ['B.Tech', 'CA/ICWA'], gateRequired: false, currentPhase: 'application_open', phases: commonPhases('application_open'), sourceUrl: '#', lastUpdated: '2 days ago' }
    ]
  },
  {
    id: '14', slug: 'hpcl', name: 'HPCL', fullName: 'Hindustan Petroleum Corporation Limited',
    category: 'Maharatna', sector: 'Oil & Gas', logoEmoji: '⛽', careerUrl: '#', color: '#005DAA', activeRecruitments: 1,
    recruitments: [
      { id: 'r14', title: 'HPCL Engineer 2025', postName: 'Engineer', vacancies: 180, qualifications: ['B.Tech'], gateRequired: false, currentPhase: 'admit_card', phases: commonPhases('admit_card'), sourceUrl: '#', lastUpdated: '12 hours ago' }
    ]
  },
  {
    id: '15', slug: 'barc', name: 'BARC', fullName: 'Bhabha Atomic Research Centre',
    category: 'Defence', sector: 'Nuclear R&D', logoEmoji: '⚛️', careerUrl: '#', color: '#00285E', activeRecruitments: 1,
    recruitments: [
      { id: 'r15', title: 'BARC OCES/DGFS 2025', postName: 'Scientific Officer', vacancies: 100, qualifications: ['B.Tech', 'M.Sc'], gateRequired: true, currentPhase: 'exam_date', phases: commonPhases('exam_date'), sourceUrl: '#', lastUpdated: '5 days ago' }
    ]
  }
];
