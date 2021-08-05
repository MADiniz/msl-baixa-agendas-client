import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.tipo}`}>
        <i className='fas fa-info-circle'> {alert.mensagem}</i>
      </div>
    ))
  );
};

export default Alerts;
