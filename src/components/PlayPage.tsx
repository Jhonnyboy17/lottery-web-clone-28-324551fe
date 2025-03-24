import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { SavedLineType } from "./Cash5/types";

interface PlayPageProps {
  logoSrc: string;
  jackpotAmount: string;
  basePrice: number;
  primaryColor: string;
  gameName: string;
  extraPlayName?: string;
  extraPlayPrice?: number;
  maxRegularNumbers?: number;
  totalRegularNumbers?: number;
  maxPowerballNumbers?: number;
  totalPowerballNumbers?: number;
}

const PlayPage = ({
  logoSrc,
  jackpotAmount,
  basePrice,
  primaryColor,
  gameName,
  extraPlayName = "Power Play®",
  extraPlayPrice = 10.00,
  maxRegularNumbers = 5,
  totalRegularNumbers = 69,
  maxPowerballNumbers = 1,
  totalPowerballNumbers = 26,
}: PlayPageProps) => {
  
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedPowerball, setSelectedPowerball] = useState<number | null>(null);
  const [includeExtraPlay, setIncludeExtraPlay] = useState(false);
  const [numberOfDraws, setNumberOfDraws] = useState("1");
  const [savedLines, setSavedLines] = useState<SavedLineType[]>([]);
  const [editingLineIndex, setEditingLineIndex] = useState<number | null>(null);
  const [animatedProgress, setAnimatedProgress] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);

  const regularNumbers = Array.from({ length: totalRegularNumbers }, (_, i) => i + 1);
  const powerballNumbers = Array.from({ length: totalPowerballNumbers }, (_, i) => i + 1);
  const hasPowerball = maxPowerballNumbers > 0;
  
  const regularNumbersProgress = (selectedNumbers.length / maxRegularNumbers) * 100;
  const powerballProgress = selectedPowerball ? 100 : 0;
  
  useEffect(() => {
    if (selectedNumbers.length === maxRegularNumbers && (!hasPowerball || selectedPowerball !== null)) {
      const timer = setTimeout(() => {
        handleAddLine();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedNumbers, selectedPowerball]);

  useEffect(() => {
    if (animating) {
      const targetProgress = regularNumbersProgress;
      
      if (animatedProgress < targetProgress) {
        const interval = setInterval(() => {
          setAnimatedProgress(prev => {
            if (prev < targetProgress) {
              const newProgress = Math.min(prev + 5, targetProgress);
              return newProgress;
            } else {
              clearInterval(interval);
              setAnimating(false);
              return targetProgress;
            }
          });
        }, 20);
        
        return () => clearInterval(interval);
      } else {
        setAnimatedProgress(targetProgress);
        setAnimating(false);
      }
    } else if (!animating && !selectedNumbers.length) {
      setAnimatedProgress(0);
    } else if (!animating) {
      setAnimatedProgress(regularNumbersProgress);
    }
  }, [animating, regularNumbersProgress, selectedNumbers.length]);

  const handleNumberSelect = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < maxRegularNumbers) {
      const newNumbers = [...selectedNumbers, number];
      setSelectedNumbers(newNumbers);
    }
  };

  const handlePowerballSelect = (number: number) => {
    if (selectedPowerball === number) {
      setSelectedPowerball(null);
    } else {
      setSelectedPowerball(number);
    }
  };

  const handleQuickPick = () => {
    setAnimating(true);
    
    let newNumbers = [...selectedNumbers];
    const remainingCount = maxRegularNumbers - newNumbers.length;
    
    if (remainingCount > 0) {
      const availableNumbers = regularNumbers.filter(num => !newNumbers.includes(num));
      
      for (let i = 0; i < remainingCount; i++) {
        if (availableNumbers.length) {
          const randomIndex = Math.floor(Math.random() * availableNumbers.length);
          newNumbers.push(availableNumbers[randomIndex]);
          availableNumbers.splice(randomIndex, 1);
        }
      }
      
      setSelectedNumbers(newNumbers);
    }
    
    if (hasPowerball && selectedPowerball === null) {
      const randomPowerball = Math.floor(Math.random() * totalPowerballNumbers) + 1;
      setSelectedPowerball(randomPowerball);
    }
    
    setEditingLineIndex(null);
  };

  const handleAddLine = () => {
    if (selectedNumbers.length === maxRegularNumbers && (!hasPowerball || selectedPowerball !== null)) {
      if (editingLineIndex !== null) {
        const updatedLines = [...savedLines];
        updatedLines[editingLineIndex] = {
          numbers: [...selectedNumbers],
          powerball: selectedPowerball,
          includeExtraPlay,
          drawCount: numberOfDraws
        };
        setSavedLines(updatedLines);
        setEditingLineIndex(null);
      } else {
        setSavedLines([...savedLines, {
          numbers: [...selectedNumbers],
          powerball: selectedPowerball,
          includeExtraPlay,
          drawCount: numberOfDraws
        }]);
      }
      
      setSelectedNumbers([]);
      setSelectedPowerball(null);
      setIncludeExtraPlay(false);
      setNumberOfDraws("1");
      setAnimatedProgress(0);
      setAnimating(false);
    }
  };

  const handleRemoveLine = (lineIndex: number) => {
    setSavedLines(savedLines.filter((_, index) => index !== lineIndex));
    if (editingLineIndex === lineIndex) {
      setEditingLineIndex(null);
      setSelectedNumbers([]);
      setSelectedPowerball(null);
      setIncludeExtraPlay(false);
      setNumberOfDraws("1");
    }
  };

  const handleEditLine = (lineIndex: number) => {
    const lineToEdit = savedLines[lineIndex];
    setSelectedNumbers(lineToEdit.numbers);
    setSelectedPowerball(lineToEdit.powerball);
    setIncludeExtraPlay(lineToEdit.includeExtraPlay);
    setNumberOfDraws(lineToEdit.drawCount);
    setEditingLineIndex(lineIndex);
  };

  const handleToggleExtraPlay = (lineIndex: number, checked: boolean) => {
    const updatedLines = [...savedLines];
    updatedLines[lineIndex].includeExtraPlay = checked;
    setSavedLines(updatedLines);
  };

  const handleChangeDrawCount = (lineIndex: number, count: string) => {
    const updatedLines = [...savedLines];
    updatedLines[lineIndex].drawCount = count;
    setSavedLines(updatedLines);
  };

  const getTicketPrice = () => {
    let price = 0;
    
    savedLines.forEach(line => {
      let linePrice = basePrice;
      if (line.includeExtraPlay) {
        linePrice += extraPlayPrice;
      }
      price += linePrice * parseInt(line.drawCount || "1");
    });
    
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('R$', 'R$ ');
  };

  const getColorValue = () => {
    switch (primaryColor) {
      case "blue-600":
        return "#2563eb";
      case "red-600":
        return "#dc2626";
      case "green-600":
        return "#16a34a";
      case "cyan-600":
        return "#0891b2";
      case "amber-500":
        return "#f59e0b";
      case "[#8CD444]":
        return "#8CD444";
      default:
        return "#000000";
    }
  };

  const colorValue = getColorValue();

  const isLineComplete = () => {
    if (hasPowerball) {
      return selectedNumbers.length === maxRegularNumbers && selectedPowerball !== null;
    } else {
      return selectedNumbers.length === maxRegularNumbers;
    }
  };

  const displayProgress = animating ? animatedProgress : regularNumbersProgress;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mx-auto max-w-xl pt-24 px-3 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <img 
              src={logoSrc} 
              alt={gameName} 
              className="h-12 w-auto mb-2"
            />
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-black">JACKPOT ESTA VALIDO</p>
            <h2 className="text-2xl font-bold" style={{ color: colorValue }}>R$ {jackpotAmount}</h2>
            <Button 
              onClick={handleQuickPick}
              className="text-xs h-8 bg-white border hover:bg-opacity-10 px-6 mt-2"
              style={{ color: colorValue, borderColor: colorValue }}
            >
              JOGADA ALEATÓRIA
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-md overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              {editingLineIndex !== null && (
                <div className="text-sm font-medium p-1 px-2 bg-amber-100 text-amber-800 rounded">
                  Editando Linha {editingLineIndex + 1}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Escolha {maxRegularNumbers} Números</p>
              <span className="text-xs font-medium">{selectedNumbers.length} de {maxRegularNumbers}</span>
            </div>
            <div className="mb-3">
              <Progress 
                value={displayProgress} 
                className="h-2"
                style={{ 
                  backgroundColor: "#e5e7eb"
                }}
              />
            </div>
            <div className="grid grid-cols-9 gap-1 mb-4">
              {regularNumbers.map((number) => (
                <button
                  key={`regular-${number}`}
                  onClick={() => handleNumberSelect(number)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${selectedNumbers.includes(number) 
                      ? "text-white" 
                      : "bg-gray-100 text-black hover:bg-gray-200"}`}
                  style={selectedNumbers.includes(number) ? { backgroundColor: colorValue } : {}}
                >
                  {number}
                </button>
              ))}
            </div>

            {hasPowerball && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Escolha {maxPowerballNumbers} Powerball</p>
                  <span className="text-xs font-medium">{selectedPowerball ? 1 : 0} de {maxPowerballNumbers}</span>
                </div>
                <div className="mb-3">
                  <Progress 
                    value={powerballProgress} 
                    className="h-2"
                    style={{ 
                      backgroundColor: "#e5e7eb"
                    }}
                  />
                </div>
                <div className="grid grid-cols-9 gap-1 mb-4">
                  {powerballNumbers.map((number) => (
                    <button
                      key={`powerball-${number}`}
                      onClick={() => handlePowerballSelect(number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                        ${selectedPowerball === number 
                          ? "bg-amber-500 text-white" 
                          : "bg-gray-100 text-black hover:bg-gray-200"}`}
                    >
                      {number}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="flex items-center justify-between mt-4 mb-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="extraplay" 
                  checked={includeExtraPlay}
                  onCheckedChange={(checked) => setIncludeExtraPlay(checked as boolean)} 
                />
                <label htmlFor="extraplay" className="text-sm font-medium">
                  Adicionar {extraPlayName} (+R${extraPlayPrice.toFixed(2)} por linha)
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="text-sm font-medium block mb-1">Número de Sorteios</label>
              <Select value={numberOfDraws} onValueChange={setNumberOfDraws}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Selecionar número de sorteios" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 sorteio</SelectItem>
                  <SelectItem value="2">2 sorteios</SelectItem>
                  <SelectItem value="3">3 sorteios</SelectItem>
                  <SelectItem value="4">4 sorteios</SelectItem>
                  <SelectItem value="5">5 sorteios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleAddLine} 
              disabled={!isLineComplete()}
              className="w-full hover:bg-opacity-90 mt-2 px-10"
              style={{ backgroundColor: colorValue }}
            >
              {editingLineIndex !== null ? "ATUALIZAR LINHA" : "ADD LINHA"}
            </Button>
          </div>

          <div className="bg-gray-50 p-4">
            <h3 className="font-semibold mb-3">Minhas Linhas</h3>
            
            {savedLines.length === 0 ? (
              <p className="text-sm text-gray-500 mb-3">Nenhuma linha adicionada ainda</p>
            ) : (
              savedLines.map((line, index) => (
                <div key={index} className="mb-3">
                  <div 
                    className="bg-white rounded p-3 mb-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleEditLine(index)}
                  >
                    <div className="flex items-center">
                      {line.numbers.map((num, i) => (
                        <span 
                          key={i} 
                          className="text-white rounded-full w-10 h-10 flex items-center justify-center text-sm mx-0.5"
                          style={{ backgroundColor: colorValue }}
                        >
                          {num}
                        </span>
                      ))}
                      {hasPowerball && line.powerball && (
                        <span className="bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm ml-1">
                          {line.powerball}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLine(index);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="bg-gray-100 rounded p-2 pl-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`extraplay-${index}`} 
                        checked={line.includeExtraPlay}
                        onCheckedChange={(checked) => handleToggleExtraPlay(index, checked as boolean)} 
                      />
                      <label htmlFor={`extraplay-${index}`} className="text-sm font-medium">
                        Adicionar {extraPlayName}
                      </label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Sorteios:</label>
                      <Select 
                        value={line.drawCount} 
                        onValueChange={(value) => handleChangeDrawCount(index, value)}
                      >
                        <SelectTrigger className="w-24 h-7 text-sm">
                          <SelectValue placeholder="Sorteios" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 sorteio</SelectItem>
                          <SelectItem value="2">2 sorteios</SelectItem>
                          <SelectItem value="3">3 sorteios</SelectItem>
                          <SelectItem value="4">4 sorteios</SelectItem>
                          <SelectItem value="5">5 sorteios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md mt-4">
          <div>
            <p className="text-sm font-medium">Total</p>
            <p className="text-xl font-bold">{getTicketPrice()}</p>
          </div>
          <Button 
            className="hover:bg-opacity-90 px-6"
            style={{ backgroundColor: colorValue }}
            disabled={savedLines.length === 0}
          >
            ADICIONAR AO CARRINHO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
