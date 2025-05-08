
import React from 'react';
import { useApp } from '@/context/AppContext';

const KoreanKeyboard: React.FC = () => {
  const { setShowKeyboard } = useApp();
  
  const row1 = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
  const row2 = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
  const row3 = ['⇧', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '⌫'];
  const row4 = ['123', '한/영', '공백', '↵'];

  const handleDismiss = () => {
    setShowKeyboard(false);
  };
  
  return (
    <div className="bg-gray-200 p-2 pb-6">
      <div className="korean-keyboard">
        {row1.map((key, index) => (
          <div key={`row1-${index}`}>{key}</div>
        ))}
        {row2.map((key, index) => (
          <div key={`row2-${index}`} className={index === 0 ? 'col-span-1' : ''}>
            {key}
          </div>
        ))}
        {row3.map((key, index) => (
          <div key={`row3-${index}`} className={key === '⌫' ? 'col-span-2' : ''}>
            {key}
          </div>
        ))}
        <div className="col-span-2">{row4[0]}</div>
        <div className="col-span-2">{row4[1]}</div>
        <div className="col-span-4">{row4[2]}</div>
        <div className="col-span-2 bg-blue-500 text-white" onClick={handleDismiss}>{row4[3]}</div>
      </div>
    </div>
  );
};

export default KoreanKeyboard;
