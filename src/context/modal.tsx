import React, {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";

type ModalContextType = {
  displayModal: any;
  hideModal: any;
  modal: { [key: string]: any };
  setModal: any;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalContextProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState({
    showModal: false,
    mainMessage: "",
    supportingMessage: "",
    warning: false,
  });

  // functions to display and close.hide modal
  const displayModal = (warning: boolean, header: string, subtext: string) => {
    setModal({
      ...modal,
      showModal: true,
      warning: warning,
      mainMessage: header,
      supportingMessage: subtext,
    });
  };

  const hideModal = () => {
    setModal({
      ...modal,
      showModal: false,
      warning: false,
      mainMessage: "",
      supportingMessage: "",
    });
  };
  // end of the two functions

  return (
    <ModalContext.Provider value={{ displayModal, hideModal, modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
export { useModalContext };

export default ModalContextProvider;
