import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { cpf } from "cpf-cnpj-validator";
import InputMask from "react-input-mask";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function SignUp() {
  const { register: signup } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    cpf: z.string(),
    birthDate: z.coerce.date(),
  });

  type RegisterFormSchema = z.infer<typeof registerSchema>;

  const { register, handleSubmit, reset } = useForm<RegisterFormSchema>();

  const navigate = useNavigate();

  const handleSubmitForm = async (data: RegisterFormSchema) => {
    setLoading(true);

    try {
      const validateCpf = cpf.isValid(data.cpf);

      if (!validateCpf) {
        toast.error("CPF Inválido");
        setLoading(false);
        return;
      }

      if (data.password.length < 8) {
        toast.error("A senha tem que ter mais de 8 caracteres");
        setLoading(false);
        return;
      }

      await signup(data);

      toast.success("Conta Criada com Sucesso!");

      reset();
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Crie uma conta
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Nome
            </Label>
            <div className="mt-1">
              <Input
                id="name"
                type="text"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="John Doe"
                {...register("name")}
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                placeholder="you@example.com"
                {...register("email")}
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                {...register("password", { min: 8 })}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-full">
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                CPF
              </Label>
              <div className="mt-1">
                <InputMask
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  mask="999.999.999-99"
                  placeholder="CPF"
                  {...register("cpf")}
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="date"
                className="block text-sm font-medium text-muted-foreground"
              >
                Data de Nascimento
              </Label>
              <div className="mt-1">
                <Input
                  id="date"
                  type="date"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="John Doe"
                  {...register("birthDate")}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="hidden h-4 w-4 text-primary focus:ring-primary"
              />
              <Label
                htmlFor="remember-me"
                className="hidden ml-2 text-sm text-muted-foreground"
              >
                Remember me
              </Label>
            </div>
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-primary hover:text-primary/80"
              >
                Já possui uma conta?
              </Link>
            </div>
          </div>
          <div>
            <Button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? "Carregando" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
