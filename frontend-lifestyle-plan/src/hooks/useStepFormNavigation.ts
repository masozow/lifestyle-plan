import { useEffect, useRef } from "react";

interface Props{
  currentStep: number;
  isFinalStep: boolean;
  onNext: () => void;
  animationDuration?: number;
}
export const useStepFormNavigation=({
  currentStep,
  isFinalStep,
  onNext,
  animationDuration = 0.4,
}: Props) =>{
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      if (!isFinalStep) {
        event.preventDefault();
        onNext();
      } else {
        // event.preventDefault();
        formRef.current?.requestSubmit();
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
    formRef,
  };
}
