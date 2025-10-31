import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.css";
import ETAImage from "../../assets/eta-image.png";
import Dashboards from "../../assets/dashboards.svg";
import Worker from "../../assets/worker.svg";
import Notification from "../../assets/notification.svg";
import Notifications from "../../components/notifications/Notifications";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotificationByEnterpriseId } from "../../services/mongoDB/Notifications/Notifications";
import Loading from "../../components/loading/Loading";
import {
  getFormsQuantity,
  getLastResponseId,
} from "../../services/mongoDB/Forms/Forms";
import {
  getWorkerById,
  getWorkersByEnterpriseId,
} from "../../services/sql/workers/Workers";

function Home() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationsLoading, setNotificationLoading] = useState(true);

  const [registeredForms, setRegisteredForms] = useState("-");
  const [lastResponse, setLastResponse] = useState("-");

  const [notificationsVisibility, setNotificationsVis] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const openNotifications = () => {
    setNotificationsVis(true);
  };

  const closeNotifications = () => {
    setNotificationsVis(false);
  };

  useEffect(() => {
    setLoading(true);

    async function fetchData() {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).id;

        const notificationsPromise = getNotificationByEnterpriseId(JSON.parse(localStorage.getItem("user")).id);
        const lastResponseIdPromise = getLastResponseId(userId);
        const quantityPromise = getFormsQuantity(userId);

        const [notificationsData, lastResponseId, quantityData] =
          await Promise.all([
            notificationsPromise,
            lastResponseIdPromise,
            quantityPromise,
          ]);

        setNotifications(notificationsData);

        try {
          const worker = await getWorkerById(lastResponseId);
          setLastResponse(worker.nome || "-");
        } catch (err) {
          console.log("Erro ao buscar worker:", err);
          setLastResponse("-");
        }

        setRegisteredForms(quantityData);
      } catch (err) {
        console.log("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
        setNotificationLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="home-section">
      <Notifications
        isVisible={notificationsVisibility}
        closeNotifications={closeNotifications}
        notifications={notifications}
        isLoading={notificationsLoading}
      />
      {isLoading && (
        <div className="home-loading">
          <Loading />
        </div>
      )}
      <div className="home-content">
        <section className="home-pone">
          <div className="home-pone-content">
            <div className="home-pone-text">
              <h1>Quem bom ter você conosco!</h1>
              <h4>
                Gerencie funcionários, crie e envie formulários, veja métricas
                da sua ETA e muito mais!
              </h4>
            </div>
            <div className="home-pone-img-container">
              <img src={ETAImage} alt="" className="home-pone-img" />
            </div>
          </div>
          <div className="home-orange-square"></div>
        </section>
        <section className="home-ptwo">
          <div className="home-registered-reports">
            <h1>{registeredForms}</h1>
            <p>Formulários registrados</p>
          </div>
          <div className="home-last-response">
            <h2>Último a responder: </h2>
            <h3>{lastResponse}</h3>
          </div>
        </section>
        <section className="home-pthree">
          <h1>Principais ações</h1>
          <div className="home-options">
            <div
              className="home-option"
              onClick={() => {
                navigate("/dashboards");
              }}
            >
              <img
                src={Dashboards}
                alt="Imagem de dashboard"
                className="home-option-img"
              />
              <h3 className="home-option-text">Acessar dashboards</h3>
            </div>
            <div
              className="home-option"
              onClick={() => {
                navigate("/entrar-area-restrita");
              }}
            >
              <img
                src={Worker}
                alt="Imagem de planilha"
                className="home-option-img"
              />
              <h3 className="home-option-text">Abrir área restrita</h3>
            </div>
            <div className="home-option" onClick={openNotifications}>
              <img
                src={Notification}
                alt="Imagem de histórico/relógio"
                className="home-option-img"
              />
              <h3 className="home-option-text">Acessar notificações</h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;
