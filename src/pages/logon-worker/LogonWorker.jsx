import "./LogonWorker.css";
import { use, useEffect, useState } from "react";
import Snackbar from "../../components/snackbar/Snackbar";
import ReturnArrow from "../../components/return-arrow/ReturnArrow";
import Enter from "../../assets/enter-blue.svg";
import DataDropdown from "../../components/data-dropdown/DataDropdown";

function LogonWorker() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });
  const [permsDropdown, setPermsDropdown] = useState(false);
  const [adaptedPerms, setAdaptedPerms] = useState([]);

  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");
  const [selectedPerms, selectPerms] = useState([]);
  const [workload, setWorkload] = useState("");

  const [styleWorkload, setStyleWorkload] = useState("");

  const permsBD = [
    {
      id: 1,
      idEmpresa: 1,
      nome_permissao: "Forms de captação",
      id_funcionario: [1, 3],
    },
    {
      id: 2,
      idEmpresa: 1,
      nome_permissao: "Forms de pré-tratamento",
      id_funcionario: [3],
    },
    {
      id: 3,
      idEmpresa: 1,
      nome_permissao: "Forms de tratamento primário",
      id_funcionario: [2],
    },
  ];

  const adjustCPF = (value) => {
    const digits = (value || "").replace(/\D/g, "");

    const limited = digits.slice(0, 11);

    const formatted = limited
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d{1,2})$/, ".$1-$2");

    setCpf(formatted);
  };

  const adjustWorkload = (value) => {
    if (!value) {
      setWorkload("");
      setStyleWorkload("");
      return;
    }

    const digits = value.replace(/\D/g, "");

    const limited = digits.slice(0, 3);

    setWorkload(limited);

    const isDeletingH =
      value.endsWith("h") === false && styleWorkload.endsWith("h");

    if (isDeletingH) {
      setStyleWorkload(limited);
      return;
    }

    const formatted = limited ? `${limited}h` : "";
    setStyleWorkload(formatted);
  };

  const togglePerm = (permId) => {
    if (selectedPerms.includes(permId)) {
      selectPerms((prev) => prev.filter((item) => item !== permId));
    } else {
      selectPerms((prev) => [...prev, permId]);
    }

    console.log(selectedPerms);
  };

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const newPerms = [];
    permsBD.forEach((perm) => {
      const data = {
        name: perm.nome_permissao,
        value: perm.id,
      };

      newPerms.push(data);
    });

    setAdaptedPerms(newPerms);
    console.log(adaptedPerms);
  }, []);

  const generateDefaultPassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const id = JSON.parse(localStorage.getItem("user")).id;

    const l1 = letters[(id >> 0) % 26];
    const l2 = letters[(id >> 5) % 26];
    const l3 = letters[(id >> 10) % 26];

    const digits = String(id % 1000).padStart(3, "0");

    return `${l1}${l2}${l3}${digits}`;
  };

  const createWorker = () => {
    const trueCpf = cpf.replace(/\D/g, "");
    const workerEmail = email.trim();
    const workerName = name.trim();
    const workerSector = sector.trim();
    const workerWorkload = parseInt(workload, 10);

    if (!trueCpf || trueCpf.length !== 11) {
      showSnackbar("Erro", "O CPF deve ter 11 caracteres", "error");
      return;
    }

    if (!workerName) {
      showSnackbar("Erro", "O nome é obrigatório", "error");
      return;
    }

    if (!workerEmail || !/.+@.+\.com/.test(workerEmail)) {
      showSnackbar("Erro", "E-mail inválido", "error");
      return;
    }

    if (!workerSector || workerSector.length < 2) {
      showSnackbar("Erro", "O setor deve ter pelo menos 2 caracteres", "error");
      return;
    }

    if (!workload || isNaN(workerWorkload) || workerWorkload <= 0) {
      showSnackbar("Erro", "Informe uma carga horária válida", "error");
      return;
    }

    if (workload > 744) {
      showSnackbar(
        "Erro",
        "A carga horária não pode ultrapassar 744 horas (1 mês)",

        "error"
      );
      return;
    }

    if (!selectedPerms.length) {
      showSnackbar("Erro", "Selecione ao menos uma permissão", "error");
      return;
    }

    const worker = {
      cpf: trueCpf,
      nome: workerName,
      email: workerEmail,
      setor: workerSector,
      id_empresa: JSON.parse(localStorage.getItem("user")).id,
      horas_previstas: workerWorkload,
      ferias: false,
      ativo: true,
      senha: generateDefaultPassword(),
    };

    // criarFuncionario(worker) => {
    // getFuncionarioPorCPF(cpf) => {
    const funcionario = {
      id: 1,
    };

    selectedPerms.forEach((id) => {
      // salvarFuncionarioNaPermissao(funcionario.id)
      console.log(`A permissão ${id} recebeu o id do funcionário!`);
    });
    // }
    // }

    console.log("Funcionário criado:", worker);
    showSnackbar(
      "Funcionário criado",
      `Funcionário criado com sucesso! A senha padrão da sua empresa é: ${generateDefaultPassword()}`,
      "success"
    );
  };

  return (
    <section className="logon-worker-section">
      <ReturnArrow lastEndpoint={"/menu-area-restrita"} sidebar={true} />
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className="logon-worker-container">
        <span className="logon-worker-text-group">
          <h1 className="logon-worker-h1">Faça um cadastro</h1>
          <p>Faça o cadastro de um operário!</p>
        </span>
        <form className="logon-worker-form">
          <span className="logon-worker-input-group">
            <input
              className={`logon-worker-input`}
              type="text"
              placeholder="CPF"
              value={cpf}
              maxLength={14}
              id="text"
              onChange={(e) => {
                adjustCPF(e.target.value);
              }}
            />
            <input
              className={`logon-worker-input`}
              type="text"
              placeholder="Setor"
              minLength={2}
              maxLength={50}
              id="text"
              onChange={(e) => {
                setSector(e.target.value);
              }}
            />
          </span>
          <input
            className={`logon-worker-input`}
            type="text"
            placeholder="Nome"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className={`logon-worker-input`}
            type="email"
            placeholder="E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="logon-worker-input-group">
            <button
              className={`logon-worker-select-perms`}
              type="button"
              onClick={() => {
                setPermsDropdown(!permsDropdown);
              }}
            >
              <h4>Permissões</h4>
              <img src={Enter} alt="" />
            </button>
            <input
              className="logon-worker-input"
              type="text"
              placeholder="Carga Horária"
              id="sector"
              maxLength={4}
              value={styleWorkload}
              onChange={(e) => {
                adjustWorkload(e.target.value);
              }}
            />
          </span>
          <button
            className="logon-worker-navigate-code"
            type="button"
            onClick={createWorker}
          >
            Cadastrar
          </button>
        </form>
      </div>
      <div className="logon-worker-datadropdown-container">
        <DataDropdown
          isVisible={permsDropdown}
          datas={adaptedPerms}
          toggleValue={togglePerm}
          closeCard={() => {
            setPermsDropdown(!permsDropdown);
          }}
        />
      </div>
    </section>
  );
}

export default LogonWorker;
