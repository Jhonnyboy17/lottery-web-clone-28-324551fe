
import { useState, useEffect } from "react";
import { NumberSelectionType } from "../../Cash5/types";

export const useTicketState = () => {
  const [currentLine, setCurrentLine] = useState<NumberSelectionType>({
    digits: [null, null, null], // 3 digits for FastPlay
    playType: "Straight", 
    betAmount: "R$8"
  });
  
  const [savedLines, setSavedLines] = useState<NumberSelectionType[]>([]);
  const [lineCount, setLineCount] = useState(1);
  const [includeFireball, setIncludeFireball] = useState(false);
  const [activeDigitIndex, setActiveDigitIndex] = useState<number | null>(0); // Start with first digit selected
  const [selectedDrawTime, setSelectedDrawTime] = useState("both");
  const [selectedDrawCount, setSelectedDrawCount] = useState("1");

  // Handle changing active digit index when playType changes
  useEffect(() => {
    if (currentLine.playType === "Back Pair") {
      // For Back Pair, first digit is disabled, so start with second digit
      setActiveDigitIndex(1);
    } else if (currentLine.playType === "Front Pair") {
      // For Front Pair, last digit is disabled, so start with first digit
      setActiveDigitIndex(0);
    } else if (activeDigitIndex === null && currentLine.digits.some(digit => digit === null)) {
      // For other play types, find the first empty digit
      const firstEmptyIndex = currentLine.digits.findIndex(digit => digit === null);
      if (firstEmptyIndex !== -1) {
        setActiveDigitIndex(firstEmptyIndex);
      }
    }
  }, [currentLine.playType, currentLine.digits, activeDigitIndex]);

  const handleDigitSelect = (digit: number) => {
    if (activeDigitIndex === null) return;
    
    // Skip first digit for Back Pair
    if (currentLine.playType === "Back Pair" && activeDigitIndex === 0) return;
    
    // Skip last digit for Front Pair
    if (currentLine.playType === "Front Pair" && activeDigitIndex === 2) return;
    
    const newDigits = [...currentLine.digits];
    newDigits[activeDigitIndex] = digit;
    
    setCurrentLine({
      ...currentLine,
      digits: newDigits
    });
    
    // Find next available digit
    let nextEmptyIndex = -1;
    
    if (currentLine.playType === "Back Pair") {
      // For Back Pair, only check digits 1 and 2
      for (let i = 1; i <= 2; i++) {
        if (i > activeDigitIndex && newDigits[i] === null) {
          nextEmptyIndex = i;
          break;
        }
      }
    } else if (currentLine.playType === "Front Pair") {
      // For Front Pair, only check digits 0 and 1
      for (let i = 0; i <= 1; i++) {
        if (i > activeDigitIndex && newDigits[i] === null) {
          nextEmptyIndex = i;
          break;
        }
      }
    } else {
      // For other play types, check all digits
      nextEmptyIndex = newDigits.findIndex((d, i) => d === null && i > activeDigitIndex);
    }
    
    if (nextEmptyIndex !== -1) {
      setActiveDigitIndex(nextEmptyIndex);
    } else {
      setActiveDigitIndex(null);
    }
  };

  const handlePlayTypeChange = (value: string) => {
    const newPlayType = value;
    let newDigits = [...currentLine.digits];
    
    // Reset digits when switching between pair types and other types
    if ((currentLine.playType !== "Back Pair" && currentLine.playType !== "Front Pair") && 
        (newPlayType === "Back Pair" || newPlayType === "Front Pair")) {
      newDigits = [null, null, null];
    } else if ((currentLine.playType === "Back Pair" || currentLine.playType === "Front Pair") && 
               (newPlayType !== "Back Pair" && newPlayType !== "Front Pair")) {
      newDigits = [null, null, null];
    }
    
    // Set the first digit to "X" (represented as -1) for Back Pair
    if (newPlayType === "Back Pair") {
      newDigits[0] = -1; // Using -1 to represent "X"
      if (activeDigitIndex === 0) {
        setActiveDigitIndex(1);
      }
    } 
    // Set the last digit to "X" for Front Pair
    else if (newPlayType === "Front Pair") {
      newDigits[2] = -1; // Using -1 to represent "X"
      if (activeDigitIndex === 2) {
        setActiveDigitIndex(0);
      }
    } 
    // Reset all digits to null when switching from a pair type to a non-pair type
    else if (currentLine.playType === "Back Pair" || currentLine.playType === "Front Pair") {
      newDigits = [null, null, null];
      setActiveDigitIndex(0);
    }
    
    setCurrentLine({
      ...currentLine,
      playType: newPlayType,
      digits: newDigits
    });
  };

  const handleBetAmountChange = (value: string) => {
    setCurrentLine({
      ...currentLine,
      betAmount: value
    });
  };

  const handleQuickPick = () => {
    let randomDigits = [null, null, null];
    
    if (currentLine.playType === "Back Pair") {
      // For Back Pair, generate random digits for positions 1 and 2 only
      randomDigits = [-1, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    } else if (currentLine.playType === "Front Pair") {
      // For Front Pair, generate random digits for positions 0 and 1 only
      randomDigits = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), -1];
    } else {
      // For other play types, generate random digits for all positions
      randomDigits = Array(3).fill(0).map(() => Math.floor(Math.random() * 10));
    }
    
    setCurrentLine({
      ...currentLine,
      digits: randomDigits
    });
    
    setActiveDigitIndex(null);
  };

  const clearSelections = () => {
    // Initialize with appropriate values based on play type
    let newDigits = [null, null, null];
    
    if (currentLine.playType === "Back Pair") {
      newDigits[0] = -1; // Set first digit as "X" for Back Pair
      setActiveDigitIndex(1);
    } else if (currentLine.playType === "Front Pair") {
      newDigits[2] = -1; // Set last digit as "X" for Front Pair
      setActiveDigitIndex(0);
    } else {
      setActiveDigitIndex(0);
    }
    
    setCurrentLine({
      ...currentLine,
      digits: newDigits
    });
  };

  const handleAddLine = () => {
    // Check if line is complete based on play type
    if (!isPairTypeLineComplete()) return;
    
    setSavedLines([...savedLines, {...currentLine}]);
    setLineCount(lineCount + 1);
    
    // Reset with appropriate values based on play type
    let newDigits = [null, null, null];
    
    if (currentLine.playType === "Back Pair") {
      newDigits[0] = -1; // Set first digit as "X" for Back Pair
      setActiveDigitIndex(1);
    } else if (currentLine.playType === "Front Pair") {
      newDigits[2] = -1; // Set last digit as "X" for Front Pair
      setActiveDigitIndex(0);
    } else {
      setActiveDigitIndex(0);
    }
    
    setCurrentLine({
      digits: newDigits,
      playType: currentLine.playType,
      betAmount: currentLine.betAmount
    });
  };

  const handleRemoveLine = (lineIndex: number) => {
    setSavedLines(savedLines.filter((_, index) => index !== lineIndex));
    // Decrease the line count when a line is removed
    if (lineCount > 1) {
      setLineCount(lineCount - 1);
    }
  };

  // Check if line is complete based on play type
  const isPairTypeLineComplete = () => {
    if (currentLine.playType === "Back Pair") {
      // For Back Pair, check if digits 1 and 2 are filled
      return currentLine.digits[1] !== null && currentLine.digits[2] !== null;
    } else if (currentLine.playType === "Front Pair") {
      // For Front Pair, check if digits 0 and 1 are filled
      return currentLine.digits[0] !== null && currentLine.digits[1] !== null;
    } else {
      // For other play types, check if all digits are filled
      return !currentLine.digits.some(digit => digit === null);
    }
  };

  const isLineComplete = () => {
    return isPairTypeLineComplete();
  };

  const getTicketPrice = () => {
    const calculateLinePrice = (line: NumberSelectionType) => {
      // Extract the numeric value from the bet amount string and parse it
      const amount = parseFloat(line.betAmount.replace('R$', ''));
      return amount;
    };

    // Calculate base price
    const totalBasePrice = savedLines.reduce((sum, line) => sum + calculateLinePrice(line), 0);
    const fireballPrice = includeFireball ? savedLines.length * 1 : 0;
    
    // Multiply by the number of draws
    const numberOfDraws = parseInt(selectedDrawCount);
    const totalPrice = (totalBasePrice + fireballPrice) * numberOfDraws;
    
    return totalPrice.toFixed(2);
  };

  return {
    currentLine,
    savedLines,
    lineCount,
    includeFireball,
    activeDigitIndex,
    selectedDrawTime,
    selectedDrawCount,
    setActiveDigitIndex,
    handleDigitSelect,
    handlePlayTypeChange,
    handleBetAmountChange,
    handleQuickPick,
    clearSelections,
    handleAddLine,
    handleRemoveLine,
    setIncludeFireball,
    setSelectedDrawTime,
    setSelectedDrawCount,
    isLineComplete,
    getTicketPrice
  };
};
