
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

const LogoutConfirm: React.FC = () => {
  const { setShowConfirmLogout, setIsAuthenticated } = useApp();
  
  const handleCancel = () => {
    setShowConfirmLogout(false);
  };
  
  const handleConfirm = () => {
    setIsAuthenticated(false);
    setShowConfirmLogout(false);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg w-5/6 max-w-sm p-6">
        <h2 className="text-xl font-medium mb-6 text-center">로그아웃 하시겠습니까?</h2>
        
        <div className="flex space-x-4">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            variant="destructive"
            className="flex-1"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
