
import React from 'react';
import { useApp } from '@/context/AppContext';
import Splash from '@/components/Splash';
import AuthScreens from '@/components/AuthScreens';
import Navigation from '@/components/Navigation';
import FridgeTab from '@/components/FridgeTab';
import RecipesTab from '@/components/RecipesTab';
import MyPageTab from '@/components/MyPageTab';
import ImageUpload from '@/components/ImageUpload';
import OcrProcessing from '@/components/OcrProcessing';
import LogoutConfirm from '@/components/LogoutConfirm';

const Index = () => {
  const { 
    isLoading, 
    isAuthenticated,
    currentTab,
    imageUploading,
    isOcrProcessing,
    showConfirmLogout
  } = useApp();
  
  if (isLoading) {
    return <Splash />;
  }
  
  if (!isAuthenticated) {
    return <AuthScreens />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Main content based on current tab */}
      {currentTab === 'fridge' && <FridgeTab />}
      {currentTab === 'recipes' && <RecipesTab />}
      {currentTab === 'mypage' && <MyPageTab />}
      
      {/* Navigation */}
      <Navigation />
      
      {/* Modal overlays */}
      {imageUploading && <ImageUpload />}
      {isOcrProcessing && <OcrProcessing />}
      {showConfirmLogout && <LogoutConfirm />}
    </div>
  );
};

export default Index;
