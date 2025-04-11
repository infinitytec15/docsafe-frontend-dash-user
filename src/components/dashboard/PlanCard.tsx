"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusTag } from "@/components/common/StatusTag";

export interface PlanFeature {
  id: number;
  name: string;
  included: boolean;
}

export interface PlanProps {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
  status?: string;
  onSelect?: () => void;
}

export default function PlanCard({
  name,
  price,
  period,
  description,
  icon,
  features,
  popular = false,
  current = false,
  status,
  onSelect,
}: PlanProps) {
  return (
    <Card
      className={`w-full h-full border-2 ${popular ? "border-primary shadow-lg scale-105" : current ? "border-primary/20" : "border-border"} relative overflow-hidden transition-all hover:shadow-md`}
    >
      {status ? (
        <StatusTag status={status} className="absolute top-0 right-0" />
      ) : popular ? (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg">
          <span className="text-sm font-medium">Popular</span>
        </div>
      ) : (
        current && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg">
            <span className="text-sm font-medium">Atual</span>
          </div>
        )
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-full">{icon}</div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature.id} className="flex items-start gap-2">
              <div
                className={`mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground"}`}
              >
                <Check className="h-4 w-4" />
              </div>
              <span
                className={
                  feature.included ? "text-foreground" : "text-muted-foreground"
                }
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          onClick={onSelect}
          className="w-full"
          variant={popular ? "default" : "outline"}
          size="lg"
        >
          {current ? "Seu plano atual" : "Selecionar plano"}
        </Button>
      </CardFooter>
    </Card>
  );
}
