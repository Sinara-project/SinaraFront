import "./Notifications.css";
import Register from "../../assets/register.svg";
import Answer from "../../assets/sucs1.svg";
import Clock from "../../assets/clock.svg";
import Stop from "../../assets/stop.svg";
import { useEffect } from "react";
import Loading from "../loading/Loading";

function Notifications({
  isVisible,
  closeNotifications,
  notifications,
  isLoading,
}) {
  const close = () => {
    closeNotifications();
  };

  return (
    <section
      className={`notification-section ${isVisible ? "active" : ""}`}
      onClick={close}
    >
      <div className={`notification-content ${isVisible ? "active" : ""}`}>
        {notifications.length == 0 && (
          <div className="notification-loading">
            <div className="notification-loading-content">
              <h1>Histórico vazio</h1>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="notification-loading">
            <div className="notification-loading-content">
              <Loading />
            </div>
          </div>
        ) : (
          notifications.map((usage) => {
            return (
              <div key={usage._id} className="notification-card">
                <h2>{usage.categoria}</h2>
                <h4>{usage.mensagem}</h4>
                <div>
                  {usage.categoria == "Formulario respondido" && (
                    <img src={Answer} alt="" />
                  )}{" "}
                  {usage.categoria == "Formulario registrado" && (
                    <img src={Register} />
                  )}
                  {usage.tipo?.toLowerCase() == "abrir ponto" && (
                    <img src={Clock} />
                  )}
                  {usage.tipo?.toLowerCase() == "fechar ponto" && (
                    <img src={Stop} />
                  )}
                  <p>
                    {new Date(usage.data).getDate()}/
                    {new Date(usage.data).getMonth() + 1}/
                    {new Date(usage.data).getFullYear()} -{" "}
                    {new Date(usage.data)
                      .getHours()
                      .toString()
                      .padStart(2, "0")}
                    :
                    {new Date(usage.data)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Notifications;
