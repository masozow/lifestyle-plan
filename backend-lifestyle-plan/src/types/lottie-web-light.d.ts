declare module "lottie-web/build/player/lottie_light.min.js" {
  import type { AnimationItem } from "lottie-web";

  export interface AnimationConfig {
    container: Element;
    renderer?: "svg" | "canvas" | "html";
    loop?: boolean;
    autoplay?: boolean;
    animationData: any;
    rendererSettings?: object;
  }

  export interface LottieLight {
    loadAnimation: (params: AnimationConfig) => AnimationItem;
    destroy?: () => void;
  }

  const lottie: LottieLight;
  export default lottie;
}
