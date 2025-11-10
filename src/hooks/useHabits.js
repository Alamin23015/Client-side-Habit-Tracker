import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const useHabits = ({ limit, sort, category, search } = {}) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit);
        if (sort) params.append("sort", sort);
        if (category) params.append("category", category);
        if (search) params.append("search", search);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/habits?${params.toString()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setHabits(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load habits");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, [user, limit, sort, category, search]);

  return { habits, loading, error, refetch: () => fetchHabits() };
};

export default useHabits;