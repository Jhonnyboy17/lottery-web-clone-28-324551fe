
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dateRangeOptions = [
  { value: "30", label: "Last 30 Days" },
  { value: "60", label: "Last 60 Days" },
  { value: "120", label: "Last 120 Days" },
  { value: "180", label: "Last 180 Days" },
  { value: "365", label: "Last Year" },
  { value: "730", label: "Last Two Years" },
  { value: "1825", label: "Last Five Years" },
];

const NumberChecker = () => {
  const [numbers, setNumbers] = useState<string[]>(Array(6).fill(""));
  const [dateRange, setDateRange] = useState("30");

  const handleNumberChange = (index: number, value: string) => {
    const newValue = value.replace(/[^0-9]/g, "").slice(0, 2);
    const newNumbers = [...numbers];
    newNumbers[index] = newValue;
    setNumbers(newNumbers);
  };

  const handleClear = () => {
    setNumbers(Array(6).fill(""));
    setDateRange("30");
  };

  const handleSubmit = () => {
    console.log("Checking numbers:", numbers, "Date range:", dateRange);
    // In a real app, this would call an API to check the numbers
  };

  return (
    <div className="bg-white dark:bg-lottery-dark-card rounded-xl shadow-md p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-lottery-navy dark:text-white mb-4">
        Check Your Numbers
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
        Are you holding a winning ticket, or have your favorite numbers won in the past few years? Enter your numbers
        and a date range to see if those numbers have been drawn. Only number combinations that would have won a
        prize will be shown.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-bold text-lottery-navy dark:text-white mb-4">
            Your Numbers
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {numbers.map((num, index) => (
              <Input
                key={index}
                type="text"
                value={num}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className={`w-14 h-14 text-center text-lg font-bold rounded-md ${
                  index === 5 ? "bg-yellow-300 dark:bg-yellow-500 dark:text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }`}
                maxLength={2}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-lottery-navy dark:text-white mb-4">
            Date Range
          </h3>
          <div className="w-full">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <Button 
              onClick={handleSubmit} 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6"
            >
              Find Numbers
            </Button>
            <Button 
              onClick={handleClear} 
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 py-2 px-6"
            >
              Clear Numbers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberChecker;
