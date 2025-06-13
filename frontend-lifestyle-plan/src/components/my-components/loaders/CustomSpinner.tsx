import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface Props {
  message?: string;
  className?: string;
}

export const CustomSpinner = ({ message, className }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Spinner className={cn("text-2xl", className)}>
        <span className={cn("text-2xl", className)}>{message}</span>
      </Spinner>
    </div>
  );
};
