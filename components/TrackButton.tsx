'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { createClient } from '../lib/supabase';

interface Props {
  psuId: string;
  psuName: string;
}

export default function TrackButton({ psuId, psuName }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [isTracking, setIsTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    supabase
      .from('user_watchlist')
      .select('psu_id')
      .eq('user_id', user.id)
      .eq('psu_id', psuId)
      .single()
      .then(({ data }) => setIsTracking(!!data));
  }, [user, psuId]);

  const handleClick = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(true);
    if (isTracking) {
      await supabase.from('user_watchlist').delete().eq('user_id', user.id).eq('psu_id', psuId);
      setIsTracking(false);
    } else {
      await supabase.from('user_watchlist').insert({ user_id: user.id, psu_id: psuId });
      setIsTracking(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={isTracking ? 'btn btn-track-active' : 'btn btn-ghost'}
      style={{ fontSize: '0.85rem', padding: '8px 16px', width: '100%' }}
    >
      {loading ? '...' : isTracking ? '✓ Tracking' : '+ Track This'}
    </button>
  );
}
