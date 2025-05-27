// import GoalForm from "@/components/my-components/forms/GoalForm";
import { PlannerForm } from "@/components";
import type { PlannerFormValues } from "@/schemas";
import { useState } from "react";

const PlannerPage = () => {
  const [plan, setPlan] = useState<PlannerFormValues | null>(null);
  const [formTitle, setFormTitle] = useState("What are your goals?");
  const onSubmit = async (data: PlannerFormValues) => {
    setPlan(data);
    console.log("Data: ", data);
  };
  const handleFormTitleChange = (title: string = "Review your plan") => {
    console.log("Title: ", title);
    setFormTitle(title);
  };
  return (
    <div className="max-w-xl mx-auto mt-4">
      <h2 className="text-3xl font-bold tracking-wider mx-auto p-4">
        {formTitle}
      </h2>
      <PlannerForm
        submitFunction={onSubmit}
        plan={plan}
        titleChangeFunction={handleFormTitleChange}
      />
    </div>
  );
};
export default PlannerPage;
