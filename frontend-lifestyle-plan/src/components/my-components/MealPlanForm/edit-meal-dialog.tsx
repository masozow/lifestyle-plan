import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Meal } from "@/types/openAIPlan";
import {
  schema_replacementMeal,
  type ReplacementMealFormValues,
} from "@/schemas";
import { CustomNumberInput } from "@/components";
import { Input } from "@/components/ui/input";

interface EditMealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReplacementMealFormValues) => void;
  meal: Meal | null;
  units: {
    macro: {
      protein: string;
      carbs: string;
      fat: string;
      energy: string;
    };
    portion: string;
  };
}

export const EditMealDialog = ({
  isOpen,
  onClose,
  onSave,
  meal,
  units,
}: EditMealDialogProps) => {
  const form = useForm<ReplacementMealFormValues>({
    resolver: zodResolver(schema_replacementMeal),
    defaultValues: {
      id: 0,
      day: "",
      date: "",
      meal: "",
      userDailyMealId: 0,
      food: "",
      portion: 0,
      macro: {
        protein: 0,
        carbs: 0,
        fat: 0,
        energy: 0,
      },
      consumed: false,
      isIntake: false,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  //  Reset form when a new meal is passed in
  useEffect(() => {
    if (meal && typeof meal.food === "string" && meal.food.trim().length > 0) {
      reset({
        id: 0,
        day: meal.day,
        date: meal.date,
        meal: meal.meal,
        userDailyMealId: meal.id,
        food: meal.food,
        portion: meal.portion,
        macro: {
          protein: meal.macro.protein,
          carbs: meal.macro.carbs,
          fat: meal.macro.fat,
          energy: meal.macro.energy,
        },
        consumed: meal.consumed,
        isIntake: meal.intake?.isIntake,
      });
    }
  }, [meal, reset]);

  const handleClose = () => {
    reset(form.getValues());
    onClose();
  };

  const handleSave = (data: ReplacementMealFormValues) => {
    if (!meal) return;

    const finalPayload = {
      ...data,
      day: meal.day,
      date: meal.date,
      meal: meal.meal,
      userDailyMealId: meal.id,
      consumed: true,
    };

    console.log("Saving data in the dialog:", finalPayload);
    onSave(finalPayload);
    reset();
  };

  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      setTimeout(() => {
        titleRef.current?.focus();
        titleRef.current?.select();
      }, 0);
    }
  }, [isOpen]);

  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[100vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit meal replacement for {meal.meal}</DialogTitle>
          <DialogDescription>
            Modify the meal details below to track your actual intake.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSave)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Meal title */}
          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="food"
              className="text-md sm:text-2xl text-left mb-4 font-semibold"
            >
              Meal title
            </Label>
            <Controller
              name="food"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="food"
                  type="text"
                  placeholder="e.g., Chicken wrap"
                  className="w-full px-4 py-2"
                  ref={titleRef}
                  onFocus={(e) => e.target.select()}
                />
              )}
            />
            {errors.food && (
              <p className="text-sm text-destructive">{errors.food.message}</p>
            )}
          </div>

          {/* Portion */}
          <CustomNumberInput<ReplacementMealFormValues>
            control={control}
            name="portion"
            label="Portion"
            unit={units.portion}
            error={errors.portion}
            autoFocus={false}
          />

          {/* Energy */}
          <CustomNumberInput<ReplacementMealFormValues>
            control={control}
            name="macro.energy"
            label="Energy"
            unit={units.macro.energy}
            error={errors.macro?.energy}
            autoFocus={false}
          />

          {/* Protein */}
          <CustomNumberInput<ReplacementMealFormValues>
            control={control}
            name="macro.protein"
            label="Protein"
            unit={units.macro.protein}
            error={errors.macro?.protein}
            autoFocus={false}
          />

          {/* Carbs */}
          <CustomNumberInput<ReplacementMealFormValues>
            control={control}
            name="macro.carbs"
            label="Carbs"
            unit={units.macro.carbs}
            error={errors.macro?.carbs}
            autoFocus={false}
          />

          {/* Fats */}
          <CustomNumberInput<ReplacementMealFormValues>
            control={control}
            name="macro.fat"
            label="Fats"
            unit={units.macro.fat}
            error={errors.macro?.fat}
            autoFocus={false}
          />

          <div className="md:col-span-2 flex gap-2 pt-4">
            <Button type="submit" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Save Replacement
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
