import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  type LoginFormSchema = z.infer<typeof loginSchema>;

  const { register, handleSubmit, reset } = useForm<LoginFormSchema>();

  const handleSubmitForm = async (data: LoginFormSchema) => {
    setLoading(true);

    try {
      if (data.password.length < 8) {
        toast.error("A senha tem que ter mais de 8 caracteres");
        return;
      }

      await login(data);

      reset();
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            <span className="font-medium text-primary hover:text-primary/80">
              Realize emprestimos na velocidade da luz
            </span>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(handleSubmitForm)}>
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
                {...register("email", { required: true })}
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
                {...register("password", { required: true, min: 8 })}
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox
                id="remember-me"
                name="remember-me"
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <Label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-muted-foreground"
              >
                Lembre-se de mim
              </Label>
            </div>
            <div className="text-sm">
              <Link
                to="/signup"
                className="font-medium text-primary hover:text-primary/80"
              >
                Não possui uma conta?
              </Link>
            </div>
          </div>
          <div>
            <Button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {loading ? "Carregando" : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
