"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface MobileMealCardProps {
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
  };
  isCompleted: boolean;
  hasReplacement: boolean;
  replacement?: {
    title: string;
    portion: number;
    calories: number;
    carbs: number;
    fat: number;
    protein: number;
  };
  units: {
    macro: {
      protein: string;
      carbs: string;
      fat: string;
      energy: string;
    };
    portion: string;
  };
  onToggleComplete: () => void;
  onEdit: () => void;
}

export function MobileMealCard({
  meal,
  isCompleted,
  hasReplacement,
  replacement,
  units,
  onToggleComplete,
  onEdit,
}: MobileMealCardProps) {
  return (
    <Card
      className={
        isCompleted ? "text-left" : "bg-red-50 dark:bg-red-950/20 text-left"
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl">{meal.meal}</CardTitle>
            <CardDescription className="font-semibold text-foreground mt-1 text-base">
              {isCompleted || !hasReplacement ? meal.food : replacement!.title}
            </CardDescription>
            <div className="mt-2 space-y-1">
              <Badge className="text-md" variant="outline">
                <span className="font-medium">Portion - </span>{" "}
                {isCompleted || !hasReplacement
                  ? meal.portion
                  : replacement!.portion}
                {units.portion}
              </Badge>
              <Badge className="text-md" variant="outline">
                <span className="font-medium">Calories - </span>{" "}
                {isCompleted || !hasReplacement
                  ? meal.macro.energy
                  : replacement!.calories}
                {units.macro.energy}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-end">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={onToggleComplete}
            />
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div>
          <p className="text-xl font-semibold mb-2">Macros</p>
          <div className="space-y-1 flex flex-col">
            <Badge variant="secondary" className="text-md">
              Protein:{" "}
              {isCompleted || !hasReplacement
                ? meal.macro.protein
                : replacement!.protein}
              {units.macro.protein}
            </Badge>
            <Badge variant="secondary" className="text-md">
              Carbs:{" "}
              {isCompleted || !hasReplacement
                ? meal.macro.carbs
                : replacement!.carbs}
              {units.macro.carbs}
            </Badge>
            <Badge variant="secondary" className="text-md">
              Fats:{" "}
              {isCompleted || !hasReplacement
                ? meal.macro.fat
                : replacement!.fat}
              {units.macro.fat}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
