"use client";

import { useState } from "react";
import { Upload, FileSignature, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActionButtonsProps {
  onUpload?: (file: File) => void;
  onCreateContract?: (templateId: string, name: string) => void;
}

export default function ActionButtons({
  onUpload = () => {},
  onCreateContract = () => {},
}: ActionButtonsProps) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [contractOpen, setContractOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [contractName, setContractName] = useState("");
  const [templateId, setTemplateId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
      setUploadOpen(false);
    }
  };

  const handleCreateContract = () => {
    if (contractName && templateId) {
      onCreateContract(templateId, contractName);
      setContractName("");
      setTemplateId("");
      setContractOpen(false);
    }
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
        <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload size={18} />
              <span>Upload Rápido</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload de Documento</DialogTitle>
              <DialogDescription>
                Selecione um arquivo do seu computador para fazer upload.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="col-span-4">
                  Arquivo
                </Label>
                <Input
                  id="file"
                  type="file"
                  className="col-span-4"
                  onChange={handleFileChange}
                />
              </div>
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  Arquivo selecionado: {selectedFile.name}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleUpload}
                disabled={!selectedFile}
              >
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={contractOpen} onOpenChange={setContractOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <FileSignature size={18} />
              <span>Criar Contrato</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Criar Novo Contrato</DialogTitle>
              <DialogDescription>
                Escolha um modelo e dê um nome para seu novo contrato.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template" className="col-span-4">
                  Modelo de Contrato
                </Label>
                <Select value={templateId} onValueChange={setTemplateId}>
                  <SelectTrigger className="col-span-4">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prestacao-servico">
                      Prestação de Serviços
                    </SelectItem>
                    <SelectItem value="locacao">Contrato de Locação</SelectItem>
                    <SelectItem value="compra-venda">Compra e Venda</SelectItem>
                    <SelectItem value="nda">
                      Acordo de Confidencialidade
                    </SelectItem>
                    <SelectItem value="custom">Modelo em Branco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="col-span-4">
                  Nome do Contrato
                </Label>
                <Input
                  id="name"
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  className="col-span-4"
                  placeholder="Ex: Contrato de Prestação de Serviços - Cliente X"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateContract}
                disabled={!contractName || !templateId}
              >
                Criar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" className="flex items-center gap-2">
          <Plus size={18} />
          <span>Mais Ações</span>
        </Button>
      </div>
    </div>
  );
}
