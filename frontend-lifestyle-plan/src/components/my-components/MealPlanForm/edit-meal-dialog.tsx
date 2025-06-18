import { useForm } from "react-hook-form";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ReplacementMeal } from "@/store";

interface EditMealDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReplacementMeal) => void;
  meal: {
    meal: string;
    food: string;
    portion: number;
    macro: {
      protein: number;
      carbs: number;
      fat: number;
      energy: number;
    };
  } | null;
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
  const { register, handleSubmit, reset } = useForm<ReplacementMeal>();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = (data: ReplacementMeal) => {
    onSave(data);
    reset();
  };

  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px]">
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
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Meal title</Label>
            <Input
              id="title"
              placeholder="e.g., Mixed salad"
              {...register("consumedFood", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="portion">Portion ({units.portion})</Label>
            <Input
              id="portion"
              type="number"
              placeholder="300"
              {...register("consumedPortion", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="calories">Energy ({units.macro.energy})</Label>
            <Input
              id="calories"
              type="number"
              placeholder="400"
              {...register("consumedEnergy", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="protein">Protein ({units.macro.protein})</Label>
            <Input
              id="protein"
              type="number"
              placeholder="25"
              {...register("consumedProtein", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carbs">Carbs ({units.macro.carbs})</Label>
            <Input
              id="carbs"
              type="number"
              placeholder="30"
              {...register("consumedCarbs", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fat">Fats ({units.macro.fat})</Label>
            <Input
              id="fat"
              type="number"
              placeholder="15"
              {...register("consumedFat", {
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
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
