-- PSUTrack Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- ENUM TYPES
-- =====================
CREATE TYPE psu_category AS ENUM (
    'Maharatna', 'Navratna', 'Miniratna', 'Bank', 'Defence', 'Research'
);

CREATE TYPE phase_name AS ENUM (
    'notification_out',
    'application_open',
    'application_closed',
    'admit_card',
    'exam_date',
    'result',
    'final_joining'
);

CREATE TYPE phase_status AS ENUM ('pending', 'active', 'completed');
CREATE TYPE scraper_status AS ENUM ('success', 'failed', 'partial');

-- =====================
-- CORE TABLES
-- =====================

-- PSU Registry
CREATE TABLE public.psu_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,           -- URL-friendly: 'ongc', 'ntpc', 'power-grid'
    name TEXT NOT NULL,                  -- Short: 'ONGC'
    full_name TEXT,                      -- Full: 'Oil and Natural Gas Corporation'
    category psu_category NOT NULL,
    sector TEXT,                         -- 'Oil & Gas', 'Power', 'Banking'
    career_url TEXT NOT NULL,
    logo_emoji TEXT,                     -- '🛢️' (fallback before real logos)
    logo_url TEXT,                       -- Real logo URL (optional)
    brand_color TEXT,                    -- Hex color '#CC2229'
    scraper_module TEXT NOT NULL,        -- 'ongc' → maps to scrapers/ongc.py
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recruitments
CREATE TABLE public.recruitments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    psu_id UUID NOT NULL REFERENCES public.psu_list(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    post_name TEXT,
    total_vacancies INTEGER,
    qualifications TEXT[] DEFAULT '{}',
    gate_based BOOLEAN DEFAULT false,
    source_url TEXT,
    current_phase phase_name DEFAULT 'notification_out',
    raw_text TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(psu_id, title)
);

-- Phase Timeline
CREATE TABLE public.phases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recruitment_id UUID NOT NULL REFERENCES public.recruitments(id) ON DELETE CASCADE,
    phase_name phase_name NOT NULL,
    phase_status phase_status DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    notes TEXT,
    source_link TEXT,
    detected_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(recruitment_id, phase_name)
);

-- User Watchlist
CREATE TABLE public.user_watchlist (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    psu_id UUID NOT NULL REFERENCES public.psu_list(id) ON DELETE CASCADE,
    notify_email BOOLEAN DEFAULT true,
    notify_browser BOOLEAN DEFAULT true,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, psu_id)
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    recruitment_id UUID REFERENCES public.recruitments(id) ON DELETE SET NULL,
    change_type TEXT NOT NULL,  -- PHASE_CHANGE | NEW_RECRUITMENT | DATE_CHANGE | LINK_ADDED
    message TEXT NOT NULL,
    phase phase_name,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scraper Health Logs
CREATE TABLE public.scraper_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    psu_id UUID REFERENCES public.psu_list(id) ON DELETE SET NULL,
    run_at TIMESTAMPTZ DEFAULT NOW(),
    status scraper_status NOT NULL,
    items_found INTEGER DEFAULT 0,
    items_changed INTEGER DEFAULT 0,
    error_message TEXT
);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX idx_recruitments_psu ON public.recruitments(psu_id);
CREATE INDEX idx_recruitments_phase ON public.recruitments(current_phase);
CREATE INDEX idx_recruitments_active ON public.recruitments(is_active);
CREATE INDEX idx_phases_recruitment ON public.phases(recruitment_id);
CREATE INDEX idx_watchlist_user ON public.user_watchlist(user_id);
CREATE INDEX idx_watchlist_psu ON public.user_watchlist(psu_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE public.psu_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- PSU list and recruitments: readable by everyone (public data)
CREATE POLICY "Public read PSUs" ON public.psu_list FOR SELECT USING (true);
CREATE POLICY "Public read recruitments" ON public.recruitments FOR SELECT USING (true);
CREATE POLICY "Public read phases" ON public.phases FOR SELECT USING (true);

-- Watchlist: users can only see/modify their own
CREATE POLICY "Users manage own watchlist" ON public.user_watchlist
    USING (auth.uid() = user_id);

-- Notifications: users can only see their own
CREATE POLICY "Users read own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- =====================
-- SEED DATA: PSU List
-- =====================
INSERT INTO public.psu_list (slug, name, full_name, category, sector, career_url, logo_emoji, brand_color, scraper_module) VALUES
('ongc', 'ONGC', 'Oil and Natural Gas Corporation', 'Maharatna', 'Oil & Gas', 'https://ongcindia.com/web/eng/career', '🛢️', '#CC2229', 'ongc'),
('ntpc', 'NTPC', 'NTPC Limited', 'Maharatna', 'Power', 'https://careers.ntpc.co.in', '⚡', '#003A8C', 'ntpc'),
('bhel', 'BHEL', 'Bharat Heavy Electricals Limited', 'Maharatna', 'Heavy Engineering', 'https://careers.bhel.in', '⚙️', '#003366', 'bhel'),
('iocl', 'IOCL', 'Indian Oil Corporation Limited', 'Maharatna', 'Oil & Refining', 'https://iocl.com/latest-job-opening', '🔥', '#E31E24', 'iocl'),
('hal', 'HAL', 'Hindustan Aeronautics Limited', 'Navratna', 'Aerospace & Defence', 'https://hal-india.co.in/Career_Dept.aspx', '✈️', '#003087', 'hal'),
('bel', 'BEL', 'Bharat Electronics Limited', 'Navratna', 'Defence Electronics', 'https://bel-india.in/careers/', '📡', '#004B87', 'bel'),
('sail', 'SAIL', 'Steel Authority of India Limited', 'Maharatna', 'Steel', 'https://www.sailcareers.com', '🏗️', '#003580', 'sail'),
('gail', 'GAIL', 'GAIL (India) Limited', 'Maharatna', 'Natural Gas', 'https://gailonline.com', '🌿', '#006747', 'gail'),
('power-grid', 'Power Grid', 'Power Grid Corporation of India', 'Maharatna', 'Power Transmission', 'https://www.powergrid.in/job-opportunities', '🔌', '#00539B', 'power_grid'),
('sbi', 'SBI', 'State Bank of India', 'Bank', 'Banking', 'https://sbi.co.in/web/careers', '🏦', '#22409A', 'sbi'),
('isro', 'ISRO', 'Indian Space Research Organisation', 'Research', 'Space & Defence', 'https://www.isro.gov.in/Careers.html', '🚀', '#003087', 'isro'),
('drdo', 'DRDO', 'Defence Research and Development Organisation', 'Defence', 'Defence R&D', 'https://rac.gov.in', '🛡️', '#4A1942', 'drdo'),
('coal-india', 'Coal India', 'Coal India Limited', 'Maharatna', 'Mining', 'https://www.coalindia.in/career-cil/', '⛏️', '#333333', 'coal_india'),
('hpcl', 'HPCL', 'Hindustan Petroleum Corporation Limited', 'Maharatna', 'Oil & Refining', 'https://www.hindustanpetroleum.com/job-openings', '⛽', '#005DAA', 'hpcl'),
('barc', 'BARC', 'Bhabha Atomic Research Centre', 'Research', 'Nuclear Research', 'https://barcocesexam.in', '⚛️', '#00285E', 'barc');
