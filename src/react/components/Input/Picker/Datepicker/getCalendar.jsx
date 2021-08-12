import { dayArray, monthArray } from "../../../../../js/data/calendarArray";

export class GetCalendar {
  constructor(startCalendar, endCalendar, format) {
    // console.log("constructor du datePicker");

    this.monthArray = monthArray;
    this.dayArray = dayArray;

    this.startCalendar = startCalendar;
    this.endCalendar = endCalendar;

    //Exemple Samedi 10 juillet 2021
    this.format = format;
    this.date = new Date();
    this.currentDate = {
      day: this.date.getDay(), // 6éme jour de la semaine [0] === dimanche
      date: this.date.getDate(), // jour du mois 10
      month: this.date.getMonth(), // 6éme mois de l'année juillet [0] === janvier
      year: this.date.getFullYear(), //2021

      dayName: this.getDayName(this.date.getDay()), //samedi
      monthName: this.getMonthName(this.date.getMonth()), // juillet
      leapYear: this.isleapYear(this.date.getFullYear()),
      numberDayOfThisYear: this.getNumberDayOfYear(
        this.isleapYear(this.date.getFullYear())
      ),
    };
    /*
    console.log(this.date.getMonth());
    console.log(typeof this.date.getMonth());
    console.log(this.getMonthName(11));
*/
    this.numberOfDays = 7;
    this.numberOfWeeks = 5;
    this.monthLengthArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const terminalDateByCurrentDay = this.getTerminalDayByReferenceDate(
      this.currentDate.month,
      this.currentDate.date,
      this.currentDate.year,
      this.currentDate.day
    );

    //Create Array containe all year for this Calendar
    this.calendarArray = this.createCalendarArray();

    //Define terminal date in calendarArray with the current year
    this.calendarArray[this.currentDate.year] = terminalDateByCurrentDay;
    this.createCalendarTerminal(this.calendarArray);
    this.createMonthCalendar(this.calendarArray);

    this.calendarArray["day"] = this.dayArray[this.format];
    this.calendarArray["month"] = this.monthArray[this.format];
  }

  getMonthName(month) {
    return this.monthArray[this.format][month];
  }

  getMonthKeyByName(val) {
    console.log("test", val, this.format);

    let searchKey = 0;
    for (const [key, value] of Object.entries(this.monthArray[this.format])) {
      if (value.name === val) {
        searchKey = key;
      }
    }
    return searchKey;
  }

  getDayName(day) {
    return this.dayArray[this.format][day];
  }

  getFullDateWithName() {
    // Samedi 10 juillet 2021
    if (this.format === "fr") {
      return `${this.currentDate.dayName.name} ${this.currentDate.date} ${this.currentDate.monthName.name} ${this.currentDate.year}`;
    } else if (this.format === "en") {
      return `${this.currentDate.monthName.name} ${this.currentDate.date} ${this.currentDate.dayName.name} ${this.currentDate.year}`;
    }
  }

  getFullDateWithAbbr() {
    // Sam 10 juil 2021
    if (this.format === "fr") {
      return `${this.currentDate.dayName.abbr} ${this.currentDate.date} ${this.currentDate.monthName.abbr} ${this.currentDate.year}`;
    } else if (this.format === "en") {
      return `${this.currentDate.monthName.abbr} ${this.currentDate.date} ${this.currentDate.dayName.abbr} ${this.currentDate.year}`;
    }
  }

  getFullDateFormated(day, month, year) {
    switch (this.format) {
      case "en":
        return `${month}/${day}/${year}`;
      case "fr":
        return `${day}/${month}/${year}`;
      default:
        return;
    }
  }

  isleapYear(year) {
    return year % 4 ? false : true;
  }

  getNumberDayOfYear(leapYear) {
    return leapYear ? 366 : 365;
  }
  getFebruaryLength(leapYear) {
    return leapYear ? 29 : 28;
  }

  redifineMonthArray(year) {
    this.monthLengthArray[1] = this.getFebruaryLength(this.isleapYear(year));
  }

  calculateAnnuelTerminal() {}

  calculateThisMonth(month, date, year) {
    let thismonthArray = 0;
    console.log(`month : ${month} , date : ${date} , year ${year}`);
    if (month === 1) {
      console.log("on gère le mois de février");
    }

    thismonthArray = this.monthArray[month];
    console.log("durée du mois en cours", thismonthArray);
    const restOfDay = date % 7;
    console.log(restOfDay);
  }

