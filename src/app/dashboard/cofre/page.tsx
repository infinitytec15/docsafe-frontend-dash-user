"use client";

import { useState, useCallback, useRef } from "react";
import {
  Shield,
  Upload,
  Download,
  Trash2,
  Info,
  AlertCircle,
  File,
  FileText,
  Image,
  Archive,
  Key,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { AnimatedLock } from "@/components/ui/AnimatedLock";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Document Item Component
function DocumentItem({
  document,
  onDelete,
}: {
  document: DocumentVault;
  onDelete: (id: string) => void;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf"))
      return <FileText className="h-8 w-8 text-red-500" />;
    if (type.includes("zip"))
      return <Archive className="h-8 w-8 text-yellow-500" />;
    if (type.includes("image"))
      return <Image className="h-8 w-8 text-blue-500" />;
    if (type.includes("x-pkcs12"))
      return <Key className="h-8 w-8 text-green-500" />;
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const handleDownload = () => {
    // Mock download functionality
    alert(`Download iniciado: ${document.name}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4 flex items-start gap-3">
          <div className="flex-shrink-0">{getFileIcon(document.type)}</div>
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-sm truncate" title={document.name}>
              {document.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {document.size.toFixed(1)} MB
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(document.uploadDate)}
            </p>
          </div>
        </div>
        <div className="border-t px-4 py-2 bg-muted/30 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
            onClick={() => onDelete(document.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Excluir</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Upload Modal Component
function UploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (document: DocumentVault) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProtecting, setIsProtecting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (selectedFile) {
      setStep(2);
      setIsProtecting(true);

      // Simulate protection process
      setTimeout(() => {
        setIsProtecting(false);

        // Create new document object
        const newDocument: DocumentVault = {
          id: `doc-${Date.now()}`,
          name: selectedFile.name,
          type: selectedFile.type || "application/octet-stream",
          size: selectedFile.size / (1024 * 1024), // Convert bytes to MB
          uploadDate: new Date().toISOString(),
          uploadedBy: "João Silva", // This would come from user context in a real app
          hash: Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""),
        };

        // Wait a bit after protection animation completes before closing
        setTimeout(() => {
          onUploadComplete(newDocument);
          // Reset state
          setStep(1);
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          // Close dialog
          onClose();
        }, 1000);
      }, 2000);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedFile(null);
    setIsProtecting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          resetModal();
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "Enviar Documento ao Cofre" : "Protegendo Documento"}
          </DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Selecione um arquivo para enviar ao cofre seguro."
              : "Aguarde enquanto protegemos seu documento com criptografia avançada."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Arquivo</Label>
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            {selectedFile && (
              <div className="text-sm">
                <p className="font-medium">Arquivo selecionado:</p>
                <p>{selectedFile.name}</p>
                <p className="text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="mb-4 text-center">
              <AnimatedLock isLocking={isProtecting} size={64} />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              {isProtecting
                ? "Aplicando criptografia e protegendo seu documento..."
                : "Documento protegido com sucesso!"}
            </p>
          </div>
        )}

        <DialogFooter className="sm:justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline" type="button" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                disabled={!selectedFile}
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              {!isProtecting && (
                <p className="text-sm text-muted-foreground">
                  Fechando automaticamente...
                </p>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CofrePage() {
  const [documents, setDocuments] = useState<DocumentVault[]>(mockDocuments);
  const [usedSpace, setUsedSpace] = useState<number>(
    calculateUsedSpace(mockDocuments),
  );
  const [totalSpace, setTotalSpace] = useState<number>(1024); // 1GB in MB
  const [documentLimit, setDocumentLimit] = useState<number>(50);
  const [isLocking, setIsLocking] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Calculate used space in MB
  function calculateUsedSpace(docs: DocumentVault[]): number {
    return docs.reduce((total, doc) => total + doc.size, 0);
  }

  // Handle document deletion
  const handleDeleteDocument = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este documento?")) {
      const updatedDocuments = documents.filter((doc) => doc.id !== id);
      setDocuments(updatedDocuments);
      setUsedSpace(calculateUsedSpace(updatedDocuments));
    }
  };

  // Handle document upload with modal
  const handleUpload = useCallback(() => {
    setIsUploadModalOpen(true);
  }, []);

  // Handle upload completion
  const handleUploadComplete = useCallback(
    (newDocument: DocumentVault) => {
      // Add new document to the list
      const updatedDocuments = [newDocument, ...documents];
      setDocuments(updatedDocuments);

      // Update used space
      setUsedSpace(calculateUsedSpace(updatedDocuments));

      // Close modal
      setIsUploadModalOpen(false);
    },
    [documents],
  );

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Cofre de Documentos
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus documentos ultra protegidos com segurança adicional.
          </p>
        </div>
        <Button
          className="flex items-center gap-2"
          onClick={handleUpload}
          disabled={isLocking}
        >
          {isLocking ? (
            <AnimatedLock isLocking={true} size={16} />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isLocking ? "Protegendo..." : "Enviar Documento"}
        </Button>
      </div>

      {/* Storage info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Espaço Utilizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {(usedSpace / 1024).toFixed(2)} GB
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(usedSpace / totalSpace) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {((usedSpace / totalSpace) * 100).toFixed(1)}% de{" "}
              {(totalSpace / 1024).toFixed(2)} GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {documents.length} / {documentLimit}
              </div>
              <Info className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${(documents.length / documentLimit) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {((documents.length / documentLimit) * 100).toFixed(1)}% da
              capacidade utilizada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Segurança</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">Nível Máximo</div>
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Todos os documentos possuem criptografia de ponta a ponta e
              requerem 2FA para download
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Document list */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Documentos no Cofre</CardTitle>
          <CardDescription>
            Lista de documentos armazenados com segurança adicional
          </CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhum documento encontrado no cofre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((document) => (
                <DocumentItem
                  key={document.id}
                  document={document}
                  onDelete={handleDeleteDocument}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}

// Types
interface DocumentVault {
  id: string;
  name: string;
  type: string;
  size: number; // in MB
  uploadDate: string;
  uploadedBy: string;
  hash: string;
}

// Mock data
const mockDocuments: DocumentVault[] = [
  {
    id: "doc-001",
    name: "Contrato_Confidencial.pdf",
    type: "application/pdf",
    size: 2.5, // 2.5 MB
    uploadDate: "2023-10-15T14:30:00",
    uploadedBy: "João Silva",
    hash: "8a5da52ed126447d39f88e71f8d9c93c2e33a1f1d4b3c9999968a9ec",
  },
  {
    id: "doc-002",
    name: "Documentos_Pessoais.zip",
    type: "application/zip",
    size: 15.8, // 15.8 MB
    uploadDate: "2023-09-22T10:15:00",
    uploadedBy: "João Silva",
    hash: "7d9c93c2e33a1f1d4b3c9999968a9ec8a5da52ed126447d39f88e71f",
  },
  {
    id: "doc-003",
    name: "Certificado_Digital.p12",
    type: "application/x-pkcs12",
    size: 0.3, // 0.3 MB
    uploadDate: "2023-11-05T09:45:00",
    uploadedBy: "João Silva",
    hash: "1f1d4b3c9999968a9ec8a5da52ed126447d39f88e71f8d9c93c2e33a",
  },
];
