import React, { useReducer } from "react";
import BaixaAgendaContext from "./baixaAgendaContext";
import axios from "axios";
import baixaAgendaReducer from "./baixaAgendaReducer";
import {
  GET_BAIXASAAGENDAS,
  BAIXASAAGENDAS_ERROR,
  ATUALIZA_BAIXASAAGENDAS,
  FILTRA_BAIXASAAGENDAS,
  ATUALIZA_BAIXASAAGENDASFILTRADAS,
  LIMPA_FILTRO_BAIXASAAGENDAS,
  ATUALIZA_BAIXASAAGENDAS_ERROR,
  LIMPA_ERROS,
  SET_LOADING,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const BaixaAgendaState = (props) => {
  const initialState = {
    baixasAgendas: [],
    baixasAgendasFiltradas: null,
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(baixaAgendaReducer, initialState);

  //Carrega Baixas de Agenda do Usuário
  const carregaBaixasAgendas = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACK_END_API}/agendas/search?status=ERR`
      );
      dispatch({ type: GET_BAIXASAAGENDAS, payload: res.data });
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: BAIXASAAGENDAS_ERROR,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: BAIXASAAGENDAS_ERROR,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
    }
  };
  //Atualiza Baixas de Agenda do Usuário
  const atualizaBaixasAgendas = async (baixaAgendaCorrigida, bolFiltrada) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      await axios.put(
        `${process.env.REACT_APP_BACK_END_API}/agendas/${baixaAgendaCorrigida.id}`,
        baixaAgendaCorrigida
      );
      dispatch({
        type: ATUALIZA_BAIXASAAGENDAS,
        payload: baixaAgendaCorrigida.id,
      });
      if (bolFiltrada) {
        dispatch({
          type: ATUALIZA_BAIXASAAGENDASFILTRADAS,
          payload: baixaAgendaCorrigida.id,
        });
      }
      return { mensagem: "Agenda Atualizada com Sucesso!", tipo: "success" };
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: ATUALIZA_BAIXASAAGENDAS_ERROR,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: ATUALIZA_BAIXASAAGENDAS_ERROR,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
      return null;
    }
  };

  //Filtra Baixas de Agenda do Usuário
  const filtraBaixasAgendas = async (status) => {
    dispatch({
      type: FILTRA_BAIXASAAGENDAS,
      payload: status,
    });
  };

  //Limpa Filtro Baixas de Agenda do Usuário
  const limpaFiltroBaixasAgendas = () => {
    dispatch({ type: LIMPA_FILTRO_BAIXASAAGENDAS });
  };

  //Limpa Erros
  const limpaErros = () => {
    dispatch({ type: LIMPA_ERROS });
  };

  return (
    <BaixaAgendaContext.Provider
      value={{
        baixasAgendas: state.baixasAgendas,
        baixasAgendasFiltradas: state.baixasAgendasFiltradas,
        loading: state.loading,
        error: state.error,
        carregaBaixasAgendas,
        atualizaBaixasAgendas,
        filtraBaixasAgendas,
        limpaFiltroBaixasAgendas,
        limpaErros,
      }}
    >
      {props.children}
    </BaixaAgendaContext.Provider>
  );
};
export default BaixaAgendaState;
