import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, CalendarDays, ArrowRight, FileText, ChevronRight, Sun, Moon } from "lucide-react";
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

interface LottoResult {
  date: string;
  displayDate: string;
  time: "Midday" | "Evening";
  numbers: string[];
}

interface Pick4Result {
  date: string;
  displayDate: string;
  time: "Midday" | "Evening";
  numbers: string[];
}

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
    numbers: ["12", "28", "33", "36", "54"],
    bonusNumber: "5",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/12/2025",
    displayDate: "12 de março de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["11", "13", "28", "51", "58"],
    bonusNumber: "1",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/10/2025",
    displayDate: "10 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["17", "40", "47", "50", "55"],
    bonusNumber: "6",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/08/2025",
    displayDate: "8 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "4", "16", "23", "63"],
    bonusNumber: "13",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/05/2025",
    displayDate: "5 de março de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["24", "28", "40", "63", "65"],
    bonusNumber: "20",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/03/2025",
    displayDate: "3 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["18", "20", "50", "52", "56"],
    bonusNumber: "20",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "03/01/2025",
    displayDate: "1 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["3", "8", "40", "53", "58"],
    bonusNumber: "3",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/26/2025",
    displayDate: "26 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["4", "27", "42", "50", "60"],
    bonusNumber: "13",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/24/2025",
    displayDate: "24 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "22", "30", "42", "47"],
    bonusNumber: "23",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/22/2025",
    displayDate: "22 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "3", "19", "40", "69"],
    bonusNumber: "9",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/19/2025",
    displayDate: "19 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "4", "45", "47", "67"],
    bonusNumber: "18",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/17/2025",
    displayDate: "17 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["5", "6", "24", "32", "43"],
    bonusNumber: "1",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/15/2025",
    displayDate: "15 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["10", "17", "19", "44", "45"],
    bonusNumber: "2",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/12/2025",
    displayDate: "12 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["25", "30", "52", "54", "67"],
    bonusNumber: "24",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/10/2025",
    displayDate: "10 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["16", "26", "31", "60", "61"],
    bonusNumber: "23",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/08/2025",
    displayDate: "8 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["2", "9", "36", "53", "63"],
    bonusNumber: "11",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/05/2025",
    displayDate: "5 de fevereiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["5", "9", "27", "39", "42"],
    bonusNumber: "16",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/03/2025",
    displayDate: "3 de fevereiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["6", "9", "13", "29", "66"],
    bonusNumber: "24",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "02/01/2025",
    displayDate: "1 de fevereiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["6", "16", "31", "62", "66"],
    bonusNumber: "18",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/29/2025",
    displayDate: "29 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["6", "8", "19", "23", "26"],
    bonusNumber: "5",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/27/2025",
    displayDate: "27 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "2", "5", "13", "29"],
    bonusNumber: "25",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/25/2025",
    displayDate: "25 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["24", "26", "39", "47", "57"],
    bonusNumber: "19",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/22/2025",
    displayDate: "22 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "5", "12", "13", "58"],
    bonusNumber: "21",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/20/2025",
    displayDate: "20 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["7", "10", "11", "44", "67"],
    bonusNumber: "2",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/18/2025",
    displayDate: "18 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["14", "20", "23", "39", "67"],
    bonusNumber: "2",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/15/2025",
    displayDate: "15 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["1", "9", "10", "35", "44"],
    bonusNumber: "18",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/13/2025",
    displayDate: "13 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["7", "17", "27", "39", "42"],
    bonusNumber: "6",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/11/2025",
    displayDate: "11 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["4", "6", "14", "20", "32"],
    bonusNumber: "17",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/08/2025",
    displayDate: "8 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["12", "21", "42", "44", "49"],
    bonusNumber: "1",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/06/2025",
    displayDate: "6 de janeiro de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["2", "11", "22", "35", "60"],
    bonusNumber: "23",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/04/2025",
    displayDate: "4 de janeiro de 2025",
    dayOfWeek: "Sábado",
    numbers: ["12", "21", "42", "44", "49"],
    bonusNumber: "1",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "01/01/2025",
    displayDate: "1 de janeiro de 2025",
    dayOfWeek: "Quarta-feira",
    numbers: ["12", "21", "42", "44", "49"],
    bonusNumber: "1",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/30/2024",
    displayDate: "30 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["17", "35", "46", "54", "67"],
    bonusNumber: "8",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/27/2024",
    displayDate: "27 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["10", "11", "26", "27", "34"],
    bonusNumber: "7",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/25/2024",
    displayDate: "25 de dezembro de 2024",
    dayOfWeek: "Quarta-feira",
    numbers: ["14", "17", "18", "21", "27"],
    bonusNumber: "9",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/23/2024",
    displayDate: "23 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["1", "13", "33", "44", "56"],
    bonusNumber: "9",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/20/2024",
    displayDate: "20 de dezembro de 2024",
    dayOfWeek: "Sexta-feira",
    numbers: ["3", "7", "33", "50", "69"],
    bonusNumber: "24",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/18/2024",
    displayDate: "18 de dezembro de 2024",
    dayOfWeek: "Quarta-feira",
    numbers: ["2", "4", "21", "38", "50"],
    bonusNumber: "10",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  },
  {
    drawDate: "12/16/2024",
    displayDate: "16 de dezembro de 2024",
    dayOfWeek: "Segunda-feira",
    numbers: ["8", "12", "23", "26", "30"],
    bonusNumber: "11",
    lottoMillion1: ["12", "25", "30", "32", "34", "42"],
    lottoMillion2: ["1", "4", "11", "29", "42", "49"]
  }
];

