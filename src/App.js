import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
//Import dos Layouts
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
//Import das paginas
import BaixaDeAgendas from "./components/pages/BaixaDeAgendas";
import Login from "./components/pages/Login";
import Cadastrar from "./components/pages/Cadastrar";
//Import dos States
import BaixaAgendaState from "./context/baixaAgenda/BaixaAgendaState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <BaixaAgendaState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={BaixaDeAgendas}
                  ></PrivateRoute>
                  <PrivateRoute
                    exact
                    path="/Cadastrar"
                    component={Cadastrar}
                  ></PrivateRoute>
                  <Route exact path="/Login" component={Login}></Route>
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </BaixaAgendaState>
    </AuthState>
  );
}

export default App;
