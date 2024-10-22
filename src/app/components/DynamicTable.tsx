'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

interface StockData {
  stockA: number;
  stockB: string; // Assuming stockB needs to be a string due to formatting
  stockC: string; // Assuming stockC needs to be a string due to formatting
}

const DynamicTable: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([]); // State to hold stock data rows
 

  useEffect(() => {
    const socket = io('https://data.gdscnsut.com');

    const handleData = (data: { number: number }) => {
      const randomNum = data.number; // Assuming the socket emits a number

      // Updating the stock prices dynamically
      const newPriceA = randomNum*10; // Use the number as stock price for Sales Growth
      const newPriceB = (30 * randomNum - 6).toFixed(2); // Derived calculation for Customer Churn
      const newPriceC = (10 * randomNum).toFixed(2); // Derived calculation for Market Share

      

      // Create a new entry for the table
      const newEntry: StockData = {
        stockA: newPriceA,
        stockB: newPriceB,
        stockC: newPriceC,
      };

      // Update the stock data array, keeping only the last 11 entries
      setStockData((prevData) => {
        const updatedData = [...prevData, newEntry];
        return updatedData.length > 11 ? updatedData.slice(-11) : updatedData;
      });
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
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-3xl font-bold text-center mb-6">Stock Data Table</h2>
      <div className="w-full md:max-w-[48%]"> {/* Adjust width here */}
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-3 text-left">Stock A</th>
              <th className="border border-gray-300 p-3 text-left">Stock B</th>
              <th className="border border-gray-300 p-3 text-left">Stock C</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((row, index) => (
              <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                <td className="border border-gray-300 p-3 text-center text-blue-600">{row.stockA}</td>
                <td className="border border-gray-300 p-3 text-center text-green-600">{row.stockB}</td>
                <td className="border border-gray-300 p-3 text-center text-orange-600">{row.stockC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
