import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useApiRequest } from "@/hooks";
import { schema_registerForm, type RegisterFormValues } from "@/schemas";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuthStore, useSessionStore } from "@/store";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setCredentials } = useAuthStore();
  const { fetchSession } = useSessionStore();
  const registerMutation = useApiRequest<RegisterFormValues>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`,
    method: "POST",
  });

  const loginMutation = useApiRequest({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/login`,
    method: "POST",
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema_registerForm),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      phone: "",
      birthDate: "",
      statusId: 1,
      roleId: 2,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const { email, password } = data;
    setCredentials(email, password);

    try {
      const registerResult = await registerMutation.mutateAsync({
        ...data,
        statusId: 1,
        roleId: 2,
      });

      toast.success(
        registerResult.message || "Registration successful! Logging in...",
        {
          action: (
            <Button
              onClick={() => toast.dismiss()}
              variant="ghost"
              className="font-bold"
            >
              <X className="h-4 w-4" />
            </Button>
          ),
        }
      );

      const loginResult = await loginMutation.mutateAsync({ email, password });

      if (loginResult.success) {
        await fetchSession(); // 👈 Esto DEBE estar después del login exitoso
        toast.success(loginResult.message || "Login successful!");
        navigate("/app/profile");
      } else {
        toast.error(loginResult.error || "Login failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred during registration or login.");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 justify-start"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
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
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>
    </Form>
  );
};
