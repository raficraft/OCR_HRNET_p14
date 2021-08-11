import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { Employee } from "./react/pages/employee/Employee";
import { Home } from "./react/pages/home/Home";

function App() {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/employee" component={Employee} />
      </Switch>
    </main>
  );
}

export default App;
