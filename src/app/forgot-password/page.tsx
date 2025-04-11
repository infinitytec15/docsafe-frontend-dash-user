"use client";

import { useState } from "react";
import Link from "next/link";
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
import { useToast } from "@/components/ui/use-toast";
import { Mail, ArrowLeft, KeyRound, SendHorizontal } from "lucide-react";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = () => {
    if (!email) {
      setError("E-mail é obrigatório");
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("E-mail inválido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful password reset request
      setIsSuccess(true);
      toast({
        title: "Link enviado com sucesso",
        description: "Verifique seu e-mail para redefinir sua senha.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar link",
        description:
          "Não foi possível enviar o link de recuperação. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-b-[30%] transform -skew-y-1"></div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden relative z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400 to-blue-500 rounded-bl-full opacity-80 transform translate-x-8 -translate-y-8"></div>

        <CardHeader className="space-y-1 relative z-10">
          <div className="mx-auto bg-gradient-to-r from-cyan-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 mb-2">
            <KeyRound
              className="h-8 w-8 text-white drop-shadow-md"
              strokeWidth={2.5}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
            Esqueceu a senha?
          </CardTitle>
          <CardDescription className="text-center">
            Digite seu e-mail para receber um link de recuperação
          </CardDescription>
        </CardHeader>
        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-500" /> E-mail
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={handleChange}
                    className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-cyan-100 dark:border-gray-700 focus:border-cyan-500 ${error ? "border-destructive" : ""}`}
                  />
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 relative z-10">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-medium py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <SendHorizontal className="h-4 w-4" /> Enviar link de
                    recuperação
                  </span>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link
                  href="/login"
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300 hover:underline font-medium flex items-center gap-1 inline-flex justify-center"
                >
                  <ArrowLeft className="h-3 w-3" /> Voltar para o login
                </Link>
              </p>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4 relative z-10">
            <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-md text-center border border-cyan-200 dark:border-cyan-800">
              <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                Um link de recuperação foi enviado para {email}.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Verifique sua caixa de entrada e spam. O link expira em 1 hora.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para o login
                </Button>
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