  getTerminalDayByReferenceDate(month, date, year, day) {
    this.redifineMonthArray(year);

    const monthBeforeThisDate = this.monthLengthArray.slice(0, month);

    //number of days since the beginning of the year by contribution to the current date
    const totalDay =
      monthBeforeThisDate.reduce((acc, curr, index) => {
        return acc + curr;
      }, 0) + date;

    const isleapYear = this.isleapYear(year);

    //Calculate First Day of the current Year

    const firstDayOffset = day - ((totalDay % 7) - 1);
    let keyToFirstDayOfThisYear =
      firstDayOffset < 0 ? 6 + firstDayOffset + 1 : firstDayOffset;

    //Calculate last Day of the current year
    const yearLength = this.getNumberDayOfYear(this.isleapYear(year));
    const lastDayOffset = yearLength % 7;
    let keyToLastDayOfThisYear =
      keyToFirstDayOfThisYear + lastDayOffset - 1 > 6
        ? 0
        : keyToFirstDayOfThisYear + lastDayOffset - 1;

    const lastDayOfPrevYear = this.getPrevDayKey(keyToFirstDayOfThisYear);
    const firstDayOfNextYear = this.getNextDayKey(keyToLastDayOfThisYear);

    return {
      yearInfo: {
        lastDayPrevYear: {
          key: lastDayOfPrevYear,
          year: year - 1,
          name: this.getDayNameByKey(lastDayOfPrevYear).name,
          abbr: this.getDayNameByKey(lastDayOfPrevYear).abbr,
          date: 31,
          month: this.getMonthName(11),
        },
        firstDay: {
          key: keyToFirstDayOfThisYear,
          year,
          name: this.getDayNameByKey(keyToFirstDayOfThisYear).name,
          abbr: this.getDayNameByKey(keyToFirstDayOfThisYear).abbr,
          date: 1,
          month: this.getMonthName(0),
        },
        lastDay: {
          key: keyToLastDayOfThisYear,
          year,
          name: this.getDayNameByKey(keyToLastDayOfThisYear).name,
          abbr: this.getDayNameByKey(keyToLastDayOfThisYear).abbr,
          date: 31,
          month: this.getMonthName(11),
        },
        firstDayNextYear: {
          key: firstDayOfNextYear,
          year: year + 1,
          name: this.getDayNameByKey(firstDayOfNextYear).name,
          abbr: this.getDayNameByKey(firstDayOfNextYear).abbr,
          date: 1,
          month: this.getMonthName(0),
        },
        isleapYear,
      },
    };
  }

  getDayNameByKey(key) {
    return this.dayArray[this.format][key];
  }

  getPrevDayKey(key) {
    return key - 1 < 0 ? 6 : key - 1;
  }
  getNextDayKey(key) {
    return key + 1 > 6 ? 0 : key + 1;
  }

  createCalendarArray() {
    //On fabrique tous les tableau d'années correspondante au borne passé en
    //paramètres de la Class
    /* console.log(
      `startYear : ${this.startCalendar} , endYear : ${this.endCalendar}`
    );*/

    let calendarArray = [];
    for (let start = this.startCalendar; start <= this.endCalendar; start++) {
      calendarArray[start] = { yearInfo: {} };
    }
    return calendarArray;
  }

  createCalendarTerminal(calendarArray) {
    /* console.log(calendarArray);
    console.log(this.currentDate.year);*/
    const currentYear = this.currentDate.year;
    this.getCalendarTerminalPrev(currentYear, calendarArray[currentYear]);
    this.getCalendarTerminalNext(currentYear, calendarArray[currentYear]);

    // console.log(this.calendarArray);
  }

