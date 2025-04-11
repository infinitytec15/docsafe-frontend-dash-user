import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "pending" | "completed" | "rejected";
  referral: string;
  planType: "Básico" | "Premium" | "Pro";
}

interface EarningsExtractProps {
  transactions?: Transaction[];
}

export default function EarningsExtract({
  transactions = [],
}: EarningsExtractProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data if no transactions are provided
  const mockTransactions: Transaction[] = [
    {
      id: "1",
      date: "15/05/2023",
      description: "Comissão de assinatura",
      amount: 50.0,
      status: "completed",
      referral: "joaosilva@email.com",
      planType: "Premium",
    },
    {
      id: "2",
      date: "10/05/2023",
      description: "Comissão de assinatura",
      amount: 25.0,
      status: "completed",
      referral: "mariasantos@email.com",
      planType: "Básico",
    },
    {
      id: "3",
      date: "05/05/2023",
      description: "Comissão de assinatura",
      amount: 50.0,
      status: "completed",
      referral: "pedroalves@email.com",
      planType: "Premium",
    },
    {
      id: "4",
      date: "01/05/2023",
      description: "Comissão de renovação",
      amount: 25.0,
      status: "pending",
      referral: "analuiza@email.com",
      planType: "Básico",
    },
    {
      id: "5",
      date: "25/04/2023",
      description: "Comissão de assinatura",
      amount: 50.0,
      status: "completed",
      referral: "carlosfernandes@email.com",
      planType: "Premium",
    },
    {
      id: "6",
      date: "20/04/2023",
      description: "Comissão de assinatura",
      amount: 25.0,
      status: "rejected",
      referral: "lucianamartins@email.com",
      planType: "Básico",
    },
    {
      id: "7",
      date: "15/04/2023",
      description: "Comissão de renovação",
      amount: 50.0,
      status: "completed",
      referral: "robertocarlos@email.com",
      planType: "Premium",
    },
  ];

  const dataToUse = transactions.length > 0 ? transactions : mockTransactions;

  // Filter transactions based on search term and status
  const filteredTransactions = dataToUse.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.referral.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "";
    let textColor = "";
    let label = "";

    switch (status) {
      case "completed":
        bgColor = "bg-green-100";
        textColor = "text-green-800";
        label = "Concluído";
        break;
      case "pending":
        bgColor = "bg-yellow-100";
        textColor = "text-yellow-800";
        label = "Pendente";
        break;
      case "rejected":
        bgColor = "bg-red-100";
        textColor = "text-red-800";
        label = "Rejeitado";
        break;
      default:
        bgColor = "bg-gray-100";
        textColor = "text-gray-800";
        label = status;
    }

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      >
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Buscar por descrição ou email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="completed">Concluído</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {paginatedTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Data
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Descrição
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Afiliado
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Tipo de Plano
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Valor
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-4 py-3 text-sm">{transaction.date}</td>
                  <td className="px-4 py-3 text-sm">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3 text-sm">{transaction.referral}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${transaction.planType === "Premium" ? "bg-blue-100 text-blue-800" : transaction.planType === "Pro" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
                    >
                      {transaction.planType}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    R$ {transaction.amount.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">Nenhuma transação encontrada.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}{" "}
            de {filteredTransactions.length}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
