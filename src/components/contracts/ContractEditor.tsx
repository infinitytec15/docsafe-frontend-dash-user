"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  List,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Hash,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Plus,
} from "lucide-react";

interface ContractEditorProps {
  onNext: (content: string, name: string, description: string) => void;
  onBack: () => void;
}

const VARIABLE_SUGGESTIONS = [
  {
    name: "Nome Completo",
    variable: "{{nome}}",
    icon: <Type className="h-4 w-4" />,
  },
  { name: "CPF", variable: "{{cpf}}", icon: <Hash className="h-4 w-4" /> },
  { name: "Email", variable: "{{email}}", icon: <Mail className="h-4 w-4" /> },
  {
    name: "Telefone",
    variable: "{{telefone}}",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    name: "Endereço",
    variable: "{{endereco}}",
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    name: "Valor",
    variable: "{{valor}}",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    name: "Data",
    variable: "{{data}}",
    icon: <Calendar className="h-4 w-4" />,
  },
];

const ContractEditor: React.FC<ContractEditorProps> = ({ onNext, onBack }) => {
  const [contractName, setContractName] = useState("");
  const [contractDescription, setContractDescription] = useState("");
  const [editorContent, setEditorContent] = useState(
    `<p>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</p>
<p></p>
<p>Por este instrumento particular, de um lado <strong>{{nome}}</strong>, inscrito no CPF sob o nº <strong>{{cpf}}</strong>, residente e domiciliado em <strong>{{endereco}}</strong>, doravante denominado CONTRATANTE, e de outro lado a empresa XYZ SERVIÇOS LTDA, inscrita no CNPJ sob o nº 00.000.000/0001-00, com sede na Rua Exemplo, 123, doravante denominada CONTRATADA, têm entre si justo e contratado o seguinte:</p>
<p></p>
<p>1. OBJETO DO CONTRATO</p>
<p>O presente contrato tem como objeto a prestação de serviços de consultoria pela CONTRATADA ao CONTRATANTE, conforme especificações detalhadas no Anexo I.</p>
<p></p>
<p>2. VALOR E FORMA DE PAGAMENTO</p>
<p>Pelos serviços prestados, o CONTRATANTE pagará à CONTRATADA o valor de R$ <strong>{{valor}}</strong>, a ser pago da seguinte forma: [descrever forma de pagamento].</p>
<p></p>
<p>3. PRAZO</p>
<p>O presente contrato terá início em <strong>{{data}}</strong> e término previsto para [data de término], podendo ser prorrogado mediante acordo entre as partes.</p>
<p></p>
<p>4. OBRIGAÇÕES DAS PARTES</p>
<p>4.1. São obrigações da CONTRATADA:</p>
<p>a) Prestar os serviços conforme especificado no Anexo I;</p>
<p>b) Manter sigilo sobre todas as informações recebidas do CONTRATANTE;</p>
<p>c) [outras obrigações].</p>
<p></p>
<p>4.2. São obrigações do CONTRATANTE:</p>
<p>a) Efetuar o pagamento conforme estipulado neste contrato;</p>
<p>b) Fornecer à CONTRATADA todas as informações necessárias para a execução dos serviços;</p>
<p>c) [outras obrigações].</p>
<p></p>
<p>5. RESCISÃO</p>
<p>O presente contrato poderá ser rescindido por qualquer das partes mediante notificação prévia de 30 dias.</p>
<p></p>
<p>6. FORO</p>
<p>As partes elegem o foro da Comarca de [cidade], para dirimir quaisquer dúvidas oriundas do presente contrato.</p>
<p></p>
<p>E, por estarem assim justas e contratadas, as partes assinam o presente instrumento em 2 (duas) vias de igual teor e forma.</p>
<p></p>
<p>[Cidade], <strong>{{data}}</strong>.</p>
<p></p>
<p>____________________________</p>
<p>CONTRATANTE: <strong>{{nome}}</strong></p>
<p></p>
<p>____________________________</p>
<p>CONTRATADA: XYZ SERVIÇOS LTDA</p>`,
  );
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    // Update preview content whenever editor content changes
    // Add a small delay to prevent excessive re-renders
    const timer = setTimeout(() => {
      setPreviewContent(editorContent);
    }, 300);

    return () => clearTimeout(timer);
  }, [editorContent]);

  const handleInsertVariable = (variable: string) => {
    // Get the textarea element
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    if (!textarea) {
      // Fallback if we can't get the textarea
      setEditorContent(editorContent + " " + variable);
      return;
    }

    // Get cursor position
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Insert variable at cursor position
    const newContent =
      editorContent.substring(0, start) +
      variable +
      editorContent.substring(end);

    setEditorContent(newContent);

    // Set cursor position after the inserted variable
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + variable.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSubmit = () => {
    if (!contractName.trim()) {
      alert("Por favor, insira um nome para o contrato.");
      return;
    }
    onNext(editorContent, contractName, contractDescription);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
      {/* Left side - Editor */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contract-name">Nome do Contrato *</Label>
            <Input
              id="contract-name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              placeholder="Ex: Contrato de Prestação de Serviços"
              required
            />
          </div>
          <div>
            <Label htmlFor="contract-description">Descrição (opcional)</Label>
            <Input
              id="contract-description"
              value={contractDescription}
              onChange={(e) => setContractDescription(e.target.value)}
              placeholder="Ex: Contrato para serviços de consultoria"
            />
          </div>
        </div>

        {/* Editor toolbar */}
        <Card className="p-2">
          <div className="flex flex-wrap gap-1">
            <Button variant="ghost" size="icon" title="Negrito">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Itálico">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Título">
              <Heading className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Lista">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Alinhar à Esquerda">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Centralizar">
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" title="Alinhar à Direita">
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Editor area */}
        <div className="border rounded-md">
          <Textarea
            className="min-h-[400px] font-mono text-sm p-4 resize-none border-0"
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
        </div>

        {/* Variable suggestions */}
        <div>
          <Label>Inserir Variáveis</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {VARIABLE_SUGGESTIONS.map((suggestion, index) => (
              <motion.button
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={() => handleInsertVariable(suggestion.variable)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion.icon}
                <span className="ml-1.5">{suggestion.name}</span>
              </motion.button>
            ))}
            <motion.button
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-3 w-3 mr-1" />
              <span>Personalizada</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right side - Preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Pré-visualização em tempo real</Label>
          <span className="text-xs text-muted-foreground">
            Atualizando em tempo real
          </span>
        </div>
        <motion.div
          className="border rounded-md p-6 bg-white min-h-[500px] shadow-sm overflow-y-auto mt-2 prose max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          dangerouslySetInnerHTML={{ __html: previewContent }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          * As variáveis destacadas serão substituídas pelos dados preenchidos
          pelo signatário
        </p>
      </div>

      {/* Action buttons */}
      <div className="col-span-1 lg:col-span-2 flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={handleSubmit}>
          Próximo: Gerar Formulário de Preenchimento
        </Button>
      </div>
    </div>
  );
};

export default ContractEditor;
