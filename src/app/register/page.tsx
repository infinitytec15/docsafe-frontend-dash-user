"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  FileText,
  Lock,
  UserPlus,
  LogIn,
  CheckCircle,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    document: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
    if (errors.acceptTerms) {
      setErrors((prev) => ({ ...prev, acceptTerms: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Nome completo é obrigatório";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    if (!formData.document.trim()) {
      newErrors.document = "Documento é obrigatório";
      valid = false;
    } else {
      // Basic CPF/CNPJ validation (remove non-digits and check length)
      const digits = formData.document.replace(/\D/g, "");
      if (digits.length !== 11 && digits.length !== 14) {
        newErrors.document = "CPF ou CNPJ inválido";
        valid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
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

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Você deve aceitar os termos para continuar";
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

      // Mock successful registration
      toast({
        title: "Conta criada com sucesso",
        description: "Redirecionando para o dashboard...",
      });

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Verifique seus dados e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-b-[30%] transform -skew-y-1"></div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm overflow-hidden relative z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400 to-indigo-500 rounded-bl-full opacity-80 transform translate-x-8 -translate-y-8"></div>

        <CardHeader className="space-y-1 relative z-10">
          <div className="mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 mb-2">
            <UserPlus
              className="h-8 w-8 text-white drop-shadow-md"
              strokeWidth={2.5}
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Criar Conta
          </CardTitle>
          <CardDescription className="text-center">
            Preencha os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-purple-500" /> Nome Completo
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleChange}
                  className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 focus:border-purple-500 ${errors.name ? "border-destructive" : ""}`}
                />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" /> E-mail
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 focus:border-purple-500 ${errors.email ? "border-destructive" : ""}`}
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="document" className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500" /> CPF ou CNPJ
              </Label>
              <div className="relative">
                <Input
                  id="document"
                  name="document"
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  value={formData.document}
                  onChange={handleChange}
                  className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 focus:border-purple-500 ${errors.document ? "border-destructive" : ""}`}
                />
                <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.document && (
                <p className="text-sm text-destructive">{errors.document}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-purple-500" /> Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 focus:border-purple-500 ${errors.password ? "border-destructive" : ""}`}
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
                <Lock className="h-4 w-4 text-purple-500" /> Confirmar Senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-purple-100 dark:border-gray-700 focus:border-purple-500 ${errors.confirmPassword ? "border-destructive" : ""}`}
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-start space-x-2 bg-purple-50 dark:bg-gray-800/30 p-3 rounded-lg border border-purple-100 dark:border-gray-700">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={handleCheckboxChange}
                className="mt-1 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Aceito os{" "}
                  <Dialog
                    open={termsDialogOpen}
                    onOpenChange={setTermsDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline"
                        onClick={() => setTermsDialogOpen(true)}
                      >
                        termos e condições
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-purple-100 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                          Termos e Condições
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Leia atentamente os termos e condições de uso do
                          sistema.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-y-auto bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nullam euismod, nisl eget aliquam ultricies,
                          nunc nisl aliquet nunc, quis aliquam nisl nunc quis
                          nisl. Nullam euismod, nisl eget aliquam ultricies,
                          nunc nisl aliquet nunc, quis aliquam nisl nunc quis
                          nisl.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                          Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                          aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                          euismod, nisl eget aliquam ultricies, nunc nisl
                          aliquet nunc, quis aliquam nisl nunc quis nisl.
                        </p>
                        <p className="text-sm text-muted-foreground mt-4">
                          Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                          aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                          euismod, nisl eget aliquam ultricies, nunc nisl
                          aliquet nunc, quis aliquam nisl nunc quis nisl.
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => setTermsDialogOpen(false)}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" /> Aceitar e
                          Fechar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </label>
                {errors.acceptTerms && (
                  <p className="text-sm text-destructive">
                    {errors.acceptTerms}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 relative z-10">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                  Criando conta...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" /> Criar Conta
                </span>
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 hover:underline font-medium flex items-center gap-1 inline-flex"
              >
                <LogIn className="h-3 w-3" /> Fazer login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
