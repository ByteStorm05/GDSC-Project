'use client'; // Ensure this file is a client component

import React, { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import io from 'socket.io-client';

Chart.register(...registerables); // Register necessary components

const PolarAreaChart: React.FC = () => {
  const DATA_COUNT = 5; // Total data segments
  const labels = ['Technology', 'Healthcare', 'Finance', 'Consumer Goods', 'Energy'];

  // Define the data structure for the chart
  const [data, setData] = useState<ChartData<'polarArea', number[], string>>({
    labels: labels,
    datasets: [
      {
        label: 'Market Sector Distribution',
        data: Array(DATA_COUNT).fill(0), // Initialize with zeros
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',  // Technology
          'rgba(255, 99, 132, 0.5)',   // Healthcare
          'rgba(255, 205, 86, 0.5)',    // Finance
          'rgba(54, 162, 235, 0.5)',    // Consumer Goods
          'rgba(255, 159, 64, 0.5)',    // Energy
        ],
      },
    ],
  });

  const config: ChartOptions<'polarArea'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Market Sector Distribution',
      },
    },
  };

  useEffect(() => {
    const socket = io('https://data.gdscnsut.com'); // Connect to the socket server

    // Stop after receiving data for 12 seconds
    const stopTimer = setTimeout(() => {
      socket.disconnect();
    }, 12000);

    const intervalId = setInterval(() => {
      socket.emit('get_random_number'); // Emit event to get a random number
    }, 1000); // Emit every second

    socket.on('random_number', (data: { number: number }) => {
      // Update dataset with new random numbers
      setData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: prevData.datasets[0].data.map(() => {
              // Generate a random value for each sector
              return Math.floor(Math.random() * 100); // Replace with the received number if necessary
            }),
          },
        ],
      }));
    });

    return () => {
      clearTimeout(stopTimer);
      clearInterval(intervalId);
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <div>
      <h1>Dynamic Market Sector Distribution</h1>
      <PolarArea data={data} options={config} />
    </div>
  );
};

export default PolarAreaChart;
