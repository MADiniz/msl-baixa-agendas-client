import React, { useEffect, useContext, Fragment } from "react";
import FormCadastrar from "../auth/Cadastrar";
import AuthContext from "../../context/auth/authContext";
import FilialContext from "../../context/filial/filialContext";
import Spinner from "../layout/Spinner";

const Cadastrar = () => {
  const authContext = useContext(AuthContext);
  const { carregaUsuario, loading } = authContext;
  const filialContext = useContext(FilialContext);
  const { carregaFiliais, loadingFiliais } = filialContext;

  useEffect(() => {
    carregaUsuario();
    carregaFiliais();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {!loading && !loadingFiliais ? (
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
