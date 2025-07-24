import { useEffect, useRef } from "react";
import animationData from "../../../assets/neural_network_animation/Animation - 1750341965101/animations/2108a7df-c6b7-424a-89cf-bd7d28bf1543.json";

import lottie from "lottie-web/build/player/lottie_light";

interface Props {
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export const NeuralNetworkLoader = ({
  loop = true,
  autoplay = true,
  style,
  onComplete,
}: Props) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop,
      autoplay,
      animationData,
    });

    if (onComplete) {
      animation.addEventListener("complete", onComplete);
    }

    return () => {
      animation.destroy();
    };
  }, [loop, autoplay, onComplete]);

  return <div ref={container} style={style} />;
};
