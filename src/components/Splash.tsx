
import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';

const Splash: React.FC = () => {
  const { setIsLoading } = useApp();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-bold text-app-green animate-pulse-opacity mb-8">뭐먹을냉?</h1>
      <div className="loading-spinner">
        <div className="h-16 w-16 rounded-full border-t-4 border-app-green"></div>
      </div>
    </div>
  );
};

export default Splash;
