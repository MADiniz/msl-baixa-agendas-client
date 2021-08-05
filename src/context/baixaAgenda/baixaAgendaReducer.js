import {
  GET_BAIXASAAGENDAS,
  BAIXASAAGENDAS_ERROR,
  ATUALIZA_BAIXASAAGENDAS,
  ATUALIZA_BAIXASAAGENDAS_ERROR,
  FILTRA_BAIXASAAGENDAS,
  LIMPA_FILTRO_BAIXASAAGENDAS,
  ATUALIZA_BAIXASAAGENDASFILTRADAS,
  LIMPA_ERROS,
  SET_LOADING,
} from "../types";

export default function myFunc(state, action) {
  switch (action.type) {
    case GET_BAIXASAAGENDAS:
      return {
        ...state,
        loading: false,
        baixasAgendas: action.payload,
      };

    case BAIXASAAGENDAS_ERROR:
      return {
        ...state,
        loading: false,
        baixasAgendas: [],
        error: action.payload,
      };
    case ATUALIZA_BAIXASAAGENDAS:
      return {
        ...state,
        baixasAgendas: state.baixasAgendas.filter(
          (baixaAgenda) => baixaAgenda.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case ATUALIZA_BAIXASAAGENDASFILTRADAS:
      return {
        ...state,
        baixasAgendasFiltradas: state.baixasAgendasFiltradas.filter(
          (baixaAgendaFiltrada) => baixaAgendaFiltrada.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case ATUALIZA_BAIXASAAGENDAS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FILTRA_BAIXASAAGENDAS:
      return {
        ...state,
        baixasAgendasFiltradas: state.baixasAgendas.filter(
          (baixaAgenda) => baixaAgenda.status === parseInt(action.payload)
        ),
        loading: false,
        error: null,
      };

    case LIMPA_FILTRO_BAIXASAAGENDAS:
      return {
        ...state,
        baixasAgendasFiltradas: null,
      };

    case LIMPA_ERROS:
      return {
        ...state,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
