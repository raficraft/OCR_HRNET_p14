import { GetCalendar } from "../getCalendar";
import { useState } from "react";
import { RiArrowRightSFill, RiArrowLeftSFill } from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import Style from "./DatePickerBody.module.scss";
import { dayArrayTable } from "../../../../../../js/data/calendarArray";

export const DatePickerBody = () => {
  const language = "fr";
  const startCalendar = 2020;
  const endCalendar = 2022;

  const datePicker = new GetCalendar(startCalendar, endCalendar, language);
  const calendar = datePicker.calendarArray;

  const currentMonth = datePicker.currentDate.monthName;
  const currentYear = datePicker.currentDate.year;

  console.log(calendar);

  const calendarYear = Object.keys(calendar);
  const monthArray = datePicker.monthArray[language];

  let [currentDate, setCurrentDate] = useState({
    ...datePicker.currentDate,
  });

  //Redifined the monthArray to get the exactly number of day in february
  datePicker.redifineMonthArray(currentDate.year);
  currentDate.monthLengthArray = [...datePicker.monthLengthArray];

  const handleChangeMonth = (e) => {
    const selectMonth = e.target.value;
    const monthKey = datePicker.getMonthKeyByName(e.target.value);
    setCurrentDate({ ...currentDate, monthName: selectMonth, month: monthKey });
  };

  const handleChangeYear = (e) => {
    const selectYear = e.target.value;
    setCurrentDate({ ...currentDate, year: parseInt(selectYear) });
  };

  //DATEPICKER ENGINE

  const prevMonth = () => {
    console.log("click prev");

    /* const selectMonth = e.target.value;*/
    const newMonthKey = currentDate.month - 1 < 0 ? 11 : currentDate.month - 1;
    const selectMonth = datePicker.getMonthName(newMonthKey);
    const newYear =
      currentDate.month - 1 < 0 ? currentDate.year - 1 : currentDate.year;

    setCurrentDate({
      ...currentDate,
      monthName: selectMonth,
      month: newMonthKey,
      year: newYear,
    });
  };
  const nextMonth = () => {
    console.log("click next");
    /* const selectMonth = e.target.value;*/
    const newMonthKey = currentDate.month + 1 > 11 ? 0 : currentDate.month + 1;
    const selectMonth = datePicker.getMonthName(newMonthKey);
    const newYear =
      currentDate.month + 1 > 11 ? currentDate.year + 1 : currentDate.year;

    setCurrentDate({
      ...currentDate,
      monthName: selectMonth,
      month: newMonthKey,
      year: newYear,
    });
  };

  const homeCalendar = () => {
    console.log(currentMonth);

    const month = datePicker.currentDate.month;
    datePicker.getMonthName(month);

    setCurrentDate({
      ...currentDate,
      monthName: datePicker.getMonthName(month),
      month: month,
      year: currentYear,
    });
  };

  //INTERNAL COMPONENT

  const createSelectMonth = (months) => {
    console.log(currentDate.monthName);
    return (
      <select value={currentDate.monthName.name} onChange={handleChangeMonth}>
        {months.map((month, index) => {
          return (
            <option value={month.name} key={index}>
              {month.name}
            </option>
          );
        })}
      </select>
    );
  };

  const createSelectYear = (years) => {
    return (
      <select value={currentDate.year} onChange={handleChangeYear}>
        {years.map((year, index) => {
          return (
            <option value={year} key={index}>
              {year}
            </option>
          );
        })}
      </select>
    );
  };

  const createHeadCurrentCalendar = () => {
    return dayArrayTable[language].map((item, index) => {
      return <th key={index}>{item.abbr}</th>;
    });
  };

  const createBodyCurrentCalendar = () => {
    const allWeeks = calendar[currentDate.year].month[currentDate.month].weeks;

    return allWeeks.map((week, key) => (
      <tr key={key}>
        {week.map((day, index) =>
          day.date === currentDate.date ? (
            <td className={Style.currentDay} key={index}>
              {day.date}
            </td>
          ) : (
            <td className={Style[day.style]} key={index}>
              {day.date}
            </td>
          )
        )}
      </tr>
    ));
  };

  const currentCalendar = () => {
    return (
      <table>
        <thead>
          <tr>{createHeadCurrentCalendar()}</tr>
        </thead>
        <tbody>{createBodyCurrentCalendar()}</tbody>
      </table>
    );
  };

  console.log("render", currentDate);

  return (
    <div className={Style.container}>
      <div className={Style.carousel}>
        <header className={Style.head}>
          <RiArrowLeftSFill
            onClick={prevMonth}
            className={Style.btn_carousel}
          />
          <VscHome onClick={homeCalendar} />
          {createSelectMonth(monthArray) /*Select Month*/}
          {createSelectYear(calendarYear) /*Select year*/}
          <RiArrowRightSFill
            onClick={nextMonth}
            className={Style.btn_carousel}
          />
        </header>
        <div className={Style.carousel_container}>{currentCalendar()}</div>
      </div>
    </div>
  );
};
