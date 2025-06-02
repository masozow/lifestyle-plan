import { useTranslation } from "react-i18next";


export const usePlannerSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      name: "objective",
      title: t("plannerForm.objective.title"),
      options: [
        { value: "lose-fat", label: t("plannerForm.objective.options.lose-fat") },
        { value: "gain-muscle", label: t("plannerForm.objective.options.gain-muscle") },
        { value: "maintain-weight", label: t("plannerForm.objective.options.maintain-weight") },
      ],
      defaultValue: "lose-fat",
      type: "radio",
    },
    {
      name: "restriction",
      title: t("plannerForm.restriction.title"),
      options: [
        { value: "none", label: t("plannerForm.restriction.options.none") },
        { value: "vegetarian", label: t("plannerForm.restriction.options.vegetarian") },
        { value: "gluten-free", label: t("plannerForm.restriction.options.gluten-free") },
        { value: "dairy-free", label: t("plannerForm.restriction.options.dairy-free") },
      ],
      defaultValue: "none",
      type: "radio",
    },
    {
      name: "preference",
      title: t("plannerForm.preference.title"),
      options: [
        { value: "latin", label: t("plannerForm.preference.options.latin") },
        { value: "mediterranean", label: t("plannerForm.preference.options.mediterranean") },
        { value: "asian", label: t("plannerForm.preference.options.asian") },
        { value: "high-protein", label: t("plannerForm.preference.options.high-protein") },
      ],
      defaultValue: "latin",
      type: "radio",
    },
    {
      name: "extras",
      title: t("plannerForm.extras.title"),
      type: "textarea",
      optional: true
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
};