const lottoHistory: LottoResult[] = [
  {
    date: "25/03/2025",
    displayDate: "25 de março de 2025",
    time: "Midday",
    numbers: ["8", "18", "21", "27", "30"]
  },
  {
    date: "25/03/2025",
    displayDate: "25 de março de 2025",
    time: "Evening",
    numbers: ["9", "18", "26", "29", "33"]
  },
  {
    date: "24/03/2025",
    displayDate: "24 de março de 2025",
    time: "Midday",
    numbers: ["3", "5", "36", "38", "43"]
  },
  {
    date: "24/03/2025",
    displayDate: "24 de março de 2025",
    time: "Evening",
    numbers: ["7", "22", "32", "39", "42"]
  },
  {
    date: "23/03/2025",
    displayDate: "23 de março de 2025",
    time: "Midday",
    numbers: ["8", "21", "23", "24", "37"]
  },
  {
    date: "23/03/2025",
    displayDate: "23 de março de 2025",
    time: "Evening",
    numbers: ["23", "27", "31", "33", "43"]
  }
];

const pick4History: Pick4Result[] = [
  {
    date: "25/03/2025",
    displayDate: "25 de março de 2025",
    time: "Midday",
    numbers: ["8", "1", "8", "2"]
  },
  {
    date: "25/03/2025",
    displayDate: "25 de março de 2025",
    time: "Evening",
    numbers: ["9", "1", "8", "3"]
  },
  {
    date: "24/03/2025",
    displayDate: "24 de março de 2025",
    time: "Midday",
    numbers: ["3", "5", "3", "6"]
  },
  {
    date: "24/03/2025",
    displayDate: "24 de março de 2025",
    time: "Evening",
    numbers: ["7", "2", "2", "3"]
  },
  {
    date: "23/03/2025",
    displayDate: "23 de março de 2025",
    time: "Midday",
    numbers: ["8", "2", "1", "2"]
  },
  {
    date: "23/03/2025",
    displayDate: "23 de março de 2025",
    time: "Evening",
    numbers: ["2", "3", "2", "7"]
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

const ResultsHub = () => {
  const [activeTab, setActiveTab] = useState("mega-millions");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const resultsPerPage = 10;

  const getPageCount = (data: any[]) => {
    return Math.ceil(data.length / resultsPerPage);
  };

  const getPaginatedData = (data: any[]) => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const renderNumberBall = (number: string, color: string = "bg-blue-500") => (
    <div
      className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-bold`}
    >
      {number}
    </div>
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Central de Resultados</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar pelo número" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Buscar</Button>
            </form>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
            <TabsTrigger value="mega-millions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Mega Millions
            </TabsTrigger>
            <TabsTrigger value="powerball" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Powerball
            </TabsTrigger>
            <TabsTrigger value="lucky-day" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Lucky Day
            </TabsTrigger>
            <TabsTrigger value="pick4" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              Pick 4
            </TabsTrigger>
            <TabsTrigger value="lotto" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
              Lotto
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mega-millions" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/bc3feaa6-86f8-46cb-b245-5467ab0e5fb4.png" 
                  alt="Mega Millions Logo" 
                  className="h-12"
                />
                <div>
                  <h2 className="text-xl font-bold">Mega Millions</h2>
                  <p className="text-sm text-gray-600">Sorteios às Terças e Sextas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={16} />
                  Como Jogar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarDays size={16} />
                  Próximo Sorteio
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">Histórico de Resultados</h3>
              
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
                  {getPaginatedData(megaMillionsHistory).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{result.displayDate}</div>
                        <div className="text-xs text-gray-500">{result.dayOfWeek}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {result.numbers.map((num, i) => renderNumberBall(num))}
                        </div>
                      </TableCell>
                      <TableCell>{renderNumberBall(result.megaBall, "bg-amber-500")}</TableCell>
                      <TableCell>{result.multiplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: getPageCount(megaMillionsHistory) }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, getPageCount(megaMillionsHistory)))}
                      className={currentPage === getPageCount(megaMillionsHistory) ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          
          <TabsContent value="powerball" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/96757871-5a04-478f-992a-0eca87ef37b8.png" 
                  alt="Powerball Logo" 
                  className="h-12"
                />
                <div>
                  <h2 className="text-xl font-bold">Powerball</h2>
                  <p className="text-sm text-gray-600">Sorteios às Segundas, Quartas e Sábados</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={16} />
                  Como Jogar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarDays size={16} />
                  Próximo Sorteio
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">Histórico de Resultados</h3>
              
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
                  {getPaginatedData(powerballHistory).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{result.displayDate}</div>
                        <div className="text-xs text-gray-500">{result.dayOfWeek}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {result.numbers.map((num, i) => renderNumberBall(num, "bg-red-500"))}
                        </div>
                      </TableCell>
                      <TableCell>{renderNumberBall(result.powerball, "bg-amber-500")}</TableCell>
                      <TableCell>{result.multiplier}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: getPageCount(powerballHistory) }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, getPageCount(powerballHistory)))}
                      className={currentPage === getPageCount(powerballHistory) ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          
          <TabsContent value="lucky-day" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/92e3bb3d-af5b-4911-9c43-7c3685a6eac3.png" 
                  alt="Lucky Day Logo" 
                  className="h-12"
                />
                <div>
                  <h2 className="text-xl font-bold">Lucky Day Lotto</h2>
                  <p className="text-sm text-gray-600">Sorteios todos os dias</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={16} />
                  Como Jogar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarDays size={16} />
                  Próximo Sorteio
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">Histórico de Resultados</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Números</TableHead>
                    <TableHead>Número Bônus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPaginatedData(luckyDayHistory).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{result.displayDate}</div>
                        <div className="text-xs text-gray-500">{result.dayOfWeek}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {result.numbers.map((num, i) => renderNumberBall(num, "bg-green-500"))}
                        </div>
                      </TableCell>
                      <TableCell>{renderNumberBall(result.bonusNumber, "bg-amber-500")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: getPageCount(luckyDayHistory) }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, getPageCount(luckyDayHistory)))}
                      className={currentPage === getPageCount(luckyDayHistory) ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          
          <TabsContent value="pick4" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/005f7e6d-9f07-4838-a80c-4ce56aec2f58.png" 
                  alt="Pick 4 Logo" 
                  className="h-12"
                />
                <div>
                  <h2 className="text-xl font-bold">Pick 4</h2>
                  <p className="text-sm text-gray-600">Sorteios duas vezes por dia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={16} />
                  Como Jogar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarDays size={16} />
                  Próximo Sorteio
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">Histórico de Resultados</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Sorteio</TableHead>
                    <TableHead>Números</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPaginatedData(pick4History).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{result.displayDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {result.time === "Midday" ? (
                            <>
                              <Sun className="h-4 w-4 text-amber-500" />
                              <span>Dia</span>
                            </>
                          ) : (
                            <>
                              <Moon className="h-4 w-4 text-blue-500" />
                              <span>Noite</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {result.numbers.map((num, i) => renderNumberBall(num, "bg-cyan-500"))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: getPageCount(pick4History) }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, getPageCount(pick4History)))}
                      className={currentPage === getPageCount(pick4History) ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          
          <TabsContent value="lotto" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/c0b5f378-154f-476e-a51e-e9777bba8645.png" 
                  alt="Lotto Logo" 
                  className="h-12"
                />
                <div>
                  <h2 className="text-xl font-bold">Lotto</h2>
                  <p className="text-sm text-gray-600">Sorteios duas vezes por dia</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-4">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText size={16} />
                  Como Jogar
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <CalendarDays size={16} />
                  Próximo Sorteio
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">Histórico de Resultados</h3>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Sorteio</TableHead>
                    <TableHead>Números</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPaginatedData(lottoHistory).map((result, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{result.displayDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {result.time === "Midday" ? (
                            <>
                              <Sun className="h-4 w-4 text-amber-500" />
                              <span>Dia</span>
                            </>
                          ) : (
                            <>
                              <Moon className="h-4 w-4 text-blue-500" />
                              <span>Noite</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {result.numbers.map((num, i) => renderNumberBall(num, "bg-amber-500"))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: getPageCount(lottoHistory) }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, getPageCount(lottoHistory)))}
                      className={currentPage === getPageCount(lottoHistory) ? "opacity-50 cursor-not-allowed" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default ResultsHub;

