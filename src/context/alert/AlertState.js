import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { v4 as uuid } from "uuid";
import { SET_ALERTA, REMOVE_ALERTA } from "../types";

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (mensagem, tipo, timeout = 5000) => {
    const id = uuid();
    dispatch({
      type: SET_ALERTA,
      payload: {
        mensagem,
        tipo,
        id,
      },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERTA, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;
