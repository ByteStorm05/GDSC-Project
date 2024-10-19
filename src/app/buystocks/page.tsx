'use client'

import { useState, useEffect } from 'react';

interface StockPrices {
  [key: string]: number;
}

const initialStockPrices: StockPrices = {
  A: 100,
  B: 200,
  C: 300,
};

const FormsPage: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<string>('');
  const [numShares, setNumShares] = useState<number | string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [averagePrice, setAveragePrice] = useState<number | null>(null);
  const [priceHistory, setPriceHistory] = useState<number[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Handle stock selection
  const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedStock(e.target.value);
    setPriceHistory([]); // Reset price history when a new stock is selected
    setAveragePrice(null); // Reset average price
  };

  // Handle number of shares input
  const handleNumSharesChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNumShares(e.target.value ? parseInt(e.target.value) : '');
  };

  // Simulate fetching stock prices over 12 seconds
  const fetchStockPrices = (): void => {
    if (!selectedStock) {
      alert('Please select a stock first!');
      return;
    }

    setIsFetching(true);
    setPriceHistory([]);
    setProgress(0);

    let priceUpdates: number[] = [];
    let counter = 0;

    const intervalId = setInterval(() => {
      const randomPrice = Math.floor(
        initialStockPrices[selectedStock] + Math.random() * 50 - 25
      );
      priceUpdates.push(randomPrice);
      setPriceHistory((prev) => [...prev, randomPrice]);
      setProgress((prev) => prev + 100 / 12);
      counter++;

      if (counter === 12) {
        clearInterval(intervalId);
        const avgPrice =
          priceUpdates.reduce((acc, price) => acc + price, 0) / priceUpdates.length;
        setAveragePrice(avgPrice);
        setIsFetching(false);
      }
    }, 1000);
  };

  // Calculate total price based on average price and number of shares
  const calculateTotalPrice = (): void => {
    if (averagePrice && numShares) {
      setTotalPrice(averagePrice * Number(numShares));
    }
  };

  // Handle buying the stock -Idhar karna hai change 
  const handleBuyShare = async (): Promise<void> => {
    if (!selectedStock || !numShares || totalPrice <= 0) {
      alert('Please select a stock, enter the number of shares, and calculate the price.');
      return;
    }

    const response = await fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stock: selectedStock,
        shares: numShares,
        totalPrice,
      }),
    });

    const data = await response.json(); // found this on stack overflow 

    if (data.message.includes('success') || data.message.includes('Shares purchased')) {
      alert('Shares purchased successfully!');
    } else {
      alert('Error purchasing shares. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Buy Shares</h2>

      {/* Select Stock */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Select Stock:
      </label>
      <select
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={selectedStock}
        onChange={handleStockChange}
      >
        <option value="">Choose a stock</option>
        <option value="A">Stock A</option>
        <option value="B">Stock B</option>
        <option value="C">Stock C</option>
      </select>

      {/* Number of Shares */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Number of Shares:
      </label>
      <input
        type="number"
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={numShares}
        onChange={handleNumSharesChange}
        placeholder="Enter number of shares"
      />

      {/* Fetch Stock Prices */}
      <button
        className="block w-full p-2 mb-4 bg-blue-500 text-white rounded-md"
        onClick={fetchStockPrices}
        disabled={isFetching}
      >
        {isFetching ? 'Fetching Stock Prices...' : 'Fetch Stock Prices'}
      </button>

      {/* Progress */}
      {isFetching && (
        <div className="mb-4">
          <p>Progress: {Math.round(progress)}%</p>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Price History */}
      {priceHistory.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Price Updates:</h3>
          <ul>
            {priceHistory.map((price, index) => (
              <li key={index}>Price at {index + 1} second: ${price}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Average Price */}
      {averagePrice !== null && (
        <p className="mb-4 text-lg font-medium text-green-600">
          Average Price: ${averagePrice.toFixed(2)}
        </p>
      )}

      {/* Calculate Total Price */}
      <button
        className="block w-full p-2 mb-4 bg-green-500 text-white rounded-md"
        onClick={calculateTotalPrice}
        disabled={!averagePrice}
      >
        Calculate Total Price
      </button>

      {/* Show Total Price */}
      {totalPrice > 0 && (
        <p className="mb-4 text-lg font-medium text-green-600">
          Total Price for {numShares} shares: ${totalPrice}
        </p>
      )}

      {/* Buy Shares */}
      <button
        className="block w-full p-2 bg-purple-500 text-white rounded-md"
        onClick={handleBuyShare}
        disabled={totalPrice <= 0}
      >
        Buy Share
      </button>

      
    </div>
  );
};

export default FormsPage;
