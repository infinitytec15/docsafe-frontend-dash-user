"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Star,
  Award,
  Gift,
  Clock,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Shield,
  Zap,
  Target,
  Crown,
  Medal,
  X,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BeneficiosPage() {
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("pontuacao");
  const [showQualificationsModal, setShowQualificationsModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [selectedQualification, setSelectedQualification] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showAllQualifications, setShowAllQualifications] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);

  useEffect(() => {
    // Simular carregamento da pontuação
    const timer = setTimeout(() => {
      setScore(750);
      setProgress(75);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const IconWrapper = ({ children, color, onClick = null }) => (
    <motion.div
      className={`relative flex items-center justify-center w-16 h-16 rounded-xl ${color} shadow-lg ${onClick ? "cursor-pointer" : ""}`}
      whileHover={{ scale: 1.05, rotate: 5 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );

  const rankings = [
    { name: "Ana Silva", score: 1250, position: 1, level: 5, badges: 8 },
    { name: "Carlos Mendes", score: 980, position: 2, level: 4, badges: 6 },
    {
      name: "Você",
      score: 750,
      position: 3,
      isUser: true,
      level: 3,
      badges: 4,
    },
    { name: "Mariana Costa", score: 720, position: 4, level: 3, badges: 5 },
    { name: "Pedro Santos", score: 650, position: 5, level: 2, badges: 3 },
    { name: "Juliana Alves", score: 620, position: 6, level: 2, badges: 3 },
    { name: "Roberto Gomes", score: 580, position: 7, level: 2, badges: 2 },
    { name: "Fernanda Lima", score: 520, position: 8, level: 1, badges: 2 },
    { name: "Lucas Oliveira", score: 480, position: 9, level: 1, badges: 1 },
    { name: "Camila Rocha", score: 450, position: 10, level: 1, badges: 1 },
  ];

  const howToEarnPoints = [
    {
      action: "Fazer upload de documento",
      points: 10,
      icon: <Star className="h-5 w-5" />,
    },
    {
      action: "Assinar contrato",
      points: 25,
      icon: <Award className="h-5 w-5" />,
    },
    {
      action: "Compartilhar documento",
      points: 5,
      icon: <Star className="h-5 w-5" />,
    },
    {
      action: "Completar perfil",
      points: 50,
      icon: <Award className="h-5 w-5" />,
    },
    { action: "Login diário", points: 5, icon: <Star className="h-5 w-5" /> },
  ];

  const qualifications = [
    {
      id: 1,
      name: "Mestre dos Documentos",
      description: "Faça upload de 50 documentos",
      progress: 65,
      icon: <Trophy className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
      level: 3,
      maxLevel: 5,
      rewards: ["50 pontos", "Badge exclusivo", "Armazenamento extra"],
    },
    {
      id: 2,
      name: "Assinador Profissional",
      description: "Assine 25 contratos",
      progress: 40,
      icon: <Star className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      level: 2,
      maxLevel: 5,
      rewards: ["75 pontos", "Badge exclusivo", "Desconto em assinaturas"],
    },
    {
      id: 3,
      name: "Colaborador Ativo",
      description: "Compartilhe 30 documentos",
      progress: 80,
      icon: <Award className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      level: 4,
      maxLevel: 5,
      rewards: ["60 pontos", "Badge exclusivo", "Recursos premium"],
    },
    {
      id: 4,
      name: "Usuário Fiel",
      description: "Faça login por 30 dias consecutivos",
      progress: 90,
      icon: <Gift className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      level: 4,
      maxLevel: 5,
      rewards: ["100 pontos", "Badge exclusivo", "1 mês grátis"],
    },
    {
      id: 5,
      name: "Guardião de Dados",
      description: "Adicione 20 documentos ao cofre seguro",
      progress: 35,
      icon: <Shield className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      level: 1,
      maxLevel: 5,
      rewards: ["80 pontos", "Badge exclusivo", "Segurança avançada"],
    },
    {
      id: 6,
      name: "Usuário Premium",
      description: "Mantenha uma assinatura premium por 6 meses",
      progress: 50,
      icon: <Crown className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
      level: 2,
      maxLevel: 5,
      rewards: ["120 pontos", "Badge exclusivo", "Suporte VIP"],
    },
    {
      id: 7,
      name: "Especialista em Contratos",
      description: "Crie 15 modelos de contratos personalizados",
      progress: 20,
      icon: <Target className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      level: 1,
      maxLevel: 5,
      rewards: ["90 pontos", "Badge exclusivo", "Modelos premium"],
    },
    {
      id: 8,
      name: "Embaixador Digital",
      description: "Convide 10 amigos para a plataforma",
      progress: 60,
      icon: <Zap className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      level: 3,
      maxLevel: 5,
      rewards: ["150 pontos", "Badge exclusivo", "Créditos bônus"],
    },
  ];

  const badges = [
    {
      id: 1,
      name: "Pioneiro Digital",
      description: "Conquistado por ser um dos primeiros usuários do sistema",
      icon: <Trophy className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
      earned: true,
      date: "15/04/2023",
    },
    {
      id: 2,
      name: "Especialista em Documentos",
      description: "Gerenciou mais de 100 documentos no sistema",
      icon: <Star className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      earned: false,
      progress: 65,
    },
    {
      id: 3,
      name: "Mestre das Assinaturas",
      description: "Assinou mais de 50 contratos digitalmente",
      icon: <Award className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-rose-400 to-rose-600",
      earned: true,
      date: "03/06/2023",
    },
    {
      id: 4,
      name: "Colaborador Premium",
      description: "Compartilhou documentos com mais de 20 pessoas",
      icon: <Gift className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      earned: false,
      progress: 40,
    },
    {
      id: 5,
      name: "Guardião de Dados",
      description: "Protegeu mais de 30 documentos no cofre seguro",
      icon: <Shield className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
      earned: true,
      date: "10/05/2023",
    },
    {
      id: 6,
      name: "Usuário VIP",
      description: "Manteve uma assinatura premium por 1 ano",
      icon: <Crown className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-amber-400 to-amber-600",
      earned: false,
      progress: 25,
    },
    {
      id: 7,
      name: "Especialista Jurídico",
      description: "Criou mais de 20 modelos de contratos personalizados",
      icon: <Target className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
      earned: false,
      progress: 15,
    },
    {
      id: 8,
      name: "Embaixador Platinum",
      description: "Convidou mais de 15 amigos para a plataforma",
      icon: <Zap className="h-8 w-8 text-white" />,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      earned: true,
      date: "22/04/2023",
    },
  ];

  const rewards = [
    {
      name: "Desconto de 10%",
      points: 500,
      icon: <Gift className="h-5 w-5" />,
    },
    { name: "1 mês grátis", points: 1000, icon: <Gift className="h-5 w-5" /> },
    {
      name: "Armazenamento extra",
      points: 750,
      icon: <Gift className="h-5 w-5" />,
    },
    {
      name: "Suporte prioritário",
      points: 300,
      icon: <Gift className="h-5 w-5" />,
    },
  ];

  const history = [
    { action: "Upload de documento", points: 10, date: "Hoje, 14:30" },
    { action: "Login diário", points: 5, date: "Hoje, 09:15" },
    { action: "Assinatura de contrato", points: 25, date: "Ontem, 16:45" },
    { action: "Compartilhamento", points: 5, date: "23/05/2023, 11:20" },
    { action: "Completou perfil", points: 50, date: "20/05/2023, 10:05" },
  ];

  // Modal components
  const BadgesModal = () => (
    <AnimatePresence>
      {showBadgesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowBadgesModal(false);
              setSelectedBadge(null);
              setShowAllBadges(false);
            }}
          />
          <motion.div
            className="bg-card rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-[60]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <Award className="h-6 w-6 mr-2 text-purple-500" />
                  {selectedBadge ? "Detalhes da Conquista" : "Suas Conquistas"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowBadgesModal(false);
                    setSelectedBadge(null);
                    setShowAllBadges(false);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {selectedBadge ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-20 h-20 rounded-xl ${selectedBadge.color} flex items-center justify-center shadow-lg relative`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm" />
                      <div className="relative z-10">{selectedBadge.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedBadge.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedBadge.description}
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        {selectedBadge.earned ? (
                          <span className="text-green-500 font-medium flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center mr-1">
                              <div className="text-white text-xs">✓</div>
                            </div>
                            Conquistado em {selectedBadge.date}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Ainda não conquistado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!selectedBadge.earned && (
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progresso</span>
                        <span className="text-sm font-medium">
                          {selectedBadge.progress}%
                        </span>
                      </div>
                      <motion.div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedBadge.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </motion.div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedBadge(null)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Voltar para todas as conquistas
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {badges.map((badge) => (
                      <motion.div
                        key={badge.id}
                        className={`border rounded-xl p-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors ${badge.earned ? "border-green-500/30 bg-green-500/5" : ""}`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedBadge(badge)}
                      >
                        <div className="flex flex-col items-center text-center gap-3">
                          <div
                            className={`w-16 h-16 rounded-lg ${badge.color} flex items-center justify-center shadow-md relative`}
                          >
                            <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm" />
                            <div className="relative z-10">{badge.icon}</div>
                            {badge.earned && (
                              <motion.div
                                className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 15,
                                }}
                              >
                                <div className="text-white text-xs">✓</div>
                              </motion.div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm">{badge.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {badge.description}
                            </p>
                            {!badge.earned && badge.progress && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span>{badge.progress}%</span>
                                </div>
                                <motion.div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full relative"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${badge.progress}%` }}
                                    transition={{
                                      duration: 0.8,
                                      ease: "easeOut",
                                    }}
                                  >
                                    <motion.div
                                      className="absolute top-0 right-0 h-full w-1.5 bg-white/30"
                                      animate={{ x: [0, 8, 0] }}
                                      transition={{
                                        repeat: Infinity,
                                        duration: 1.5,
                                        ease: "easeInOut",
                                      }}
                                    />
                                  </motion.div>
                                </motion.div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const QualificationsModal = () => (
    <AnimatePresence>
      {showQualificationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowQualificationsModal(false);
              setSelectedQualification(null);
              setShowAllQualifications(false);
            }}
          />
          <motion.div
            className="bg-card rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative z-[60]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                  {selectedQualification
                    ? "Detalhes da Qualificação"
                    : "Suas Qualificações"}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowQualificationsModal(false);
                    setSelectedQualification(null);
                    setShowAllQualifications(false);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {selectedQualification ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-20 h-20 rounded-xl ${selectedQualification.color} flex items-center justify-center shadow-lg relative`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm" />
                      <div className="relative z-10">
                        {selectedQualification.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {selectedQualification.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedQualification.description}
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="font-medium">
                          Nível {selectedQualification.level}
                        </span>
                        <span className="mx-2 text-muted-foreground">/</span>
                        <span className="text-muted-foreground">
                          Máximo: Nível {selectedQualification.maxLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm font-medium">
                        {selectedQualification.progress}%
                      </span>
                    </div>
                    <motion.div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full relative"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${selectedQualification.progress}%`,
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute top-0 right-0 h-full w-2 bg-white/30"
                          animate={{ x: [0, 10, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recompensas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedQualification.rewards.map((reward, index) => (
                        <div
                          key={index}
                          className="bg-muted/50 rounded-lg p-3 text-center"
                        >
                          <span className="text-sm">{reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedQualification(null)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Voltar para todas as qualificações
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {qualifications.map((qualification) => (
                      <motion.div
                        key={qualification.id}
                        className="border rounded-xl p-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedQualification(qualification)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-12 h-12 rounded-lg ${qualification.color} flex items-center justify-center shadow-md relative mb-1`}
                            >
                              <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm" />
                              <div className="relative z-10">
                                {qualification.icon}
                              </div>
                            </div>
                            <span className="text-xs font-medium text-center line-clamp-1 w-12">
                              Nível {qualification.level}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold">
                                {qualification.name}
                              </h3>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {qualification.level}/{qualification.maxLevel}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {qualification.description}
                            </p>
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progresso</span>
                                <span>{qualification.progress}%</span>
                              </div>
                              <motion.div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full relative"
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${qualification.progress}%`,
                                  }}
                                  transition={{
                                    duration: 0.8,
                                    ease: "easeOut",
                                  }}
                                >
                                  <motion.div
                                    className="absolute top-0 right-0 h-full w-1.5 bg-white/30"
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: 1.5,
                                      ease: "easeInOut",
                                    }}
                                  />
                                </motion.div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="p-6 space-y-6 bg-gradient-to-b from-background to-background/80">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {/* Render modals */}
      <BadgesModal />
      <QualificationsModal />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Seus Benefícios</h1>
        <p className="text-muted-foreground mb-6">
          Acumule pontos, ganhe recompensas e acompanhe seu progresso
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                Sua Pontuação
              </CardTitle>
              <CardDescription>
                Continue acumulando para desbloquear recompensas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <motion.div
                  className="text-5xl font-bold mb-4 text-primary"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {score}
                </motion.div>
                <div className="w-full mb-2">
                  <motion.div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-yellow-500 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 h-full w-2 bg-white/30"
                        animate={{ x: [0, 10, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {progress}% para o próximo nível
                </p>
                <Button
                  className="mt-4"
                  size="sm"
                  onClick={() => setShowQualificationsModal(true)}
                >
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="col-span-1 md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Award className="h-6 w-6 mr-2 text-purple-500" />
                Suas Conquistas
              </CardTitle>
              <CardDescription>
                Conquistas desbloqueadas e em progresso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center gap-4 py-4">
                {badges.slice(0, 4).map((badge, index) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center gap-2"
                  >
                    <IconWrapper
                      color={badge.color}
                      onClick={() => {
                        setSelectedBadge(badge);
                        setShowBadgesModal(true);
                      }}
                    >
                      {badge.icon}
                      {badge.earned && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="text-white text-xs">✓</div>
                        </div>
                      )}
                    </IconWrapper>
                    <span className="text-xs font-medium text-center line-clamp-1 w-16">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowBadgesModal(true)}
                >
                  Ver Todas as Conquistas
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Tabs defaultValue="pontuacao" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger
              value="pontuacao"
              onClick={() => setActiveTab("pontuacao")}
            >
              Ranking
            </TabsTrigger>
            <TabsTrigger
              value="como-ganhar"
              onClick={() => setActiveTab("como-ganhar")}
            >
              Como Ganhar
            </TabsTrigger>
            <TabsTrigger
              value="recompensas"
              onClick={() => setActiveTab("recompensas")}
            >
              Recompensas
            </TabsTrigger>
            <TabsTrigger
              value="historico"
              onClick={() => setActiveTab("historico")}
            >
              Histórico
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pontuacao" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" />
                  Ranking de Usuários
                </CardTitle>
                <CardDescription>
                  Veja sua posição em relação a outros usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rankings.map((user) => (
                    <motion.div
                      key={user.position}
                      className={`flex items-center justify-between p-3 rounded-lg ${user.isUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50"}`}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: user.isUser
                          ? "rgba(var(--primary), 0.15)"
                          : "rgba(var(--muted), 0.6)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: user.position * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${user.isUser ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"}`}
                        >
                          {user.position}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${user.isUser ? "text-primary" : ""}`}
                          >
                            {user.name}
                          </p>
                          <div className="flex items-center mt-1">
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Trophy className="h-3 w-3 mr-1" /> Nível{" "}
                              {user.level}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center ml-2">
                              <Award className="h-3 w-3 mr-1" /> {user.badges}{" "}
                              badges
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="font-bold">{user.score} pts</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="como-ganhar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Como Ganhar Pontos
                </CardTitle>
                <CardDescription>
                  Realize estas ações para acumular pontos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {howToEarnPoints.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "rgba(var(--primary), 0.05)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                        </div>
                      </div>
                      <div className="font-bold text-primary">
                        +{item.points} pts
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recompensas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Gift className="h-6 w-6 mr-2 text-green-500" />
                  Recompensas Disponíveis
                </CardTitle>
                <CardDescription>
                  Troque seus pontos por estas recompensas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewards.map((reward, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col p-4 rounded-lg border bg-card"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          {reward.icon}
                        </div>
                        <div className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                          {reward.points} pts
                        </div>
                      </div>
                      <h3 className="font-bold mb-2">{reward.name}</h3>
                      <div className="mt-auto pt-2">
                        <Button
                          variant={
                            score >= reward.points ? "default" : "outline"
                          }
                          className="w-full"
                          disabled={score < reward.points}
                        >
                          {score >= reward.points
                            ? "Resgatar"
                            : `Faltam ${reward.points - score} pts`}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-blue-500" />
                  Histórico de Pontuação
                </CardTitle>
                <CardDescription>
                  Suas atividades recentes e pontos ganhos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      whileHover={{ scale: 1.01 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-green-600">
                        +{item.points} pts
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
