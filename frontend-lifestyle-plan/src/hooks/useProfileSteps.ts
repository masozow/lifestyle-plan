import { useTranslation } from "react-i18next";

export const useProfileSteps = ()=>{
    const { t } = useTranslation();
    const steps = [
    {
      name: "unitSystem",
      title: t("profileForm.unitSystem.title"),
      options: [
        { value: "metric", label: t("profileForm.unitSystem.options.metric") },
        { value: "imperial", label: t("profileForm.unitSystem.options.imperial") },
      ],
      defaultValue: "metric",
      type: "radio",
    },
    {
      name: "gender",
      title: t("profileForm.gender.title"),
      options: [
        { value: "female", label: t("profileForm.gender.options.female") },
        { value: "male", label: t("profileForm.gender.options.male") },
      ],
      defaultValue: "female",
      type: "radio",
    },
    {
      name: "weight",
      title: t("profileForm.weight.title"),
      type: "number",
    },
    {
      name: "height",
      title: t("profileForm.height.title"),
      type: "number",
    },
    {
      name: "age",
      title: t("profileForm.age.title"),
      type: "number",
    },
    {
      name: "waist",
      title: t("profileForm.waist.title"),
      type: "number",
    },
    {
      name: "neck",
      title: t("profileForm.neck.title"),
      type: "number",
    },
    {
      name: "hip",
      title: t("profileForm.hip.title"),
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