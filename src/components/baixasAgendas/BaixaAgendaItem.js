import React, { useState, useContext } from "react";
import BaixaAgendaContext from "../../context/baixaAgenda/baixaAgendaContext";
import AlertContext from "../../context/alert/alertContext";

const BaixaAgendaItem = ({ baixaAgenda, index }) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const baixaAgendaContext = useContext(BaixaAgendaContext);
  const { atualizaBaixasAgendas, baixasAgendasFiltradas } = baixaAgendaContext;
  let { id, agenda, cod_produto, qtd_pedida, filial, status } = baixaAgenda;

  let bolFiltrada = baixasAgendasFiltradas === null ? false : true;

  const [baixaAgendaCorrigida, setQtd_corrigida] = useState({});

  const onChange = (e) =>
    setQtd_corrigida({
      ...baixaAgenda,
      qtd_pedida: e.target.value,
      status: 0,
    });

  const enviarCorrecao = async () => {
    let resp;
    if (baixaAgenda.status === 4) {
      if (
        Object.keys(baixaAgendaCorrigida).length === 0 ||
        baixaAgendaCorrigida.qtd_pedida <= 0
      ) {
        return setAlert(
          'O campo "Quantidade Correta" é obrigatório.',
          "danger"
        );
      }
      resp = await atualizaBaixasAgendas(baixaAgendaCorrigida, bolFiltrada);
    } else {
      baixaAgenda.status = 0;
      resp = await atualizaBaixasAgendas(baixaAgenda, bolFiltrada);
    }
    if (resp != null) {
      setAlert(resp.mensagem, resp.tipo);
    }
  };

  return (
    <tr key={id}>
      <td>{index}</td>
      <td>{agenda.substring(0, 3)}</td>
      <td>{filial}</td>
      <td>{cod_produto}</td>
      <td>{qtd_pedida}</td>
      <td>
        {status === 3
          ? `${status}- Erro de Sistema`
          : `${status}- Erro de Negócio`}
      </td>
      <td className="">
        <input
          type="number"
          name="qtd_corrigida"
          id="qtd_corrigida"
          onChange={onChange}
          disabled={status === 3 ? true : false}
        />
      </td>
      <td>
        <button
          className="btn btn-primary btn-block btn:hover"
          onClick={enviarCorrecao}
        >
          Enviar
        </button>
      </td>
    </tr>
  );
};

export default BaixaAgendaItem;
