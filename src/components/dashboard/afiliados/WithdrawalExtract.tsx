"use client";

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

interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "rejected";
  paymentMethod: string;
  bankInfo?: string;
  pixKey?: string;
}

interface WithdrawalExtractProps {
  withdrawals?: Withdrawal[];
}

export default function WithdrawalExtract({
  withdrawals = [],
}: WithdrawalExtractProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data if no withdrawals are provided
  const mockWithdrawals: Withdrawal[] = [
    {
      id: "1",
      date: "20/05/2023",
      amount: 100.0,
      status: "completed",
      paymentMethod: "PIX",
      pixKey: "joao.silva@email.com",
    },
    {
      id: "2",
      date: "15/05/2023",
      amount: 75.0,
      status: "completed",
      paymentMethod: "Transferência Bancária",
      bankInfo: "Banco Itaú - Ag: 1234 - CC: 56789-0",
    },
    {
      id: "3",
      date: "10/05/2023",
      amount: 50.0,
      status: "pending",
      paymentMethod: "PIX",
      pixKey: "11999887766",
    },
    {
      id: "4",
      date: "05/05/2023",
      amount: 120.0,
      status: "rejected",
      paymentMethod: "Transferência Bancária",
      bankInfo: "Banco Bradesco - Ag: 5678 - CC: 12345-6",
    },
    {
      id: "5",
      date: "01/05/2023",
      amount: 90.0,
      status: "completed",
      paymentMethod: "PIX",
      pixKey: "carlos@email.com",
    },
  ];

  const dataToUse = withdrawals.length > 0 ? withdrawals : mockWithdrawals;

  // Filter withdrawals based on search term and status
  const filteredWithdrawals = dataToUse.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.paymentMethod
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (withdrawal.bankInfo &&
        withdrawal.bankInfo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (withdrawal.pixKey &&
        withdrawal.pixKey.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || withdrawal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredWithdrawals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWithdrawals = filteredWithdrawals.slice(
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
            placeholder="Buscar por método ou dados bancários"
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

      {paginatedWithdrawals.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Data
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Método de Pagamento
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-muted-foreground">
                  Dados Bancários
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
              {paginatedWithdrawals.map((withdrawal) => (
                <tr
                  key={withdrawal.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="px-4 py-3 text-sm">{withdrawal.date}</td>
                  <td className="px-4 py-3 text-sm">
                    {withdrawal.paymentMethod}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {withdrawal.bankInfo || withdrawal.pixKey || "-"}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">
                    R$ {withdrawal.amount.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={withdrawal.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">Nenhum saque encontrado.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredWithdrawals.length)} de{" "}
            {filteredWithdrawals.length}
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
