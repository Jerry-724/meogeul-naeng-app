
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import KoreanKeyboard from './KoreanKeyboard';

const Login: React.FC = () => {
  const { setIsAuthenticated, showKeyboard, setShowKeyboard, setCurrentUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setCurrentUser({
      id: '1',
      nickname: '사용자',
      email: email || 'user@example.com'
    });
  };
  
  const handleFocus = () => {
    setShowKeyboard(true);
  };
  
  return (
    <div className="min-h-screen p-5 bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-app-green mb-12">뭐먹을냉?</h1>
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="이메일" 
              className="w-full border rounded-md px-4 py-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
            />
            <input 
              type="password" 
              placeholder="비밀번호" 
              className="w-full border rounded-md px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-app-green hover:bg-app-darkGreen text-white"
          >
            로그인
          </Button>
        </form>
      </div>
      
      {showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 animate-slide-up">
          <KoreanKeyboard />
        </div>
      )}
    </div>
  );
};

const SignUp: React.FC = () => {
  const { setIsAuthenticated, showKeyboard, setShowKeyboard } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setIsAuthenticated(true);
    }
  };
  
  const handleFocus = () => {
    setShowKeyboard(true);
  };
  
  return (
    <div className="min-h-screen p-5 bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-app-green mb-12">뭐먹을냉?</h1>
        <form onSubmit={handleSignUp} className="w-full max-w-xs">
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="이메일" 
              className="w-full border rounded-md px-4 py-2 mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleFocus}
            />
            <input 
              type="password" 
              placeholder="비밀번호" 
              className="w-full border rounded-md px-4 py-2 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
            />
            <input 
              type="password" 
              placeholder="비밀번호 확인" 
              className="w-full border rounded-md px-4 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-app-green hover:bg-app-darkGreen text-white"
          >
            회원가입
          </Button>
        </form>
      </div>
      
      {showKeyboard && (
        <div className="fixed bottom-0 left-0 right-0 animate-slide-up">
          <KoreanKeyboard />
        </div>
      )}
    </div>
  );
};

const AuthScreens: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  return isLoginMode ? (
    <Login />
  ) : (
    <SignUp />
  );
};

export default AuthScreens;
