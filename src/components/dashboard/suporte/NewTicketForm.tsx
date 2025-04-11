import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewTicketFormProps {
  onSubmit: (formData: {
    assunto: string;
    descricao: string;
    prioridade: "baixa" | "média" | "alta";
    arquivo?: File;
  }) => void;
}

export function NewTicketForm({ onSubmit }: NewTicketFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      assunto: formData.get("assunto") as string,
      descricao: formData.get("descricao") as string,
      prioridade: formData.get("prioridade") as "baixa" | "média" | "alta",
      arquivo: (formData.get("arquivo") as File) || undefined,
    });
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Abrir Novo Chamado</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para abrir um novo chamado de suporte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="assunto" className="text-sm font-medium">
              Assunto
            </label>
            <Input
              id="assunto"
              name="assunto"
              placeholder="Digite o assunto do chamado"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="descricao" className="text-sm font-medium">
              Descrição
            </label>
            <Textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva detalhadamente o problema ou dúvida"
              rows={5}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="prioridade" className="text-sm font-medium">
              Prioridade
            </label>
            <select
              id="prioridade"
              name="prioridade"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              required
            >
              <option value="baixa">Baixa</option>
              <option value="média">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="arquivo" className="text-sm font-medium">
              Anexar Arquivo (opcional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="arquivo"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Clique para enviar</span> ou
                    arraste e solte
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, JPG ou PNG (máx. 10MB)
                  </p>
                </div>
                <input
                  id="arquivo"
                  name="arquivo"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            <Send className="mr-2 h-4 w-4" /> Enviar Chamado
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
