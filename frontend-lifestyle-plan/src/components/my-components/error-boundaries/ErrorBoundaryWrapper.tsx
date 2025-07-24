import { ErrorBoundary } from "react-error-boundary";
import ComponentError from "@/components/my-components/error-boundaries/ComponentError";
import { useRef, type ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export const ErrorBoundaryWrapper = ({ children }: Props) => {
  const resetCountRef = useRef(0);
  return (
    <ErrorBoundary
      fallbackRender={(props) => <ComponentError {...props} />}
      onReset={() => {
        resetCountRef.current += 1;
        if (resetCountRef.current >= 2) {
          window.location.reload();
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
