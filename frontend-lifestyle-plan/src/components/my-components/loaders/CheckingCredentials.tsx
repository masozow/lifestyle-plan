import { cn } from "@/lib/utils";

type Props = {
  textSize?: string;
};

export const CheckingCredentialsLoader = ({ textSize }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full m-auto">
      <p className={cn("text-2xl", textSize)}>Checking credentials</p>
    </div>
  );
};
