import { Link } from "react-router-dom";
import { DataTable } from "../../components/Table/DataTable";

export const Employee = () => {
  // console.log(localStorage.getItem("employees"));

  //Entries Point
  const employeesData = JSON.parse(localStorage.getItem("employees"));

  return (
    <div>
      <h1>Current Employees</h1>
      <DataTable dataEmployees={employeesData} />
      <Link to="/">Home</Link>
    </div>
  );
};
