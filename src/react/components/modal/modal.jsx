import { createPortal } from "react-dom";

import Style from "./modal.module.scss";
import useGlobalDOMEvents from "./../hooks/useGlobalDOMEvents";

export const ModalBox = ({ onClose }) => {
  useGlobalDOMEvents({
    keyup(ev) {
      if (ev.key === "Escape") {
        onClose();
      }
    },
  });

  return createPortal(
    <section className={Style.modal_container} onClick={onClose}>
      <div className={Style.modal_content}>
        <button type="button" onClick={onClose}>
          Esc
        </button>
        <h1>The employee has been created</h1>

        <p>
          You can click outside of element or press Esc key to close this
          window.
        </p>
      </div>
    </section>,
    document.body
  );
};
