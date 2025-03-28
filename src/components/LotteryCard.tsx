
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface LotteryCardProps {
  logoSrc: string;
  amount: string;
  unit: string;
  prefix?: string;
  cashOption?: string;
  nextDrawing: string;
  backgroundColor?: string;
  showPlayButton?: boolean;
  route?: string;
  isProminent?: boolean;
}

const LotteryCard = ({
  logoSrc,
  amount,
  unit,
  prefix = "",
  cashOption = "",
  nextDrawing,
  backgroundColor = "bg-white",
  showPlayButton = false,
  route = "/play-powerball",
  isProminent = false,
}: LotteryCardProps) => {
  // Calculate the approximate value in Brazilian Real (BRL)
  // Using an approximate exchange rate of 1 USD = 5.5 BRL
  const getAmountInBRL = (amountStr: string) => {
    const numericAmount = parseFloat(amountStr.replace(/,/g, ''));
    const brlAmount = (numericAmount * 5.5).toLocaleString('pt-BR');
    return brlAmount;
  };

  const brlValue = getAmountInBRL(amount);

  return (
    <div className={`lottery-card ${backgroundColor} rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col`}>
      <div className={`p-6 flex-grow ${isProminent ? 'flex flex-col items-center' : ''}`}>
        <img
          src={logoSrc}
          alt="Lottery Game Logo"
          className={`${isProminent ? 'h-20 w-auto' : 'h-16 w-auto'} object-contain mx-auto mb-4`}
        />
        
        <div className="text-center flex flex-col justify-center">
          {prefix && (
            <p className="text-lg font-semibold text-black mb-1">
              {prefix}
            </p>
          )}
          <h2 className={`${isProminent ? 'text-6xl' : 'text-5xl'} font-bold text-lottery-navy dark:text-white`}>
            ${amount}
          </h2>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">
            (R$ {brlValue})
          </p>
          {unit && (
            <p className="text-2xl font-semibold text-lottery-navy uppercase tracking-wide mb-2 dark:text-white">
              {unit}
            </p>
          )}
          
          {cashOption && !showPlayButton && (
            <div className="mt-auto">
              <p className="text-sm text-gray-600 mb-1 dark:text-gray-400">
                Cash Option: ${cashOption}
              </p>
              <p className="text-xs text-gray-500 italic dark:text-gray-400">Estimated Jackpot</p>
            </div>
          )}
        </div>
      </div>
      
      {showPlayButton ? (
        <div className="px-6 pb-6 mt-auto">
          <div className="text-center mb-4 text-black dark:text-white">
            <p className="font-bold">{nextDrawing}</p>
          </div>
          <Link to={route}>
            <Button 
              className={`w-full rounded-full ${isProminent ? 'text-lg py-2' : ''} ${
                backgroundColor.includes('bg-[#') 
                  ? 'bg-transparent hover:bg-black/10 text-black border-2 border-black dark:border-white dark:text-white' 
                  : 'bg-transparent hover:bg-black/10 text-black border-2 border-black dark:border-white dark:text-white'
              }`}
              variant="outline"
            >
              JOGAR
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-black/10 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">Next Drawing: {nextDrawing}</p>
          <button className="text-lottery-pink hover:text-lottery-red transition-colors duration-300">
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LotteryCard;
