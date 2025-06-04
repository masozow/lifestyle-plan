import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema_loginForm, type LoginFormValues } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiRequest } from "@/hooks";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const LoginForm = () => {
  const navigate = useNavigate();

  const loginMutation = useApiRequest<LoginFormValues>({
    url: "http://localhost:3001/api/login",
    method: "POST",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema_loginForm),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      // Puedes guardar estado en Zustand si lo deseas aquí
      navigate("/app/dashboard");
    }
  }, [loginMutation.isSuccess, navigate]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
        {loginMutation.isError && (
          <p className="text-sm text-red-600 text-center">
            {loginMutation.error.message}
          </p>
        )}
      </div>
    </form>
  );
};