  getCalendarTerminalPrev(currentYear, currentTerminal) {
    //  console.error(`start : ${currentYear}`);
    const newYear = currentYear - 1;
    /*   console.log(
      `on calcule les bornes des annnées précédents ${currentYear}, avec les data suivantes : `,
      currentTerminal
    );
    console.log("current year data :", currentTerminal[0]);*/

    if (newYear >= this.startCalendar) {
      const isleapYear = this.isleapYear(newYear);
      const offset = isleapYear ? 1 : 0;

      const lastDayByRef =
        this.calendarArray[currentYear].yearInfo.lastDayPrevYear.key;

      //  console.log("byRef", this.getDayNameByKey(lastDayByRef), currentYear);

      const newFirstDay = lastDayByRef - offset < 0 ? 6 : lastDayByRef - offset;

      const lastDayOfPrevYear = this.getPrevDayKey(newFirstDay);

      this.calendarArray[newYear].yearInfo = {
        lastDayPrevYear: {
          key: lastDayOfPrevYear,
          year: newYear - 1,
          name: this.getDayNameByKey(lastDayOfPrevYear).name,
          abbr: this.getDayNameByKey(lastDayOfPrevYear).abbr,
          date: 31,
          month: this.getMonthName(11),
        },
        firstDay: {
          key: newFirstDay,
          year: newYear,
          name: this.getDayNameByKey(newFirstDay).name,
          abbr: this.getDayNameByKey(newFirstDay).abbr,
          date: 1,
          month: this.getMonthName(0),
        },
        lastDay: this.calendarArray[currentYear].yearInfo.lastDayPrevYear, //by ref
        firstDayNextYear: this.calendarArray[currentYear].yearInfo.firstDay, //by ref
        isleapYear,
        //by calc
      };

      /*   console.log(
        `Resultat : 
        ${this.calendarArray[newYear][0].lastDayPrevYear.name} 31 décembre ${
          newYear - 1
        } => calculate
        ${
          this.calendarArray[newYear][0].firstDay.name
        } 1 janvier ${newYear} => calculate
        ${
          this.calendarArray[newYear][0].lastDay.name
        } 31 décembre ${newYear} => byRef       
        ${this.calendarArray[newYear][0].firstDayNextYear.name} 1 janvier ${
          newYear + 1
        } => byRef
        `
      );*/

      return this.getCalendarTerminalPrev(newYear, this.calendarArray[newYear]);
    }

    return false;
  }

  getCalendarTerminalNext(currentYear, currentTerminal) {
    //  console.error(`start : ${currentYear}`);
    const newYear = currentYear + 1;
    /*   console.log(
      `on calcule les bornes des annnées suivantes ${currentYear}, avec les data suivantes : `,
      currentTerminal
    );*/
    /*  console.log("current year data :", currentTerminal[0]);
    console.log(newYear, this.currentDate.year);*/

    if (newYear <= this.endCalendar) {
      const isleapYear = this.isleapYear(newYear);
      const offset = isleapYear ? 1 : 0;

      const firstDayByRef =
        this.calendarArray[currentYear].yearInfo.firstDayNextYear.key;

      //   console.log("byRef", this.getDayNameByKey(firstDayByRef).name, newYear);

      const newLastDay =
        firstDayByRef + offset > 6 ? 0 : firstDayByRef + offset;

      const lastDayOfPrevYear = this.getNextDayKey(newLastDay);

      //   console.log("?????", this.calendarArray[currentYear][0].lastDayPrevYear);

      this.calendarArray[newYear].yearInfo = {
        lastDayPrevYear: this.calendarArray[currentYear].yearInfo.lastDay, //by ref
        firstDay: this.calendarArray[currentYear].yearInfo.firstDayNextYear, //by ref

        lastDay: {
          key: newLastDay,
          year: newYear,
          name: this.getDayNameByKey(newLastDay).name,
          abbr: this.getDayNameByKey(newLastDay).abbr,
          date: 31,
          month: this.getMonthName(11),
        },
        firstDayNextYear: {
          key: lastDayOfPrevYear,
          year: newYear + 1,
          name: this.getDayNameByKey(lastDayOfPrevYear).name,
          abbr: this.getDayNameByKey(lastDayOfPrevYear).abbr,
          date: 1,
          month: this.getMonthName(0),
        },
        isleapYear,
        //by calc
      };

      //  console.log(this.calendarArray[newYear]);
      /*    console.log(
        `Resultat : 
        ${this.calendarArray[newYear][0].lastDayPrevYear.name} 31 décembre ${
          newYear - 1
        } => byRef
        ${
          this.calendarArray[newYear][0].firstDay.name
        } 1 janvier ${newYear} => byRef
        ${
          this.calendarArray[newYear][0].lastDay.name
        } 31 décembre ${newYear} => calculate      
        ${this.calendarArray[newYear][0].firstDayNextYear.name} 1 janvier ${
          newYear + 1
        } => calculate
        `
      );*/

      return this.getCalendarTerminalNext(newYear, this.calendarArray[newYear]);
    }

    return false;
  }

