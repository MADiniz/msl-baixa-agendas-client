import React, { Fragment, useContext } from "react";
import BaixaAgendaContext from "../../context/baixaAgenda/baixaAgendaContext";

const FiltroBaixasAgendas = () => {
  const baixaAgendaContext = useContext(BaixaAgendaContext);
  const { filtraBaixasAgendas, limpaFiltroBaixasAgendas } = baixaAgendaContext;

  const onChange = (e) => {
    filtraBaixasAgendas(e.target.value);
  };

  const limpaFiltroBaixasAgendasFunc = () => {
    document.getElementById("statusFiltro").value = "0";
    limpaFiltroBaixasAgendas();
  };

  return (
    <Fragment>
      <select
        name="statusFiltro"
        id="statusFiltro"
        onChange={onChange}
        defaultValue="0"
      >
        <option key="0" disabled value="0">
          Filtre as Baixas de Agendas por Status...
        </option>
        <option key="3" value={3}>
          3 - Erro de Sistema
        </option>
        <option key="4" value={4}>
          4 - Erro de Negócio
        </option>
      </select>
      <button
        className="btn btn-primary btn:hover"
        onClick={limpaFiltroBaixasAgendasFunc}
      >
        Limpar Filtro
      </button>
    </Fragment>
  );
};

export default FiltroBaixasAgendas;
