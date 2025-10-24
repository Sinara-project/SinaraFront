import "./PlanChoice.css";
import FreeIcon from "../../../assets/free.svg";
import PremiumIcon from "../../../assets/premium.svg";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PlanChoice() {
  const navigate = useNavigate();

  const [plan, setPlan] = useState("");

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const navigateRestrictPassword = () => {
    setPlan("gratis");
    let onLogon = JSON.parse(sessionStorage.getItem("onLogon"));
    onLogon.plano_inicial = plan;
    onLogon.id_plano = 1;
    // createEmpresa(coisas)
    const id = 1;
    // getIdDeEmpresaPorCnpj(cnpj)
    const code = "aaa001";
    // getEmpresaCodigoPorCnpj(cnpj)
    onLogon = {
      id: id,
      cnpj: onLogon.cnpj,
      email: onLogon.email,
      image: onLogon.imagem_url,
      name: onLogon.nome,
      sector: onLogon.ramo_atuacao,
      code: code
    };
    sessionStorage.setItem("onLogon", JSON.stringify(onLogon));

    navigate("/senha-restrita");
  };

  const navigatePremiumChoice = () => {
    setPlan("premium");
    const onLogon = JSON.parse(sessionStorage.getItem("onLogon"));
    onLogon.plano_inicial = plan;
    onLogon.id_plano = 2;
    // createEmpresa(coisas)
    const id = 1;
    // getIdDeEmpresaPorCnpj(cnpj)
    onLogon = {
      id: id,
      cnpj: onLogon.cnpj,
      email: onLogon.email,
      image: onLogon.imagem_url,
      name: onLogon.nome
    }
    sessionStorage.setItem("onLogon", JSON.stringify(onLogon));

    setPlan("premium");
    navigate("/pagamento");
  };

  return (
    <section className="plan-section">
      <ReturnArrow lastEndpoint={"/inserir-codigo"} />
      <h1 className="plan-title">Bem vindo(a)! Escolha seu plano:</h1>
      <div className="plan-choices">
        <div className="plan-choice-card" onClick={navigateRestrictPassword}>
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
        <div className="plan-choice-card" onClick={navigatePremiumChoice}>
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
