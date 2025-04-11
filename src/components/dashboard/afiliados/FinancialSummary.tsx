import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FinancialSummaryProps {
  availableBalance?: number;
  totalCommissions?: number;
  onWithdrawalRequest?: () => void;
}

export default function FinancialSummary({
  availableBalance = 120.0,
  totalCommissions = 420.0,
  onWithdrawalRequest,
}: FinancialSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Saldo Disponível para Saque
            </p>
            <p className="text-3xl font-bold">
              R$ {availableBalance.toFixed(2).replace(".", ",")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">
              Total de Comissões Acumuladas
            </p>
            <p className="text-3xl font-bold">
              R$ {totalCommissions.toFixed(2).replace(".", ",")}
            </p>
          </CardContent>
        </Card>
      </div>
      <button
        onClick={onWithdrawalRequest}
        className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Solicitar Saque
      </button>
    </div>
  );
}
