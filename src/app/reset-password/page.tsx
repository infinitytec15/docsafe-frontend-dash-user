"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
  Lock,
  KeyRound,
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!token) {
      newErrors.token = "Token de recuperação inválido ou expirado";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Nova senha é obrigatória";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful password reset
      setIsSuccess(true);
      toast({
        title: "Senha redefinida com sucesso",
        description: "Você já pode fazer login com sua nova senha.",
      });

      // Redirect to login after a delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao redefinir senha",
        description: "Não foi possível redefinir sua senha. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if token is missing
  if (!token && !errors.token) {
    setErrors((prev) => ({
      ...prev,
      token: "Token de recuperação inválido ou expirado",
    }));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-b-[30%] transform -skew-y-1"></div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden relative z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-400 to-cyan-500 rounded-bl-full opacity-80 transform translate-x-8 -translate-y-8"></div>

        <CardHeader className="space-y-1 relative z-10">
          <div className="mx-auto bg-gradient-to-r from-teal-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 mb-2">
            <KeyRound
              className="h-8 w-8 text-white drop-shadow-md"
              strokeWidth={2.5}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400">
            Redefinir Senha
          </CardTitle>
          <CardDescription className="text-center">
            Digite sua nova senha abaixo
          </CardDescription>
        </CardHeader>
        {errors.token ? (
          <CardContent className="space-y-4 relative z-10">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-center border border-red-200 dark:border-red-800">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-sm font-medium text-red-700 dark:text-red-300">
                {errors.token}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Solicite um novo link de recuperação de senha.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => router.push("/forgot-password")}
                className="border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para recuperação
                de senha
              </Button>
            </div>
          </CardContent>
        ) : !isSuccess ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-teal-500" /> Nova Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-teal-100 dark:border-teal-800 focus:border-teal-500 ${errors.password ? "border-destructive" : ""}`}
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="flex items-center gap-2"
                >
                  <Lock className="h-4 w-4 text-teal-500" /> Confirmar Nova
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-teal-100 dark:border-teal-800 focus:border-teal-500 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="relative z-10">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-medium py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                    Redefinindo...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Redefinir Senha
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4 relative z-10">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-md text-center border border-teal-200 dark:border-teal-800">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="h-8 w-8 text-teal-500" />
              </div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-300">
                Sua senha foi redefinida com sucesso!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Você será redirecionado para a página de login em instantes...
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
