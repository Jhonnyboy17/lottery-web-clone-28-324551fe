
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
    numbers: ["1", "8", "26", "36", "43", "49"],
    bonusNumber: "5",
    lottoMillion1: ["1", "9", "11", "24", "39", "49"],
    lottoMillion2: ["31", "34", "36", "38", "43", "44"]
  },
  {
    drawDate: "03/13/2025",
    displayDate: "13 de março de 2025",
    dayOfWeek: "Quinta-feira",
    numbers: ["6", "20", "31", "32", "38", "45"],
    bonusNumber: "16",
    lottoMillion1: ["13", "17", "24", "33", "37", "39"],
    lottoMillion2: ["2", "8", "11", "13", "29", "32"]
  },
  {
    drawDate: "03/10/2025",
    displayDate: "10 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["20", "22", "28", "29", "32", "48"],
    bonusNumber: "2",
    lottoMillion1: ["16", "22", "40", "41", "44", "47"],
    lottoMillion2: ["1", "5", "14", "31", "45", "46"]
  },
  {
    drawDate: "03/08/2025",
    displayDate: "8 de março de 2025",
    dayOfWeek: "Sábado",
    numbers: ["3", "5", "18", "22", "40", "44"],
    bonusNumber: "16",
    lottoMillion1: ["1", "11", "17", "35", "44", "46"],
    lottoMillion2: ["3", "5", "19", "26", "35", "39"]
  },
  {
    drawDate: "03/06/2025",
    displayDate: "6 de março de 2025",
    dayOfWeek: "Quinta-feira",
    numbers: ["14", "22", "25", "26", "28", "37"],
    bonusNumber: "8",
    lottoMillion1: ["3", "11", "15", "23", "28", "37"],
    lottoMillion2: ["2", "29", "38", "41", "42", "49"]
  },
  {
    drawDate: "03/03/2025",
    displayDate: "3 de março de 2025",
    dayOfWeek: "Segunda-feira",
    numbers: ["9", "17", "25", "43", "45", "46"],
    bonusNumber: "11",
    lottoMillion1: ["1", "23", "30", "33", "41", "43"],
    lottoMillion2: ["4", "31", "42", "44", "45", "50"]
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
  },
  {
    date: "22/03/2025",
    displayDate: "22 de março de 2025",
    time: "Midday",
    numbers: ["23", "26", "28", "40", "42"]
  },
  {
    date: "22/03/2025",
    displayDate: "22 de março de 2025",
    time: "Evening",
    numbers: ["19", "26", "38", "40", "41"]
  },
  {
    date: "21/03/2025",
    displayDate: "21 de março de 2025",
    time: "Midday",
    numbers: ["8", "12", "37", "42", "44"]
  },
  {
    date: "21/03/2025",
    displayDate: "21 de março de 2025",
    time: "Evening",
    numbers: ["3", "24", "27", "34", "38"]
  },
  {
    date: "20/03/2025",
    displayDate: "20 de março de 2025",
    time: "Midday",
    numbers: ["4", "30", "32", "33", "43"]
  },
  {
    date: "20/03/2025",
    displayDate: "20 de março de 2025",
    time: "Evening",
    numbers: ["7", "10", "14", "38", "40"]
  },
  {
    date: "19/03/2025",
    displayDate: "19 de março de 2025",
    time: "Midday",
    numbers: ["21", "24", "30", "36", "42"]
  },
  {
    date: "19/03/2025",
    displayDate: "19 de março de 2025",
    time: "Evening",
    numbers: ["10", "30", "34", "39", "44"]
  },
  {
    date: "18/03/2025",
    displayDate: "18 de março de 2025",
    time: "Midday",
    numbers: ["4", "22", "29", "34", "39"]
  },
  {
    date: "18/03/2025",
    displayDate: "18 de março de 2025",
    time: "Evening",
    numbers: ["4", "14", "23", "30", "32"]
  },
  {
    date: "17/03/2025",
    displayDate: "17 de março de 2025",
    time: "Midday",
    numbers: ["8", "22", "25", "32", "33"]
  },
  {
    date: "17/03/2025",
    displayDate: "17 de março de 2025",
    time: "Evening",
    numbers: ["5", "27", "32", "40", "42"]
  },
  {
    date: "16/03/2025",
    displayDate: "16 de março de 2025",
    time: "Midday",
    numbers: ["21", "27", "30", "41", "43"]
  },
  {
    date: "16/03/2025",
    displayDate: "16 de março de 2025",
    time: "Evening",
    numbers: ["8", "11", "19", "20", "21"]
  },
  {
    date: "15/03/2025",
    displayDate: "15 de março de 2025",
    time: "Midday",
    numbers: ["8", "15", "23", "26", "38"]
  },
  {
    date: "15/03/2025",
    displayDate: "15 de março de 2025",
    time: "Evening",
    numbers: ["1", "16", "17", "31", "45"]
  },
  {
    date: "14/03/2025",
    displayDate: "14 de março de 2025",
    time: "Midday",
    numbers: ["2", "4", "9", "12", "28"]
  },
  {
    date: "14/03/2025",
    displayDate: "14 de março de 2025",
    time: "Evening",
    numbers: ["1", "9", "10", "19", "29"]
  },
  {
    date: "13/03/2025",
    displayDate: "13 de março de 2025",
    time: "Midday",
    numbers: ["4", "7", "13", "31", "43"]
  },
  {
    date: "13/03/2025",
    displayDate: "13 de março de 2025",
    time: "Evening",
    numbers: ["5", "8", "12", "26", "35"]
  },
  {
    date: "12/03/2025",
    displayDate: "12 de março de 2025",
    time: "Midday",
    numbers: ["8", "15", "23", "31", "33"]
  },
  {
    date: "12/03/2025",
    displayDate: "12 de março de 2025",
    time: "Evening",
    numbers: ["4", "7", "10", "30", "45"]
  },
  {
    date: "11/03/2025",
    displayDate: "11 de março de 2025",
    time: "Midday",
    numbers: ["2", "12", "14", "20", "43"]
  },
  {
    date: "11/03/2025",
    displayDate: "11 de março de 2025",
    time: "Evening",
    numbers: ["15", "21", "24", "35", "39"]
  },
  {
    date: "10/03/2025",
    displayDate: "10 de março de 2025",
    time: "Midday",
    numbers: ["5", "13", "17", "20", "32"]
  },
  {
    date: "10/03/2025",
    displayDate: "10 de março de 2025",
    time: "Evening",
    numbers: ["6", "18", "26", "27", "33"]
  },
  {
    date: "09/03/2025",
    displayDate: "9 de março de 2025",
    time: "Midday",
    numbers: ["10", "16", "21", "28", "37"]
  },
  {
    date: "09/03/2025",
    displayDate: "9 de março de 2025",
    time: "Evening",
    numbers: ["9", "10", "16", "24", "27"]
  },
  {
    date: "08/03/2025",
    displayDate: "8 de março de 2025",
    time: "Midday",
    numbers: ["8", "27", "29", "35", "37"]
  },
  {
    date: "08/03/2025",
    displayDate: "8 de março de 2025",
    time: "Evening",
    numbers: ["2", "10", "11", "12", "20"]
  },
  {
    date: "07/03/2025",
    displayDate: "7 de março de 2025",
    time: "Midday",
    numbers: ["17", "28", "39", "43", "44"]
  },
  {
    date: "07/03/2025",
    displayDate: "7 de março de 2025",
    time: "Evening",
    numbers: ["15", "24", "31", "32", "40"]
  },
  {
    date: "06/03/2025",
    displayDate: "6 de março de 2025",
    time: "Midday",
    numbers: ["33", "36", "41", "42", "45"]
  },
  {
    date: "06/03/2025",
    displayDate: "6 de março de 2025",
    time: "Evening",
    numbers: ["10", "21", "33", "35", "41"]
  },
  {
    date: "05/03/2025",
    displayDate: "5 de março de 2025",
    time: "Midday",
    numbers: ["15", "32", "34", "35", "44"]
  },
  {
    date: "05/03/2025",
    displayDate: "5 de março de 2025",
    time: "Evening",
    numbers: ["15", "18", "19", "24", "34"]
  },
  {
    date: "04/03/2025",
    displayDate: "4 de março de 2025",
    time: "Midday",
    numbers: ["10", "11", "20", "27", "36"]
  },
  {
    date: "04/03/2025",
    displayDate: "4 de março de 2025",
    time: "Evening",
    numbers: ["2", "6", "17", "19", "25"]
  },
  {
    date: "03/03/2025",
    displayDate: "3 de março de 2025",
    time: "Midday",
    numbers: ["3", "4", "6", "20", "33"]
  },
  {
    date: "03/03/2025",
    displayDate: "3 de março de 2025",
    time: "Evening",
    numbers: ["1", "2", "5", "10", "23"]
  },
  {
    date: "02/03/2025",
    displayDate: "2 de março de 2025",
    time: "Midday",
    numbers: ["7", "9", "14", "16", "22"]
  },
  {
    date: "02/03/2025",
    displayDate: "2 de março de 2025",
    time: "Evening",
    numbers: ["8", "11", "13", "18", "21"]
  },
  {
    date: "01/03/2025",
    displayDate: "1 de março de 2025",
    time: "Midday",
    numbers: ["4", "5", "9", "12", "15"]
  },
  {
    date: "01/03/2025",
    displayDate: "1 de março de 2025",
    time: "Evening",
    numbers: ["3", "7", "11", "14", "17"]
  },
  {
    date: "28/02/2025",
    displayDate: "28 de fevereiro de 2025",
    time: "Midday",
    numbers: ["2", "8", "10", "13", "19"]
  },
  {
    date: "28/02/2025",
    displayDate: "28 de fevereiro de 2025",
    time: "Evening",
    numbers: ["1", "4", "6", "9", "12"]
  }
];

