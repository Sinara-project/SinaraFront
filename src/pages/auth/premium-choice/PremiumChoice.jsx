import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./PremiumChoice.css";
import { useNavigate } from "react-router-dom";

function PremiumChoice() {
    const navigate = useNavigate();

    const navigateThanks = () => {
        navigate("/obrigado");
    }

    return (
        <section className="premium-section">
            <ReturnArrow lastEndpoint={"/escolher-plano"} />
            <h1 className="premium-title">Selecione um tipo:</h1>
            <div className="premium-choices">
                    <div className="premium-choice-card" onClick={navigateThanks}>
                        <h1 className="premium-choice-title">MENSAL</h1>
                        <h2 className="premium-choice-price">R$ 2.499,99 ao mês</h2>
                    </div>
                    <div className="premium-choice-card" onClick={navigateThanks}>
                        <h1 className="premium-choice-title">ANUAL</h1>
                        <h2 className="premium-choice-price">R$ 24.999,99 ao ano</h2>
                    </div>
            </div>
        </section>
    );
}

export default PremiumChoice;