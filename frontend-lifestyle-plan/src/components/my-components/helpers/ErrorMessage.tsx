import { useTranslation } from "react-i18next";

export const ErrorMessage = ({ message }: { message?: string }) => {
  const { t } = useTranslation();
  return <>{message ? t(message) : null}</>;
};
