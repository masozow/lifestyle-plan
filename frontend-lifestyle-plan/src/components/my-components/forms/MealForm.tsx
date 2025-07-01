import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const schema = z.object({
  date: z.string(),
  meal_type: z.enum(["desayuno", "almuerzo", "cena", "snack"]),
  description: z.string().min(2),
  calories: z.coerce.number().min(0),
});

type MealFormType = z.infer<typeof schema>;

export const MealForm = ({ onAdd }: { onAdd: () => void }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm<MealFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: MealFormType) => {
    const res = await fetch("http://localhost:3001/api/meals", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      onAdd();
      reset();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Input type="date" {...register("date")} />
      <Input
        placeholder="desayuno | almuerzo | cena | snack"
        {...register("meal_type")}
      />
      <Input placeholder="Descripción" {...register("description")} />
      <Input type="number" placeholder="Calorías" {...register("calories")} />
      <Button type="submit">Registrar comida</Button>
    </motion.form>
  );
};
