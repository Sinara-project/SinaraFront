import "./Thanks.css";
import Sucess from "../../../assets/sucs1-thanks.svg";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";

function Thanks() {
  return (
    <section className="thanks-section">
        <ReturnArrow lastEndpoint={"/escolher-premium"}/>
      <div className="thanks-warning">
        <img src={Sucess} alt="Ícone de sucesso" />
        <h1>Obrigado!</h1>
        <h2>
          A equipe do Sinara agradece o apoio e o suporte para melhorias no app!
        </h2>
      </div>
      <button className="thanks-navigate">
        Criar senha para a área restrita
      </button>
    </section>
  );
}

export default Thanks;
