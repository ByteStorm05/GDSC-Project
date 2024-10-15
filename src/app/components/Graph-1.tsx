'use client'; // Ensure this file is a client component

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import io from 'socket.io-client';

Chart.register(...registerables); // Register necessary components

const LineChart: React.FC = () => {
  const [datapointsA, setDatapointsA] = useState<number[]>([]); // For Stock Price A
  const [datapointsB, setDatapointsB] = useState<number[]>([]); // For Stock Price B
  const [datapointsC, setDatapointsC] = useState<number[]>([]); // For Stock Price C
  const [numbers, setNumbers] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('https://data.gdscnsut.com');

    // Stop after receiving 12 numbers
    const stopTimer = setTimeout(() => {
      socket.disconnect();
    }, 12000); // Adjust this if you want to disconnect after a different time

    socket.on('random_number', (data: { number: number }) => {
      if (numbers.length < 12) {
        const randomNum = data.number; // Get the random number
        const stockPriceB = parseFloat((30 * randomNum - 6).toFixed(2)); // Calculate Stock Price B
        const stockPriceC = parseFloat((10 * randomNum).toFixed(2)); // Calculate Stock Price C

        // Update numbers and labels
        setNumbers((prevNumbers) => [...prevNumbers, randomNum]);
        setLabels((prevLabels) => [...prevLabels, `Stock-${prevLabels.length + 1}`]); // Add stock labels

        // Update datapoints for each stock price
        setDatapointsA((prev) => [...prev, randomNum]);
        setDatapointsB((prev) => [...prev, stockPriceB]);
        setDatapointsC((prev) => [...prev, stockPriceC]);
      }
    });

    return () => {
      clearTimeout(stopTimer);
      socket.disconnect();
    };
  }, [numbers]);

  const data: ChartData<'line', number[], string> = {
    labels: labels,
    datasets: [
      {
        label: 'Stock Price A', // Random number line
        data: datapointsA,
        borderColor: 'red',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Stock Price B (1.2x)', // 1.2 times line
        data: datapointsB,
        borderColor: 'blue',
        fill: false,
        tension: 0.4,
      },
      {
        label: 'Stock Price C (0.8x)', // 0.8 times line
        data: datapointsC,
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const config: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stock Prices Over Time',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Stock Data Points', // Label for x-axis
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Stock Value', // Label for y-axis
        },
        suggestedMin: -10,
        suggestedMax: 200,
      },
    },
  };

  return (
    <div>
      <h1>Real-time Stock Prices Line Chart:</h1>
      <Line data={data} options={config} />
    </div>
  );
};

export default LineChart;
