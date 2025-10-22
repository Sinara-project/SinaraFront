import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.css";
import ETAImage from "../../assets/eta-image.png";
import Dashboards from "../../assets/dashboards.svg";
import Sheet from "../../assets/sheet.svg";
import Notification from "../../assets/notification.svg";
import Notifications from "../../components/notifications/Notifications";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const registeredReports = 30;
  const lastResponse = "João Batista";

  const notifications = [
    {
      _id: 1,
      data: new Date(2025, 9, 12, 13, 40),
      mensagem: "O(a) operário(a) João Batista respondeu um formulário!",
      tipo: "Operário",
      categoria: "Formulário respondido",
    },
    {
      _id: 2,
      data: new Date(2025, 9, 12, 13, 40),
      mensagem: "O(a) operário(a) Lucas Silvestre registrou um relatório!",
      tipo: "Operário",
      categoria: "Formulário registrado",
    },
  ];
  
  const [notificationsVisibility, setNotifications] = useState(false);

  const openNotifications = () => {
    setNotifications(true);
  }

  const closeNotifications = () => {
    setNotifications(false);
  }

  return (
    <section className="home-section">
      <Notifications isVisible={notificationsVisibility} closeNotifications={closeNotifications} notifications={notifications} />
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
            <h1>{registeredReports}</h1>
            <p>Relatórios registrados</p>
          </div>
          <div className="home-last-response">
            <h2>Último a responder: </h2>
            <h3>{lastResponse}</h3>
          </div>
        </section>
        <section className="home-pthree">
          <h1>Principais ações</h1>
          <div className="home-options">
            <div className="home-option" onClick={() => {navigate("/dashboards")}}>
              <img
                src={Dashboards}
                alt="Imagem de dashboard"
                className="home-option-img"
              />
              <h3 className="home-option-text">Acessar dashboards</h3>
            </div>
            <div className="home-option" onClick={() => {navigate("/planilhas")}}>
              <img
                src={Sheet}
                alt="Imagem de planilha"
                className="home-option-img"
              />
              <h3 className="home-option-text">Abrir planilhas</h3>
            </div>
            <div className="home-option" onClick={openNotifications}>
              <img
                src={Notification}
                alt="Imagem de histórico/relógio"
                className="home-option-img"
              />
              <h3 className="home-option-text">Acessar histórico</h3>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;
