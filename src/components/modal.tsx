import React, {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  FunctionComponent,
  ReactNode,
} from "react";

import "./modal.css";

import { AiOutlineWarning } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";

import { FormControl, TextArea } from "./create-order";
import { CtaButton } from "./services";
import { useModalContext } from "../context/modal";
import { useStepsValidationContext } from "../context/stepValidation";

const ModalWrapper: FunctionComponent<{
  children?: ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className, id }) => {
  return (
    <Fragment>
      <div className={className} id={id}>
        <div className="modal-contents">
          <div className="modal">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

const ModalForm: FunctionComponent<{
  formLabel: string;
  value: any;
  onChange: ChangeEventHandler;
  message: string;
  onSubmit: FormEventHandler;
  id?: string;
  closeModal: FormEventHandler;
}> = ({ formLabel, value, onChange, message, onSubmit, id, closeModal }) => {
  return (
    <Fragment>
      <ModalWrapper id={id}>
        <form onSubmit={onSubmit}>
          <FormControl label={formLabel} labelClassName={`required`}>
            <TextArea
              value={value}
              onChange={onChange}
              required={true}
            ></TextArea>
          </FormControl>
          <div className="modal-form-btn">
            <CtaButton
              type={`submit`}
              id={`form-modal-button`}
              message={message}
            />
            <CtaButton
              type={`button`}
              id={`modal-cancel-btn`}
              message={`Cancel`}
              onClick={closeModal}
            />
          </div>
        </form>
      </ModalWrapper>
    </Fragment>
  );
};

const SuccessIcon: FunctionComponent = () => {
  return (
    <Fragment>
      <div className="success-icon">
        <i className="success">
          <BiCheck />
        </i>
      </div>
    </Fragment>
  );
};

const WarningIcon: FunctionComponent = () => {
  return (
    <Fragment>
      <div className="warning-icon">
        <i>
          <AiOutlineWarning />
        </i>
      </div>
    </Fragment>
  );
};

const Modal: FunctionComponent<{
  mainMessage: string;
  supportingMessage: string;
  modalIcon?: ReactNode;
  buttonColor?: string;
  onClick?: FormEventHandler;
}> = ({ mainMessage, supportingMessage }) => {
  const { hideModal, modal } = useModalContext() ?? {};
  const { warning } = modal ?? {};
  const { updateValidation } = useStepsValidationContext() ?? {};

  const closeModal = () => {
    updateValidation(true);

    hideModal();
  };

  return (
    <Fragment>
      <ModalWrapper className={`modal-wrapper`} id={`modal-wrap`}>
        <div className="modal-icon">
          {warning ? <WarningIcon /> : <SuccessIcon />}
        </div>
        <h2>{mainMessage}</h2>
        <p>{supportingMessage}</p>
        <button
          onClick={closeModal}
          className={warning ? "warning-btn-color" : "success-btn-color"}
        >
          OK
        </button>
      </ModalWrapper>
    </Fragment>
  );
};
export { ModalForm, WarningIcon, SuccessIcon };
export default Modal;
