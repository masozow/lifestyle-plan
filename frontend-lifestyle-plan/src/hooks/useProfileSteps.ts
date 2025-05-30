import { useTranslation } from "react-i18next";

export const useProfileSteps = ()=>{
    const { t } = useTranslation();
    const steps = [
    {
      name: "unitSystem",
      title: t("profileForm.unitSystem.title"),
      options: [
        { value: "metric", label: t("profileForm.unitSystem.metric") },
        { value: "imperial", label: t("profileForm.unitSystem.imperial") },
      ],
      defaultValue: "metric",
      type: "radio",
    },
    {
      name: "gender",
      title: t("profileForm.gender.title"),
      options: [
        { value: "female", label: t("profileForm.gender.female") },
        { value: "male", label: t("profileForm.gender.male") },
      ],
      defaultValue: "female",
      type: "radio",
    },
    {
      name: "weight",
      title: t("profileForm.weight"),
      type: "number",
    },
    {
      name: "height",
      title: t("profileForm.height"),
      type: "number",
    },
    {
      name: "age",
      title: t("profileForm.age"),
      type: "number",
    },
    {
      name: "waist",
      title: t("profileForm.waist"),
      type: "number",
    },
    {
      name: "neck",
      title: t("profileForm.neck"),
      type: "number",
    },
    {
      name: "hip",
      title: t("profileForm.hip"),
      type: "number",
      optional: true,
    },
  ];
   const getDefaultValues = () => {
  return steps.reduce((acc: { [key: string]: any }, step) => {
    if (step.defaultValue !== undefined) {
      acc[step.name] = step.defaultValue;
    }
    return acc;
  }, {});
};
  return {steps, getDefaultValues};
}