import React, { useReducer } from "react";
import FilialContext from "./filialContext";
import axios from "axios";
import filialReducer from "./filialReducer";
import {
  GET_FILIAIS,
  GET_FILIAIS_ERROR,
  SET_LOADING_FILIAIS,
  LIMPA_ERROS_FILIAIS,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";

const FilialState = (props) => {
  const initialState = {
    filiais: [],
    loadingFiliais: true,
    errorFiliais: null,
  };

  const [state, dispatch] = useReducer(filialReducer, initialState);

  //Carrega Todas as Filiais
  const carregaFiliais = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      dispatch({
        type: SET_LOADING_FILIAIS,
        payload: true,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_BACK_END_API}/filiais`
      );
      dispatch({ type: GET_FILIAIS, payload: res.data });
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: GET_FILIAIS_ERROR,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: GET_FILIAIS_ERROR,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
    }
  };

  //Limpa Erros
  const limpaErrosFiliais = () => {
    dispatch({ type: LIMPA_ERROS_FILIAIS });
  };

  return (
    <FilialContext.Provider
      value={{
        filiais: state.filiais,
        loadingFiliais: state.loadingFiliais,
        errorFiliais: state.errorFiliais,
        carregaFiliais,
        limpaErrosFiliais,
      }}
    >
      {props.children}
    </FilialContext.Provider>
  );
};
export default FilialState;
