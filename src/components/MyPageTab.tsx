
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import KoreanKeyboard from './KoreanKeyboard';

const MyPageTab: React.FC = () => {
  const { 
    currentUser, 
    setShowConfirmLogout, 
    showKeyboard,
    setShowKeyboard
  } = useApp();
  
  const handleLogout = () => {
    setShowConfirmLogout(true);
  };
  
  const handleFocus = () => {
    setShowKeyboard(true);
  };
  
  return (
    <div className="min-h-screen pb-16 bg-app-pink bg-opacity-10">
      {/* User profile section */}
      <div className="p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-2">마이 페이지</h1>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-app-pink flex items-center justify-center text-xl">
            👤
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{currentUser?.nickname}</h2>
            <p className="text-gray-500 text-sm">{currentUser?.email}</p>
          </div>
        </div>
      </div>
      
      {/* Settings sections */}
      <div className="mt-4 p-4 bg-white rounded-lg mx-4 shadow-sm">
        <h3 className="font-bold mb-4">계정 설정</h3>
        
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <span>알림 설정</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-app-green"></div>
            </label>
          </div>
          
          <button className="w-full py-3 text-left border-t" onFocus={handleFocus}>
            닉네임 변경
          </button>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <button className="w-full py-3 text-left" onFocus={handleFocus}>
            비밀번호 변경
          </button>
        </div>
        
        <Button
          onClick={handleLogout}
          className="w-full mt-4 bg-white border border-red-500 text-red-500 hover:bg-red-50"
        >
          로그아웃
        </Button>
      </div>
      
      {/* Keyboard */}
      {showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 animate-slide-up">
          <KoreanKeyboard />
        </div>
      )}
    </div>
  );
};

export default MyPageTab;
