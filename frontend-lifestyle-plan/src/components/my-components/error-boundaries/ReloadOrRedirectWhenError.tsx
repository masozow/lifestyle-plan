import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

interface Props {
  url: string;
  translationKey: string;
  message?: string;
}

const ReloadOrRedirectWhenError = ({ url, translationKey, message }: Props) => {
  const { t } = useTranslation();
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <div className="flex gap-2 w-full flex-wrap justify-between border border-red-500 border-dashed rounded-md p-4 mx-auto">
      <h1>
        {message
          ? `Error: ` + message
          : t(`errorBoundaries.reloadOrRedirect.${translationKey}.title`)}
      </h1>
      <div className="flex flex-wrap justify-between gap-4">
        <Button asChild variant="secondary">
          <NavLink to={url}>
            {t(
              `errorBoundaries.reloadOrRedirect.${translationKey}.buttonSecondary`
            )}
          </NavLink>
        </Button>
        <Button className="cursor-pointer" onClick={handleReload}>
          {t(
            `errorBoundaries.reloadOrRedirect.${translationKey}.buttonPrimary`
          )}
        </Button>
      </div>
    </div>
  );
};

export default ReloadOrRedirectWhenError;
