
import React from "react";
import Navbar from "./Navbar";
import TotalSummary from "./Cash5/TotalSummary";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface GameLayoutProps {
  logoSrc: string;
  jackpotAmount: string;
  colorValue: string;
  gameName: string;
  ticketPrice: string;
  hasLines: boolean;
  children: React.ReactNode;
}

const GameLayout: React.FC<GameLayoutProps> = ({
  logoSrc,
  jackpotAmount,
  colorValue,
  gameName,
  ticketPrice,
  hasLines,
  children
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Add space between navbar and colored banner */}
      <div className="h-12"></div>
      
      {/* Game Banner with Background Color */}
      <div className="w-full py-8 relative" style={{ backgroundColor: colorValue }}>
        <div className="mx-auto max-w-7xl px-3">
          {/* Game Navigation - Positioned in the top-left corner of the banner */}
          <div className="absolute left-4 top-4">
            <NavigationMenu className="max-w-none w-auto">
              <NavigationMenuList className="flex space-x-4">
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="text-black hover:text-black/80 font-medium text-xs"
                    href={`/play-${gameName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Jogar {gameName}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="text-black hover:text-black/80 font-medium text-xs"
                    href={`/results/${gameName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Resultados
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="text-black hover:text-black/80 font-medium text-xs"
                    href={`/checker/${gameName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Verificador de Números
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="text-black hover:text-black/80 font-medium text-xs"
                    href={`/how-to-play/${gameName.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Como Jogar
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center justify-between">
            {/* Left side - Empty */}
            <div></div>

            {/* Center - Game Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={logoSrc} 
                alt={gameName} 
                className="h-16 w-auto"
              />
            </div>

            {/* Right side - Jackpot Info */}
            <div className="text-right">
              <p className="text-sm font-bold text-white">JACKPOT ESTÁ VALIDO</p>
              <h2 className="text-2xl font-bold text-black">R$ {jackpotAmount}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 pt-6 pb-6">
        {/* Main Content */}
        {children}

        {/* Total Summary */}
        <div className="mt-4">
          <TotalSummary 
            ticketPrice={ticketPrice} 
            colorValue={colorValue} 
            hasLines={hasLines} 
          />
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
