import "./PlanChoice.css";
import FreeIcon from "../../../assets/free.svg";
import PremiumIcon from "../../../assets/premium.svg";

function PlanChoice() {
  return (
    <section className="plan-section">
      <h1 className="plan-title">Bem vindo(a)! Escolha seu plano:</h1>
      <div className="plan-choices">
        <div className="plan-choice-card">
          <div className="plan-icon-title">
            <img src={FreeIcon} alt="" />
            <h2 className="plan-choice-name">GRATUITO</h2>
          </div>
          <ul>
            <li>Forms personalizados</li>
            <li>Forms padrão com 4 questões</li>
            <li>ChatBot (limite diário)</li>
            <li>Limite de 3 Dashboards</li>
            <li>Limite de 5 Planilhas</li>
          </ul>
        </div>
        <div className="plan-choice-card">
          <div className="plan-icon-title">
            <img src={PremiumIcon} alt="" />
            <h2 className="plan-choice-name">PREMIUM</h2>
          </div>
          <ul>
            <li>
              Forms <p className="plan-shiny">personalizados</p>
            </li>
            <li>
              Forms padrão <p className="plan-shiny">ilimitado</p>
            </li>
            <li>
              ChatBot <p className="plan-shiny">ilimitado</p>
            </li>
            <li>
              Dashboards <p className="plan-shiny">ilimitados</p>
            </li>
            <li>
              Planilhas <p className="plan-shiny">ilimitadas</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PlanChoice;
