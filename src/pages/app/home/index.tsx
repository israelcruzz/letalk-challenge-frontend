import { HandCoins, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CardsLoanView } from "@/components/app/card-loan/view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loan } from "@/@types/loan";
import { api } from "@/services/api";
import { ThemeButton } from "@/components/app/theme-button";

export const Home = () => {
  const { user } = useAuth();

  const [loans, setLoans] = useState<Loan[]>();

  const fetchLoans = async () => {
    try {
      const loanList = await api.get("/loan");

      setLoans(loanList.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const [exitAccountModal, setExitAccountModal] = useState<boolean>(false);

  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    toast.success("Deslogado com Sucesso!");
  };

  return (
    <main className="w-full">
      <header className="w-full items-center flex justify-between border-b py-6 px-12">
        <HandCoins size={36} />

        <section className="flex gap-6 items-center">
          <ThemeButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-12 w-12">
                <AvatarImage className="h-12 w-12" src="/pngwing.com.png" />
                <AvatarFallback>Foto de Perfil</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setExitAccountModal(true)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </header>

      <h1 className="font-bold text-2xl px-12 pt-12">Empréstimos</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-12">
        <Card className="">
          <CardHeader className="flex">
            <CardTitle className="text-2xl font-bold">Empréstimo</CardTitle>
          </CardHeader>
          <CardContent>
            <Link to={`/loan/create`} className="text-white font-semibold">
              <Button>Realizar Empréstimo</Button>
            </Link>
          </CardContent>
        </Card>

        {loans &&
          loans.map((loan, i) => (
            <CardsLoanView
              key={i}
              fees={parseFloat(loan.interestRate)}
              loanId={loan.id}
              totalPrice={loan.totalPay}
            />
          ))}
      </section>

      <AlertDialog open={exitAccountModal} onOpenChange={setExitAccountModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza disso?</AlertDialogTitle>
            <AlertDialogDescription>
              Está ação vai deslogar sua conta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};
