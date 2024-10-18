// 'use server'

// import { auth } from '@/auth'
// import prisma from '@/prisma';

// import React from 'react'
// import PurchaseForm from '../components/PurchaseForm';



//  const page = async () => {



//   const Session = await auth();
//   const prismaa = await prisma.user.findUnique({where:{id: Session?.user?.id}});
//   console.log(prismaa, "Prisma cONSOLE LOG")

//   console.log(Session);
//   return (
//     <div>
//     <div>View Data</div>
//     <p>
//       {JSON.stringify(Session)}
//     </p>

//     </div>
    

  
//   )
// }

// export default page


'use server';

import { auth } from '@/auth';
import prisma from '@/prisma';
import React from 'react';

const ProfilePage = async () => {
  try {
    const session = await auth();

    // Fetch user purchases
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        stock: true, // Fetch stock details (name and price)
      },
    });

    // If no purchases found, display a dummy record
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
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{purchase.stock?.name || 'Unknown Stock'}</td>
                <td className="py-3 px-6 text-center">{purchase.shares}</td>
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
