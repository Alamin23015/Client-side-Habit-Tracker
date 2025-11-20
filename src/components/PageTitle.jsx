import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "HabitHero | Build Better Habits"; 
   
    if (path === '/') {
      title = "Home | HabitHero";
    } else if (path === '/login') {
      title = "Login | HabitHero";
    } else if (path === '/register') {
      title = "Register | HabitHero";
    } else if (path === '/add-habit') {
      title = "Add New Habit | HabitHero";
    } else if (path === '/my-habits') {
      title = "My Habits | HabitHero";
    } else if (path === '/browse-public') {
      title = "Browse Habits | HabitHero";
    } else if (path.startsWith('/habit/')) {
      
      title = "Habit Details | HabitHero";
    }

    
    document.title = title;
  }, [location]); 

  return null; 
};

export default PageTitle;