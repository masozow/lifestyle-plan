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
import { useEffect } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const navigate = useNavigate();

  const registerMutation = useApiRequest<RegisterFormValues>({
    url: `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`,
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

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      ...data,
      statusId: 1,
      roleId: 2,
    });
  };

  useEffect(() => {
    if (registerMutation.isSuccess) {
      navigate("/login");
      toast.success(registerMutation.data.message);
    } else if (registerMutation.isError) {
      toast.error(registerMutation.error.message);
    }
  }, [
    registerMutation.isSuccess,
    registerMutation.isError,
    navigate,
    registerMutation.data.message,
    registerMutation?.error?.message,
  ]);

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

        {registerMutation.isError && (
          <p className="text-sm text-red-600 text-center">
            {registerMutation.error.message}
          </p>
        )}

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
