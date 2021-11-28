import { GetCalendar } from "../getCalendar";
import { useState, useLayoutEffect } from "react";
import { RiArrowRightSFill, RiArrowLeftSFill } from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import { dayArrayTable } from "../../../../../../js/data/calendarArray";

import Style from "./DatePickerBody.module.scss";

export const DatePickerBody = ({ setInput, inputVal, language }) => {
  const startCalendar = 1900;
  const endCalendar = 2050;

  const datePicker = new GetCalendar(startCalendar, endCalendar, language);
  const calendar = datePicker.calendarArray;

  const currentMonth = datePicker.currentDate.monthName;
  const currentYear = datePicker.currentDate;

  const calendarYear = Object.keys(calendar);
  const monthArray = datePicker.monthArray[language];

  let [currentDate, setCurrentDate] = useState({
    ...datePicker.currentDate,
  });

  //Redifined the monthArray to get the exactly number of day in february
  datePicker.redifineMonthArray(currentDate.year);
  currentDate.monthLengthArray = [...datePicker.monthLengthArray];

  useLayoutEffect(() => {
    if (inputVal) {
      const inputValArray = inputVal.split("/");
      let selectMonth = "";
      let monthKey = "";
      let year = "";
      let date = "";

      switch (language) {
        case "fr":
          date = inputValArray[0];
          monthKey = inputValArray[1] - 1;
          selectMonth = datePicker.getMonthName(monthKey);
          year = inputValArray[2];
          break;
        default:
          //langauge en

          break;
      }

      setCurrentDate({
        ...currentDate,
        monthName: selectMonth,
        month: monthKey,
        year: year,
        date: date,
      });
    }
  }, []);

  //DATEPICKER ENGINE

  const handleChangeMonth = (e) => {
    const selectMonth = e.target.value;
    const monthKey = datePicker.getMonthKeyByName(e.target.value);
    setCurrentDate({ ...currentDate, monthName: selectMonth, month: monthKey });
  };

  const handleChangeYear = (e) => {
    const selectYear = e.target.value;
    setCurrentDate({ ...currentDate, year: parseInt(selectYear) });
  };

  const prevMonth = () => {
    /* const selectMonth = e.target.value;*/
    const newMonthKey = currentDate.month - 1 < 0 ? 11 : currentDate.month - 1;
    const selectMonth = datePicker.getMonthName(newMonthKey);
    const newYear =
      currentDate.month - 1 < 0
        ? currentDate.year - 1 < startCalendar
          ? endCalendar
          : currentDate.year - 1
        : currentDate.year;

    setCurrentDate({
      ...currentDate,
      monthName: selectMonth,
      month: newMonthKey,
      year: newYear,
    });
  };
  const nextMonth = () => {
    const newMonthKey = currentDate.month + 1 > 11 ? 0 : currentDate.month + 1;
    const selectMonth = datePicker.getMonthName(newMonthKey);
    const newYear =
      currentDate.month + 1 > 11
        ? currentDate.year + 1 > endCalendar
          ? startCalendar
          : currentDate.year + 1
        : currentDate.year;

    setCurrentDate({
      ...currentDate,
      monthName: selectMonth,
      month: newMonthKey,
      year: newYear,
    });
  };

  const homeCalendar = () => {
    const month = datePicker.currentDate.month;

    setCurrentDate({
      ...currentDate,
      monthName: datePicker.getMonthName(month),
      month: datePicker.currentDate.month,
      year: datePicker.currentDate.year,
    });
  };

  //INTERNAL COMPONENT

  const createSelectMonth = (months) => {
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
    console.log(calendar[currentDate.year]);
    console.log(currentMonth);
    console.log(calendar[currentDate.year].month[currentMonth]);
    const allWeeks = calendar[currentDate.year].month[currentMonth].weeks;

    return allWeeks.map((week, key) => (
      <tr key={key}>
        {week.map((day, index) =>
          day.date === parseInt(currentDate.date) && day.style === "current" ? (
            <td
              className={Style.currentDay}
              key={index}
              data-fulldate={day.fullDate}
              onClick={() => {
                setInput(day.fullDate);
              }}
            >
              {day.date}
            </td>
          ) : (
            <td
              className={Style[day.style]}
              key={index}
              data-fulldate={day.fullDate}
              onClick={() => {
                setInput(day.fullDate);
              }}
            >
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
