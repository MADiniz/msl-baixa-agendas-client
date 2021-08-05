import React, { useState, useContext, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const Login = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { loginUsuario, error, limpaErros, isAuthenticated } = authContext;
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      setloggin(false);
      history.push("/");
    }
    if (error != null) {
      setloggin(false);
      setAlert(error, "danger");
      limpaErros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loggin, setloggin] = useState(false);

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setloggin(true);
    loginUsuario({
      email,
      password,
    });
  };
  return (
    <Fragment>
      {!loggin ? (
        <div className="form-container">
          <h1>Entrar</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Digite seu E-mail:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="E-mail"
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Digite a Senha:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Senha"
                required
                onChange={onChange}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block"
            />
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Login;
