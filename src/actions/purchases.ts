"use server";
// import { auth } from "@/auth";
// import prisma from "@/prisma";

// export async function getPurchasedStocks() {
//   const session = await auth();
//   const id = session?.user?.id;

//   if (!id) {
//     return { error: "unauthorized" };
//   }
//   try {
//     const purchases = await prisma.purchase.findMany({
//       where: {
//         userId: id,
//       },
//     });

//     console.log(purchases);

//     return { purchases };
//   } catch (error) {
//     console.error(error);
//     return { error: "Error getting purchase" };
//   }
// }

import { auth } from "@/auth";
import prisma from "@/prisma";
import { Purchase } from "@prisma/client"; // Prisma type

export async function getPurchasedStocks() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) {
    return { error: "unauthorized" };
  }

  try {
    // Annotate the type of purchases explicitly
    const purchases: Purchase[] = await prisma.purchase.findMany({
      where: {
        userId: id,
      },
    });

    console.log(purchases);

    // Now you can use purchases.length and purchases.map without errors
    return { purchases };
  } catch (error) {
    console.error(error);
    return { error: "Error getting purchases" };
  }
}

