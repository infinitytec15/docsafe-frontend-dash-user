"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DocumentChartProps {
  className?: string;
}

export default function DocumentChart({ className }: DocumentChartProps) {
  // Mock data - would be replaced with actual API data
  const data = {
    labels: ["PDF", "DOCX", "JPG", "Outros"],
    datasets: [
      {
        data: [12, 8, 5, 3],
        backgroundColor: [
          "rgba(37, 99, 235, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(107, 114, 128, 0.7)",
        ],
        borderColor: [
          "rgba(37, 99, 235, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(107, 114, 128, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <Card className={`bg-white h-[300px] ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Tipos de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px] flex items-center justify-center">
          <Doughnut options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
