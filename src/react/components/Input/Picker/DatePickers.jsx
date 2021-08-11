import { useState } from "react";
import Style from "./DatePicker.module.scss";
import { DatePickerBody } from "./Datepicker/DatePickerBody/DatePickerBody";

export const DatePicker = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e) => {
    console.log("lol");
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  return (
    <div className={Style.container}>
      <label forhtml="dataPicker">DATE</label>
      <input
        type="text"
        className="fakeInput"
        placeholder="jj/ mm/ aaaa"
        onClick={handleClick}
      />
      {isVisible && <DatePickerBody />}
    </div>
  );
};
