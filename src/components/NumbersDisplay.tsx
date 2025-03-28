
import React from "react";
import NumbersCircle from "./NumbersCircle";

interface NumbersDisplayProps {
  selectedNumbers: number[];
  powerNumber?: number;
  gameColor?: string;
  minNumbers?: number;
  textSize?: "sm" | "md" | "lg" | "xl";
  circleSize?: "sm" | "md" | "lg";
  className?: string;
}

const NumbersDisplay: React.FC<NumbersDisplayProps> = ({
  selectedNumbers,
  powerNumber,
  gameColor = "bg-lottery-pink",
  minNumbers = 5,
  textSize = "md",
  circleSize = "md",
  className = "",
}) => {
  const emptySpots = Math.max(0, minNumbers - selectedNumbers.length);
  const stringNumbers = selectedNumbers.map(num => num.toString().padStart(2, '0'));
  const displayPowerNumber = powerNumber !== undefined ? powerNumber.toString().padStart(2, '0') : undefined;
  
  return (
    <div className={`flex justify-center ${className}`}>
      <NumbersCircle 
        numbers={stringNumbers} 
        powerball={displayPowerNumber} 
        backgroundColor="bg-gray-200 dark:bg-gray-700"
        textColor="text-gray-800 dark:text-white"
      />
    </div>
  );
};

export default NumbersDisplay;
