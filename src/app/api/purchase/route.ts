


import { NextResponse } from 'next/server';
import prisma from '@/prisma';

export async function POST(request: Request) {
  const { stockId, userId, shares, totalPrice } = await request.json();

  try {
    const purchase = await prisma.purchase.create({
      data: {
        stockId: Number(stockId),  // Convert stockId to Int
        userId: String(userId),    // Ensure userId is a String -
        shares,
        totalPrice,
      },
    });

    return NextResponse.json({ purchase });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error making purchase' }, { status: 500 });
  }
}
