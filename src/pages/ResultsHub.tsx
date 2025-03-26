
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface GameResult {
  id: number;
  name: string;
  logo: string;
  jackpot: string;
  jackpotInReais?: string;
  drawDay: string;
  drawDate: string;
  drawTime: string;
  results: Array<{
    date: string;
    displayDate: string;
    dayOfWeek: string;
    numbers: string[];
    specialBall?: string;
    multiplier?: string;
    drawTime?: string;
    additionalInfo?: {
      title: string;
      numbers: string[];
    }[];
  }>;
  primaryColor: string;
  route: string;
}

const lotteryGames: GameResult[] = [
  {
    id: 1,
    name: "Mega Millions",
    logo: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
    jackpot: "$344.000.000",
    jackpotInReais: "R$ 1.892.000.000",
    drawDay: "SEXTA-FEIRA",
    drawDate: "MAR 28",
    drawTime: "22:00",
    primaryColor: "bg-blue-600",
    route: "/play-mega-millions",
    results: [
      {
        date: "03/26/2025",
        displayDate: "26 de março de 2025",
        dayOfWeek: "Terça-feira",
        numbers: ["1", "5", "17", "39", "62"],
        specialBall: "8",
        multiplier: "x2"
      },
      {
        date: "03/22/2025",
        displayDate: "22 de março de 2025",
        dayOfWeek: "Sexta-feira",
        numbers: ["15", "22", "31", "52", "57"],
        specialBall: "2",
        multiplier: "x3"
      },
      {
        date: "03/19/2025",
        displayDate: "19 de março de 2025",
        dayOfWeek: "Terça-feira",
        numbers: ["5", "18", "29", "40", "55"],
        specialBall: "13",
        multiplier: "x2"
      }
    ]
  },
  {
    id: 2,
    name: "Powerball",
    logo: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
    jackpot: "$484.000.000",
    jackpotInReais: "R$ 2.662.000.000",
    drawDay: "QUARTA-FEIRA",
    drawDate: "MAR 27",
    drawTime: "21:59",
    primaryColor: "bg-red-600",
    route: "/play-powerball",
    results: [
      {
        date: "03/25/2025",
        displayDate: "25 de março de 2025",
        dayOfWeek: "Segunda-feira",
        numbers: ["6", "23", "35", "36", "47"],
        specialBall: "12",
        multiplier: "x2"
      },
      {
        date: "03/23/2025",
        displayDate: "23 de março de 2025",
        dayOfWeek: "Sábado",
        numbers: ["6", "7", "25", "46", "57"],
        specialBall: "12",
        multiplier: "x3"
      },
      {
        date: "03/20/2025",
        displayDate: "20 de março de 2025",
        dayOfWeek: "Quarta-feira",
        numbers: ["11", "15", "37", "46", "54"],
        specialBall: "19",
        multiplier: "x2"
      }
    ]
  },
  {
    id: 3,
    name: "Lucky Day Lotto",
    logo: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
    jackpot: "$500.000",
    jackpotInReais: "R$ 2.750.000",
    drawDay: "QUARTA-FEIRA",
    drawDate: "MAR 26",
    drawTime: "12:40",
    primaryColor: "bg-[#00BBD3]",
    route: "/play-lucky-day",
    results: [
      {
        date: "03/25/2025",
        displayDate: "25 de março de 2025",
        dayOfWeek: "Terça-feira (Evening)",
        numbers: ["9", "18", "26", "29", "33"],
        drawTime: "Evening"
      },
      {
        date: "03/25/2025",
        displayDate: "25 de março de 2025",
        dayOfWeek: "Terça-feira (Midday)",
        numbers: ["8", "18", "21", "27", "30"],
        drawTime: "Midday"
      }
    ]
  },
  {
    id: 4,
    name: "Lotto",
    logo: "/lovable-uploads/10e61813-2686-412f-9f9b-6211c7c7646f.png",
    jackpot: "$4.850.000",
    jackpotInReais: "R$ 26.675.000",
    drawDay: "QUINTA-FEIRA",
    drawDate: "MAR 27",
    drawTime: "21:22",
    primaryColor: "bg-green-500",
    route: "/play-lotto",
    results: [
      {
        date: "03/24/2025",
        displayDate: "24 de março de 2025",
        dayOfWeek: "Segunda-feira",
        numbers: ["9", "13", "16", "31", "36", "42"],
        specialBall: "21",
        additionalInfo: [
          {
            title: "LOTTO MILLION 1",
            numbers: ["12", "25", "30", "32", "34", "42"]
          },
          {
            title: "LOTTO MILLION 2",
            numbers: ["1", "4", "11", "29", "42", "49"]
          }
        ]
      }
    ]
  }
];

const ResultsHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGames = lotteryGames.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span>Voltar</span>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Hub de Resultados</h1>
          </div>
          
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar sorteios..." 
              className="border rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredGames.map((game) => (
            <GameResultCard key={game.id} game={game} />
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const GameResultCard = ({ game }: { game: GameResult }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header with logo and jackpot info */}
      <div className={`${game.primaryColor} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <img 
            src={game.logo} 
            alt={`${game.name} Logo`} 
            className="h-16 object-contain"
          />
          <div className="text-right">
            <div className="text-sm font-semibold">Jackpot</div>
            <div className="text-2xl font-bold">{game.jackpot}</div>
            <div className="text-sm">{game.drawDay}, {game.drawDate} - {game.drawTime}</div>
          </div>
        </div>
      </div>

      {/* Results section */}
      <div className="p-6">
        {game.results.map((result, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <div className="flex items-center mb-2">
              <div className="font-bold text-lg">{result.dayOfWeek}</div>
              <div className="text-sm text-gray-500 ml-2">{result.displayDate}</div>
              {result.drawTime && (
                <div className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full ml-2">
                  {result.drawTime}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              {result.numbers.map((number, idx) => (
                <div 
                  key={idx} 
                  className={`w-10 h-10 rounded-full ${game.primaryColor} flex items-center justify-center font-bold text-white`}
                >
                  {number}
                </div>
              ))}
              
              {result.specialBall && (
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center font-bold text-white">
                  {result.specialBall}
                </div>
              )}
              
              {result.multiplier && (
                <div className="ml-1 flex items-center justify-center text-gray-700 font-bold">
                  {result.multiplier}
                </div>
              )}
            </div>

            {result.additionalInfo && result.additionalInfo.map((info, infoIdx) => (
              <div key={infoIdx} className="mt-4 bg-gray-100 p-3 rounded-md">
                <div className="text-sm font-medium text-gray-700 mb-2">{info.title}</div>
                <div className="flex flex-wrap gap-2">
                  {info.numbers.map((num, numIdx) => (
                    <div 
                      key={numIdx} 
                      className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-700 text-sm"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="flex items-center justify-between mt-6 border-t pt-4">
          <div className="space-x-4">
            <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
              Ver todos os resultados
            </Link>
            <Link to="#" className="text-sm font-medium text-blue-600 hover:underline">
              Verificar números
            </Link>
          </div>
          
          <Link to={game.route}>
            <Button className={`${game.primaryColor} hover:opacity-90 text-white font-medium`}>
              JOGAR
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsHub;
