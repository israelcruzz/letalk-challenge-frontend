import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CSVLink } from "react-csv";
import { formatterPrice } from "@/utils/formatter-price";
import { ChevronLeft, DollarSignIcon, Download, Trash2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loan } from "@/@types/details-page";
import { api } from "@/services/api";
import dayjs from "dayjs";
import { toast } from "sonner";

const chartConfig = {
  desktop: {
    label: "Juros",
    color: "#f97316",
  },
  mobile: {
    label: "Restante",
    color: "#000",
  },
} satisfies ChartConfig;

export const Details = () => {
  const { loanId } = useParams();

  const [deleteLoanModal, setDeleteLoanModal] = useState<boolean>(false);
  const [details, setDetails] = useState<Loan>();
  const [deleted, setDeleted] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchDetailsLoan = async () => {
    try {
      const detailsData = await api.get("/loan/" + loanId);

      setDetails(detailsData.data);

      verifyDeleted();
    } catch (error) {
      console.log(error);
    }
  };

  const verifyDeleted = () => {
    if (!details) return;

    const verify = details.state === "CANCELED";

    if (verify) {
      setDeleted(true);
    }
  };

  const handleRemoveLoan = async () => {
    try {
      await api.patch(`/loan/${loanId}`);
      toast.success("Empréstimo Cancelado");
      fetchDetailsLoan();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cancelar");
    }
  };

  useEffect(() => {
    fetchDetailsLoan();
  }, []);

  if (!details) {
    navigate("/");
  }

  const generateChartData = details?.simulations.map((simulate, i) => {
    return {
      month: i + 1,
      restante: simulate.adjustedDebitBalance,
      juros: simulate.fees,
    };
  });

  const chartData = [
    { month: "January", restante: 186, juros: 80 },
    { month: "February", restante: 305, juros: 200 },
    { month: "March", restante: 237, juros: 120 },
    { month: "April", restante: 73, juros: 190 },
    { month: "May", restante: 209, juros: 130 },
    { month: "June", restante: 214, juros: 140 },
  ];

  const charts = generateChartData ? generateChartData : chartData;

  return (
    <main className="px-6 py-12">
      <header className="mb-6">
        <Link to={"/"} className="flex gap-2 items-center hover:text-black/80">
          <ChevronLeft size={24} />
          <span className="font-semibold">Voltar para a home</span>
        </Link>
      </header>

      {details && (
        <div className="flex flex-col xl:flex-row gap-6">
          <section className="md:flex-1">
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardHeader className="flex">
                  <div className="flex justify-between">
                    <CardTitle>Valor Inicial</CardTitle>
                    <DollarSignIcon size={24} color="#22c55e" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatterPrice(details.requiredValue)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex">
                  <div className="flex justify-between">
                    <CardTitle>Valor Total</CardTitle>
                    <DollarSignIcon size={24} color="#22c55e" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatterPrice(details.totalPay)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Simulates</CardTitle>
                  <CSVLink data={details.simulations} onClick={() => toast.info("Baixando...")}>
                    <Button variant={"outline"} className="flex gap-2">
                      <Download color="#22c55e" size={20} />
                      Baixar CSV
                    </Button>
                  </CSVLink>
                </div>
              </CardHeader>
              <CardContent>
                <Table className="mt-12">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-bold text-black">
                        SALDO DEVEDOR
                      </TableHead>
                      <TableHead className="text-base font-bold text-black">
                        JUROS
                      </TableHead>
                      <TableHead className="text-base font-bold text-black">
                        SALDO DEVEDOR AJUSTADO
                      </TableHead>
                      <TableHead className="text-base font-bold text-black">
                        VALOR DA PARCELA
                      </TableHead>
                      <TableHead className="text-base font-bold text-black">
                        VENCIMENTO
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {details.simulations.map((simulate, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            {formatterPrice(simulate.installmentValue)}
                          </TableCell>
                          <TableCell>{formatterPrice(simulate.fees)}</TableCell>
                          <TableCell>
                            {formatterPrice(simulate.adjustedDebitBalance)}
                          </TableCell>
                          <TableCell>
                            {formatterPrice(simulate.installmentValue)}
                          </TableCell>
                          <TableCell>
                            {dayjs(simulate.maturity).format("DD/MM/YYYY")}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell>R$ 0,00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="h-[400px] mt-6">
              <CardHeader>
                <CardTitle>Gráfico dos valores a cada mês</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <ChartContainer
                  config={chartConfig}
                  className="h-[300px] w-full"
                >
                  <BarChart accessibilityLayer data={charts}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="restante" fill="#f97316" radius={4} />
                    <Bar dataKey="juros" fill="#000" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          <section className="md:min-w-[500px]">
            <Card>
              <CardHeader className="bg-muted/50">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">Empréstimo</CardTitle>
                  <Button
                    className={`
                    ${deleted && "hidden"}
                 `}
                    onClick={() => setDeleteLoanModal(true)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>

                <CardDescription>
                  Efetivado em {dayjs(details.createdAt).format("DD/MM/YYYY")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <h3 className="font-semibold mt-4">Pessoal</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Nome</span>
                    <span>{details.user.name}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Email</span>
                    <span>{details.user.email}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">CPF</span>
                    <span>{details.user.cpf}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">UF</span>
                    <span>{details.uf}</span>
                  </div>
                </div>

                <Separator />

                <div className="mb-2">
                  <h3 className="font-semibold mt-4">Detalhes</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Preço Inicial</span>
                    <span>{formatterPrice(details.requiredValue)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Juros</span>
                    <span>{details.interestRate}%</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">
                      Total de Juros
                    </span>
                    <span>{formatterPrice(details.totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Total</span>
                    <span>{formatterPrice(details.totalPay)}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mt-4">Situação</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-muted-foreground">Estado</span>
                    <span
                      className={
                        details.state === "ACTIVE"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {details.state === "ACTIVE" ? "Efetivado" : "Cancelado"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      )}

      <AlertDialog open={deleteLoanModal} onOpenChange={setDeleteLoanModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveLoan}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};
