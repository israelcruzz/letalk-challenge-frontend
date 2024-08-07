import {
  CreateLoanResponse,
  CreateLoanType,
  CreateSimulate,
  SimulateResponse,
} from "@/@types/create-loan";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/services/api";
import { formatterPrice } from "@/utils/formatter-price";
import { cpf } from "cpf-cnpj-validator";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import dayjs from "dayjs";
import { useAuth } from "@/hooks/useAuth";

export const CreateLoan = () => {
  const navigate = useNavigate();

  const createLoanSchema = z.object({
    cpf: z.string(),
    uf: z.string(),
    birthDate: z.coerce.date(),
    totalDebt: z.number(),
    monthlyPayment: z.number().min(1),
  });

  type CreateLoanFormSchema = z.infer<typeof createLoanSchema>;

  const { register, handleSubmit, reset, setValue } =
    useForm<CreateLoanFormSchema>();

  const [selectedUF, setSelectedUF] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [simulateResponse, setSimulateResponse] = useState<SimulateResponse>();

  const handleUfChange = (value: string) => {
    setSelectedUF(value);
    setValue("uf", value);
  };

  const handleSubmitForm = async (data: CreateLoanFormSchema) => {
    setLoading(true);

    try {
      if (data.totalDebt < 50000) {
        toast.error("O valor do empréstimo tem que ser acima de R$ 50,000");
        setLoading(false);
        return;
      }

      const validateCpf = cpf.isValid(data.cpf);

      if (!validateCpf) {
        toast.error("CPF Inválido");
        setLoading(false);
        return;
      }

      const dataSimulate: CreateSimulate = {
        monthlyPayment: parseFloat(data.monthlyPayment),
        totalDebt: parseFloat(data.totalDebt),
        uf: data.uf,
      };

      const simulate = (await api.post(
        "/simulate",
        dataSimulate
      )) as SimulateResponse;

      setSimulateResponse(simulate);

      setLoading(false);

      reset();
      setViewSimulate(true);
    } catch (error) {
      console.log(error);
      setLoading(false)
      toast.error("Erro ao simular empréstimo");
    }
  };

  const [viewSimulate, setViewSimulate] = useState<boolean>(false);

  const handleCreateLoan = async () => {
    setLoading(true);

    if (!simulateResponse) return;

    try {
      const data: CreateLoanType = {
        requiredValue: simulateResponse.data.priceRequired,
        amountMonth: simulateResponse.data.monthlyPayment,
        interestRate: simulateResponse.data.fees,
        monthsPayOff: simulateResponse.data.totalMonths,
        totalInterest: simulateResponse.data.totalFees,
        totalPay: simulateResponse.data.totalPrice,
        uf: selectedUF,
        state: "PENDING",
        simulates: simulateResponse.data.simulations,
      };

      const loan = (await api.post("/loan/create", data)) as CreateLoanResponse;

      setLoading(false);

      navigate(`/loan/${loan.data.loan}/success`);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao efetivar, tente novamente mais tarde");
    }
  };

  return (
    <main className="px-6 py-12 flex flex-col gap-6">
      <section>
        <header className="mb-6">
          <Link
            to={"/"}
            className="flex gap-2 items-center hover:text-black/80"
          >
            <ChevronLeft size={24} />
            <span className="font-semibold">Voltar para a home</span>
          </Link>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>Simule e solicite o seu empréstimo.</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para simular
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="flex flex-col gap-2">
                <ReactInputMask
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  mask="999.999.999-99"
                  placeholder="CPF"
                  {...register("cpf")}
                />
                <Select
                  required
                  onValueChange={handleUfChange}
                  value={selectedUF}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent {...register("uf")}>
                    <div>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                    </div>
                  </SelectContent>
                </Select>

                <Input
                  type="date"
                  placeholder="DATA DE NASCIMENTO"
                  required
                  {...register("birthDate")}
                />
                <Input
                  type="text"
                  placeholder="QUAL O VALOR DO EMPRÉSTIMO"
                  required
                  {...register("totalDebt")}
                />

                <Input
                  type="text"
                  placeholder="QUAL VALOR DESEJA PAGAR POR MÊS?"
                  required
                  {...register("monthlyPayment")}
                />
              </div>

              <Button
                disabled={loading}
                type="submit"
                className="w-full mt-6 text-base font-bold uppercase leading-6"
              >
                {loading ? "Carregando" : "Simular"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {viewSimulate && simulateResponse?.data && (
        <section>
          <Card>
            <CardHeader>
              <CardTitle>
                Veja a simulação para o seu empréstimo antes de efetivar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <section className="grid grid-cols-3 gap-y-8">
                <div>
                  <h3 className="font-semibold text-black/60">
                    VALOR REQUERIDO:
                  </h3>
                  <span className="font-bold text-xl">
                    {formatterPrice(simulateResponse.data.priceRequired)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-black/60">TAXA DE JUROS</h3>
                  <span className="font-bold text-xl">
                    {simulateResponse.data.fees}% ao mês
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-black/60">
                    VALOR QUE DESEJA PAGAR POR MÊS
                  </h3>
                  <span className="font-bold text-xl">
                    {formatterPrice(simulateResponse.data.monthlyPayment)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-black/60">
                    TOTAL DE MESES PARA QUITAR
                  </h3>
                  <span className="font-bold text-xl">
                    {simulateResponse.data.totalMonths} MESES
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-black/60">
                    TOTAL DE JUROS
                  </h3>
                  <span className="font-bold text-xl">
                    {formatterPrice(simulateResponse.data.totalFees)}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-black/60">TOTAL A PAGAR</h3>
                  <span className="font-bold text-xl">
                    {formatterPrice(simulateResponse.data.totalPrice)}
                  </span>
                </div>
              </section>

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
                  {simulateResponse.data.simulations.map((simulate, i) => {
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

              <Button
                disabled={loading}
                onClick={handleCreateLoan}
                className="bg-[#21AE1E] hover:bg-[#20ae1ed2] w-full mt-6 text-base font-bold uppercase leading-6"
              >
                {loading ? "Carregando" : "Efetivar"}
              </Button>
            </CardContent>
          </Card>
        </section>
      )}
    </main>
  );
};
