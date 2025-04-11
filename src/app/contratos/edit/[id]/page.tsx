"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import {
  ArrowLeft,
  Plus,
  Eye,
  Save,
  Link as LinkIcon,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import DynamicField, {
  DynamicFieldData,
  FieldType,
} from "@/components/contracts/DynamicField";

// Mock document data
const getMockDocument = (id: string) => {
  return {
    id: parseInt(id),
    name:
      id === "6"
        ? "Contrato de Prestação de Serviço.docx"
        : "Termo de Compromisso.docx",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    type: "DOCX",
    size: id === "6" ? "1.5 MB" : "0.9 MB",
    folder: "Contratos",
    date: id === "6" ? "18/06/2023" : "25/06/2023",
  };
};

export default function EditContractPage() {
  const params = useParams();
  const router = useRouter();
  const documentId = params.id as string;

  const [document, setDocument] = useState<any>(null);
  const [contractTitle, setContractTitle] = useState("");
  const [fields, setFields] = useState<DynamicFieldData[]>([]);
  const [activeTab, setActiveTab] = useState("edit");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [contractLink, setContractLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const doc = getMockDocument(documentId);
    setDocument(doc);
    setContractTitle(doc.name.replace(".docx", ""));
  }, [documentId]);

  const handleAddField = () => {
    const newField: DynamicFieldData = {
      id: uuidv4(),
      label: "Novo Campo",
      type: "text",
      placeholder: "",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleUpdateField = (
    id: string,
    updatedData: Partial<DynamicFieldData>,
  ) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updatedData } : field,
      ),
    );
  };

  const handleSaveContract = () => {
    // In a real app, this would be an API call
    const token = Math.random().toString(36).substring(2, 15);
    setContractLink(`${window.location.origin}/contratos/preencher/${token}`);
    setShowLinkDialog(true);
    toast({
      title: "Contrato salvo com sucesso!",
      description: "O link para preenchimento foi gerado.",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(contractLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (!document) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Carregando documento...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/dashboard/documentos">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Editar Contrato</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto grid max-w-6xl gap-6">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="contract-title">Título do Contrato</Label>
              <Input
                id="contract-title"
                value={contractTitle}
                onChange={(e) => setContractTitle(e.target.value)}
                placeholder="Digite o título do contrato"
                className="max-w-lg"
              />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="preview">Visualizar</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documento Original</CardTitle>
                        <CardDescription>
                          Visualize o documento e adicione campos dinâmicos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border rounded-md p-4 min-h-[400px] bg-white">
                          {/* This would be a document viewer in a real app */}
                          <p className="whitespace-pre-line">
                            {document.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Campos Dinâmicos</CardTitle>
                        <CardDescription>
                          Adicione campos para serem preenchidos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={handleAddField}
                          className="w-full mb-4"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Adicionar Campo
                        </Button>

                        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                          {fields.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                              Nenhum campo adicionado ainda
                            </div>
                          ) : (
                            fields.map((field) => (
                              <DynamicField
                                key={field.id}
                                id={field.id}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                required={field.required}
                                onRemove={handleRemoveField}
                                onUpdate={handleUpdateField}
                              />
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <Card>
                  <CardHeader>
                    <CardTitle>Visualização do Contrato</CardTitle>
                    <CardDescription>
                      Veja como o contrato ficará com os campos dinâmicos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-6 min-h-[600px] bg-white">
                      <h2 className="text-xl font-bold mb-4">
                        {contractTitle}
                      </h2>
                      <div className="whitespace-pre-line">
                        {/* This would be a document preview with field placeholders in a real app */}
                        <p>{document.content}</p>

                        {fields.length > 0 && (
                          <div className="mt-8 border-t pt-4">
                            <h3 className="font-semibold mb-4">
                              Campos para preenchimento:
                            </h3>
                            <div className="space-y-4">
                              {fields.map((field) => (
                                <div
                                  key={field.id}
                                  className="p-2 border rounded-md bg-gray-50"
                                >
                                  <p className="font-medium">
                                    {field.label}
                                    {field.required ? " *" : ""}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {field.placeholder ||
                                      `Digite ${field.label.toLowerCase()}`}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button onClick={handleSaveContract}>
                <Save className="mr-2 h-4 w-4" /> Salvar Contrato
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Link Generated Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Link Gerado com Sucesso!</DialogTitle>
            <DialogDescription>
              Copie e envie para quem deve preencher os dados do contrato.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input value={contractLink} readOnly className="flex-1" />
            <Button size="icon" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {linkCopied ? "Link copiado!" : ""}
            </p>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => window.open(contractLink, "_blank")}
              >
                <Eye className="mr-2 h-4 w-4" /> Visualizar
              </Button>
              <Button onClick={() => setShowLinkDialog(false)}>Concluir</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
