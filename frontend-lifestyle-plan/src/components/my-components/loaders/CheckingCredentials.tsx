import { TextWaveBase } from "./TextWaveBase";

type Props = {
  textSize?: string;
};

const text = "Checking credentials";

export const CheckingCredentialsLoader = ({ textSize }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full m-auto">
      <TextWaveBase textSize={textSize} text={text} />;
    </div>
  );
};
