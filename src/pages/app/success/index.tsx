import { Button } from "@/components/ui/button";
import { CircleCheckIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const Success = () => {
  const { loanId } = useParams();

  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <CircleCheckIcon color="#22c55e" size={64} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        Sucesso!
      </h1>
      <p className="mt-4 text-muted-foregorund">
        Seu empréstimo foi efetivado!
      </p>

      <Link to={`/details/${loanId}`}>
        <Button className="mt-4 w-[200px] h-9">Vá para os detalhes</Button>
      </Link>

      <Link to={`/`}>
        <Button variant={"outline"} className="mt-4">
          Voltar para a tela de inicio
        </Button>
      </Link>
    </main>
  );
};
