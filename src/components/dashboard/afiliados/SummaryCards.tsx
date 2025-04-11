import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
}

const SummaryCard = ({ title, value, icon }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="text-2xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  data: {
    indications: number;
    actives: number;
    inadimplents: number;
    total_commissions: number;
  };
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const { indications, actives, inadimplents, total_commissions } = data;

  const cards = [
    {
      title: "Indicações Realizadas",
      value: `${indications} usuários`,
      icon: "👥",
    },
    {
      title: "Assinaturas Ativas",
      value: `${actives} usuários`,
      icon: "✅",
    },
    {
      title: "Inadimplentes",
      value: `${inadimplents} usuários`,
      icon: "⚠️",
    },
    {
      title: "Total de Ganhos",
      value: `R$ ${total_commissions.toFixed(2).replace(".", ",")}`,
      icon: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
