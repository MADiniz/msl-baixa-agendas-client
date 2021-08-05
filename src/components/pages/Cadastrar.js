import React, { useEffect, useContext, Fragment } from "react";
import FormCadastrar from "../auth/Cadastrar";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const Cadastrar = () => {
  const authContext = useContext(AuthContext);
  const { carregaUsuario, loading } = authContext;

  useEffect(() => {
    carregaUsuario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {!loading ? (
        <div>
          <FormCadastrar></FormCadastrar>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default Cadastrar;
