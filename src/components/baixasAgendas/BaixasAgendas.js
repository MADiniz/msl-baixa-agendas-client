import React, { Fragment, useContext, useEffect } from "react";
import BaixaAgendaContext from "../../context/baixaAgenda/baixaAgendaContext";
import AlertContext from "../../context/alert/alertContext";
import BaixaAgendaItem from "./BaixaAgendaItem";
import Spinner from "../layout/Spinner";

const BaixasAgendas = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const baixaAgendaContext = useContext(BaixaAgendaContext);
  const {
    baixasAgendas,
    carregaBaixasAgendas,
    loading,
    error,
    limpaErros,
    baixasAgendasFiltradas,
  } = baixaAgendaContext;

  useEffect(() => {
    carregaBaixasAgendas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (error != null) {
      setAlert(error, "danger");
      limpaErros();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Fragment>
      {baixasAgendasFiltradas === null ? (
        <div className="my-2">
          <div
            style={{
              overflowX: "auto",
            }}
          >
            {!loading ? (
              <table id="baixaAgendas">
                <tbody>
                  <tr>
                    <th>Item</th>
                    <th>Agenda</th>
                    <th>Filial</th>
                    <th>Código do Produto</th>
                    <th>Quantidade Pedida</th>
                    <th>Status Erro</th>
                    <th>Quantidade Correta</th>
                    <th></th>
                  </tr>
                  {baixasAgendas.map((baixaAgenda, index) => (
                    <BaixaAgendaItem
                      key={baixaAgenda.id}
                      baixaAgenda={baixaAgenda}
                      index={index + 1}
                      error={error}
                      loading={loading}
                    ></BaixaAgendaItem>
                  ))}
                </tbody>
              </table>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      ) : (
        <div className="my-2">
          <div
            style={{
              overflowX: "auto",
            }}
          >
            {!loading ? (
              <table width="100%" id="baixaAgendas">
                <tbody>
                  <tr>
                    <th>Item</th>
                    <th>Agenda</th>
                    <th>Filial</th>
                    <th>Código do Produto</th>
                    <th>Quantidade Pedida</th>
                    <th>Status Erro</th>
                    <th>Quantidade Correta</th>
                    <th></th>
                  </tr>
                  {baixasAgendasFiltradas.map((baixaAgenda, index) => (
                    <BaixaAgendaItem
                      key={baixaAgenda.id}
                      baixaAgenda={baixaAgenda}
                      index={index + 1}
                      error={error}
                      loading={loading}
                    ></BaixaAgendaItem>
                  ))}
                </tbody>
              </table>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default BaixasAgendas;
