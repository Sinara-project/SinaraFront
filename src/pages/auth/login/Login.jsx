import "./Login.css";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";

function Login() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });
  const [errors, setErrors] = useState({ cnpj: false, password: false });

  const empresas = [
    {
      id: 1,
      cnpj: "43.442.344/0001-34",
      email: "friboi@gmail.com",
      nome: "Friboi",
      senha: "Friboi@123",
      senhaRestrita: "Friboi@123"
    },
  ];

  const adjustCNPJ = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    if (value.length > 5)
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    if (value.length > 8) value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    if (value.length > 12) value = value.replace(/(\d{4})(\d)/, "$1-$2");
    setCnpj(value);
  };

  const testCnpj = () =>
    /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/0001-?[0-9]{2}/.test(cnpj);

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const navigateLoginConfirm = async () => {
    setErrors({ cnpj: false, password: false });

    if (!cnpj || !password) {
      showSnackbar("Erro", "Preencha todos os campos obrigatórios.", "error");
      return;
    }

    if (!testCnpj()) {
      setErrors((prev) => ({ ...prev, cnpj: true }));
      showSnackbar("Erro", "CNPJ inválido.", "error");
      return;
    }

    const empresa = empresas.find((e) => e.cnpj === cnpj);

    if (!empresa) {
      setErrors((prev) => ({ ...prev, cnpj: true }));
      showSnackbar("Erro", "Empresa não encontrada.", "error");
      return;
    }

    if (empresa.senha !== password) {
      setErrors((prev) => ({ ...prev, password: true }));
      showSnackbar("Erro", "Senha incorreta.", "error");
      return;
    }

    const imagemEmpresa =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7R72IzYtgQMU72EdMg1Gyy1AGX9Rp7eu5Dg&s";
      // getImagemDeEmpresaPorCnpjNoGoverno(empresa.cnpj)

    const onLogin = {
      id: empresa.id,
      cnpj: empresa.cnpj,
      name: empresa.nome,
      image: imagemEmpresa,
      restrictPassword: empresa.senhaRestrita
    };

    sessionStorage.setItem("onLogin", JSON.stringify(onLogin));

    navigate("/confirmar-entrada");
  };

  const navigateLogon = () => {
    navigate("/cadastrar");
  };

  return (
    <section className="login-section">
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className="login-container">
        <span className="login-text-group">
          <h1 className="login-h1">Faça login</h1>
          <p>Faça login como uma empresa!</p>
        </span>
        <form className="login-form" action="submit">
          <input
            className={`login-input ${errors.cnpj ? "error" : ""}`}
            type="text"
            placeholder="CNPJ"
            onChange={adjustCNPJ}
            value={cnpj}
            maxLength={18}
          />
          <input
            className={`login-input ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="Confirmar senha"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-navigate-code"
            type="button"
            onClick={navigateLoginConfirm}
          >
            Avançar
          </button>
        </form>
        <p className="logon-navigate-login" onClick={navigateLogon}>
          Não possui uma conta? <strong>Cadastre-se!</strong>
        </p>
      </div>
    </section>
  );
}

export default Login;
