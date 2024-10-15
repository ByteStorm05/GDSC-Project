'use client';

import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaRegChartBar } from 'react-icons/fa'; // Importing icons
import io from 'socket.io-client';

// Define the shape of the data coming from the socket
interface SocketData {
  number: number; // Adjust the type according to the actual data structure
}

const CardsDisplay: React.FC = () => {
  const [stockPriceA, setStockPriceA] = useState<number>(0); // For Sales Growth
  const [stockPriceB, setStockPriceB] = useState<number>(0); // For Customer Churn
  const [stockPriceC, setStockPriceC] = useState<number>(0); // For Market Share

  useEffect(() => {
    const socket = io('https://data.gdscnsut.com');

    const handleData = (data: SocketData) => {
      const randomNum = data.number; // Assuming the socket emits a number

      // Updating the stock prices dynamically
      setStockPriceA(randomNum); // Use the number as stock price for Sales Growth
      setStockPriceB(+(30 * randomNum - 6).toFixed(2)); // Convert to number for Customer Churn
      setStockPriceC(+(10 * randomNum).toFixed(2)); // Convert to number for Market Share
    };

    socket.on('random_number', handleData);

    // Set a timer to disconnect after 12 seconds
    const timer = setTimeout(() => {
      socket.disconnect();
    }, 12000); // 12 seconds in milliseconds

    // Clean up the socket connection when the component unmounts or timer expires
    return () => {
      clearTimeout(timer); // Clear the timer
      socket.disconnect(); // Disconnect the socket
    };
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-7xl mx-auto mt-4">
      
      {/* Card 1 - Sales Growth (using stockPriceA) */}
      <div className="flex items-center p-6 border rounded-lg shadow-md w-full sm:w-[30%] transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer bg-blue-100">
        <FaArrowUp className="text-4xl text-blue-500" />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Sales Growth</h2>
          <p className="text-sm">Dynamic data from Stock Price A</p>
          <p className="text-lg font-bold text-blue-700">+${(stockPriceA * 10).toFixed(2)}</p> {/* Dynamic price */}
        </div>
      </div>

      {/* Card 2 - Customer Churn (using stockPriceB) */}
      <div className="flex items-center p-6 border rounded-lg shadow-md w-full sm:w-[30%] transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer bg-green-100">
        <FaArrowDown className="text-4xl text-green-500" />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Customer Churn</h2>
          <p className="text-sm">Dynamic data from Stock Price B</p>
          <p className="text-lg font-bold text-green-700">-${stockPriceB.toFixed(2)}</p> {/* Dynamic price */}
        </div>
      </div>

      {/* Card 3 - Market Share (using stockPriceC) */}
      <div className="flex items-center p-6 border rounded-lg shadow-md w-full sm:w-[30%] transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer bg-orange-100">
        <FaRegChartBar className="text-4xl text-orange-500" />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Market Share</h2>
          <p className="text-sm">Dynamic data from Stock Price C</p>
          <p className="text-lg font-bold text-orange-700">{stockPriceC.toFixed(2)}% Total Share</p> {/* Dynamic share */}
        </div>
      </div>
    </div>
  );
};

export default CardsDisplay;
