import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Style from "./InputBloc.module.scss";
import { validInput } from "./validInput";
import { debounce } from "./../../../../js/tools/utils";

//forwardRef => pass refs from child to parent
export let InputBloc = forwardRef((props, ref) => {
  const { forHtml, label, type, placeholder = null, format } = props.data;

  const inputRef = useRef();
  const errorMessage = useRef(null);

  const controlCapture = debounce(() => {
    console.log("control capture");
    errorMessage.current.textContent = validInput(ref);
  }, 300);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    get input() {
      return inputRef.current;
    },
    get error() {
      return errorMessage.current;
    },
  }));

  console.log("render");

  return (
    <div className={Style.input_bloc}>
      <label forhtml={forHtml}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={forHtml}
        id={forHtml}
        ref={inputRef}
        data-format={format}
        onKeyUp={controlCapture}
      />
      <span className="error_message_container">
        <p className="error_message" ref={errorMessage}></p>
      </span>
    </div>
  );
});

//InputBloc = forwardRef(InputBloc);
