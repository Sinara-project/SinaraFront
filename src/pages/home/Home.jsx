import Sidebar from "../../components/sidebar/Sidebar";
import "./Home.css";
import ETAImage from "../../assets/eta-image.png";
import Dashboards from "../../assets/dashboards.svg";
import Sheet from "../../assets/sheet.svg";
import History from "../../assets/clock.svg";

function Home() {
  const registeredReports = 30;
  const lastResponse = "João Batista";

  return (
    <section className="home-section">
      <Sidebar />
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
            <div className="home-option">
              <img
                src={Dashboards}
                alt="Imagem de dashboard"
                className="home-option-img"
              />
              <h3 className="home-option-text">Acessar dashboards</h3>
            </div>
            <div className="home-option">
              <img
                src={Sheet}
                alt="Imagem de planilha"
                className="home-option-img"
              />
              <h3 className="home-option-text">Abrir planilhas</h3>
            </div>
            <div className="home-option">
              <img
                src={History}
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
