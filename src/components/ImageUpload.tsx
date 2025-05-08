
import React from 'react';
import { useApp } from '@/context/AppContext';

const ImageUpload: React.FC = () => {
  const { setImageUploading, setIsOcrProcessing } = useApp();
  
  const handleCancelUpload = () => {
    setImageUploading(false);
  };
  
  const handleSelectImage = () => {
    // Simulate selecting an image and starting OCR process
    setImageUploading(false);
    setIsOcrProcessing(true);
    
    // Simulate OCR processing completion after a delay
    setTimeout(() => {
      setIsOcrProcessing(false);
    }, 3000);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg w-5/6 max-w-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">사진 선택</h2>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <div 
            className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center mb-6 cursor-pointer"
            onClick={handleSelectImage}
          >
            <div className="text-center">
              <span className="text-3xl block mb-2">📷</span>
              <span className="text-gray-500">사진 선택하기</span>
            </div>
          </div>
          
          <div className="flex space-x-4 w-full">
            <button 
              onClick={handleCancelUpload}
              className="flex-1 py-2 border border-gray-300 rounded-md"
            >
              취소
            </button>
            <button 
              onClick={handleSelectImage}
              className="flex-1 py-2 bg-app-green text-white rounded-md"
            >
              갤러리
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
