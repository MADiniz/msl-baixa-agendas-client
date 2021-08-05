import { SET_ALERTA, REMOVE_ALERTA } from "../types";

export default function myFunc(state, action) {
  switch (action.type) {
    case SET_ALERTA:
      return [...state, action.payload];
    case REMOVE_ALERTA:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
