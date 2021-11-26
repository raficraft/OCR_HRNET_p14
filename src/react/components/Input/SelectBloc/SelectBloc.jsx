import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { validInput } from "./../InputBloc/validInput";
import { RiArrowDownSFill } from "react-icons/ri";
import Style from "./SelectBloc.module.scss";

export const SelectBloc = forwardRef((props, ref) => {
  const { forHtml, label, options = {}, role, format } = props.data;
  const { visible, setVisible, refOutsideClick } = useClickOutside(false);
  const fakeSelectSpan = useRef(null);
  const errorMessage = useRef(null);

  //OnClick to fakeSelect view fake list options
  const handleClick = (event) => {
    setVisible(!visible);
  };

  const changeValueFakeSelect = (evt) => {
    setVisible(!visible);
    const swapValue = evt.target.textContent;
    const swapContainer = fakeSelectSpan.current;
    swapContainer.textContent = swapValue;
    errorMessage.current.textContent = validInput(ref);
  };

  useImperativeHandle(ref, () => ({
    get input() {
      return fakeSelectSpan.current;
    },
    get error() {
      return errorMessage.current;
    },
  }));

  // Construct LI item for UL Parent
  const itemsLi = options.map((opt, index) => {
    const optionsVal = opt.name ? opt.name : opt;
    return (
      <li role={role} key={index} onClick={(evt) => changeValueFakeSelect(evt)}>
        {optionsVal}
      </li>
    );
  });

  console.log("state of Hooks visible in component : ", visible);
  return (
    <div className={Style.input_select}>
      <div>
        <label forhtml={forHtml}>{label}</label>
        <div className={Style.fake_select_container} ref={refOutsideClick}>
          <span
            className={Style.fake_select}
            onClick={handleClick}
            key={label}
            ref={fakeSelectSpan}
            name={forHtml}
            data-format={format}
          >
            Select a {label}
          </span>
          <RiArrowDownSFill className={Style.fake_select_arrow} />
          {visible && <ul className={Style.fake_select_list}>{itemsLi}</ul>}
        </div>
        <span className="error_message_container">
          <p className="error_message" ref={errorMessage}></p>
        </span>
      </div>
    </div>
  );
});
