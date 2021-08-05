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

export default function myFunc(state, action) {
  switch (action.type) {
    case USUARIO_CARREGADO:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTRADO_SUCESSO:
      return {
        ...state,
        loading: false,
      };

    case FALHA_REGISTRO:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGIN_SUCESSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FALHA:
    case AUTH_ERRO:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case LIMPA_ERROS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
