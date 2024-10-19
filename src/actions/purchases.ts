"use server";
import { auth } from "@/auth";
import prisma from "@/prisma";

export async function getPurchasedStocks() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) {
    return { error: "unauthorized" };
  }
  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: id,
      },
    });

    console.log(purchases);

    return { purchases };
  } catch (error) {
    console.error(error);
    return { error: "Error getting purchase" };
  }
}
