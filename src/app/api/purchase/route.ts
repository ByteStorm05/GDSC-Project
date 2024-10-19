import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { auth } from "@/auth";
import { getSession } from "next-auth/react";

export async function POST(request: Request) {
  const { stock, shares, totalPrice } = await request.json();

  const session = await auth();
  console.log(stock, "hah", session?.user?.id);
  const id = session?.user?.id;

  if (!id) {
    return NextResponse.json({ error: "unauthorized" });
  }
  try {
    const purchase = await prisma.purchase.create({
      data: {
        shares,
        totalPrice,
        stockName: stock,
        userId: id,
      },
    });

    console.log(purchase);

    return NextResponse.json({ message: "success shares purchased" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error making purchase" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await auth();
  console.log("hah", session);
  const id = session?.user?.id;

  if (!id) {
    return NextResponse.json({ error: "unauthorized" });
  }
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: id,
      },
    });

    console.log(purchases);

    return NextResponse.json({ purchases });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error making purchase" },
      { status: 500 }
    );
  }
}
