// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
};