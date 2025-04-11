"use client";

import { useState } from "react";
import SidebarNavigation from "@/components/dashboard/sidebar-navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Download,
  Edit,
  Trash2,
  FolderPlus,
  Upload,
  MoveUp,
  Shield,
  Search,
  Filter,
} from "lucide-react";

// Mock data for documents
const mockDocuments = [
  {
    id: 1,
    name: "Contrato de Aluguel.pdf",
    type: "PDF",
    size: "2.4 MB",
    folder: "Contratos",
    date: "10/05/2023",
    hash: "8a7b9c...",
  },
  {
    id: 2,
    name: "Relatório Financeiro.xlsx",
    type: "XLSX",
    size: "1.8 MB",
    folder: "Financeiro",
    date: "15/05/2023",
    hash: "3e4f5g...",
  },
  {
    id: 3,
    name: "Apresentação Projeto.pptx",
    type: "PPTX",
    size: "5.2 MB",
    folder: "Projetos",
    date: "22/05/2023",
    hash: "7h8i9j...",
  },
  {
    id: 4,
    name: "Documento de Identidade.jpg",
    type: "JPG",
    size: "1.1 MB",
    folder: "Pessoal",
    date: "05/06/2023",
    hash: "2k3l4m...",
  },
  {
    id: 5,
    name: "Nota Fiscal.pdf",
    type: "PDF",
    size: "0.8 MB",
    folder: "Financeiro",
    date: "12/06/2023",
    hash: "5n6o7p...",
  },
  {
    id: 6,
    name: "Contrato de Prestação de Serviço.docx",
    type: "DOCX",
    size: "1.5 MB",
    folder: "Contratos",
    date: "18/06/2023",
    hash: "6q7r8s...",
  },
  {
    id: 7,
    name: "Termo de Compromisso.docx",
    type: "DOCX",
    size: "0.9 MB",
    folder: "Contratos",
    date: "25/06/2023",
    hash: "9t0u1v...",
  },
];

// Mock data for folders
const mockFolders = [
  { id: 1, name: "Contratos", count: 12, size: "28.5 MB" },
  { id: 2, name: "Financeiro", count: 8, size: "15.2 MB" },
  { id: 3, name: "Projetos", count: 5, size: "22.7 MB" },
  { id: 4, name: "Pessoal", count: 10, size: "18.3 MB" },
];

export default function DocumentosPage() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<number | null>(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Filter documents based on search query and filters
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFolder =
      selectedFolder !== "all" ? doc.folder === selectedFolder : true;
    const matchesType =
      selectedType !== "all" ? doc.type === selectedType : true;
    return matchesSearch && matchesFolder && matchesType;
  });

  // Simulate loading
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  // Handle document deletion
  const confirmDelete = (id: number) => {
    setDocumentToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDelete = () => {
    // In a real app, you would delete the document here
    console.log(`Deleting document with ID: ${documentToDelete}`);
    setShowDeleteDialog(false);
    setDocumentToDelete(null);
  };

  // Handle folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      // In a real app, you would create the folder here
      console.log(`Creating folder: ${newFolderName}`);
      setShowNewFolderDialog(false);
      setNewFolderName("");
    }
  };

  // Handle create contract from document
  const handleCreateContract = (docId: number) => {
    // Navigate to contract edit page
    window.location.href = `/contratos/edit/${docId}`;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-4">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="max-w-7xl mx-auto space-y-6">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Meus Documentos
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie seus arquivos e documentos
              </p>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => setShowNewFolderDialog(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                Nova Pasta
              </Button>
              <Button variant="default">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </div>
          </header>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedFolder}
                onValueChange={(value) => setSelectedFolder(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Pasta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Pastas</SelectItem>
                  {mockFolders.map((folder) => (
                    <SelectItem key={folder.id} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedType}
                onValueChange={(value) => setSelectedType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="XLSX">Excel</SelectItem>
                  <SelectItem value="PPTX">PowerPoint</SelectItem>
                  <SelectItem value="JPG">Imagem</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleSearch}>
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </div>

          {/* Storage Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockFolders.map((folder) => (
              <Card key={folder.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {folder.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {folder.count} arquivos
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {folder.size} utilizados
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex justify-end space-x-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Tabela
            </Button>
          </div>

          {/* Documents List */}
          {isLoading ? (
            viewMode === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <Skeleton className="h-5 w-3/4" />
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                      </CardContent>
                      <CardFooter>
                        <Skeleton className="h-9 w-full" />
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Pasta</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Skeleton className="h-5 w-full" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-16" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-16" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-24" />
                          </TableCell>
                          <TableCell>
                            <Skeleton className="h-5 w-32" />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )
          ) : filteredDocuments.length > 0 ? (
            viewMode === "cards" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        {doc.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tipo:</span>
                        <span>{doc.type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tamanho:</span>
                        <span>{doc.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pasta:</span>
                        <span>{doc.folder}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Data:</span>
                        <span>{doc.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        {doc.type === "DOCX" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCreateContract(doc.id)}
                            title="Criar Contrato a partir deste arquivo"
                          >
                            <FileText className="h-4 w-4 text-primary" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Pasta</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          {doc.name}
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.folder}</TableCell>
                        <TableCell>{doc.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Shield className="h-4 w-4" />
                            </Button>
                            {doc.type === "DOCX" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCreateContract(doc.id)}
                                title="Criar Contrato a partir deste arquivo"
                              >
                                <FileText className="h-4 w-4 text-primary" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => confirmDelete(doc.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          ) : (
            <Card className="p-8 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                Nenhum documento encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                Não encontramos documentos com os filtros selecionados.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFolder("all");
                    setSelectedType("all");
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este documento? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Dialog */}
      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Pasta</DialogTitle>
            <DialogDescription>
              Digite o nome da nova pasta que deseja criar.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Nome da pasta"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewFolderDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateFolder}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
