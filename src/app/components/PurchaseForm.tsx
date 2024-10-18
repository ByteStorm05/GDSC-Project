'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const PurchaseForm: React.FC<{ stockId: number }> = ({ stockId }) => {
  const { data: session } = useSession(); // Get session data
  const userId = session?.user?.id; // Extract userId from session (it's a string)
  const [shares, setShares] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // step 1 we will check auth

    if (!userId) {
      setMessage('User is not authenticated.');
      return;
    }

    //next edge case handle 
    if (shares <= 0) {
      setMessage('Please enter a valid number of shares.');
      return;
    }

    const totalPrice = shares * 100; // kuch bhi random

    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockId, // Already a number
          userId,  // String from session
          shares,
          totalPrice,
        }),
      });

      let responseData;
      const contentType = response.headers.get('Content-Type');

      // Check if the response is JSON
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // Otherwise, treat it as plain text or warna string wala error
        responseData = await response.text();
      }

      if (!response.ok) {
        throw new Error(responseData || 'Error making purchase');
      }

      setMessage(`Purchase successful! Shares purchased: ${responseData.purchase ? responseData.purchase.shares : responseData}`);
    } catch (error) {
      console.error(error);
      setMessage('Error purchasing shares. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <label htmlFor="shares">Number of Shares:</label>
      <input
        type="number"
        id="shares"
        value={shares > 0 ? shares : ''}
        onChange={(e) => setShares(Number(e.target.value))}
        className="border rounded p-1"
        placeholder="Enter number of shares"
      />
      <button type="submit" className="ml-2 p-1 bg-blue-500 text-white rounded">
        Buy Shares
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PurchaseForm;