const ResultsHub = () => {
  const [activeTab, setActiveTab] = useState("mega-millions");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  const getTabResults = () => {
    switch (activeTab) {
      case "mega-millions":
        return megaMillionsHistory.filter(result => 
          result.numbers.join(" ").includes(searchTerm) || 
          result.drawDate.includes(searchTerm) ||
          result.megaBall.includes(searchTerm)
        );
      case "powerball":
        return powerballHistory.filter(result => 
          result.numbers.join(" ").includes(searchTerm) || 
          result.drawDate.includes(searchTerm) ||
          result.powerball.includes(searchTerm)
        );
      case "lucky-day":
        return luckyDayHistory.filter(result => 
          result.numbers.join(" ").includes(searchTerm) || 
          result.drawDate.includes(searchTerm) ||
          result.bonusNumber.includes(searchTerm)
        );
      case "lotto":
        return lottoHistory.filter(result => 
          result.numbers.join(" ").includes(searchTerm) || 
          result.date.includes(searchTerm)
        );
      default:
        return [];
    }
  };

  const paginatedResults = () => {
    const results = getTabResults();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return results.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getTabResults().length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
      pages.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
  };

  const renderMegaMillionsResults = () => {
    const results = paginatedResults() as MegaMillionsResult[];
    return (
      <Table className="animate-fade-in">
        <TableHeader>
          <TableRow>
            <TableHead className="font-nunito font-bold">Data</TableHead>
            <TableHead className="font-nunito font-bold">Dia da Semana</TableHead>
            <TableHead className="font-nunito font-bold">Números</TableHead>
            <TableHead className="font-nunito font-bold">Mega Ball</TableHead>
            <TableHead className="font-nunito font-bold">Multiplicador</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.displayDate}</TableCell>
              <TableCell>{result.dayOfWeek}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {result.numbers.map((num, idx) => (
                    <span 
                      key={idx} 
                      className="number-ball w-8 h-8 rounded-full bg-lottery-pink text-white flex items-center justify-center text-sm font-semibold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="number-ball w-8 h-8 rounded-full bg-lottery-yellow text-black flex items-center justify-center text-sm font-semibold">
                  {result.megaBall}
                </span>
              </TableCell>
              <TableCell>{result.multiplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderPowerballResults = () => {
    const results = paginatedResults() as PowerballResult[];
    return (
      <Table className="animate-fade-in">
        <TableHeader>
          <TableRow>
            <TableHead className="font-nunito font-bold">Data</TableHead>
            <TableHead className="font-nunito font-bold">Dia da Semana</TableHead>
            <TableHead className="font-nunito font-bold">Números</TableHead>
            <TableHead className="font-nunito font-bold">Powerball</TableHead>
            <TableHead className="font-nunito font-bold">Multiplicador</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.displayDate}</TableCell>
              <TableCell>{result.dayOfWeek}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {result.numbers.map((num, idx) => (
                    <span 
                      key={idx} 
                      className="number-ball w-8 h-8 rounded-full bg-lottery-red text-white flex items-center justify-center text-sm font-semibold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="number-ball w-8 h-8 rounded-full bg-lottery-red text-white flex items-center justify-center text-sm font-semibold border-2 border-white">
                  {result.powerball}
                </span>
              </TableCell>
              <TableCell>{result.multiplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderLuckyDayResults = () => {
    const results = paginatedResults() as LuckyDayResult[];
    return (
      <Table className="animate-fade-in">
        <TableHeader>
          <TableRow>
            <TableHead className="font-nunito font-bold">Data</TableHead>
            <TableHead className="font-nunito font-bold">Dia da Semana</TableHead>
            <TableHead className="font-nunito font-bold">Números</TableHead>
            <TableHead className="font-nunito font-bold">Número Bônus</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.displayDate}</TableCell>
              <TableCell>{result.dayOfWeek}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {result.numbers.map((num, idx) => (
                    <span 
                      key={idx} 
                      className="number-ball w-8 h-8 rounded-full bg-lottery-navy text-white flex items-center justify-center text-sm font-semibold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <span className="number-ball w-8 h-8 rounded-full bg-lottery-yellow text-black flex items-center justify-center text-sm font-semibold">
                  {result.bonusNumber}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderLottoResults = () => {
    const results = paginatedResults() as LottoResult[];
    return (
      <Table className="animate-fade-in">
        <TableHeader>
          <TableRow>
            <TableHead className="font-nunito font-bold">Data</TableHead>
            <TableHead className="font-nunito font-bold">Período</TableHead>
            <TableHead className="font-nunito font-bold">Números</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.displayDate}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {result.time === "Midday" ? (
                    <><Sun className="h-4 w-4 mr-1 text-yellow-500" /> Meio-dia</>
                  ) : (
                    <><Moon className="h-4 w-4 mr-1 text-blue-500" /> Noite</>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {result.numbers.map((num, idx) => (
                    <span 
                      key={idx} 
                      className="number-ball w-8 h-8 rounded-full bg-lottery-purple text-white flex items-center justify-center text-sm font-semibold"
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-nunito">Resultados das Loterias</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar resultados..."
                className="pl-10 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
              <TabsTrigger 
                value="mega-millions" 
                className="font-nunito px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Mega Millions
              </TabsTrigger>
              <TabsTrigger 
                value="powerball"
                className="font-nunito px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Powerball
              </TabsTrigger>
              <TabsTrigger 
                value="lucky-day"
                className="font-nunito px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Lucky Day
              </TabsTrigger>
              <TabsTrigger 
                value="lotto"
                className="font-nunito px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Lotto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mega-millions" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderMegaMillionsResults()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="powerball" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderPowerballResults()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lucky-day" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderLuckyDayResults()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lotto" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  {renderLottoResults()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                  </PaginationItem>
                )}
                
                {renderPageNumbers()}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsHub;
