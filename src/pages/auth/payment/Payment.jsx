import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./Payment.css";
import PixIcon from "../../../assets/pix.svg";
import BoletoCodebar from "../../../assets/boleto-codebar.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";
import {
  getEmpresaIdCode,
  insertEmpresa,
} from "../../../services/sql/enterprise/Enterprise";
import { insertCreditCard } from "../../../services/sql/credit-card/CreditCard";
import Loading from "../../../components/loading/Loading";

function Payment() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [time, setTime] = useState("mensal");
  const [paymentMethod, setPaymentMethod] = useState("cartao");
  const [timeLeft, setTimeLeft] = useState(new Date(0, 0, 0, 0, 15, 0));
  const [minutesLeft, setMinutesLeft] = useState(`15`);
  const [secondsLeft, setSecondsLeft] = useState(`00`);

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [nameInCard, setNameInCard] = useState("");
  const [receiptName, setReceiptName] = useState("");

  const [isFunctionExecuted, setFunctionExecute] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const adjustCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const adjustExpireDate = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    value = value.replace(/(\d{2})(?=\d)/g, "$1/");
    setExpireDate(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.getMinutes() === 0 && prevTime.getSeconds() === 0) {
          clearInterval(interval);
          return prevTime;
        }
        const newTime = new Date(prevTime.getTime() - 1000);
        setMinutesLeft(newTime.getMinutes().toString().padStart(2, "0"));
        setSecondsLeft(newTime.getSeconds().toString().padStart(2, "0"));
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function navigateThanks() {
    if (paymentMethod === "cartao") {
      if (!cardNumber || !cvv || !expireDate || !nameInCard || !receiptName) {
        showSnackbar("Erro", "Preencha os campos corretamente.", "error");
        return;
      }
    }

    if (isFunctionExecuted) {
      showSnackbar("Erro", "Pagamento em andamento. Aguarde.", "error");
      return;
    }

    setIsLoading(true);
    setFunctionExecute(true);

    await sleep(3000);
    let onLogon = JSON.parse(sessionStorage.getItem("onLogon"));
    let basicInfos = {};
    try {
      await insertEmpresa(
        onLogon.cnpj,
        onLogon.name,
        onLogon.password,
        "i23A5678",
        onLogon.image,
        onLogon.email,
        onLogon.sector,
        "",
        2
      );
      basicInfos = await getEmpresaIdCode(onLogon.cnpj);
    } catch (err) {
      showSnackbar(
        "Erro",
        "Houve um erro. Tente novamente mais tarde.",
        "error"
      );
      setIsLoading(false);
      setFunctionExecute(false);
      return;
    }

    onLogon = {
      sector: basicInfos.ramoatuacao,
      code: basicInfos.codigo,
      id: basicInfos.id,
      email: basicInfos.email,
      image: basicInfos.imagemUrl,
      name: basicInfos.name,
    };
    sessionStorage.setItem("onLogon", JSON.stringify(onLogon));

    // try {
    //   await insertCreditCard(cardNumber, nameInCard, expireDate, cvv, onLogon.id);
    // } catch (err) {
    //   showSnackbar(
    //     "Erro",
    //     "Houve um erro. Tente novamente mais tarde.",
    //     "error"
    //   );
    //   setIsLoading(false);
    //   setFunctionExecute(false);
    //   return;
    // }

    showSnackbar("Sucesso", "Pagamento efetuado! Redirecionando...", "success");
    await sleep(2000);
    setIsLoading(false);
    navigate("/obrigado");
  }

  return (
    <section className="payment-section">
      {isLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <ReturnArrow lastEndpoint={"/escolher-plano"} />
      <div className="payment-card">
        <h1 className="payment-title">Pagamento</h1>
        <div className="payment-container">
          <div className="payment-infos">
            <div className="payment-info">
              <h3>
                <strong>Plano: </strong>Sinara Premium
              </h3>
              <h3>'Acesso completo ao sistema'</h3>
            </div>
            <div className="payment-info">
              <h3>
                <strong>Perído: </strong>
                {time.replace(time[0], time[0].toUpperCase())}
              </h3>
              <h3>
                <strong>
                  Valor:{" "}
                  <span className="payment-price">
                    R${time === "mensal" ? "2.499,90" : "24.999,90"}
                  </span>
                </strong>
              </h3>
            </div>
            <div className="payment-time-select">
              <h3>Selecionar período</h3>
              <div className="payment-time-container">
                <div
                  className={`payment-time-slider ${
                    time === "anual" ? "right" : ""
                  }`}
                ></div>
                <div
                  className={`payment-time-toggle ${
                    time === "mensal" ? "selected" : ""
                  }`}
                  onClick={() => setTime("mensal")}
                >
                  <strong>Mensal</strong>
                </div>
                <div
                  className={`payment-time-toggle ${
                    time === "anual" ? "selected" : ""
                  }`}
                  onClick={() => setTime("anual")}
                >
                  <strong>Anual</strong>
                </div>
              </div>
            </div>
            <div className="payment-select-ptype">
              <h3>Método de pagamento</h3>
              <div className="payment-ptype-container">
                <div
                  className={`payment-ptype-slider ${
                    paymentMethod === "pix"
                      ? "middle"
                      : paymentMethod === "boleto"
                      ? "right"
                      : ""
                  }`}
                ></div>
                <div
                  className={`payment-ptype-toggle ${
                    paymentMethod === "cartao" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("cartao")}
                >
                  <strong>Cartão</strong>
                </div>
                <div
                  className={`payment-ptype-toggle ${
                    paymentMethod === "pix" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  <strong>Pix</strong>
                </div>
                <div
                  className={`payment-ptype-toggle ${
                    paymentMethod === "boleto" ? "active" : ""
                  }`}
                  onClick={() => setPaymentMethod("boleto")}
                >
                  <strong>Boleto</strong>
                </div>
              </div>
            </div>
          </div>
          {paymentMethod === "cartao" && (
            <div className="payment-inputs">
              <input
                type="text"
                placeholder="N° do cartão*"
                required
                id="cardNumber"
                maxLength={19}
                value={cardNumber}
                onChange={adjustCardNumber}
                className="payment-input"
                disabled={isLoading}
              />
              <div className="payment-input-group">
                <input
                  type="text"
                  placeholder="CVV*"
                  required
                  id="cvv"
                  maxLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  className="payment-input"
                  disabled={isLoading}
                />
                <input
                  type="text"
                  placeholder="Validade*"
                  required
                  maxLength={5}
                  value={expireDate}
                  onChange={adjustExpireDate}
                  id="cardExpireDate"
                  className="payment-input"
                  disabled={isLoading}
                />
              </div>
              <input
                type="text"
                placeholder="Nome no cartão*"
                required
                id="cardEnterpriseName"
                onChange={(e) => setNameInCard(e.target.value)}
                className="payment-input"
                disabled={isLoading}
              />
              <input
                type="text"
                placeholder="Nome no recibo"
                id="receiptEnterpriseName"
                onChange={(e) => setReceiptName(e.target.value)}
                className="payment-input"
                disabled={isLoading}
              />
              <button
                className="payment-navigate-thanks"
                onClick={navigateThanks}
                disabled={isLoading}
              >
                Avançar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Payment;
