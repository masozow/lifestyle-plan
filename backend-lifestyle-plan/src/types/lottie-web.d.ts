declare module "lottie-web" {
  export interface AnimationItem {
    play(): void;
    stop(): void;
    goToAndStop(value: number, isFrame?: boolean): void;
    goToAndPlay(value: number, isFrame?: boolean): void;
    setSpeed(speed: number): void;
    setDirection(direction: number): void;
    playSegments(segments: number[] | [number, number], forceFlag?: boolean): void;
    destroy(): void;

  }
}
