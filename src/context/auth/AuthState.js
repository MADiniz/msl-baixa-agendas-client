import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTRADO_SUCESSO,
  FALHA_REGISTRO,
  USUARIO_CARREGADO,
  AUTH_ERRO,
  LOGIN_SUCESSO,
  LOGIN_FALHA,
  LOGOUT,
  LIMPA_ERROS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Carrega Usuário
  const carregaUsuario = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACK_END_API}/perfil`
      );
      dispatch({ type: USUARIO_CARREGADO, payload: res.data });
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: AUTH_ERRO,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: AUTH_ERRO,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
    }
  };

  //Registra Usuário
  const registraUsuario = async (dadosFomulario) => {
    const config = {
      headers: {
        "Context-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/usuarios`,
        dadosFomulario,
        config
      );
      dispatch({
        type: REGISTRADO_SUCESSO,
        payload: res.data,
      });
      return { mensagem: "Usuário Cadastrado com Sucesso!", tipo: "success" };
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: FALHA_REGISTRO,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: FALHA_REGISTRO,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
    }
  };

  //Login Usuário
  const loginUsuario = async (dadosFomulario) => {
    const config = {
      timeout: 30000,
      headers: {
        "Context-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACK_END_API}/sessions`,
        dadosFomulario,
        config
      );
      dispatch({
        type: LOGIN_SUCESSO,
        payload: res.data,
      });
      carregaUsuario();
    } catch (error) {
      // Error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        dispatch({
          type: LOGIN_FALHA,
          payload: error.response.data.message,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        dispatch({
          type: LOGIN_FALHA,
          payload:
            "Problema ao acessar o servidor, contate o administrador ou tente novamente mais tarde.",
        });
      }
    }
  };
  //Logout
  const logoutUsuario = () => {
    dispatch({ type: LOGOUT });
  };
  //Limpa Erros
  const limpaErros = () => {
    dispatch({ type: LIMPA_ERROS });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registraUsuario,
        carregaUsuario,
        loginUsuario,
        logoutUsuario,
        limpaErros,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
