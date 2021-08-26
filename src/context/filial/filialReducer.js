import { GET_FILIAIS, GET_FILIAIS_ERROR, SET_LOADING_FILIAIS } from "../types";

export default function myFunc(state, action) {
  switch (action.type) {
    case GET_FILIAIS:
      return {
        ...state,
        loadingFiliais: false,
        filiais: action.payload,
      };

    case GET_FILIAIS_ERROR:
      return {
        ...state,
        loadingFiliais: false,
        filiais: [],
        errorFiliais: action.payload,
      };

    case SET_LOADING_FILIAIS:
      return {
        ...state,
        loadingFiliais: action.payload,
      };
    default:
      return state;
  }
}
