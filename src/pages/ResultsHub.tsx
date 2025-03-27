
import { useState, useEffect, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ArrowLeft, 
  CalendarDays, 
  ArrowRight, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  EyeIcon,
  ChevronDown 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Game {
  id: number;
  name: string;
  logo: string;
  date: string;
  numbers: string[];
  specialNumbers?: string[];
  multiplier?: string;
}

interface MegaMillionsResult {
  drawDate: string;
  displayDate: string;
  dayOfWeek: string;
  numbers: string[];
  megaBall: string;
  multiplier: string;
  jackpot?: string;
}

interface PowerballResult {
  drawDate: string;
  displayDate: string;
  dayOfWeek: string;
  numbers: string[];
  powerball: string;
  multiplier: string;
  jackpot?: string;
}

interface LuckyDayResult {
  drawDate: string;
  displayDate: string;
  dayOfWeek: string;
  numbers: string[];
  bonusNumber: string;
  lottoMillion1: string[];
  lottoMillion2: string[];
}

interface Pick4Result {
  drawDate: string;
  displayDate: string;
  dayOfWeek: string;
  drawTime: string;
  numbers: string[];
}

type GameResult = MegaMillionsResult | PowerballResult | LuckyDayResult | Pick4Result;

const megaMillionsHistory: MegaMillionsResult[] = [
  {
    drawDate: "03/21/2025",
    displayDate: "21 de março de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["15", "22", "31", "52", "57"],
    megaBall: "2",
    multiplier: "x3"
  },
  {
    drawDate: "03/18/2025",
    displayDate: "18 de março de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["27", "28", "31", "32", "33"],
    megaBall: "24",
    multiplier: "x3"
  },
  {
    drawDate: "03/14/2025",
    displayDate: "14 de março de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["3", "17", "39", "42", "70"],
    megaBall: "1",
    multiplier: "x3"
  },
  {
    drawDate: "03/11/2025",
    displayDate: "11 de março de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["1", "19", "26", "38", "69"],
    megaBall: "15",
    multiplier: "x3"
  },
  {
    drawDate: "03/07/2025",
    displayDate: "7 de março de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["8", "20", "48", "58", "60"],
    megaBall: "7",
    multiplier: "x3"
  },
  {
    drawDate: "03/04/2025",
    displayDate: "4 de março de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["14", "19", "47", "52", "70"],
    megaBall: "6",
    multiplier: "x2"
  },
  {
    drawDate: "02/28/2025",
    displayDate: "28 de fevereiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["9", "19", "30", "35", "66"],
    megaBall: "16",
    multiplier: "x3"
  },
  {
    drawDate: "02/25/2025",
    displayDate: "25 de fevereiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["4", "8", "11", "32", "52"],
    megaBall: "13",
    multiplier: "x2"
  },
  {
    drawDate: "02/21/2025",
    displayDate: "21 de fevereiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["1", "13", "28", "37", "46"],
    megaBall: "10",
    multiplier: "x2"
  },
  {
    drawDate: "02/18/2025",
    displayDate: "18 de fevereiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["1", "20", "25", "58", "61"],
    megaBall: "22",
    multiplier: "x2"
  },
  {
    drawDate: "02/14/2025",
    displayDate: "14 de fevereiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["11", "19", "31", "49", "56"],
    megaBall: "16",
    multiplier: "x3"
  },
  {
    drawDate: "02/11/2025",
    displayDate: "11 de fevereiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["7", "30", "39", "41", "70"],
    megaBall: "13",
    multiplier: "x3"
  },
  {
    drawDate: "02/07/2025",
    displayDate: "7 de fevereiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["10", "23", "32", "43", "65"],
    megaBall: "3",
    multiplier: "x2"
  },
  {
    drawDate: "02/04/2025",
    displayDate: "4 de fevereiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["2", "14", "30", "40", "58"],
    megaBall: "12",
    multiplier: "x4"
  },
  {
    drawDate: "01/31/2025",
    displayDate: "31 de janeiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["5", "10", "15", "20", "25"],
    megaBall: "5",
    multiplier: "x3"
  },
  {
    drawDate: "01/28/2025",
    displayDate: "28 de janeiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["12", "24", "37", "58", "60"],
    megaBall: "6",
    multiplier: "x2"
  },
  {
    drawDate: "01/24/2025",
    displayDate: "24 de janeiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["1", "4", "23", "40", "45"],
    megaBall: "11",
    multiplier: "x3"
  },
  {
    drawDate: "01/21/2025",
    displayDate: "21 de janeiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["9", "12", "17", "48", "68"],
    megaBall: "8",
    multiplier: "x2"
  },
  {
    drawDate: "01/17/2025",
    displayDate: "17 de janeiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["3", "16", "21", "61", "62"],
    megaBall: "19",
    multiplier: "x4"
  },
  {
    drawDate: "01/14/2025",
    displayDate: "14 de janeiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["6", "15", "24", "34", "55"],
    megaBall: "7",
    multiplier: "x3"
  },
  {
    drawDate: "01/10/2025",
    displayDate: "10 de janeiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["2", "11", "20", "32", "65"],
    megaBall: "23",
    multiplier: "x3"
  },
  {
    drawDate: "01/07/2025",
    displayDate: "7 de janeiro de 2025",
    dayOfWeek: "Terça-feira",
    numbers: ["4", "22", "33", "44", "50"],
    megaBall: "12",
    multiplier: "x2"
  },
  {
    drawDate: "01/03/2025",
    displayDate: "3 de janeiro de 2025",
    dayOfWeek: "Sexta-feira",
    numbers: ["10", "15", "20", "30", "55"],
    megaBall: "10",
    multiplier: "x2"
  },
  {
    drawDate: "12/31/2024",
    displayDate: "31 de dezembro de 2024",
    dayOfWeek: "Terça-feira",
    numbers: ["5", "14", "28", "31", "40"],
    megaBall: "2",
    multiplier: "x3"
  },
  {
    drawDate: "12/27/2024",
    displayDate: "27 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["8", "19", "25", "36", "59"],
    megaBall: "7",
    multiplier: "x3"
  },
  {
    drawDate: "12/24/2024",
    displayDate: "24 de dezembro de 2024",
    dayOfWeek: "Terça-feira",
    numbers: ["3", "6", "34", "53", "60"],
    megaBall: "10",
    multiplier: "x2"
  },
  {
    drawDate: "12/20/2024",
    displayDate: "20 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["11", "13", "26", "50", "65"],
    megaBall: "15",
    multiplier: "x2"
  },
  {
    drawDate: "12/17/2024",
    displayDate: "17 de dezembro de 2024",
    dayOfWeek: "Terça-feira",
    numbers: ["9", "10", "25", "38", "50"],
    megaBall: "5",
    multiplier: "x4"
  }
];

const powerballHistory: PowerballResult[] = [
  {
    drawDate: "03/24/2025",
    displayDate: "24 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["6", "23", "35", "36", "47"],
    powerball: "12",
    multiplier: "x2"
  },
  {
    drawDate: "03/22/2025",
    displayDate: "22 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["6", "7", "25", "46", "57"],
    powerball: "12",
    multiplier: "x3"
  },
  {
    drawDate: "03/19/2025",
    displayDate: "19 de março de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["8", "11", "21", "49", "59"],
    powerball: "15",
    multiplier: "x2"
  },
  {
    drawDate: "03/17/2025",
    displayDate: "17 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["11", "18", "23", "38", "60"],
    powerball: "9",
    multiplier: "x2"
  },
  {
    drawDate: "03/15/2025",
    displayDate: "15 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["12", "28", "33", "36", "54"],
    powerball: "5",
    multiplier: "x3"
  },
  {
    drawDate: "03/12/2025",
    displayDate: "12 de março de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["11", "13", "28", "51", "58"],
    powerball: "1",
    multiplier: "x2"
  },
  {
    drawDate: "03/10/2025",
    displayDate: "10 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["17", "40", "47", "50", "55"],
    powerball: "6",
    multiplier: "x2"
  },
  {
    drawDate: "03/08/2025",
    displayDate: "8 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "4", "16", "23", "63"],
    powerball: "13",
    multiplier: "x3"
  },
  {
    drawDate: "03/05/2025",
    displayDate: "5 de março de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["24", "28", "40", "63", "65"],
    powerball: "20",
    multiplier: "x3"
  },
  {
    drawDate: "03/03/2025",
    displayDate: "3 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["18", "20", "50", "52", "56"],
    powerball: "20",
    multiplier: "x2"
  },
  {
    drawDate: "03/01/2025",
    displayDate: "1 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["3", "8", "40", "53", "58"],
    powerball: "3",
    multiplier: "x3"
  },
  {
    drawDate: "02/26/2025",
    displayDate: "26 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["4", "27", "42", "50", "60"],
    powerball: "13",
    multiplier: "x3"
  },
  {
    drawDate: "02/24/2025",
    displayDate: "24 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "22", "30", "42", "47"],
    powerball: "23",
    multiplier: "x2"
  },
  {
    drawDate: "02/22/2025",
    displayDate: "22 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "3", "19", "40", "69"],
    powerball: "9",
    multiplier: "x3"
  },
  {
    drawDate: "02/19/2025",
    displayDate: "19 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "4", "45", "47", "67"],
    powerball: "18",
    multiplier: "x2"
  },
  {
    drawDate: "02/17/2025",
    displayDate: "17 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["5", "6", "24", "32", "43"],
    powerball: "1",
    multiplier: "x2"
  },
  {
    drawDate: "02/15/2025",
    displayDate: "15 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["10", "17", "19", "44", "45"],
    powerball: "2",
    multiplier: "x2"
  },
  {
    drawDate: "02/12/2025",
    displayDate: "12 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["25", "30", "52", "54", "67"],
    powerball: "24",
    multiplier: "x2"
  },
  {
    drawDate: "02/10/2025",
    displayDate: "10 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["16", "26", "31", "60", "61"],
    powerball: "23",
    multiplier: "x2"
  },
  {
    drawDate: "02/08/2025",
    displayDate: "8 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "9", "36", "53", "63"],
    powerball: "11",
    multiplier: "x2"
  },
  {
    drawDate: "02/05/2025",
    displayDate: "5 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["5", "9", "27", "39", "42"],
    powerball: "16",
    multiplier: "x2"
  },
  {
    drawDate: "02/03/2025",
    displayDate: "3 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["6", "9", "13", "29", "66"],
    powerball: "24",
    multiplier: "x2"
  },
  {
    drawDate: "02/01/2025",
    displayDate: "1 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["6", "16", "31", "62", "66"],
    powerball: "18",
    multiplier: "x2"
  },
  {
    drawDate: "01/29/2025",
    displayDate: "29 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["6", "8", "19", "23", "26"],
    powerball: "5",
    multiplier: "x2"
  },
  {
    drawDate: "01/27/2025",
    displayDate: "27 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "2", "5", "13", "29"],
    powerball: "25",
    multiplier: "x3"
  },
  {
    drawDate: "01/25/2025",
    displayDate: "25 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["24", "26", "39", "47", "57"],
    powerball: "19",
    multiplier: "x3"
  },
  {
    drawDate: "01/22/2025",
    displayDate: "22 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "5", "12", "13", "58"],
    powerball: "21",
    multiplier: "x2"
  },
  {
    drawDate: "01/20/2025",
    displayDate: "20 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["7", "10", "11", "44", "67"],
    powerball: "2",
    multiplier: "x2"
  },
  {
    drawDate: "01/18/2025",
    displayDate: "18 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["14", "20", "23", "39", "67"],
    powerball: "2",
    multiplier: "x3"
  },
  {
    drawDate: "01/15/2025",
    displayDate: "15 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "9", "10", "35", "44"],
    powerball: "18",
    multiplier: "x2"
  },
  {
    drawDate: "01/13/2025",
    displayDate: "13 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["7", "17", "27", "39", "42"],
    powerball: "6",
    multiplier: "x2"
  },
  {
    drawDate: "01/11/2025",
    displayDate: "11 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["4", "6", "14", "20", "32"],
    powerball: "17",
    multiplier: "x2"
  },
  {
    drawDate: "01/08/2025",
    displayDate: "8 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["12", "21", "42", "44", "49"],
    powerball: "1",
    multiplier: "x3"
  },
  {
    drawDate: "01/06/2025",
    displayDate: "6 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["2", "11", "22", "35", "60"],
    powerball: "23",
    multiplier: "x2"
  },
  {
    drawDate: "01/04/2025",
    displayDate: "4 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["12", "21", "42", "44", "49"],
    powerball: "1",
    multiplier: "x3"
  },
  {
    drawDate: "01/01/2025",
    displayDate: "1 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["12", "21", "42", "44", "49"],
    powerball: "1",
    multiplier: "x3"
  },
  {
    drawDate: "12/30/2024",
    displayDate: "30 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["17", "35", "46", "54", "67"],
    powerball: "8",
    multiplier: "x2"
  },
  {
    drawDate: "12/27/2024",
    displayDate: "27 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["10", "11", "26", "27", "34"],
    powerball: "7",
    multiplier: "x2"
  },
  {
    drawDate: "12/25/2024",
    displayDate: "25 de dezembro de 2024",
    dayOfWeek: "Quarta-feira",
    numbers: ["14", "17", "18", "21", "27"],
    powerball: "9",
    multiplier: "x3"
  },
  {
    drawDate: "12/23/2024",
    displayDate: "23 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "13", "33", "44", "56"],
    powerball: "9",
    multiplier: "x2"
  },
  {
    drawDate: "12/20/2024",
    displayDate: "20 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["3", "7", "33", "50", "69"],
    powerball: "24",
    multiplier: "x3"
  },
  {
    drawDate: "12/18/2024",
    displayDate: "18 de dezembro de 2024",
    dayOfWeek: "Quarta-feira",
    numbers: ["2", "4", "21", "38", "50"],
    powerball: "10",
    multiplier: "x2"
  },
  {
    drawDate: "12/16/2024",
    displayDate: "16 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["8", "12", "23", "26", "30"],
    powerball: "11",
    multiplier: "x2"
  }
];

const gamesData: Game[] = [
  {
    id: 1,
    name: "Mega Millions",
    logo: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
    date: "Friday, Mar 22, 2024",
    numbers: ["15", "25", "31", "52", "67"],
    specialNumbers: ["9"],
    multiplier: "3X"
  },
  {
    id: 2,
    name: "Powerball",
    logo: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
    date: "Wednesday, Mar 20, 2024",
    numbers: ["8", "11", "21", "49", "59"],
    specialNumbers: ["15"],
    multiplier: "2X"
  },
  {
    id: 3,
    name: "Lucky Day Lotto",
    logo: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
    date: "Segunda, Mar 24, 2024",
    numbers: ["3", "24", "27", "34", "38"]
  },
  {
    id: 4,
    name: "Pick 4",
    logo: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
    date: "Sábado, Mar 22, 2024",
    numbers: ["7", "0", "5", "3"],
    specialNumbers: ["7"]
  },
  {
    id: 5,
    name: "Cash 5",
    logo: "/lovable-uploads/c0b5f378-154f-476e-a51e-e9777bba8645.png",
    date: "Sábado, Mar 22, 2024",
    numbers: ["6", "12", "13", "20", "29"]
  },
  {
    id: 6,
    name: "Fast Play",
    logo: "/lovable-uploads/a02651ec-8efc-429a-8231-5ae52f5c4af5.png",
    date: "Todos os dias",
    numbers: ["02", "14", "26", "33", "40"]
  },
];

const luckyDayHistory: LuckyDayResult[] = [
  {
    drawDate: "03/24/2025",
    displayDate: "24 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["9", "13", "16", "31", "36", "42"],
    bonusNumber: "21",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/22/2025",
    displayDate: "22 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["11", "20", "24", "27", "39", "48"],
    bonusNumber: "12",
    lottoMillion1: ["3", "8", "25", "28", "38", "40"],
    lottoMillion2: ["11", "16", "18", "21", "24", "43"]
  },
  {
    drawDate: "03/20/2025",
    displayDate: "20 de março de 2025",
    dayOfWeek: "Quinta-feira",
    numbers: ["6", "12", "13", "20", "29", "31"],
    bonusNumber: "15",
    lottoMillion1: ["9", "14", "21", "25", "38", "43"],
    lottoMillion2: ["2", "12", "14", "17", "39", "44"]
  },
  {
    drawDate: "03/17/2025",
    displayDate: "17 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["21", "22", "26", "29", "42", "49"],
    bonusNumber: "4",
    lottoMillion1: ["6", "14", "17", "36", "40", "44"],
    lottoMillion2: ["2", "5", "9", "14", "21", "48"]
  },
  {
    drawDate: "03/15/2025",
    displayDate: "15 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["17", "24", "29", "35", "38", "42"],
    bonusNumber: "8",
    lottoMillion1: ["4", "15", "19", "26", "33", "41"],
    lottoMillion2: ["7", "13", "22", "31", "37", "45"]
  }
];

const pick4History: Pick4Result[] = [
  {
    drawDate: "03/25/2025",
    displayDate: "25 de março de 2025",
    dayOfWeek: "Terça-feira",
    drawTime: "Dia",
    numbers: ["8", "18", "21", "27", "30"]
  },
  {
    drawDate: "03/25/2025",
    displayDate: "25 de março de 2025",
    dayOfWeek: "Terça-feira",
    drawTime: "Noite",
    numbers: ["3", "11", "19", "22", "29"]
  },
  {
    drawDate: "03/24/2025",
    displayDate: "24 de março de 2025",
    dayOfWeek: "Segunda-feira",
    drawTime: "Dia",
    numbers: ["5", "12", "17", "23", "31"]
  },
  {
    drawDate: "03/24/2025",
    displayDate: "24 de março de 2025",
    dayOfWeek: "Segunda-feira",
    drawTime: "Noite",
    numbers: ["1", "9", "14", "20", "25"]
  },
  {
    drawDate: "03/23/2025",
    displayDate: "23 de março de 2025",
    dayOfWeek: "Domingo",
    drawTime: "Dia",
    numbers: ["6", "13", "16", "26", "32"]
  }
];

const ResultsHub = () => {
  const [activeGame, setActiveGame] = useState("mega-millions");
  const [currentPage, setCurrentPage] = useState(1);
  const [showGamesDropdown, setShowGamesDropdown] = useState(false);
  const resultsPerPage = 10;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowGamesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getGameResults = () => {
    switch (activeGame) {
      case "mega-millions":
        return megaMillionsHistory;
      case "powerball":
        return powerballHistory;
      case "lucky-day":
        return luckyDayHistory;
      case "pick4":
        return pick4History;
      default:
        return megaMillionsHistory;
    }
  };

  const gameResults = getGameResults();
  
  const totalPages = Math.ceil(gameResults.length / resultsPerPage);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = gameResults.slice(indexOfFirstResult, indexOfLastResult);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGameNameFromId = (id: string) => {
    switch (id) {
      case "mega-millions":
        return "Mega Millions";
      case "powerball":
        return "Powerball";
      case "lucky-day":
        return "Lucky Day Lotto";
      case "pick4":
        return "Pick 4";
      default:
        return "Mega Millions";
    }
  };

  const getGameLogoFromId = (id: string) => {
    switch (id) {
      case "mega-millions":
        return "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png";
      case "powerball":
        return "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png";
      case "lucky-day":
        return "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png";
      case "pick4":
        return "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png";
      default:
        return "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png";
    }
  };

  const getGameBgColorFromId = (id: string) => {
    switch (id) {
      case "mega-millions":
        return "bg-blue-500";
      case "powerball":
        return "bg-[#ff5247]";
      case "lucky-day":
        return "bg-[#8CD444]";
      case "pick4":
        return "bg-[#00ccc6]";
      case "cash5":
        return "bg-[#ffa039]";
      case "fast-play":
        return "bg-[#ffa039]";
      default:
        return "bg-blue-500";
    }
  };

  const lotteryGames = [
    {
      id: "mega-millions",
      name: "Mega Millions",
      logoSrc: "/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png",
      latestResults: "15, 22, 31, 52, 57 + 2",
      nextDrawing: "SEXTA, MAR 25",
      backgroundColor: "bg-blue-500",
      route: "/play-mega-millions",
    },
    {
      id: "powerball",
      name: "Powerball",
      logoSrc: "/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png",
      latestResults: "8, 11, 21, 49, 59 + 15",
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#ff5247]",
      route: "/play-powerball",
    },
    {
      id: "lucky-day",
      name: "Lucky Day Lotto",
      logoSrc: "/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png",
      latestResults: "9, 13, 16, 31, 36, 42",
      nextDrawing: "SEGUNDA, MAR 24",
      backgroundColor: "bg-[#8CD444]",
      route: "/play-lucky-day",
    },
    {
      id: "pick4",
      name: "Pick 4",
      logoSrc: "/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png",
      latestResults: "8, 18, 21, 27, 30",
      nextDrawing: "SÁBADO, MAR 22",
      backgroundColor: "bg-[#00ccc6]",
      route: "/play-pick4",
    },
    {
      id: "cash5",
      name: "Cash 5",
      logoSrc: "/lovable-uploads/c0b5f378-154f-476e-a51e-e9777bba8645.png",
      latestResults: "6, 12, 13, 20, 29",
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      route: "/play-cash5",
    },
    {
      id: "fast-play",
      name: "Fast Play",
      logoSrc: "/lovable-uploads/a02651ec-8efc-429a-8231-5ae52f5c4af5.png",
      latestResults: "02, 14, 26, 33, 40",
      nextDrawing: "TODOS OS DIAS",
      backgroundColor: "bg-[#ffa039]",
      route: "/play-fast-play",
    },
  ];

  const toggleGamesDropdown = () => {
    setShowGamesDropdown(!showGamesDropdown);
  };

  const renderResultsTable = () => {
    if (activeGame === "mega-millions") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Números</TableHead>
              <TableHead>Mega Ball</TableHead>
              <TableHead>Multiplicador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(currentResults as MegaMillionsResult[]).map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{result.dayOfWeek}</span>
                    <span className="text-sm text-gray-500">{result.displayDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {result.numbers.map((num, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {num}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium">
                    {result.megaBall}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-center font-medium">
                    {result.multiplier}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (activeGame === "powerball") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Números</TableHead>
              <TableHead>Powerball</TableHead>
              <TableHead>Multiplicador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(currentResults as PowerballResult[]).map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{result.dayOfWeek}</span>
                    <span className="text-sm text-gray-500">{result.displayDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {result.numbers.map((num, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-medium">
                        {num}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium">
                    {result.powerball}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-center font-medium">
                    {result.multiplier}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (activeGame === "lucky-day") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Números</TableHead>
              <TableHead>Bônus</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(currentResults as LuckyDayResult[]).map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{result.dayOfWeek}</span>
                    <span className="text-sm text-gray-500">{result.displayDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {result.numbers.map((num, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-[#8CD444] flex items-center justify-center text-white font-medium">
                        {num}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-medium">
                    {result.bonusNumber}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (activeGame === "pick4") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Números</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(currentResults as Pick4Result[]).map((result, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{result.dayOfWeek}</span>
                    <span className="text-sm text-gray-500">{result.displayDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-center font-medium">
                    {result.drawTime}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {result.numbers.map((num, idx) => (
                      <div key={idx} className="w-8 h-8 rounded-full bg-[#00ccc6] flex items-center justify-center text-white font-medium">
                        {num}
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 pt-24 pb-16">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Voltar</span>
          </Button>
          <h1 className="text-3xl font-bold text-lottery-navy dark:text-white">Hub de Resultados</h1>
        </div>

        <div className="relative mb-8" ref={dropdownRef}>
          <button
            onClick={toggleGamesDropdown}
            className="flex items-center justify-between w-full md:w-72 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <img
                src={getGameLogoFromId(activeGame)}
                alt={getGameNameFromId(activeGame)}
                className="h-8 mr-2"
              />
              <span className="font-medium dark:text-white">{getGameNameFromId(activeGame)}</span>
            </div>
            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          {showGamesDropdown && (
            <div className="absolute mt-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:w-[820px] left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-50 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {lotteryGames.map((game) => (
                  <div
                    key={game.id}
                    className={`${game.backgroundColor} rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200`}
                    onClick={() => {
                      setActiveGame(game.id);
                      setShowGamesDropdown(false);
                    }}
                  >
                    <div className="p-4 flex flex-col items-center">
                      <img src={game.logoSrc} alt={game.name} className="h-12 w-auto mb-3" />
                      <p className="text-sm text-black font-medium">Últimos resultados:</p>
                      <p className="text-lg font-bold text-black mb-2">{game.latestResults}</p>
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
                <Button className="bg-lottery-pink text-white hover:bg-lottery-pink/90 transition-colors px-6 py-3 rounded-full text-lg font-bold shadow-md">
                  Ver todos os resultados
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <Tabs value={activeGame} onValueChange={setActiveGame} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent">
            <TabsTrigger 
              value="mega-millions"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 border rounded-md dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200 dark:border-gray-700"
            >
              <img src="/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png" alt="Mega Millions" className="h-6 mr-2" />
              Mega Millions
            </TabsTrigger>
            <TabsTrigger 
              value="powerball"
              className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700 border rounded-md dark:data-[state=active]:bg-red-900 dark:data-[state=active]:text-red-200 dark:border-gray-700"
            >
              <img src="/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png" alt="Powerball" className="h-6 mr-2" />
              Powerball
            </TabsTrigger>
            <TabsTrigger 
              value="lucky-day"
              className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700 border rounded-md dark:data-[state=active]:bg-green-900 dark:data-[state=active]:text-green-200 dark:border-gray-700"
            >
              <img src="/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png" alt="Lucky Day" className="h-6 mr-2" />
              Lucky Day
            </TabsTrigger>
            <TabsTrigger 
              value="pick4"
              className="data-[state=active]:bg-cyan-100 data-[state=active]:text-cyan-700 border rounded-md dark:data-[state=active]:bg-cyan-900 dark:data-[state=active]:text-cyan-200 dark:border-gray-700"
            >
              <img src="/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png" alt="Pick 4" className="h-6 mr-2" />
              Pick 4
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeGame} className="mt-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src={getGameLogoFromId(activeGame)} 
                    alt={getGameNameFromId(activeGame)} 
                    className="h-10 mr-3" 
                  />
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">{getGameNameFromId(activeGame)} Resultados</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Veja os resultados mais recentes</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-2">
                  <Link 
                    to={`/check-numbers/${activeGame}`} 
                    className={`flex items-center justify-center ${getGameBgColorFromId(activeGame)} text-white rounded-full px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity`}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Cheque seus números
                  </Link>
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center rounded-full dark:text-white dark:border-gray-600"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" /> Veja todos
                  </Button>
                </div>
              </div>

              <div className="relative w-full mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Pesquisar por data..." 
                  className="border dark:border-gray-700 rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-lottery-navy/50 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="overflow-x-auto mb-6">
                {renderResultsTable()}
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={currentPage === i + 1}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3 flex items-center dark:text-white">
                <CalendarDays className="mr-2 text-lottery-pink" />
                Próximos Sorteios
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fique atento para nunca perder um sorteio. Confira as datas e horários dos próximos sorteios.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png" alt="Mega Millions" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Mega Millions</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold dark:text-white">Terça-feira</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">23:00</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png" alt="Powerball" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Powerball</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold dark:text-white">Quarta-feira</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">22:30</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png" alt="Lucky Day" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Lucky Day</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold dark:text-white">Todos os dias</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">19:00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-3 flex items-center dark:text-white">
                <FileText className="mr-2 text-lottery-navy" />
                Como Jogar
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Aprenda como jogar na nossa plataforma e entenda as regras básicas de cada jogo.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png" alt="Mega Millions" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Regras do Mega Millions</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png" alt="Powerball" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Regras do Powerball</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <img src="/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png" alt="Pick 4" className="h-6 mr-2" />
                    <span className="font-medium dark:text-white">Regras do Pick 4</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResultsHub;
