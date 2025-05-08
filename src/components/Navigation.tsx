
import React from 'react';
import { useApp } from '@/context/AppContext';

const Navigation: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        <button 
          className={`flex-1 py-3 flex flex-col items-center justify-center ${
            currentTab === 'recipes' ? 'text-app-green' : 'text-gray-400'
          }`}
          onClick={() => setCurrentTab('recipes')}
        >
          <span className="text-xl">📝</span>
          <span className="text-xs">레시피</span>
        </button>
        <button 
          className={`flex-1 py-3 flex flex-col items-center justify-center ${
            currentTab === 'fridge' ? 'text-app-green' : 'text-gray-400'
          }`}
          onClick={() => setCurrentTab('fridge')}
        >
          <span className="text-xl">🧊</span>
          <span className="text-xs">내 냉장고</span>
        </button>
        <button 
          className={`flex-1 py-3 flex flex-col items-center justify-center ${
            currentTab === 'mypage' ? 'text-app-green' : 'text-gray-400'
          }`}
          onClick={() => setCurrentTab('mypage')}
        >
          <span className="text-xl">👤</span>
          <span className="text-xs">마이페이지</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
