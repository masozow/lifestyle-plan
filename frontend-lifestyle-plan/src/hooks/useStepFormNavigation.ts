import { useEffect, useRef } from "react";

export function useStepFormNavigation({
  currentStep,
  isFinalStep,
  onNext,
  animationDuration = 0.4,
}: {
  currentStep: number;
  isFinalStep: boolean;
  onNext: () => void;
  animationDuration?: number;
}) {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!isFinalStep) {
        onNext();
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentStep === 0 || firstInputRef.current) {
        firstInputRef.current?.focus();
      } else {
        nextButtonRef.current?.focus();
      }
    }, animationDuration * 1000);

    return () => clearTimeout(timeout);
  }, [currentStep, animationDuration]);

  return {
    keyDownHandler,
    firstInputRef,
    nextButtonRef,
  };
}
