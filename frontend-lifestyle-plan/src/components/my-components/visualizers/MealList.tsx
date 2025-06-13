import { useEffect, useState } from "react";

export const MealList = () => {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/meals", { credentials: "include" })
      .then((res) => res.json())
      .then(setMeals);
  }, []);

  return (
    <ul className="mt-4 space-y-2">
      {meals.map((meal) => (
        <li key={meal.id} className="border p-2 rounded">
          <strong>{meal.meal_type}</strong> - {meal.description} (
          {meal.calories} kcal)
        </li>
      ))}
    </ul>
  );
};
