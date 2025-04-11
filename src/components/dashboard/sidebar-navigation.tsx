"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  Shield,
  Trophy,
  CreditCard,
  User,
  LogOut,
  ChevronRight,
  Menu,
  X,
  LifeBuoy,
  Bell,
  FileIcon,
  Users,
  Settings,
  Plus,
  Home,
  File,
  Briefcase,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarNavigationProps {
  className?: string;
}

export interface NotificationBadgeProps {
  count?: number;
}

export function NotificationBadge({ count = 0 }: NotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

interface NavSectionProps {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ReactNode;
    active: boolean;
    badge?: number;
  }[];
}

function NavSection({ title, items }: NavSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = item.active;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <span className="mr-3 relative">
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <NotificationBadge count={item.badge} />
                  )}
                </span>
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Interface para os itens de navegação
export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  badge?: number;
  isCenter?: boolean;
}

// Componente de ícone 3D animado para a navegação inferior
function AnimatedIcon({ icon, isActive, isCenter = false, name, badge = 0 }) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center",
        isCenter ? "relative -mt-8" : "",
      )}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={cn(
          "flex items-center justify-center rounded-full p-2 relative",
          isCenter
            ? "bg-primary text-primary-foreground h-14 w-14 shadow-lg"
            : isActive
              ? "bg-primary/10 text-primary h-10 w-10"
              : "text-muted-foreground h-10 w-10",
        )}
        whileHover={{ scale: 1.1, rotate: isCenter ? 0 : 5 }}
        animate={{
          y: [0, isActive ? -5 : 0, 0],
          transition: {
            duration: isActive ? 0.5 : 0,
            repeat: isActive ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 2,
          },
        }}
      >
        {icon}
        {badge > 0 && <NotificationBadge count={badge} />}
      </motion.div>
      {!isCenter && (
        <span
          className={cn(
            "text-xs mt-1",
            isActive ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          {name}
        </span>
      )}
    </motion.div>
  );
}

// Componente para a navegação móvel
function MobileNavigation({ items }: { items: NavItem[] }) {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {items.map((item) => (
            <Link href={item.href} key={item.name} className="block">
              <AnimatedIcon
                icon={item.icon}
                isActive={item.active}
                isCenter={item.isCenter}
                name={item.name}
                badge={item.badge}
              />
            </Link>
          ))}
        </div>
      </nav>
      {/* Espaçamento adicional para evitar que o conteúdo fique atrás da navegação inferior */}
      <div className="h-16" />
    </>
  );
}

export default function SidebarNavigation({
  className = "",
}: SidebarNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar se é dispositivo móvel
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar inicialmente
    checkIfMobile();

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile);

    // Limpar listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Itens para a navegação inferior móvel (5 principais)
  const mobileNavItems: NavItem[] = [
    {
      name: "Início",
      href: "/dashboard",
      icon: <Home className="h-6 w-6" />,
      active: pathname === "/dashboard",
    },
    {
      name: "Documentos",
      href: "/dashboard/documentos",
      icon: <File className="h-6 w-6" />,
      active: pathname === "/dashboard/documentos",
    },
    {
      name: "Criar",
      href: "/dashboard/contratos/novo",
      icon: <Plus className="h-8 w-8" />,
      active: false,
      isCenter: true,
    },
    {
      name: "Benefícios",
      href: "/dashboard/beneficios",
      icon: <Trophy className="h-6 w-6" />,
      active: pathname === "/dashboard/beneficios",
      badge: 2,
    },
    {
      name: "Conta",
      href: "/dashboard/conta",
      icon: <User className="h-6 w-6" />,
      active: pathname === "/dashboard/conta",
    },
  ];

  const mainItems = [
    {
      name: "Início",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
  ];

  const documentItems = [
    {
      name: "Meus Documentos",
      href: "/dashboard/documentos",
      icon: <FileText className="h-5 w-5" />,
      active: pathname === "/dashboard/documentos",
    },
    {
      name: "Meus Contratos",
      href: "/dashboard/contratos",
      icon: <FileSignature className="h-5 w-5" />,
      active: pathname === "/dashboard/contratos",
      badge: 2,
    },
    {
      name: "Cofre de Documentos",
      href: "/dashboard/cofre",
      icon: <Shield className="h-5 w-5" />,
      active: pathname === "/dashboard/cofre",
    },
  ];

  const accountItems = [
    {
      name: "Benefícios",
      href: "/dashboard/beneficios",
      icon: <Trophy className="h-5 w-5" />,
      active: pathname === "/dashboard/beneficios",
    },
    {
      name: "Afiliados",
      href: "/dashboard/afiliados",
      icon: <Bell className="h-5 w-5" />,
      active: pathname === "/dashboard/afiliados",
    },
    {
      name: "Plano Atual",
      href: "/dashboard/plano",
      icon: <CreditCard className="h-5 w-5" />,
      active: pathname === "/dashboard/plano",
    },
    {
      name: "Minha Conta",
      href: "/dashboard/conta",
      icon: <User className="h-5 w-5" />,
      active: pathname === "/dashboard/conta",
    },
  ];

  const supportItems = [
    {
      name: "Suporte",
      href: "/dashboard/suporte",
      icon: <LifeBuoy className="h-5 w-5" />,
      active:
        pathname === "/dashboard/suporte" ||
        pathname.startsWith("/dashboard/suporte/"),
    },
  ];

  return (
    <>
      {/* Mobile toggle button - visível apenas quando não estiver no modo móvel */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden fixed top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}

      {/* Sidebar - visível apenas em desktop ou quando aberto em tablet */}
      {(!isMobile || isOpen) && (
        <aside
          className={cn(
            "bg-background fixed inset-y-0 left-0 z-50 w-64 border-r transition-transform duration-300 ease-in-out",
            "md:translate-x-0 md:fixed md:z-50",
            isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "",
            className,
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center h-20 border-b bg-primary/5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-1">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-xl font-bold">DocSystem</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3">
              <NavSection title="Principal" items={mainItems} />
              <NavSection title="Documentos" items={documentItems} />
              <NavSection title="Conta" items={accountItems} />
              <NavSection title="Ajuda" items={supportItems} />
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => console.log("Logout clicked")}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Overlay for mobile sidebar */}
      {!isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Bottom Navigation for Mobile */}
      {isMobile && <MobileNavigation items={mobileNavItems} />}
    </>
  );
}