  createMonthCalendar(calendarArray) {
    for (const key in calendarArray) {
      if (Object.hasOwnProperty.call(calendarArray, key)) {
        const yearArray = calendarArray[key];
        const year = parseFloat(key);
        const firstDayKey = yearArray.yearInfo.firstDay;
        this.redifineMonthArray(year);
        //   console.log(this.monthLengthArray);
        yearArray.month = [];
        for (const key in this.monthArray[this.format]) {
          if (Object.hasOwnProperty.call(this.monthArray[this.format], key)) {
            const month = this.monthArray[this.format][key];
            const monthKey = parseFloat(key);
            yearArray.month[monthKey] = {
              name: month.name,
              abbr: month.abbr,
              year: year,
              monthKey: monthKey,
              firstDay: firstDayKey,
              monthLength: this.monthLengthArray[monthKey],
            };
            yearArray.month[monthKey].calendar = [];
            this.createDayOfMonth(yearArray.month[monthKey].calendar, monthKey);
          }
        }

        // console.log(this.calendarArray);
        this.createMonth(yearArray.month);
      }
    }

    //read year array
  }

  createDayOfMonth(calendar, monthKey) {
    const monthLenght = this.monthLengthArray[monthKey];
    for (let inc = 1; inc < monthLenght; inc++) {
      calendar[inc] = [];
    }
  }

  createMonth(monthArray) {
    /*   console.log("on fabrique les mois en conséquence de cette année");
    console.error(monthArray);*/

    for (const key in monthArray) {
      if (Object.hasOwnProperty.call(monthArray, key)) {
        // console.log("mois courant", key);
        const currentMonth = monthArray[key];
        // console.log(currentMonth);
        const monthKey = currentMonth.monthKey;
        const monthLength = this.monthLengthArray[monthKey];
        // console.log(`il y a ${monthLength} jour dans ce mois.`);
        //L'on crée les datas de chaque pour le mois en cours + le jour suivant
        let firstDayKey = currentMonth.firstDay.key;
        /*  console.log(
          `le premier jour du mois ${currentMonth.name} est un ${
            this.getDayNameByKey(firstDayKey).name
          }`
        );*/

        let newKey = firstDayKey;
        for (let inc = 0; inc < monthLength; inc++) {
          if (inc > 0) {
            newKey = newKey + 1 > 6 ? 0 : newKey + 1;
          }
          currentMonth.calendar[inc] = {
            key: newKey,
            name: this.getDayNameByKey(newKey).name,
            abbr: this.getDayNameByKey(newKey).abbr,
            date: inc + 1,
            style: "current",
            fullDate: this.getFullDateFormated(
              inc + 1, // day
              currentMonth.monthKey + 1, //monthKey
              currentMonth.year //year of this month
            ),
          };

          //calculate fistDay of this month
          if (currentMonth.monthKey < 11) {
            /*  console.log(
              `on redéfinie à la racine du mois le jour suivant ${this.getNextDayKey(
                newKey
              )}`
            );*/

            //  console.log(monthArray[monthKey]);

            monthArray[monthKey + 1].firstDay = {
              key: this.getNextDayKey(newKey),
              name: this.getDayNameByKey(this.getNextDayKey(newKey)).name,
              abbr: this.getDayNameByKey(this.getNextDayKey(newKey)).abbr,
              date: 1,
            };
          }
        }
        currentMonth.lastDay = currentMonth.calendar[monthLength - 1];
        this.createWeek(currentMonth);
      }
    }
  }

  createWeek(currentMonth) {
    // console.log(currentMonth);
    const firstDay = currentMonth.firstDay;
    const lastDay = currentMonth.lastDay;

    // console.log({ firstDay: firstDay, lastDay: lastDay });

    currentMonth.offset = {
      start:
        firstDay.key + 1 > 7
          ? 7
          : 7 - firstDay.key === 7
          ? 0
          : 7 - firstDay.key,
      end: lastDay.key + 1 > 7 ? 7 : 7 - lastDay.key,
    };

    //CalculateWeek

    currentMonth.weeks = [];

    // console.log("!!!! ------------------->", currentMonth.offset);
    for (let i = 0; i < 6; i++) {
      if (7 * i + currentMonth.offset.start - 6 < currentMonth.monthLength) {
        let weekOffset = {
          start: i === 0 ? 0 : 7 * i + currentMonth.offset.start - 6,
          end:
            7 * i + currentMonth.offset.start > currentMonth.monthLength
              ? currentMonth.monthLength
              : 7 * i + currentMonth.offset.start + 1,
        };
        //   console.log(weekOffset);
        currentMonth.weeks[i] = currentMonth.calendar.slice(
          weekOffset.start,
          weekOffset.end
        );
      }
      //  console.log(currentMonth.weeks[i], i);
    }
    /* console.log(currentMonth.offset);*/

    this.completeWeeks(currentMonth);
  }

