import "./Thanks.css";
import Sucess from "../../../assets/sucs1-thanks.svg";
import { useNavigate } from "react-router-dom";

function Thanks() {
  const navigate = useNavigate()

  
  function navigateRestrictPassword() {
    navigate("/senha-restrita")
  }

  return (
    <section className="thanks-section">
      <div className="thanks-warning">
        <img src={Sucess} alt="Ícone de sucesso" />
        <h1>Obrigado!</h1>
        <h2>
          A equipe do Sinara agradece o apoio e o suporte para melhorias no app!
        </h2>
      </div>
      <button className="thanks-navigate" onClick={navigateRestrictPassword}>
        Criar senha para a área restrita
      </button>
    </section>
  );
}

export default Thanks;
