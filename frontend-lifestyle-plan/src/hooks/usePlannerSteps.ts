import { useTranslation } from "react-i18next";


export const usePlannerSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      name: "objective",
      title: t("plannerForm.objective"),
      options: [
        { value: "lose-fat", label: t("plannerForm.options.objective.lose-fat") },
        { value: "gain-muscle", label: t("plannerForm.options.objective.gain-muscle") },
        { value: "maintain-weight", label: t("plannerForm.options.objective.maintain-weight") },
      ],
      defaultValue: "lose-fat",
      type: "radio",
    },
    {
      name: "restriction",
      title: t("plannerForm.restriction"),
      options: [
        { value: "none", label: t("plannerForm.options.restriction.none") },
        { value: "vegetarian", label: t("plannerForm.options.restriction.vegetarian") },
        { value: "gluten-free", label: t("plannerForm.options.restriction.gluten-free") },
        { value: "dairy-free", label: t("plannerForm.options.restriction.dairy-free") },
      ],
      defaultValue: "none",
      type: "radio",
    },
    {
      name: "preference",
      title: t("plannerForm.preference"),
      options: [
        { value: "latin", label: t("plannerForm.options.preference.latin") },
        { value: "mediterranean", label: t("plannerForm.options.preference.mediterranean") },
        { value: "asian", label: t("plannerForm.options.preference.asian") },
        { value: "high-protein", label: t("plannerForm.options.preference.high-protein") },
      ],
      defaultValue: "latin",
      type: "radio",
    },
    {
      name: "extras",
      title: t("plannerForm.extras"),
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