import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/hooks";
import { availableLocales, type LocaleCode } from "@/locales/localesTypes";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useTranslation } from "react-i18next";

export const LanguageMenu = () => {
  const { locale, changeLocale } = useLocale();
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-left">
        <Button variant="ghost" className="text-left font-bold">
          {t("navBar.languageMenu")}
          {": "}
          {availableLocales[locale as LocaleCode] || locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.entries(availableLocales).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => changeLocale(code as LocaleCode)}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
