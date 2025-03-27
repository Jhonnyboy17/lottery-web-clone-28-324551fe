
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
    <div className={`lottery-card ${backgroundColor} rounded-xl shadow-md overflow-hidden transition-all duration-300 flex flex-col h-full`}>
      <div className="p-8 flex-grow">
        <img
          src={logoSrc}
          alt="Lottery Game Logo"
          className="h-20 w-auto object-contain mx-auto mb-6"
        />
        <div className="text-center flex flex-col h-36">
          <div className="flex-grow flex flex-col justify-center">
            {prefix && (
              <p className="text-xl font-semibold text-black mb-1">
                {prefix}
              </p>
            )}
            <h2 className="text-6xl font-bold text-lottery-navy">
              ${amount}
            </h2>
            <p className="text-sm font-medium text-gray-700 mt-2">
              (R$ {brlValue})
            </p>
            {unit && (
              <p className="text-2xl font-semibold text-lottery-navy uppercase tracking-wide mb-2">
                {unit}
              </p>
            )}
          </div>
          {cashOption && !showPlayButton && (
            <div className="mt-auto">
              <p className="text-sm text-gray-600 mb-1">
                Cash Option: ${cashOption}
              </p>
              <p className="text-xs text-gray-500 italic">Estimated Jackpot</p>
            </div>
          )}
        </div>
      </div>
      
      {showPlayButton ? (
        <div className="px-8 pb-8 mt-auto">
          <div className="text-center mb-5 text-black">
            <p className="font-bold text-lg">{nextDrawing}</p>
          </div>
          <Link to={route}>
            <Button 
              className="w-full rounded-full bg-transparent hover:bg-black/10 text-black border-2 border-black py-6 text-lg font-bold"
              variant="outline"
            >
              JOGAR
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-black/10 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-700">Next Drawing: {nextDrawing}</p>
          <button className="text-lottery-pink hover:text-lottery-red transition-colors duration-300">
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default LotteryCard;
