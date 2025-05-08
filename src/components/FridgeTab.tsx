
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CategoryItem = {
  id: string;
  name: string;
  emoji: string;
};

const categories: CategoryItem[] = [
  { id: 'all', name: '전체', emoji: '🍽️' },
  { id: 'fruit', name: '과일', emoji: '🍎' },
  { id: 'vegetable', name: '채소', emoji: '🥕' },
  { id: 'meat', name: '고기', emoji: '🥩' },
  { id: 'dairy', name: '유제품', emoji: '🥛' },
  { id: 'egg', name: '계란', emoji: '🥚' },
  { id: 'grain', name: '곡물', emoji: '🍚' },
];

const FridgeTab: React.FC = () => {
  const { 
    ingredients, 
    filterCategory, 
    setFilterCategory,
    setImageUploading,
    setIsOcrProcessing 
  } = useApp();

  // Filter ingredients by the selected category
  const filteredIngredients = filterCategory === 'all' 
    ? ingredients 
    : ingredients.filter(ingredient => ingredient.category === filterCategory);

  // Group ingredients by subcategory
  const groupedIngredients = filteredIngredients.reduce((acc, ingredient) => {
    const { subCategory } = ingredient;
    if (!acc[subCategory]) {
      acc[subCategory] = [];
    }
    acc[subCategory].push(ingredient);
    return acc;
  }, {} as Record<string, typeof ingredients>);

  const handleAddIngredient = () => {
    // Simulate image uploading process
    setImageUploading(true);
    setTimeout(() => {
      setImageUploading(false);
      // Simulate OCR processing
      setIsOcrProcessing(true);
      setTimeout(() => {
        setIsOcrProcessing(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-16 bg-white">
      {/* Category filters */}
      <div className="overflow-x-auto p-4 bg-white sticky top-0 z-10">
        <div className="flex space-x-6">
          {categories.map(category => (
            <button
              key={category.id}
              className={`flex flex-col items-center min-w-[60px] ${
                filterCategory === category.id ? 'text-app-green' : 'text-gray-500'
              }`}
              onClick={() => setFilterCategory(category.id)}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-xs mt-1">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients list grouped by subcategory */}
      <div className="p-4">
        {Object.entries(groupedIngredients).map(([subCategory, items]) => (
          <div key={subCategory} className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">{subCategory}</h3>
            <div className="grid grid-cols-3 gap-4">
              {items.map(item => (
                <div 
                  key={item.id}
                  className="flex flex-col items-center bg-gray-50 rounded-lg p-3"
                >
                  <span className="text-3xl mb-1">{item.emoji}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.expiryDate).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add ingredient button */}
      <button
        onClick={handleAddIngredient}
        className="fixed bottom-20 right-5 bg-app-green text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default FridgeTab;
