"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  FileSignature,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Send,
  Plus,
  FileText,
  CalendarIcon,
  FilePlus,
  X,
  FileUp,
} from "lucide-react";
import ContractEditor from "@/components/contracts/ContractEditor";
import DynamicFieldsReview, {
  DynamicFieldReview,
} from "@/components/contracts/DynamicFieldsReview";
import PublicLinkDisplay from "@/components/contracts/PublicLinkDisplay";

export default function ContratosPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createMode, setCreateMode] = useState<
    "template" | "manual" | "document" | null
  >(null);
  const [manualContractStep, setManualContractStep] = useState<
    "editor" | "fields" | "link" | null
  >(null);
  const [contractContent, setContractContent] = useState("");
  const [contractName, setContractName] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [dynamicFields, setDynamicFields] = useState<DynamicFieldReview[]>([]);
  const [contractId, setContractId] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  // Dados mockados para contratos
  const mockContracts = [
    {
      id: 1,
      title: "Contrato de Prestação de Serviços",
      status: "pendente",
      createdAt: "2023-10-15",
      parties: ["Empresa A", "Empresa B"],
      type: "Prestação de Serviços",
    },
    {
      id: 2,
      title: "Contrato de Aluguel Comercial",
      status: "assinado",
      createdAt: "2023-09-22",
      parties: ["Imobiliária XYZ", "Locatário C"],
      type: "Aluguel",
    },
    {
      id: 3,
      title: "Acordo de Confidencialidade",
      status: "expirado",
      createdAt: "2023-08-05",
      parties: ["Empresa D", "Consultor E"],
      type: "NDA",
    },
    {
      id: 4,
      title: "Contrato de Compra e Venda",
      status: "pendente",
      createdAt: "2023-11-01",
      parties: ["Vendedor F", "Comprador G"],
      type: "Compra e Venda",
    },
    {
      id: 5,
      title: "Termo de Uso de Software",
      status: "assinado",
      createdAt: "2023-10-10",
      parties: ["Desenvolvedor H", "Cliente I"],
      type: "Licenciamento",
    },
  ];

  // Filtrar contratos com base na busca, filtro de status e data
  const filteredContracts = mockContracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.parties.some((party) =>
        party.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus =
      statusFilter === "todos" || contract.status === statusFilter;

    const matchesDate =
      !dateFilter ||
      new Date(contract.createdAt).toDateString() === dateFilter.toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "assinado":
        return "bg-green-100 text-green-800 border-green-200";
      case "expirado":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Função para confirmar exclusão
  const handleDeleteClick = (contract: any) => {
    setSelectedContract(contract);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // Aqui seria a lógica para excluir o contrato
    console.log(`Excluindo contrato: ${selectedContract?.title}`);
    setShowDeleteDialog(false);
  };

  const handleCreateContract = (mode: "template" | "manual" | "document") => {
    setCreateMode(mode);
    if (mode === "manual") {
      setManualContractStep("editor");
    }
    // Se o modo for template, podemos mostrar diretamente os templates
    // Se for document, mostramos a tela de upload
    // Se for manual, iniciamos o fluxo de criação manual
  };

  const resetCreateDialog = () => {
    setCreateMode(null);
    setManualContractStep(null);
    setContractContent("");
    setContractName("");
    setContractDescription("");
    setDynamicFields([]);
    setContractId("");
    setShowCreateDialog(false);
  };

  const handleEditorComplete = (
    content: string,
    name: string,
    description: string,
  ) => {
    setContractContent(content);
    setContractName(name);
    setContractDescription(description);
    setManualContractStep("fields");
  };

  const handleFieldsReviewComplete = (fields: DynamicFieldReview[]) => {
    setDynamicFields(fields);
    // In a real app, you would make an API call to create the contract and get an ID
    setContractId(`contract-${Math.random().toString(36).substring(2, 9)}`);
    setManualContractStep("link");
  };

  const handleManualContractComplete = () => {
    // In a real app, you would finalize the contract creation process
    resetCreateDialog();
    // Show a success message
    alert(
      "Contrato criado com sucesso! O link foi gerado e está pronto para ser compartilhado.",
    );
  };

  // Função para lidar com a mudança no campo de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Meus Contratos</h1>
          <p className="text-muted-foreground">
            Gerencie seus contratos e acordos
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Criar Contrato
        </Button>
      </div>

      {/* Barra de pesquisa e filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar contratos..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendentes</SelectItem>
                <SelectItem value="assinado">Assinados</SelectItem>
                <SelectItem value="expirado">Expirados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-[240px] justify-start text-left font-normal ${!dateFilter ? "text-muted-foreground" : ""}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? (
                    format(dateFilter, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })
                  ) : (
                    <span>Filtrar por data</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateFilter || undefined}
                  onSelect={setDateFilter}
                  initialFocus
                  locale={ptBR}
                />
                {dateFilter && (
                  <div className="p-3 border-t border-border">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDateFilter(null)}
                      className="w-full justify-start text-destructive hover:text-destructive"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Limpar filtro de data
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("cards")}
              className="h-10 w-10"
            >
              <FileText className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
              className="h-10 w-10"
            >
              <FileSignature className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Exibição de contratos - Modo Cards */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Skeleton loading para cards
            Array(6)
              .fill(0)
              .map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Skeleton className="h-8 w-20" />
                    <div className="flex gap-1">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </CardFooter>
                </Card>
              ))
          ) : filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <Card
                key={contract.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  <CardDescription>Tipo: {contract.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">Partes: </span>
                    {contract.parties.join(", ")}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Criado em: </span>
                    {new Date(contract.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contract.status)}`}
                  >
                    {contract.status.charAt(0).toUpperCase() +
                      contract.status.slice(1)}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Excluir"
                      onClick={() => handleDeleteClick(contract)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
              <FileSignature className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">
                Nenhum contrato encontrado
              </h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Não encontramos contratos com os filtros aplicados.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("todos");
                  setDateFilter(null);
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Exibição de contratos - Modo Tabela */}
      {viewMode === "table" && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Partes</TableHead>
                <TableHead>Data de Criação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                // Skeleton loading para tabela
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <Skeleton className="h-8 w-8 rounded-md" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : filteredContracts.length > 0 ? (
                filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">
                      {contract.title}
                    </TableCell>
                    <TableCell>{contract.type}</TableCell>
                    <TableCell>{contract.parties.join(", ")}</TableCell>
                    <TableCell>
                      {new Date(contract.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(contract.status)}`}
                      >
                        {contract.status.charAt(0).toUpperCase() +
                          contract.status.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Excluir"
                          onClick={() => handleDeleteClick(contract)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <FileSignature className="h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="text-lg font-medium">
                        Nenhum contrato encontrado
                      </h3>
                      <p className="text-muted-foreground mt-1 mb-3">
                        Não encontramos contratos com os filtros aplicados.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchQuery("");
                          setStatusFilter("todos");
                          setDateFilter(null);
                        }}
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o contrato "
              {selectedContract?.title}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de criação de contrato */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent
          className={`${createMode === "manual" ? "sm:max-w-[900px]" : "sm:max-w-[500px]"}`}
        >
          <DialogHeader>
            <DialogTitle>Criar Novo Contrato</DialogTitle>
            <DialogDescription>
              Escolha como deseja criar seu novo contrato.
            </DialogDescription>
          </DialogHeader>

          {!createMode ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <Button
                onClick={() => handleCreateContract("template")}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-6 space-y-3 hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-medium">Usar Modelo</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Escolha entre modelos pré-definidos
                  </p>
                </div>
              </Button>

              <Button
                onClick={() => handleCreateContract("document")}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-6 space-y-3 hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-medium">A partir de Documento</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Importe um documento existente
                  </p>
                </div>
              </Button>

              <Button
                onClick={() => handleCreateContract("manual")}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-6 space-y-3 hover:bg-accent hover:text-accent-foreground"
              >
                <FilePlus className="h-12 w-12 text-primary" />
                <div className="text-center">
                  <h3 className="font-medium">Criar Manualmente</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Crie um contrato personalizado
                  </p>
                </div>
              </Button>
            </div>
          ) : createMode === "template" ? (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Selecione um modelo</h3>
              <div className="space-y-3">
                {[
                  "Contrato de Prestação de Serviços",
                  "Contrato de Aluguel Comercial",
                  "Acordo de Confidencialidade (NDA)",
                  "Contrato de Compra e Venda",
                  "Termo de Uso de Software",
                ].map((template, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-md border border-input hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    onClick={() => {
                      setContractName(template);
                      setContractDescription(
                        `Modelo padrão para ${template.toLowerCase()}`,
                      );
                      setManualContractStep("fields");
                    }}
                  >
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <span>{template}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : createMode === "document" ? (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">
                Criar a partir de documento
              </h3>
              <p className="text-muted-foreground mb-4">
                Importe um documento existente para criar seu contrato.
              </p>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h4 className="text-sm font-medium mb-2">
                  Arraste e solte seu arquivo aqui
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Suporte para arquivos PDF, DOCX e TXT
                </p>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button size="sm" as="span">
                    Selecionar arquivo
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Aqui seria a lógica para processar o arquivo
                        // Por enquanto, vamos apenas mostrar o nome do arquivo
                        alert(
                          `Arquivo selecionado: ${e.target.files[0].name}\nFuncionalidade de processamento será implementada em breve.`,
                        );
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          ) : createMode === "manual" ? (
            <div>
              {manualContractStep === "editor" && (
                <ContractEditor
                  onNext={handleEditorComplete}
                  onBack={() => setCreateMode(null)}
                />
              )}

              {manualContractStep === "fields" && (
                <DynamicFieldsReview
                  contractContent={contractContent}
                  onNext={handleFieldsReviewComplete}
                  onBack={() => setManualContractStep("editor")}
                />
              )}

              {manualContractStep === "link" && (
                <PublicLinkDisplay
                  contractId={contractId}
                  onBack={() => setManualContractStep("fields")}
                  onFinish={handleManualContractComplete}
                />
              )}
            </div>
          ) : null}

          <DialogFooter>
            {createMode && createMode !== "manual" && (
              <Button
                variant="outline"
                onClick={() => setCreateMode(null)}
                className="mr-auto"
              >
                Voltar
              </Button>
            )}
            {createMode !== "manual" && (
              <Button variant="outline" onClick={resetCreateDialog}>
                Cancelar
              </Button>
            )}
            {createMode &&
              createMode !== "manual" &&
              manualContractStep === null && (
                <Button
                  onClick={() => {
                    if (createMode === "template") {
                      // Aqui seria a lógica para selecionar um template
                      // Por enquanto, vamos apenas simular a seleção do primeiro template
                      setContractName("Contrato de Prestação de Serviços");
                      setContractDescription(
                        "Modelo padrão para prestação de serviços",
                      );
                      setManualContractStep("fields");
                    } else if (createMode === "document") {
                      // Aqui seria a lógica para processar o documento
                      // Por enquanto, vamos apenas simular o processamento
                      alert(
                        "Funcionalidade de upload de documento será implementada em breve.",
                      );
                    }
                  }}
                >
                  Continuar
                </Button>
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
