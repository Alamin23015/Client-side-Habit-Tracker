// src/hooks/useHabits.js
import { useEffect, useState } from 'react';

const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://habit-hero-server.vercel.app/habits'); // তোমার সার্ভার URL
        const data = await res.json();
        setHabits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHabits();
  }, []);

  return { habits, loading, error };
};

export default useHabits;