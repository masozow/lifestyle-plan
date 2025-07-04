import { TextWaveBase } from "./TextWaveBase";

type Props = {
  textSize?: string;
};

const text = "Loading...";

export const LoadingLoader = ({ textSize }: Props) => {
  return <TextWaveBase textSize={textSize} text={text} />;
};
