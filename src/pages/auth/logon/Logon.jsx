import "./Logon.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";
import { getEnterprise } from "../../../services/external/enterprise/Enterprise";
import { getEnterpriseLogo } from "../../../services/external/image/Image";
import Loading from "../../../components/loading/Loading";

function Logon() {
  const navigate = useNavigate();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const [empresa, setEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Cadastro";
    localStorage.removeItem("currentCNPJ");
    sessionStorage.removeItem("inLogonCNPJ");
  }, []);

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
    /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/.test(cnpj);
  const testEmail = () => /.+@.+\.com/.test(email);
  const testPassword = () =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]).{8,}$/.test(
      password
    );
  const testConfirmPasswordIsEqualToPassword = () =>
    password === confirmPassword;

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const getEnterpriseInExternal = async () => {
    try {
      const data = await getEnterprise(cnpj.replace(/\D/g, ""));
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getEnterpriseLogoInExternal = async (domain) => {
    try {
      const data = await getEnterpriseLogo(domain);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const navigateInsertCode = async () => {
    setErrors({ cnpj: false, email: false, password: false, confirm: false });

    if (!cnpj || !email || !password || !confirmPassword) {
      showSnackbar(
        "Erro",
        "Preencha todos os campos obrigatórios. (*)",
        "error"
      );
      return;
    }

    if (!testCnpj()) {
      setErrors((input) => ({ ...input, cnpj: true }));
      showSnackbar(
        "Erro",
        "O CNPJ inserido não confere com o padrão governamental.",
        "error"
      );
      return;
    }

    if (!testEmail()) {
      setErrors((input) => ({ ...input, email: true }));
      showSnackbar("Erro", "O e-mail inserido não está correto.", "error");
      return;
    }

    if (!testPassword()) {
      setErrors((input) => ({ ...input, password: true }));
      showSnackbar(
        "Erro",
        "A senha deve ter pelo menos 8 caracteres, 1 símbolo, 1 letra maiúscula e 1 número.",
        "error"
      );
      return;
    }

    if (!testConfirmPasswordIsEqualToPassword()) {
      setErrors((input) => ({ ...input, confirm: true }));
      showSnackbar("Erro", "As senhas não conferem.", "error");
      return;
    }

    setIsLoading(true);

    const enterprise = await getEnterpriseInExternal();

    setIsLoading(false);

    if (!enterprise || enterprise.code == 404) {
      showSnackbar("Erro", "A empresa não existe", "error");
      return;
    }

    setIsLoading(true);

    let image = "semImagem";

    if (enterprise.emails.length > 0) {
      image = await getEnterpriseLogoInExternal(enterprise.emails[0].domain);
    }

    setIsLoading(false);

    const onLogon = {
      cnpj: Number(cnpj.replace(/\D/g, "")),
      name: enterprise.company.name,
      image: image,
      sector: sector,
      password: password,
      email: email,
    };

    sessionStorage.setItem("onLogon", JSON.stringify(onLogon));

    navigate("/inserir-codigo");
  };

  const navigateLogin = () => navigate("/entrar");

  return (
    <section className="logon-section">
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
      <div className="logon-container">
        <span className="logon-text-group">
          <h1 className="logon-h1">Faça cadastro</h1>
          <p>Faça o cadastro de sua empresa!</p>
        </span>
        <form className="logon-form" action="submit">
          <span className="logon-input-group">
            <input
              className={`logon-input ${errors.cnpj ? "error" : ""}`}
              type="text"
              placeholder="CNPJ*"
              value={cnpj}
              onChange={adjustCNPJ}
              id="cnpj"
              maxLength={18}
              disabled={isLoading}
            />
            <input
              className="logon-input"
              type="text"
              placeholder="Setor"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              id="sector"
              disabled={isLoading}
            />
          </span>
          <input
            className={`logon-input ${errors.email ? "error" : ""}`}
            type="text"
            placeholder="E-mail da empresa*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            disabled={isLoading}
          />
          <input
            className={`logon-input ${errors.password ? "error" : ""}`}
            type="password"
            placeholder="Senha*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            disabled={isLoading}
          />
          <input
            className={`logon-input ${errors.confirm ? "error" : ""}`}
            type="password"
            placeholder="Confirmar senha*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            disabled={isLoading}
          />
          <button
            className="logon-navigate-code"
            onClick={navigateInsertCode}
            type="button"
            disabled={isLoading}
          >
            Avançar
          </button>
        </form>
        <p className="logon-navigate-login" onClick={navigateLogin}>
          Já tem uma conta? <strong>Faça login!</strong>
        </p>
      </div>
    </section>
  );
}

export default Logon;
