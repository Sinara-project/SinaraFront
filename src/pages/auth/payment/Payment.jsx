import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import "./Payment.css";
import PixIcon from "../../../assets/pix.svg";
import BoletoCodebar from "../../../assets/boleto-codebar.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, use } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";

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

  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });
  
  const [errors, setErrors] = useState({
    cnpj: false,
    email: false,
    password: false,
    confirm: false,
  });

  const showSnackbar = async (title, message, type, timeSleeping) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const adjustCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const adjustExpireDate = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.slice(0, 4);
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
    if (paymentMethod == "cartao") {
      if (!cardNumber || !cvv || !expireDate || !nameInCard || !receiptName) {
        showSnackbar("Erro", "Preencha os campos corretamente.", "error", 2000);
        return;
      }
    }

    if (isFunctionExecuted) {
      showSnackbar("Erro", "Pagamento em andamento. Aguarde.", "error", 1500);
    } else {
      setFunctionExecute(true);
      await sleep(3000);
      let onLogon = JSON.parse(sessionStorage.getItem("onLogon"));
      // const basicInfos = inserirEmpresa(itens).id;
      const basicInfos = {
        id: 2,
        code: 'aaa001'
      }
      onLogon.id = basicInfos.id;
      onLogon.code = basicInfos.code;
      onLogon.password = null;
      sessionStorage.setItem("onLogon", JSON.stringify(onLogon));
      showSnackbar("Sucesso", "Pagamento efetuado! Redirecionando...", "success", 2000);
      await sleep(2000);
      navigate("/obrigado");
    }
  }

  return (
    <section className="payment-section">
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
              />
              <div className="payment-input-group">
                <input
                  type="text"
                  placeholder="CVV*"
                  required
                  id="cvv"
                  maxLength={3}
                  onChange={(e) => setCvv(e.target.value)}
                  className="payment-input"
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
                />
              </div>
              <input
                type="text"
                placeholder="Nome no cartão*"
                required
                id="cardEnterpriseName"
                onChange={(e) => setNameInCard(e.target.value)}
                className="payment-input"
              />
              <input
                type="text"
                placeholder="Nome no recibo"
                id="receiptEnterpriseName"
                onChange={(e) => setReceiptName(e.target.value)}
                className="payment-input"
              />
              <button
                className="payment-navigate-thanks"
                onClick={navigateThanks}
              >
                Avançar
              </button>
            </div>
          )}
          {paymentMethod === "pix" && (
            <div className="payment-pix-pay">
              <h3>
                Pague em:{" "}
                <span className="payment-regressive-time">{`${minutesLeft}:${secondsLeft}`}</span>
              </h3>
              <div className="payment-pix-area">
                <h3>
                  Código{" "}
                  <img
                    src={PixIcon}
                    alt="Ícone PIX"
                    className="payment-pix-icon"
                  />
                </h3>
                <div className="payment-pix-code">
                  <h3>
                    00020126580014BR.GOV.BCB.PIX0136d4b5f7e8-3f4a-4e8e-9c3a-2b7b6e6c6f1a52040000530398654041.005802BR5925Sinara
                    Tecnologia em Informática6009SAOPAULO62070503***6304B14F
                  </h3>
                </div>
              </div>
              {timeLeft.getMinutes() === 0 && timeLeft.getSeconds() === 0 ? (
                <button className="payment-navigate-disabled">Avançar</button>
              ) : (
                <button
                  className="payment-navigate-thanks"
                  onClick={navigateThanks}
                >
                  Avançar
                </button>
              )}
            </div>
          )}
          {paymentMethod === "boleto" && (
            <div className="payment-boleto-pay">
              <div className="payment-boleto-area">
                <h3>Boleto</h3>
                <div className="payment-boleto-codebar">
                  <img src={BoletoCodebar} alt="Código de barras de boleto" />
                </div>
              </div>
              {timeLeft.getMinutes() === 0 && timeLeft.getSeconds() === 0 ? (
                <button className="payment-navigate-disabled">Avançar</button>
              ) : (
                <button
                  className="payment-navigate-thanks"
                  onClick={navigateThanks}
                >
                  Avançar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Payment;
