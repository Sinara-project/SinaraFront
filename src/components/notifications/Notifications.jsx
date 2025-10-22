import "./Notifications.css";
import Register from "../../assets/register.svg";
import Answer from "../../assets/sucs1.svg";

function Notifications({ isVisible, closeNotifications }) {
  const data = [
    {
      worker: "Lucas Silveira",
      action: "register",
      forms: "",
      date: new Date(2025, 5, 15, 10, 43),
    },
    {
      worker: "João Batista",
      action: "answer",
      forms: "Formulário Bem Daora",
      date: new Date(2025, 5, 15, 12, 1),
    },
    {
      worker: "Lucas Silveira",
      action: "register",
      forms: "",
      date: new Date(2025, 5, 15, 10, 43),
    },
    {
      worker: "João Batista",
      action: "answer",
      forms: "Formulário Bem Daora",
      date: new Date(2025, 5, 15, 12, 1),
    },
    {
      worker: "Lucas Silveira",
      action: "register",
      forms: "",
      date: new Date(2025, 5, 15, 10, 43),
    },
  ];

  const close = () => {
    closeNotifications();
  };

  return (
    <section
      className={`notification-section ${isVisible ? "active" : ""}`}
      onClick={close}
    >
      <div className={`notification-content ${isVisible ? "active" : ""}`}>
        {data.map((usage, index) => {
          return usage.action === "register" ? (
            <div
              key={index}
              className="notification-card"
            >
              <h2>Relatório registrado!</h2>
              <h4>
                O(a) operário(a) <strong>{usage.worker}</strong> registrou um novo relatório.
              </h4>
              <div>
                <img src={Register} alt="" />
                <p>
                  {usage.date.getDate()}/{usage.date.getMonth() + 1}/
                  {usage.date.getFullYear()} - {usage.date.getHours()}:
                  {usage.date.getMinutes().toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          ) : (
            <div key={index} className="notification-card">
              <h2>Formulário respondido!</h2>
              <h4>
                O(a) operário(a) <strong>{usage.worker}</strong> respondeu o seu formulário{" "}
                <strong>{usage.forms}</strong>.
              </h4>
              <div>
                <img src={Answer} alt="" />
                <p>
                  {usage.date.getDate()}/{usage.date.getMonth() + 1}/
                  {usage.date.getFullYear()} - {usage.date.getHours()}:
                  {usage.date.getMinutes().toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Notifications;
