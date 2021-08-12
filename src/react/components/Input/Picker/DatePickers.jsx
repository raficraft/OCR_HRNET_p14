import { useRef, forwardRef, useImperativeHandle } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { DatePickerBody } from "./Datepicker/DatePickerBody/DatePickerBody";
import Style from "./DatePicker.module.scss";

export const DatePicker = forwardRef((props, ref) => {
  const { label, forHtml, format } = props.data;
  const { visible, setVisible, refOutsideClick } = useClickOutside(false);

  const inputDate = useRef(false);
  const errorMessage = useRef(null);
  const language = "fr";

  const placeholder = languager === "fr" ? "jj/ mm/ aaaa" : "mm/ jj/ aaaa";

  const handleClick = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  const setInput = (fullDate) => {
    inputDate.current.value = fullDate;
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputDate.current.focus();
    },
    get input() {
      return inputDate.current;
    },
    get error() {
      return errorMessage.current;
    },
  }));

  return (
    <div className={Style.container} ref={refOutsideClick}>
      <label forhtml={forHtml}>{label}</label>
      <input
        type="text"
        className="fakeInput"
        placeholder={placeholder}
        onClick={handleClick}
        ref={inputDate}
        name={forHtml}
        id={forHtml}
        data-format={format}
      />
      <span className="error_message_container">
        <p className="error_message" ref={errorMessage}></p>
      </span>
      {visible && (
        <DatePickerBody
          setInput={setInput}
          inputVal={inputDate.current.value}
          language={language}
        />
      )}
    </div>
  );
});
