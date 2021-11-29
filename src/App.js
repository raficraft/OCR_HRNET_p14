import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Employee } from "./react/pages/employee/Employee";
import { Home } from "./react/pages/home/Home";

function App() {
  const [storage, setStorage] = useState(localStorage.getItem("employees"));

  return (
    <main className="main">
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Home setter={setStorage} storage="storage" />}
        />
        <Route
          exact
          path="/employee"
          render={() => <Employee storage={storage} />}
        />
      </Switch>
    </main>
  );
}

export default App;
