
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NumberSelectionType } from "./types";

interface NumberSelectionProps {
  activeDigitIndex: number | null;
  setActiveDigitIndex: (index: number | null) => void;
  currentLine: NumberSelectionType;
  onDigitSelect: (digit: number) => void;
  isLineComplete: () => boolean;
  onClearSelections: () => void;
}

const NumberSelection: React.FC<NumberSelectionProps> = ({
  activeDigitIndex,
  setActiveDigitIndex,
  currentLine,
  onDigitSelect,
  isLineComplete,
  onClearSelections
}) => {
  // Estado para controlar qual número foi clicado recentemente
  const [clickedNumber, setClickedNumber] = useState<number | null>(null);

  // Efeito para selecionar automaticamente o primeiro círculo ao carregar
  useEffect(() => {
    if (activeDigitIndex === null && currentLine.digits.some(digit => digit === null)) {
      const firstEmptyIndex = currentLine.digits.findIndex(digit => digit === null);
      if (firstEmptyIndex !== -1) {
        setActiveDigitIndex(firstEmptyIndex);
      }
    }
  }, [activeDigitIndex, currentLine.digits, setActiveDigitIndex]);

  // Função para lidar com o clique no número
  const handleNumberClick = (digit: number) => {
    setClickedNumber(digit);
    onDigitSelect(digit);
    
    // Timer para remover a classe de destaque após 2 segundos
    setTimeout(() => {
      setClickedNumber(null);
    }, 2000);
  };

  const getDigitDisplay = (index: number) => {
    const digit = currentLine.digits[index];
    return digit !== null ? digit.toString() : "?";
  };

  return (
    <div className="relative mb-6 mt-8">
      {/* Título acima dos números */}
      <h2 className="text-center text-xl font-semibold mb-4 text-blue-800">
        Escolha 4 Números
      </h2>
      
      <div className="flex justify-center items-center h-[220px] relative">
        {/* Numbers displayed in a grid layout */}
        <div className="grid grid-cols-5 gap-4 z-10">
          {[...Array(10).keys()].map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-medium transition-colors duration-300`}
              style={{
                backgroundColor: clickedNumber === number 
                  ? '#0EA5E9' // Azul brilhante quando clicado recentemente
                  : activeDigitIndex !== null && currentLine.digits[activeDigitIndex] === number
                    ? '#0EA5E9' // Azul quando selecionado
                    : '#dbeafe', // Azul claro padrão
                color: clickedNumber === number || 
                      (activeDigitIndex !== null && currentLine.digits[activeDigitIndex] === number)
                  ? 'white'
                  : '#1e40af'
              }}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      
      {/* Current selected digits display */}
      <div className="flex gap-2 justify-center mt-4 mb-4">
        {currentLine.digits.map((digit, idx) => (
          <div 
            key={idx} 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-medium border cursor-pointer ${
              activeDigitIndex === idx 
                ? 'bg-blue-500 text-white border-blue-600' 
                : digit === null 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-blue-100 text-blue-800'
            }`}
            onClick={() => setActiveDigitIndex(idx)}
          >
            {getDigitDisplay(idx)}
          </div>
        ))}
      </div>
      
      {/* Clear button */}
      <div className="flex justify-end mt-2">
        <Button 
          onClick={onClearSelections}
          variant="link" 
          className="text-xs text-gray-500"
        >
          Limpar seleções
        </Button>
      </div>
    </div>
  );
};

export default NumberSelection;
