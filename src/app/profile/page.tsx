'use server';

import React from 'react';
import { getPurchasedStocks } from '@/actions/purchases';

const ProfilePage = async () => {
  try {
    // Fetch user purchases using getPurchasedStocks function
    const { purchases } = await getPurchasedStocks(); // Destructure purchases from the response

    // If no purchases found or purchases is an empty array, display a dummy record
    if (!purchases || purchases.length === 0) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">User Purchases</h1>
          <p>No purchases found. Showing a dummy record:</p>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Stock Name</th>
                <th className="py-3 px-6 text-center">Shares</th>
                <th className="py-3 px-6 text-center">Total Price</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">Dummy Stock</td>
                <td className="py-3 px-6 text-center">10</td>
                <td className="py-3 px-6 text-center">$1000</td>
                <td className="py-3 px-6 text-right">
                  <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Sell</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    // If purchases found, display them as a table
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Purchases</h1>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Stock Name</th>
              <th className="py-3 px-6 text-center">Shares</th>
              <th className="py-3 px-6 text-center">Total Price</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase: any) => (
              <tr key={purchase.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{purchase.stockName || 'Unknown Stock'}</td>
                <td className="py-3 px-6 text-center">{purchase.shares} </td>
                <td className="py-3 px-6 text-center">${purchase.totalPrice}</td>
                <td className="py-3 px-6 text-right">
                  <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Sell</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error('Error fetching purchases:', error);

    // Display a dummy record if an error occurs
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">User Purchases</h1>
        <p>Error fetching purchases, showing a dummy record:</p>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Stock Name</th>
              <th className="py-3 px-6 text-center">Shares</th>
              <th className="py-3 px-6 text-center">Total Price</th>
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">Dummy Stock</td>
              <td className="py-3 px-6 text-center">10</td>
              <td className="py-3 px-6 text-center">$1000</td>
              <td className="py-3 px-6 text-right">
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Sell</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

export default ProfilePage;
