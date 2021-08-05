import React, { useContext } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ titulo }) => {
  const authContext = useContext(AuthContext);
  const { logoutUsuario, isAuthenticated, user } = authContext;

  const onlogout = () => {
    logoutUsuario();
  };
  return (
    <div className="navbar bg-primary">
      <span>
        <img src="top-logo.png" alt="logo-MSL"></img>
      </span>
      <h1>{titulo}</h1>
      {isAuthenticated === true ? (
        <ul>
          <li>Olá {user && user.nome.split(" ")[0]}</li>
          <li>
            <a href="/Login" onClick={onlogout}>
              <i className="fas fa-sign-out-alt">
                <span className="hide-sm">Sair</span>
              </i>
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>                            </li>
        </ul>
      )}
    </div>
  );
};

Navbar.propTypes = {
  titulo: PropTypes.string.isRequired,
};
Navbar.defaultProps = {
  titulo: "Provedor de Serviços",
};

export default Navbar;
