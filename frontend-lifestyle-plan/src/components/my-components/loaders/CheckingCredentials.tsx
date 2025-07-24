import { TextWaveBase } from "./TextWaveBase";

type Props = {
  textSize?: string;
};

const text = "Checking credentials";

export const CheckingCredentialsLoader = ({ textSize }: Props) => {
  return <TextWaveBase textSize={textSize} text={text} />;
};
