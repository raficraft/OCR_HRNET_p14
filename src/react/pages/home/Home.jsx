import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { departement, states } from "../../../js/data/states";
import { SelectBloc } from "../../components/Input/SelectBloc/SelectBloc";
import { InputBloc } from "./../../components/Input/InputBloc/InputBloc";

import Style from "./Home.module.scss";
import { validForm } from "./validForm";
import { validInput } from "./../../components/Input/InputBloc/validInput";
import { ModalBox } from "../../components/modal/modal";
import { DatePicker } from "./../../components/Input/Picker/DatePickers";

export const Home = () => {
  const [modal, setModal] = useState(false);

  const inputForm = {
    firstName: useRef(),
    lastName: useRef(),
    birthDate: useRef(),
    street: useRef(),
    city: useRef(),
    zip: useRef(),
    state: useRef(),
    startDate: useRef(),
    departement: useRef(),
  };

  const formEmployee = useRef();

  const handleSubmit = (evt) => {
    console.log("soumission et traitements des resultats");
    evt.preventDefault();

    let countError = Object.keys(inputForm).length;

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let employee = {};

    for (const key in inputForm) {
      if (Object.hasOwnProperty.call(inputForm, key)) {
        let error = inputForm[key].current.error;

        const thisItem = inputForm[key].current.input;
        const itemValue = thisItem.value
          ? thisItem.value
          : thisItem.textContent;
        //Check required Field
        error.textContent = validForm(inputForm[key]);

        //Check field format value is correct
        error.textContent = validInput(inputForm[key]);

        //decrement count error if not error with this field
        countError = error.textContent === "" ? countError - 1 : countError;

        employee[key] = itemValue;
      }
    }

    employees.push(employee);

    //At the end of the loop, if there is no error,
    // we store the information in the database system
    if (countError === 0) {
      console.log("on stock en BDD");
      localStorage.setItem("employees", JSON.stringify(employees));
      //view Success Modal

      setModal(!modal);
    }
  };

  const hideModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    document.title = "Create Employee";
  }, []);

  console.log(modal);

  return (
    <section className={Style.home}>
      <h1>HRnet</h1>
      <Link to="/employee">View Current Employees</Link>

      <div className="form_employee" id="form_employee">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit} ref={formEmployee}>
          <InputBloc
            data={{
              forHtml: "firstName",
              label: "First Name",
              type: "text",
              placeholder: "First Name",
              format: "alphabetical",
            }}
            ref={inputForm.firstName}
          />
          <InputBloc
            data={{
              forHtml: "lastName",
              label: "Last Name",
              type: "text",
              placeholder: "Last Name",
              format: "alphabetical",
            }}
            ref={inputForm.lastName}
          />

          <DatePicker />
          <DatePicker />

          <fieldset>
            <legend>Adress</legend>
            <InputBloc
              data={{
                forHtml: "street",
                label: "Street",
                type: "text",
                format: "alphanumeric",
              }}
              ref={inputForm.street}
            />
            <InputBloc
              data={{
                forHtml: "city",
                label: "City",
                type: "text",
                format: "alphanumeric",
              }}
              ref={inputForm.city}
            />

            <SelectBloc
              data={{
                forHtml: "state",
                label: "State",
                role: "options",
                options: states,
                format: "select",
              }}
              ref={inputForm.state}
            />
            <InputBloc
              data={{
                forHtml: "zipCode",
                label: "Zip Code",
                type: "number",
                format: "numeric",
              }}
              ref={inputForm.zip}
            />
          </fieldset>

          <SelectBloc
            data={{
              forHtml: "department",
              label: "Department",
              role: "options",
              options: departement,
              format: "select",
            }}
            ref={inputForm.departement}
          />

          <button type="submit" className={Style.btn} name="submitButton">
            Save
          </button>
        </form>
      </div>
      {modal !== false && <ModalBox onClose={hideModal} />}
    </section>
  );
};
