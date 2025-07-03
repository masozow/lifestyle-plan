import { type FC, type CSSProperties, type JSX } from "react";
import Lottie from "lottie-react";
import animationData from "../../../assets/neural_network_animation/Animation - 1750341965101/animations/2108a7df-c6b7-424a-89cf-bd7d28bf1543.json";
interface Props {
  loop?: boolean;
  autoplay?: boolean;
  style?: CSSProperties;
  onComplete?: () => void;
}

export const NeuralNetworkLoader: FC<Props> = ({
  loop = true,
  autoplay = true,
  style,
  onComplete,
}: Props): JSX.Element => {
  return (
    <div style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={style}
        onComplete={onComplete}
      />
    </div>
  );
};
