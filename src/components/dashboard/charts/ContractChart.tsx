"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ContractChartProps {
  className?: string;
}

export default function ContractChart({ className }: ContractChartProps) {
  // Mock data - would be replaced with actual API data
  const [chartData, setChartData] = useState({
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Contratos Criados",
        data: [4, 6, 8, 5, 10, 7],
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        borderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Contratos Assinados",
        data: [2, 4, 6, 3, 7, 5],
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <Card className={`bg-white h-[300px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Contratos por Mês</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <Bar options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  );
}
