
import React from "react";

interface NumbersCircleProps {
  numbers: string[];
  powerball?: string;
  backgroundColor?: string;
  textColor?: string;
}

const NumbersCircle: React.FC<NumbersCircleProps> = ({
  numbers,
  powerball,
  backgroundColor = "bg-gray-200",
  textColor = "text-black",
}) => {
  return (
    <div className="flex items-center justify-center flex-wrap gap-1.5">
      {numbers.map((number, index) => (
        <div
          key={index}
          className={`${backgroundColor} ${textColor} w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium`}
        >
          {number}
        </div>
      ))}
      {powerball && (
        <>
          <span className="mx-1 font-bold">+</span>
          <div
            className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
          >
            {powerball}
          </div>
        </>
      )}
    </div>
  );
};

export default NumbersCircle;
