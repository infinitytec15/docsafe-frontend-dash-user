"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Eye, Download, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status?: string;
}

interface RecentItemsProps {
  items?: RecentItem[];
  isLoading?: boolean;
}

export default function RecentItems({
  items = [],
  isLoading = false,
}: RecentItemsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data if no items are provided
  const mockItems: RecentItem[] = [
    {
      id: "1",
      name: "Contrato de Prestação de Serviços.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "15/05/2023",
      status: "Assinado",
    },
    {
      id: "2",
      name: "Declaração de Imposto de Renda.docx",
      type: "DOCX",
      size: "850 KB",
      date: "10/05/2023",
    },
    {
      id: "3",
      name: "Comprovante de Residência.jpg",
      type: "JPG",
      size: "1.5 MB",
      date: "05/05/2023",
    },
    {
      id: "4",
      name: "Contrato de Aluguel.pdf",
      type: "PDF",
      size: "2.1 MB",
      date: "01/05/2023",
      status: "Pendente",
    },
    {
      id: "5",
      name: "Certidão Negativa.pdf",
      type: "PDF",
      size: "500 KB",
      date: "28/04/2023",
    },
  ];

  const displayItems = items.length > 0 ? items : mockItems;

  const getStatusColor = (status?: string) => {
    if (!status) return "default";

    switch (status.toLowerCase()) {
      case "assinado":
        return "success";
      case "pendente":
        return "warning";
      case "expirado":
        return "destructive";
      default:
        return "default";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "docx":
      case "doc":
        return "📝";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📁";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Itens Recentes</CardTitle>
          <Skeleton className="h-4 w-[250px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Itens Recentes</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Todos os Documentos
            </Button>
            <Button variant="outline" size="sm">
              Todos os Contratos
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{getFileIcon(item.type)}</span>
                    <span className="truncate max-w-[250px]">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  {item.status ? (
                    <Badge variant={getStatusColor(item.status) as any}>
                      {item.status}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Baixar">
                      <Download className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Renomear
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 2}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(2);
                  }}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
