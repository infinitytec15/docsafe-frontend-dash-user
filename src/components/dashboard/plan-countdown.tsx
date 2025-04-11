"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PlanCountdownProps {
  planName?: string;
  daysRemaining?: number;
  isPlanFree?: boolean;
}

export default function PlanCountdown({
  planName = "Gratuito",
  daysRemaining = 0,
  isPlanFree = true,
}: PlanCountdownProps) {
  const [days, setDays] = useState(daysRemaining);

  // Simulate countdown (in a real app, this would be updated from the server)
  useEffect(() => {
    setDays(daysRemaining);
  }, [daysRemaining]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Crown className="h-5 w-5 text-amber-500 mr-2" />
        <div>
          <span className="text-sm font-medium">
            Plano {planName}
            {!isPlanFree && days > 0 && (
              <span className="ml-2 text-muted-foreground">
                ({days} dias restantes)
              </span>
            )}
          </span>
        </div>
      </div>

      {isPlanFree && (
        <Button
          size="sm"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
        >
          Fazer Upgrade
        </Button>
      )}
    </div>
  );
}
