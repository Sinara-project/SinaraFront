import "./Sidebar.css";
import Logo from "../../assets/logo-transparent.svg";
import Home from "../../assets/home.svg";
import Dashboard from "../../assets/dashboards.svg";
import Sheet from "../../assets/sheet.svg";
import Clock from "../../assets/clock.svg";
import Create from "../../assets/create.svg";
import Worker from "../../assets/worker.svg";
import User from "../../assets/user.svg";
import Config from "../../assets/config.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ openHistory }) {
    const navigate = useNavigate();
  const [extended, setExtend] = useState(false);

  const history = () => {
    openHistory();
  }

  return (
    <section
      className={`sidebar-section ${extended ? "extended" : ""}`}
      onMouseEnter={() => {
        setExtend(true);
      }}
      onMouseLeave={() => {
        setExtend(false);
      }}
    >
      <img src={Logo} alt="" className="sidebar-logo" />
      <div className="sidebar-functions">
        <span className={`sidebar-option ${extended ? "extended" : ""}`} onClick={(() => {navigate("/home")})}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>Home</p>
          <img src={Home} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`} onClick={(() => {navigate("/dashboards")})}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Acessar dashboards
          </p>
          <img src={Dashboard} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`} onClick={(() => {navigate("/planilhas")})}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Acessar planilhas
          </p>
          <img src={Sheet} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`} onClick={history}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Abrir histórico
          </p>
          <img src={Clock} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Criar Formulário
          </p>
          <img src={Create} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Área Restrita
          </p>
          <img src={Worker} alt="" className="sidebar-icon" />
        </span>
      </div>
      <div className="sidebar-basics">
        <span className={`sidebar-option ${extended ? "extended" : ""}`}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>Perfil</p>
          <img src={User} alt="" className="sidebar-icon" />
        </span>
        <span className={`sidebar-option ${extended ? "extended" : ""}`}>
          <p className={`sidebar-text ${extended ? "extended" : ""}`}>
            Configurações
          </p>
          <img src={Config} alt="" className="sidebar-icon" />
        </span>
      </div>
    </section>
  );
}

export default Sidebar;
