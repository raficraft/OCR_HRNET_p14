import { createPortal } from "react-dom";

import Style from "./modal.module.scss";

export const ModalBox = ({ onClose }) => {
  return createPortal(
    <section className={Style.modal_container} onClick={onClose}>
      <div className={Style.modal_content}>
        <button type="button" className="close_btn" onClick={onClose}>
          close
        </button>
        <h1>Employee Created</h1>
      </div>
    </section>,
    document.body
  );
};
