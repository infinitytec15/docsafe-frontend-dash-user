"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  FileSignature,
  Shield,
  HardDrive,
  Crown,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface IconContainerProps {
  icon: React.ReactNode;
  color: string;
}

const IconContainer = ({ icon, color }: IconContainerProps) => {
  const colorVariants = {
    primary: "text-primary bg-primary/10 border-primary/20",
    blue: "text-blue-600 bg-blue-100/80 border-blue-200",
    green: "text-green-600 bg-green-100/80 border-green-200",
    amber: "text-amber-600 bg-amber-100/80 border-amber-200",
    purple: "text-purple-600 bg-purple-100/80 border-purple-200",
    rose: "text-rose-600 bg-rose-100/80 border-rose-200",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "p-5 rounded-2xl transform",
        "shadow-lg border",
        "backdrop-blur-sm",
        "flex items-center justify-center",
        colorVariants[color as keyof typeof colorVariants] ||
          colorVariants.primary,
      )}
      style={{
        boxShadow: `0 10px 15px -3px ${getColorFromVariant(color)}20, 0 4px 6px -4px ${getColorFromVariant(color)}30`,
      }}
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{
          rotateY: 360,
          z: [0, 20, 0], // 3D effect: move icon forward and back in z-space
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="w-8 h-8 relative"
        style={{
          transformStyle: "preserve-3d",
          perspective: "500px",
        }}
      >
        {icon}
        <motion.div
          className="absolute inset-0 opacity-30 blur-sm"
          style={{ color: getColorFromVariant(color) }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const getColorFromVariant = (color: string): string => {
  switch (color) {
    case "blue":
      return "#2563eb";
    case "green":
      return "#16a34a";
    case "amber":
      return "#d97706";
    case "purple":
      return "#9333ea";
    case "rose":
      return "#e11d48";
    default:
      return "#6366f1";
  }
};

interface CardContentSectionProps {
  title: string;
  value: string;
  description?: string;
  color: string;
}

const CardContentSection = ({
  title,
  value,
  description,
  color,
}: CardContentSectionProps) => {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">
        {title}
      </h3>
      <motion.p
        className="text-2xl font-bold relative group truncate"
        whileHover={{ scale: 1.05, y: -2 }}
        style={{ color: getColorFromVariant(color) }}
      >
        {value}
        <motion.span
          className="absolute -bottom-1 left-0 h-1 bg-current opacity-20"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.p>
      {description && (
        <motion.p
          className="text-sm text-muted-foreground mt-1"
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

interface ProgressSectionProps {
  progress: number;
  progressMax?: number;
  progressLabel?: string;
  color: string;
}

const ProgressSection = ({
  progress,
  progressMax,
  progressLabel,
  color,
}: ProgressSectionProps) => {
  const progressPercentage = (progress / (progressMax || 100)) * 100;

  return (
    <div className="mt-4">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{progressLabel}</span>
        {progressMax && (
          <motion.span
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
          >
            {progress} de {progressMax}
          </motion.span>
        )}
      </div>
      <div
        className="relative h-2.5 overflow-hidden rounded-full"
        style={{ backgroundColor: `${getColorFromVariant(color)}20` }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: getColorFromVariant(color) }}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full bg-white opacity-30"
          style={{ width: `${progressPercentage}%` }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  progress?: number;
  progressMax?: number;
  progressLabel?: string;
  color?: string;
}

const InfoCard = ({
  title,
  value,
  icon,
  description,
  progress,
  progressMax,
  progressLabel,
  color = "primary",
}: InfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
        boxShadow: `0 20px 25px -5px ${getColorFromVariant(color)}10, 0 10px 10px -5px ${getColorFromVariant(color)}15`,
      }}
    >
      <Card className="bg-white overflow-hidden rounded-xl border border-gray-100 relative h-full">
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: `linear-gradient(135deg, ${getColorFromVariant(color)}05 0%, ${getColorFromVariant(color)}10 100%)`,
            borderTop: `4px solid ${getColorFromVariant(color)}`,
          }}
        />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: getColorFromVariant(color),
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0.2,
              }}
              animate={{
                y: [100, -20],
                x: [i * 20, i * 20 + (Math.random() * 40 - 20)],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <CardContentSection
              title={title}
              value={value}
              description={description}
              color={color}
            />
            <IconContainer icon={icon} color={color} />
          </div>
          {typeof progress === "number" && (
            <ProgressSection
              progress={progress}
              progressMax={progressMax}
              progressLabel={progressLabel}
              color={color}
            />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface InfoCardsProps {
  totalDocuments?: number;
  totalContracts?: number;
  vaultDocuments?: number;
  storageUsed?: number;
  storageTotal?: number;
  planName?: string;
  planExpiryDays?: number;
}

const InfoCards = ({
  totalDocuments = 12,
  totalContracts = 5,
  vaultDocuments = 3,
  storageUsed = 100,
  storageTotal = 500,
  planName = "Profissional",
  planExpiryDays = 20,
}: InfoCardsProps) => {
  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-6">
        <InfoCard
          title="Total de Documentos"
          value={totalDocuments.toString()}
          icon={<FileText className="h-7 w-7" />}
          color="blue"
        />

        <InfoCard
          title="Total de Contratos"
          value={totalContracts.toString()}
          icon={<FileSignature className="h-7 w-7" />}
          color="green"
        />

        <InfoCard
          title="Documentos no Cofre"
          value={vaultDocuments.toString()}
          icon={<Shield className="h-7 w-7" />}
          color="amber"
        />

        <InfoCard
          title="Espaço Utilizado"
          value={`${storageUsed}MB`}
          description={`de ${storageTotal}MB disponíveis`}
          icon={<HardDrive className="h-7 w-7" />}
          progress={storageUsed}
          progressMax={storageTotal}
          progressLabel="Espaço em uso"
          color="purple"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <InfoCard
          title="Plano Atual"
          value={planName}
          description={`Vence em ${planExpiryDays} dias`}
          icon={<Crown className="h-7 w-7" />}
          color="rose"
        />
        <InfoCard
          title="Qualificação"
          value="Avançado"
          description="Nível de acesso ao sistema"
          icon={<Trophy className="h-7 w-7" />}
          color="blue"
        />
      </div>
    </div>
  );
};

export default InfoCards;
