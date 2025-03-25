import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

type StepsValidationType = {
  isValid: boolean;
  message: string;
  updateValidation: any;
};
const StepsValidationContext = createContext<StepsValidationType | undefined>(
  undefined
);

const useStepsValidationContext = () => {
  return useContext(StepsValidationContext);
};

const StepsValidationProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [navigateToNextStep, setNavigateToNextStep] = useState({
    isValid: true,
    message: "",
  });

  const updateValidation = (status: boolean, message: string) => {
    setNavigateToNextStep({
      ...navigateToNextStep,
      isValid: status,
      message: message,
    });
  };

  const { isValid, message } = navigateToNextStep;

  return (
    <StepsValidationContext.Provider
      value={{ isValid, message, updateValidation }}
    >
      {children}
    </StepsValidationContext.Provider>
  );
};

export { useStepsValidationContext };
export default StepsValidationProvider;
