"use client";

import React, { useState } from "react";
import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import SummaryCards from "@/components/dashboard/afiliados/SummaryCards";
import EarningsExtract from "@/components/dashboard/afiliados/EarningsExtract";
import WithdrawalExtract from "@/components/dashboard/afiliados/WithdrawalExtract";
import FinancialSummary from "@/components/dashboard/afiliados/FinancialSummary";
import WithdrawalModal, {
  WithdrawalFormData,
} from "@/components/dashboard/afiliados/WithdrawalModal";
import { useToast } from "@/components/ui/use-toast";

export default function AfiliadosPage() {
  const { toast } = useToast();
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [withdrawalStatus, setWithdrawalStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");

  // Mock data
  const summaryData = {
    indications: 15,
    actives: 7,
    inadimplents: 3,
    total_commissions: 420.0,
  };

  const availableBalance = 120.0;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      "https://seusite.com.br/register?ref=gilbertojunior",
    );
    toast({
      title: "Link copiado!",
      description: "Link de afiliado copiado para a área de transferência.",
    });
  };

  const handleWithdrawalRequest = () => {
    setWithdrawalModalOpen(true);
  };

  const handleWithdrawalSubmit = (data: WithdrawalFormData) => {
    setWithdrawalStatus("pending");

    // Simulate API call
    setTimeout(() => {
      setWithdrawalStatus("success");
      toast({
        title: "Solicitação enviada!",
        description: `Sua solicitação de saque de R$ ${data.amount.toFixed(2).replace(".", ",")} foi enviada com sucesso.`,
      });
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">
              Programa de Afiliados
            </h1>
            <p className="text-muted-foreground mt-1">
              Convide amigos, ganhe comissões e acompanhe tudo aqui!
            </p>
          </header>

          {/* Affiliate Link Section */}
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Seu Link de Afiliado</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  readOnly
                  value="https://seusite.com.br/register?ref=gilbertojunior"
                  className="w-full h-10 px-3 py-2 border border-input rounded-md bg-background text-sm"
                />
              </div>
              <button
                onClick={handleCopyLink}
                className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Copiar Link
              </button>
            </div>
          </section>

          {/* Summary Cards */}
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Resumo</h2>
            <SummaryCards data={summaryData} />
          </section>

          {/* Earnings Extract */}
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Extrato de Ganhos</h2>
            <EarningsExtract />
          </section>

          {/* Withdrawal Extract */}
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Extrato de Saques</h2>
            <WithdrawalExtract />
          </section>

          {/* Financial Block */}
          <section className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h2 className="text-xl font-semibold mb-4">Financeiro</h2>
            <FinancialSummary
              availableBalance={availableBalance}
              totalCommissions={summaryData.total_commissions}
              onWithdrawalRequest={handleWithdrawalRequest}
            />
          </section>
        </div>
      </div>

      {/* Withdrawal Modal */}
      <WithdrawalModal
        open={withdrawalModalOpen}
        onOpenChange={setWithdrawalModalOpen}
        availableBalance={availableBalance}
        onSubmit={handleWithdrawalSubmit}
      />
    </div>
  );
}
