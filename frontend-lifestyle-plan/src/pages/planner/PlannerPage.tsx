// import GoalForm from "@/components/my-components/forms/GoalForm";
import { PlannerForm } from "@/components";

const PlannerPage = () => {
  // const handleGoalsSubmit = (goals: any) => {
  //   console.log("Goals received:", goals);
  //   // Here you can call an AI or generate a plan with static logic
  // };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold">What are your goals?</h2>
      <PlannerForm />
    </div>
  );
};
export default PlannerPage;
