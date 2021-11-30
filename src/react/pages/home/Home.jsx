import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { departement, states } from "../../../js/data/states";
import { SelectBloc } from "../../components/Input/SelectBloc/SelectBloc";
import { InputBloc } from "./../../components/Input/InputBloc/InputBloc";
import { validForm } from "./validForm";
import { validInput } from "./../../components/Input/InputBloc/validInput";
import { ModalBox } from "../../components/modal/modal";

import Style from "./Home.module.scss";
import { DatePicker } from "datepicker_by_raficraft";

export const Home = (props) => {
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
      localStorage.setItem("employees", JSON.stringify(employees));
      props.setter(employees);
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

  return (
    <section className={Style.home}>
      <header>
        <h1>HRnet</h1>
        <h2>Create Employee</h2>
        {!props.storage && <Link to="/employee">View Current Employees</Link>}
      </header>

      <div id="form_employee">
        <form onSubmit={handleSubmit} ref={formEmployee}>
          {/* EMPLOYEE IDENTITIES*/}
          <div className={Style.employee}>
            <fieldset>
              <legend>Identites</legend>
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

              <DatePicker
                ref={inputForm.birthDate}
                forHtml="dateOfBirth"
                label="Date of birth"
                format="date"
              />
              <DatePicker
                ref={inputForm.startDate}
                forHtml="startDate"
                label="Start date"
                format="date"
                language="fr"
              />
            </fieldset>

            {/* EMPLOYEE ADRESS*/}
            <fieldset>
              <legend>Adress</legend>
              <InputBloc
                data={{
                  forHtml: "street",
                  label: "Street",
                  type: "text",
                  format: "alphanumeric",
                  placeholder: "Your adress",
                }}
                ref={inputForm.street}
              />
              <InputBloc
                data={{
                  forHtml: "city",
                  label: "City",
                  type: "text",
                  format: "alphanumeric",
                  placeholder: "Your city",
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
                  placeholder: "Your Zip code",
                }}
                ref={inputForm.zip}
              />
            </fieldset>
          </div>

          <div className={Style.select_departement}>
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
          </div>

          <button type="submit" className={Style.btn} name="submitButton">
            Save
          </button>
        </form>
      </div>
      {modal !== false && <ModalBox onClose={hideModal} />}
    </section>
  );
};
