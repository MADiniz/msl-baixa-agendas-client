import React, { useEffect, useContext, Fragment } from "react";
import BaixasAgendas from "../baixasAgendas/BaixasAgendas";
import FiltroBaixasAgendas from "../baixasAgendas/FiltroBaixasAgendas";
import AuthContext from "../../context/auth/authContext";
import Spinner from "../layout/Spinner";

const BaixaDeAgendas = () => {
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
          <h1>Gestão Baixas de Agendas</h1>
          <h2 className="my-2">Agendas Disponíveis Para Correção</h2>
          <FiltroBaixasAgendas></FiltroBaixasAgendas>
          <BaixasAgendas></BaixasAgendas>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
export default BaixaDeAgendas;
