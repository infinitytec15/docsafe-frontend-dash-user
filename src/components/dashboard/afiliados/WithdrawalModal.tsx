"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WithdrawalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance: number;
  onSubmit: (data: WithdrawalFormData) => void;
}

export interface WithdrawalFormData {
  method: "bank" | "pix";
  bank?: string;
  agency?: string;
  account?: string;
  accountType?: string;
  pixKey?: string;
  pixKeyType?: string;
  amount: number;
  invoiceFile?: File | null;
}

export default function WithdrawalModal({
  open,
  onOpenChange,
  availableBalance,
  onSubmit,
}: WithdrawalModalProps) {
  const [formData, setFormData] = useState<WithdrawalFormData>({
    method: "pix",
    pixKeyType: "cpf",
    accountType: "corrente",
    amount: availableBalance,
    invoiceFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        invoiceFile: e.target.files?.[0] || null,
      }));
      setFileSelected(true);
    } else {
      setFormData((prev) => ({ ...prev, invoiceFile: null }));
      setFileSelected(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitar Saque</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Saque</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                R$
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="50"
                max={availableBalance}
                value={formData.amount}
                onChange={handleChange}
                className="pl-8"
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Saldo disponível: R${" "}
              {availableBalance.toFixed(2).replace(".", ",")}
            </p>
          </div>

          <Tabs
            defaultValue="pix"
            onValueChange={(value) => handleSelectChange("method", value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pix">Pix</TabsTrigger>
              <TabsTrigger value="bank">Dados Bancários</TabsTrigger>
            </TabsList>

            <TabsContent value="pix" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="pixKeyType">Tipo de Chave</Label>
                <Select
                  value={formData.pixKeyType}
                  onValueChange={(value) =>
                    handleSelectChange("pixKeyType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de chave" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="email">E-mail</SelectItem>
                    <SelectItem value="phone">Telefone</SelectItem>
                    <SelectItem value="random">Chave Aleatória</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pixKey">Chave Pix</Label>
                <Input
                  id="pixKey"
                  name="pixKey"
                  value={formData.pixKey || ""}
                  onChange={handleChange}
                  placeholder={
                    formData.pixKeyType === "cpf"
                      ? "000.000.000-00"
                      : formData.pixKeyType === "email"
                        ? "seu@email.com"
                        : formData.pixKeyType === "phone"
                          ? "(00) 00000-0000"
                          : "Chave aleatória"
                  }
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="bank">Banco</Label>
                <Input
                  id="bank"
                  name="bank"
                  value={formData.bank || ""}
                  onChange={handleChange}
                  placeholder="Nome do banco"
                  required={formData.method === "bank"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agency">Agência</Label>
                  <Input
                    id="agency"
                    name="agency"
                    value={formData.agency || ""}
                    onChange={handleChange}
                    placeholder="0000"
                    required={formData.method === "bank"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account">Conta</Label>
                  <Input
                    id="account"
                    name="account"
                    value={formData.account || ""}
                    onChange={handleChange}
                    placeholder="00000-0"
                    required={formData.method === "bank"}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Tipo de Conta</Label>
                <Select
                  value={formData.accountType}
                  onValueChange={(value) =>
                    handleSelectChange("accountType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="invoiceFile">Nota Fiscal (Obrigatório)</Label>
            <div className="border border-input rounded-md p-2">
              <Input
                id="invoiceFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {fileSelected
                    ? "Arquivo selecionado"
                    : "Nenhum arquivo selecionado"}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("invoiceFile")?.click()
                  }
                >
                  Escolher Arquivo
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Formatos aceitos: PDF, JPG, JPEG, PNG. Tamanho máximo: 5MB.
            </p>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processando..." : "Solicitar Saque"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
