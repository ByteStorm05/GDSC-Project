import { getPurchasedStocks } from "@/actions/purchases";
import React from "react";

const getPurchases = async () => {
  const data = await getPurchasedStocks();
  return data;
};

async function GetPurchasedStocks() {
  const data = await getPurchases();

  if (!data) {
    return <div>No purchases</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default GetPurchasedStocks;
