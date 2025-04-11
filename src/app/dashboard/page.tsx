import React from "react";
import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import InfoCards from "@/components/dashboard/info-cards";
import ActionButtons from "@/components/dashboard/action-buttons";
import RecentItems from "@/components/dashboard/recent-items";
import ContractChart from "@/components/dashboard/charts/ContractChart";
import DocumentChart from "@/components/dashboard/charts/DocumentChart";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 md:ml-64">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Início</h1>
            <p className="text-muted-foreground mt-1">
              Bem-vindo ao seu painel de controle
            </p>
          </header>

          {/* Info Cards */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
            <InfoCards />
          </section>

          {/* Charts Section */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Análise de Dados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContractChart />
              <DocumentChart />
            </div>
          </section>

          {/* Action Buttons */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
            <ActionButtons />
          </section>

          {/* Recent Items */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Itens Recentes</h2>
              <button className="text-primary hover:underline text-sm font-medium">
                Ver Todos
              </button>
            </div>
            <RecentItems />
          </section>
        </div>
      </div>
    </div>
  );
}
