
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type UpcomingDraw = {
  id: number;
  name: string;
  logo: string;
  day: string;
  time: string;
};

const upcomingDraws: UpcomingDraw[] = [
  {
    id: 1,
    name: "Mega Millions",
    logo: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
    day: "Terça-feira",
    time: "23:00"
  },
  {
    id: 2,
    name: "Powerball",
    logo: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
    day: "Quarta-feira",
    time: "22:30"
  },
  {
    id: 3,
    name: "Lucky Day",
    logo: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
    day: "Todos os dias",
    time: "19:00"
  },
  {
    id: 4,
    name: "Pick 4",
    logo: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
    day: "Todos os dias",
    time: "12:40 & 21:22"
  }
];

type GameRule = {
  id: number;
  name: string;
  logo: string;
  route: string;
};

const gameRules: GameRule[] = [
  {
    id: 1,
    name: "Mega Millions",
    logo: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
    route: "/duvidas#mega-millions"
  },
  {
    id: 2,
    name: "Powerball",
    logo: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
    route: "/duvidas#powerball"
  },
  {
    id: 3,
    name: "Pick 4",
    logo: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
    route: "/duvidas#pick4"
  },
  {
    id: 4,
    name: "Lucky Day",
    logo: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
    route: "/duvidas#lucky-day"
  }
];

const UpcomingDraws = () => {
  const navigate = useNavigate();

  const handleNavigateToDuvidas = (route: string) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4 text-lottery-pink">
            <Calendar className="w-6 h-6 mr-2" />
            <h2 className="text-2xl font-bold">Próximos Sorteios</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Fique atento para nunca perder um sorteio. Confira as datas e horários dos próximos sorteios.
          </p>
          
          <div className="space-y-4">
            {upcomingDraws.map((draw) => (
              <div key={draw.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <img src={draw.logo} alt={draw.name} className="h-8 mr-3" />
                  <span className="font-medium">{draw.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{draw.day}</div>
                  <div className="text-sm text-gray-500">{draw.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-4 text-lottery-navy">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-6 h-6 mr-2" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <h2 className="text-2xl font-bold">Como Jogar</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Aprenda como jogar na nossa plataforma e entenda as regras básicas de cada jogo.
          </p>
          
          <div className="space-y-4">
            {gameRules.map((rule) => (
              <div 
                key={rule.id} 
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleNavigateToDuvidas(rule.route)}
              >
                <div className="flex items-center">
                  <img src={rule.logo} alt={rule.name} className="h-8 mr-3" />
                  <span className="font-medium">Regras do {rule.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingDraws;
