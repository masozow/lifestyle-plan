import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useApiRequest } from "@/hooks";
import { schema_loginForm, type LoginFormValues } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuthStore, useSessionStore } from "@/store";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { fetchSession } = useSessionStore();
  const { setCredentials } = useAuthStore();
  const loginMutation = useApiRequest<LoginFormValues>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
    method: "POST",
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema_loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const loginLogic = async () => {
        setCredentials(form.getValues("email"), form.getValues("password"));
        await fetchSession();
        toast.success(loginMutation.data.message, {
          action: (
            <Button
              variant="ghost"
              className="self-end font-bold"
              onClick={() => toast.dismiss()}
            >
              <X className="h-4 w-4" />
            </Button>
          ),
        });
        navigate("/app/dashboard");
      };
      loginLogic();
    } else if (loginMutation.isError) {
      toast.error(loginMutation.error.message);
    }
  }, [
    loginMutation.isSuccess,
    loginMutation.isError,
    navigate,
    loginMutation?.data?.message,
    loginMutation?.error?.message,
    form,
    setCredentials,
    fetchSession,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 justify-start"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {loginMutation.isError && (
            <p className="text-sm text-red-600 text-center">
              {loginMutation.error.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link className="underline underline-offset-4" to="/register">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
};
