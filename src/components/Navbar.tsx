import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown, CheckCircle, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "./ThemeToggle";
import NumbersCircle from "./NumbersCircle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const gamesDropdownRef = useRef<HTMLDivElement>(null);
  const resultsDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isPlayPage = location.pathname.includes('/play-');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gamesDropdownRef.current && !gamesDropdownRef.current.contains(event.target as Node)) {
        setShowGamesDropdown(false);
      }
      if (resultsDropdownRef.current && !resultsDropdownRef.current.contains(event.target as Node)) {
        setShowResultsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToGames = () => {
    if (isOpen) setIsOpen(false);
    
    if (window.location.pathname === '/') {
      const gamesSection = document.getElementById('lottery-games');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#lottery-games';
    }
  };

  const toggleGamesDropdown = () => {
    setShowGamesDropdown(!showGamesDropdown);
    setShowResultsDropdown(false);
  };

  const toggleResultsDropdown = () => {
    setShowResultsDropdown(!showResultsDropdown);
    setShowGamesDropdown(false);
  };

  const navigateToResultsHub = () => {
    if (isOpen) setIsOpen(false);
    
    navigate('/results-hub');
    window.scrollTo(0, 0);
  };

  const navigateToDuvidas = () => {
    if (isOpen) setIsOpen(false);
    
    navigate('/duvidas');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const navigateToGame = (route: string) => {
    setShowGamesDropdown(false);
    setShowResultsDropdown(false);
    if (isOpen) setIsOpen(false);
    
    navigate(route);
    window.scrollTo(0, 0);
  };

  const navbarClasses = "fixed top-0 left-0 right-0 z-50 bg-[#1a0f36] py-3";

  const lotteryGames = [
    {
      id: 1,
      logoSrc: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
      amount: "344,000,000",
      nextDrawing: "SEXTA, MAR 25",
      backgroundColor: "bg-blue-500",
      route: "/play-mega-millions",
    },
    {
      id: 2,
      logoSrc: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
      amount: "444,000,000",
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#ff5247]",
      route: "/play-powerball",
    },
    {
      id: 3,
      logoSrc: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
      amount: "570,000",
      nextDrawing: "SEGUNDA, MAR 24",
      backgroundColor: "bg-[#8CD444]",
      route: "/play-lucky-day",
    },
    {
      id: 4,
      logoSrc: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
      amount: "100,000",
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#00ccc6]",
      route: "/play-pick4",
    },
    {
      id: 5,
      logoSrc: "/lovable-uploads/c0b5f378-154f-476e-a51e-e9777bba8645.png",
      amount: "5,000",
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      route: "/play-cash5",
    },
    {
      id: 6,
      logoSrc: "/lovable-uploads/a02651ec-8efc-429a-8231-5ae52f5c4af5.png",
      amount: "500",
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      route: "/play-fast-play",
    },
  ];

  const lotteryResults = [
    {
      id: "mega-millions",
      name: "Mega Millions",
      logoSrc: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
      numbers: ["15", "22", "31", "52", "57"],
      powerball: "2",
      nextDrawing: "SEXTA, MAR 25",
      backgroundColor: "bg-blue-500",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=mega-millions",
    },
    {
      id: "powerball",
      name: "Powerball",
      logoSrc: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
      numbers: ["8", "11", "21", "49", "59"],
      powerball: "15",
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#ff5247]",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=powerball",
    },
    {
      id: "lucky-day",
      name: "Lucky Day Lotto",
      logoSrc: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
      numbers: ["9", "13", "16", "31", "36", "42"],
      nextDrawing: "SEGUNDA, MAR 24",
      backgroundColor: "bg-[#8CD444]",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=lucky-day",
    },
    {
      id: "pick4",
      name: "Pick 4",
      logoSrc: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
      numbers: ["8", "18", "21", "27", "30"],
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#00ccc6]",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=pick4",
    },
    {
      id: "cash5",
      name: "Cash 5",
      logoSrc: "/lovable-uploads/c0b5f378-154f-476e-a51e-e9777bba8645.png",
      numbers: ["6", "12", "13", "20", "29"],
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=cash5",
    },
    {
      id: "fast-play",
      name: "Fast Play",
      logoSrc: "/lovable-uploads/a02651ec-8efc-429a-8231-5ae52f5c4af5.png",
      numbers: ["02", "14", "26", "33", "40"],
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      circleColor: "bg-white/20",
      textColor: "text-black",
      route: "/results-hub?game=fast-play",
    },
  ];

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={navigateToHome} className="flex-shrink-0">
            <img
              src="/lovable-uploads/49af7c32-e87d-4f46-a005-b535bbdf18ed.png"
              alt="LotoEasy Logo"
              className="h-16 w-auto"
            />
          </Link>

          <nav className="hidden md:flex justify-center flex-grow ml-2 mr-8">
            <div className="flex items-center space-x-8">
              <div className="relative" ref={gamesDropdownRef}>
                <button 
                  onClick={toggleGamesDropdown}
                  className="text-white hover:text-white/80 transition-colors font-medium font-nunito flex items-center"
                >
                  Loterias <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {showGamesDropdown && (
                  <div className="absolute mt-2 p-6 bg-white dark:bg-lottery-dark-card rounded-lg shadow-lg w-[820px] left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-200">
                    <div className="grid grid-cols-3 gap-5">
                      {lotteryGames.map((game) => (
                        <div 
                          key={game.id} 
                          className={`${game.backgroundColor} rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200`}
                          onClick={() => navigateToGame(game.route)}
                        >
                          <div className="p-4 flex flex-col items-center">
                            <img src={game.logoSrc} alt={`Game ${game.id}`} className="h-12 w-auto mb-3" />
                            <p className="text-2xl font-bold text-black">${game.amount}</p>
                            <p className="text-sm text-black mt-1 font-medium">{game.nextDrawing}</p>
                            <button className="mt-3 bg-transparent hover:bg-black/10 text-black border-2 border-black rounded-full px-6 py-1.5 text-sm font-bold">
                              JOGAR
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link 
                        to="/#lottery-games" 
                        onClick={() => {setShowGamesDropdown(false); scrollToGames();}}
                        className="inline-block bg-lottery-pink text-white hover:bg-lottery-pink/90 transition-colors px-6 py-3 rounded-full text-lg font-bold shadow-md"
                      >
                        Ver todos os jogos
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative" ref={resultsDropdownRef}>
                <button 
                  onClick={toggleResultsDropdown}
                  className="text-white hover:text-white/80 transition-colors font-medium font-nunito flex items-center"
                >
                  Resultados <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {showResultsDropdown && (
                  <div className="absolute mt-2 p-6 bg-white dark:bg-lottery-dark-card rounded-lg shadow-lg w-[820px] left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-200">
                    <div className="grid grid-cols-3 gap-5">
                      {lotteryResults.map((game) => (
                        <div 
                          key={game.id} 
                          className={`${game.backgroundColor} rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200`}
                          onClick={() => navigateToGame(game.route)}
                        >
                          <div className="p-4 flex flex-col items-center">
                            <img src={game.logoSrc} alt={game.name} className="h-12 w-auto mb-3" />
                            <p className="text-sm text-black font-medium">Últimos resultados:</p>
                            <div className="py-2">
                              <NumbersCircle 
                                numbers={game.numbers} 
                                powerball={game.powerball} 
                                backgroundColor={game.circleColor}
                                textColor={game.textColor}
                              />
                            </div>
                            <p className="text-sm text-black font-medium">{game.nextDrawing}</p>
                            
                            <div className="mt-3 flex flex-col space-y-2 w-full">
                              <Link 
                                to={`/check-numbers/${game.id}`} 
                                className="flex items-center justify-center bg-white/20 hover:bg-white/30 text-black border border-black rounded-full px-4 py-1.5 text-sm font-medium"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" /> Cheque seus números
                              </Link>
                              <Link 
                                to={`/results-hub?game=${game.id}`} 
                                className="flex items-center justify-center bg-white/20 hover:bg-white/30 text-black border border-black rounded-full px-4 py-1.5 text-sm font-medium"
                              >
                                <EyeIcon className="h-4 w-4 mr-1" /> Veja todos
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <Link 
                        to="/results-hub"
                        onClick={() => setShowResultsDropdown(false)}
                        className="inline-block bg-lottery-pink text-white hover:bg-lottery-pink/90 transition-colors px-6 py-3 rounded-full text-lg font-bold shadow-md"
                      >
                        Ver todos os resultados
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                className="text-white hover:text-white/80 transition-colors font-medium font-nunito"
              >
                Ganhadores
              </button>
              <button 
                onClick={navigateToDuvidas}
                className="text-white hover:text-white/80 transition-colors font-medium font-nunito"
              >
                Duvidas
              </button>
              <button 
                className="text-white hover:text-white/80 transition-colors font-medium font-nunito"
              >
                Assistência
              </button>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle />
            <div className="relative">
              <div className="flex items-center w-64 bg-white rounded-full overflow-hidden dark:bg-gray-800">
                <Search className="absolute left-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search" 
                  className="border-none pl-10 h-9 focus-visible:ring-0 bg-white w-full rounded-full dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <ShoppingCart className="h-6 w-6 text-white cursor-pointer" />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1a0f36] animate-fade-in">
          <div className="px-4 py-2 space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
              onClick={scrollToGames}
            >
              Loterias
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
              onClick={navigateToResultsHub}
            >
              Resultados
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
            >
              Ganhadores
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
              onClick={navigateToDuvidas}
            >
              Duvidas
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
            >
              Assistência
            </Button>
            <Separator className="my-2 bg-white/20" />
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:text-white/80 hover:bg-[#2d1d4d] font-nunito"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrinho
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