  completeWeeks(currentMonth) {
    //Get prevMonthKey
    const prevMonthKeyIndex =
      currentMonth.monthKey - 1 < 0 ? 11 : currentMonth.monthKey - 1;

    const lengthOfPrevMonth = this.monthLengthArray[prevMonthKeyIndex];

    // console.log("indexOfprevMonth", prevMonthKeyIndex);
    // console.log("lol", lengthOfPrevMonth);

    const completeWeekOffset = {
      firstWeek: 7 - currentMonth.offset.start - 1,
      lastWeek: currentMonth.offset.end,
    };

    //Get last week reference
    const lastWeekIndex = currentMonth.weeks.length - 1;
    const lastDayIndex = currentMonth.weeks[lastWeekIndex].length - 1;

    const referenceDay = {
      //this reference is the first day of first week of thes month
      first: currentMonth.weeks[0][0],
      //this reference is the last day of last week of thes month
      last: currentMonth.weeks[lastWeekIndex][lastDayIndex],
    };

    //  console.log(referenceDay);
    //  console.log(completeWeekOffset);

    //complete First Week
    //  console.log("semaine a altérer", currentMonth.weeks);
    //if there is at least one day added
    if (completeWeekOffset.firstWeek > 0) {
      for (let i = 0; i < completeWeekOffset.firstWeek; i++) {
        // console.log(`DEBUT DU MOIS : il manque ${i + 1} jour`);

        /*   console.log(
          "WHHHHHHHHHHHHHHHHHHHHHHHAAAAAAAATTTTTTT",
          referenceDay.first.key - i
        );*/

        //If calc result equal to - 1 add 7 day to get saturday (dayIndex = 6)

        let newRefFirstDay =
          referenceDay.first.key - i - 1 < 0
            ? referenceDay.first.key - i - 1 + 7
            : referenceDay.first.key - i - 1;

        const newDay = {
          key: this.getPrevDayKey(referenceDay.first.key - i),
          name: this.getDayNameByKey(newRefFirstDay).name,
          abbr: this.getDayNameByKey(newRefFirstDay).abbr,
          date: lengthOfPrevMonth - i,
          style: "notCurrent",
          fullDate: this.getFullDateFormated(
            lengthOfPrevMonth - i, // day
            currentMonth.monthKey, //monthKey
            currentMonth.year //year of this month
          ),
        };

        currentMonth.weeks[0].splice(0, 0, newDay);

        //console.log(newDay);
      }

      //  console.log(currentMonth.weeks);
    }

    //complete last week
    if (completeWeekOffset.lastWeek > 0) {
      for (let i = 0; i < completeWeekOffset.lastWeek; i++) {
        // console.log(`FIN DU MOIS : il manque ${i + 1} jour`);
        // console.log(this.getNextDayKey(referenceDay.last.key + i));

        // console.log("???", referenceDay.last.key + i);

        let lenghtOfLastWeek = currentMonth.weeks[lastWeekIndex].length;

        // console.log("!!!!", lenghtOfLastWeek);

        //console.log("avant Modif : ", currentMonth.weeks);

        let newRefLastDay =
          referenceDay.last.key + i + 1 > 6 ? 0 : referenceDay.last.key + i + 1;

        const newDay = {
          key: this.getNextDayKey(referenceDay.last.key + i),
          name: this.getDayNameByKey(newRefLastDay).name,
          abbr: this.getDayNameByKey(newRefLastDay).abbr,
          date: i + 1,
          style: "notCurrent",
          fullDate: this.getFullDateFormated(
            i + 1, // day
            currentMonth.monthKey + 2, //monthKey
            currentMonth.year //year of this month
          ),
        };

        if (currentMonth.weeks[lastWeekIndex].length <= 6) {
          currentMonth.weeks[lastWeekIndex].splice(lenghtOfLastWeek, 0, newDay);
        }

        // console.log(newDay);
      }
    }
    //console.log(currentMonth.weeks);
  }
}
