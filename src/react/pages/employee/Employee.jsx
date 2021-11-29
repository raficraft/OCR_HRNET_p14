import { Link } from "react-router-dom";
import { DataTable } from "../../components/Table/DataTable";

import Style from "./Employee.module.scss";

export const Employee = (props) => {
  //Entries Point
  const employeesData = JSON.parse(props.storage);

  return (
    <section className={Style.employeePage}>
      {!employeesData ? (
        <h1>No Data , back to home Page !</h1>
      ) : (
        <>
          <h1>Current Employees</h1>
          <DataTable dataEmployees={employeesData} />
          <Link to="/">Home</Link>
        </>
      )}
    </section>
  );
};
