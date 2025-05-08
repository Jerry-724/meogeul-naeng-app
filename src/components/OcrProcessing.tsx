
import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

const OcrProcessing: React.FC = () => {
  const { setIsOcrProcessing, setIngredients } = useApp();
  const [processingStage, setProcessingStage] = useState<'loading' | 'result'>('loading');
  const [recognizedItem, setRecognizedItem] = useState({
    name: '바나나',
    emoji: '🍌',
    purchaseDate: '2025.04.30',
    expiryDate: '2025.05.05',
  });
  
  useEffect(() => {
    // Simulate the OCR processing
    const timer = setTimeout(() => {
      setProcessingStage('result');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSave = () => {
    // Add the new item to ingredients list
    setIngredients(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: recognizedItem.name,
        category: 'fruit',
        subCategory: '과일',
        emoji: recognizedItem.emoji,
        purchaseDate: recognizedItem.purchaseDate.replace(/\./g, '-'),
        expiryDate: recognizedItem.expiryDate.replace(/\./g, '-'),
      }
    ]);
    
    setIsOcrProcessing(false);
  };
  
  const handleCancel = () => {
    setIsOcrProcessing(false);
  };
  
  return (
    <div className="fixed inset-0 bg-white z-50 animate-fade-in">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">OCR 인식 결과</h2>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center">
          {processingStage === 'loading' ? (
            <>
              <div className="mb-6 loading-spinner">
                <div className="w-20 h-20 border-t-4 border-app-green rounded-full"></div>
              </div>
              <p className="text-center text-gray-600">
                사진을 인식하고 있어요<br />잠시만 기다려주세요...
              </p>
            </>
          ) : (
            <div className="w-full max-w-sm">
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <div className="flex justify-center mb-6">
                  <span className="text-6xl">{recognizedItem.emoji}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">품목</label>
                    <div className="font-medium text-lg">{recognizedItem.name}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">등록일</label>
                    <div className="font-medium">{recognizedItem.purchaseDate}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">유통기한</label>
                    <div className="font-medium">{recognizedItem.expiryDate}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleCancel}
                  className="flex-1 py-2 border border-gray-300 rounded-md"
                >
                  취소
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-1 py-2 bg-app-green text-white rounded-md"
                >
                  저장
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OcrProcessing;
