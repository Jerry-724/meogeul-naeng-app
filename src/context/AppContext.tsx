
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  nickname: string;
  email: string;
};

type Ingredient = {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  emoji: string;
  expiryDate: string;
  purchaseDate: string;
};

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

type AppContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  filterCategory: string;
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  showConfirmLogout: boolean;
  setShowConfirmLogout: React.Dispatch<React.SetStateAction<boolean>>;
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
  imageUploading: boolean;
  setImageUploading: React.Dispatch<React.SetStateAction<boolean>>;
  isOcrProcessing: boolean;
  setIsOcrProcessing: React.Dispatch<React.SetStateAction<boolean>>;
  currentTab: 'recipes' | 'fridge' | 'mypage';
  setCurrentTab: React.Dispatch<React.SetStateAction<'recipes' | 'fridge' | 'mypage'>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const mockIngredients: Ingredient[] = [
  { id: '1', name: '사과', category: 'fruit', subCategory: '과일', emoji: '🍎', expiryDate: '2025-04-30', purchaseDate: '2025-04-01' },
  { id: '2', name: '바나나', category: 'fruit', subCategory: '과일', emoji: '🍌', expiryDate: '2025-04-20', purchaseDate: '2025-04-05' },
  { id: '3', name: '오렌지', category: 'fruit', subCategory: '과일', emoji: '🍊', expiryDate: '2025-04-25', purchaseDate: '2025-04-03' },
  { id: '4', name: '당근', category: 'vegetable', subCategory: '채소', emoji: '🥕', expiryDate: '2025-04-20', purchaseDate: '2025-04-02' },
  { id: '5', name: '오이', category: 'vegetable', subCategory: '채소', emoji: '🥒', expiryDate: '2025-04-15', purchaseDate: '2025-04-01' },
  { id: '6', name: '토마토', category: 'vegetable', subCategory: '채소', emoji: '🍅', expiryDate: '2025-04-18', purchaseDate: '2025-04-03' },
  { id: '7', name: '소고기', category: 'meat', subCategory: '고기', emoji: '🥩', expiryDate: '2025-05-05', purchaseDate: '2025-04-10' },
  { id: '8', name: '닭고기', category: 'meat', subCategory: '고기', emoji: '🍗', expiryDate: '2025-04-20', purchaseDate: '2025-04-05' },
  { id: '9', name: '쌀', category: 'grain', subCategory: '곡물', emoji: '🍚', expiryDate: '2025-08-30', purchaseDate: '2025-03-01' },
  { id: '10', name: '우유', category: 'dairy', subCategory: '유제품', emoji: '🥛', expiryDate: '2025-04-20', purchaseDate: '2025-04-10' },
  { id: '11', name: '달걀', category: 'egg', subCategory: '계란', emoji: '🥚', expiryDate: '2025-05-01', purchaseDate: '2025-04-05' },
  { id: '12', name: '체리', category: 'fruit', subCategory: '과일', emoji: '🍒', expiryDate: '2025-04-20', purchaseDate: '2025-04-10' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [currentTab, setCurrentTab] = useState<'recipes' | 'fridge' | 'mypage'>('fridge');

  useEffect(() => {
    // Simulate app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // If user sent a message, simulate a bot response after a delay
    if (message.sender === 'user') {
      setTimeout(() => {
        const botResponses = [
          '오늘 저녁으로 닭갈비는 어떠세요? 냉장고에 있는 닭고기를 활용해 맛있게 만들 수 있어요.',
          '토마토와 오이로 신선한 샐러드 어떠세요?',
          '재료를 활용해 김치찌개를 만들어보세요. 필요한 레시피를 알려드릴까요?',
          '냉장고에 있는 소고기로 불고기를 만들어 보는건 어떨까요?',
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        setMessages(prev => [
          ...prev, 
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: randomResponse,
            timestamp: new Date()
          }
        ]);
      }, 1000);
    }
  };

  const value = {
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
    ingredients,
    setIngredients,
    filterCategory,
    setFilterCategory,
    messages,
    addMessage,
    showConfirmLogout,
    setShowConfirmLogout,
    showKeyboard,
    setShowKeyboard,
    imageUploading,
    setImageUploading,
    isOcrProcessing,
    setIsOcrProcessing,
    currentTab,
    setCurrentTab
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
