import React from "react";
import LineChart from "../components/Graph-1";
import PolarAreaChart from "../components/Graph-2";
import CardsDisplay from "../components/Cards";
import DynamicTable from "../components/DynamicTable";
import GetPurchasedStocks from "../components/GetPurchasedStocks";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="p-4 md:p-8 flex flex-col bg-gray-100 min-h-screen">
      <div className="flex flex-wrap w-full gap-6 justify-center">
        {/* First Chart */}
        <div className="flex-1 max-h-[802px] max-w-full md:max-w-[48%] border-2 border-blue-500 bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="mb-6">
            <LineChart />
          </div>
          <div className="text-gray-800 font-semibold text-lg leading-relaxed">
            The chart visualizes real-time stock price updates for three stocks
            using random data. Stock Price A is the raw data, while Stock Price
            B and C are calculated based on different formulas.
          </div>
        </div>

        {/* Second Chart */}
        <div className="flex-1 max-h-[691px] max-w-full md:max-w-[34%] border-2 border-green-500 bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
          <PolarAreaChart />
        </div>
      </div>

      {/* Cards Display - Centered */}
      <div className="mt-6 flex justify-center items-center">
        <CardsDisplay />
      </div>

      {/* Dynamic Table - Centered and Responsive */}
      <div className="mt-6 flex justify-center items-center">
        <div className="w-full max-w-[90%]">
          {" "}
          {/* Adjusted to 90% width and centered */}
          <DynamicTable />
        </div>
      </div>
    </div>
  );
};

export default Page;
