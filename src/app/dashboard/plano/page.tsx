"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Crown,
  Calendar,
  HardDrive,
  Users,
  Zap,
} from "lucide-react";
import PlanCard from "@/components/dashboard/PlanCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function PlanoPage() {
  const [currentPlan, setCurrentPlan] = useState({
    name: "Plano Premium",
    price: "R$ 49,90",
    period: "mensal",
    expirationDate: "15/12/2023",
    benefits: [
      {
        id: 1,
        name: "Armazenamento ilimitado",
        icon: <HardDrive className="h-5 w-5" />,
      },
      { id: 2, name: "Até 10 usuários", icon: <Users className="h-5 w-5" /> },
      { id: 3, name: "Acesso prioritário", icon: <Zap className="h-5 w-5" /> },
    ],
    limits: [
      { id: 1, name: "100 documentos/mês", current: 45, max: 100 },
      { id: 2, name: "50 contratos/mês", current: 12, max: 50 },
      { id: 3, name: "5GB armazenamento seguro", current: 2.1, max: 5 },
    ],
  });

  // Mock data for available plans
  const availablePlans = [
    {
      id: "start",
      name: "Plano Start",
      price: "R$ 29,99",
      period: "mensal",
      description: "Para quem está começando",
      icon: <HardDrive className="h-6 w-6 text-primary" />,
      features: [
        { id: 1, name: "Armazenamento de 2GB", included: true },
        { id: 2, name: "Até 3 usuários", included: true },
        { id: 3, name: "20 documentos/mês", included: true },
        { id: 4, name: "10 contratos/mês", included: true },
        { id: 5, name: "Suporte por email", included: true },
        { id: 6, name: "Acesso prioritário", included: false },
        { id: 7, name: "Backup automático", included: false },
      ],
      popular: false,
      current: false,
      status: "disponível",
    },
    {
      id: "basic",
      name: "Plano Basic",
      price: "R$ 39,99",
      period: "mensal",
      description: "Ideal para pequenos negócios",
      icon: <Users className="h-6 w-6 text-primary" />,
      features: [
        { id: 1, name: "Armazenamento de 5GB", included: true },
        { id: 2, name: "Até 5 usuários", included: true },
        { id: 3, name: "50 documentos/mês", included: true },
        { id: 4, name: "25 contratos/mês", included: true },
        { id: 5, name: "Suporte por email e chat", included: true },
        { id: 6, name: "Acesso prioritário", included: true },
        { id: 7, name: "Backup automático", included: false },
      ],
      popular: true,
      current: false,
      status: "popular",
    },
    {
      id: "professional",
      name: "Plano Professional",
      price: "R$ 99,99",
      period: "mensal",
      description: "Para empresas em crescimento",
      icon: <Crown className="h-6 w-6 text-primary" />,
      features: [
        { id: 1, name: "Armazenamento ilimitado", included: true },
        { id: 2, name: "Até 10 usuários", included: true },
        { id: 3, name: "100 documentos/mês", included: true },
        { id: 4, name: "50 contratos/mês", included: true },
        { id: 5, name: "Suporte prioritário 24/7", included: true },
        { id: 6, name: "Acesso prioritário", included: true },
        { id: 7, name: "Backup automático", included: true },
      ],
      popular: false,
      current: true,
      status: "atual",
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-8 bg-background min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Plano Atual</h1>
      </div>

      {/* Current Plan Card */}
      <Card className="w-full border-2 border-primary/20 overflow-hidden">
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg">
          <span className="text-sm font-medium">Ativo</span>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Crown className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl">{currentPlan.name}</CardTitle>
              <CardDescription>
                <span className="text-lg font-bold">{currentPlan.price}</span>
                <span className="text-muted-foreground">
                  /{currentPlan.period}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Expiration Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              Válido até:{" "}
              <span className="font-medium">{currentPlan.expirationDate}</span>
            </span>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Benefícios do plano:</h3>
            <ul className="space-y-2">
              {currentPlan.benefits.map((benefit) => (
                <li key={benefit.id} className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1.5 rounded-full">
                    {benefit.icon}
                  </div>
                  <span>{benefit.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limits */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Limites e uso:</h3>
            <ul className="space-y-3">
              {currentPlan.limits.map((limit) => (
                <li key={limit.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{limit.name}</span>
                    <span className="font-medium">
                      {limit.current}/{limit.max}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(limit.current / limit.max) * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" size="lg">
            Fazer upgrade
          </Button>
        </CardFooter>
      </Card>

      {/* Available Plans */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Planos disponíveis</h2>
        <p className="text-muted-foreground">
          Escolha o plano ideal para suas necessidades
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {availablePlans.map((plan) => (
            <div key={plan.id} className="flex">
              <PlanCard
                {...plan}
                onSelect={() => console.log(`Plano ${plan.name} selecionado`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
