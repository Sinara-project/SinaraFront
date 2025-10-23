import "./EditWorker.css";
import { use, useEffect, useState } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import Enter from "../../../assets/enter-blue.svg";
import Dropdown from "../../../assets/dropdown-blue.svg";
import DataDropdown from "../../../components/data-dropdown/DataDropdown";
import { useLocation } from "react-router-dom";

function EditWorker() {
  const location = useLocation();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });
  const [permsDropdown, setPermsDropdown] = useState(false);
  const [vacationDropdown, setVacationDropdown] = useState(false);

  const [adaptedPerms, setAdaptedPerms] = useState([]);
  const [adaptedVacation, setAdaptedVacation] = useState([]);

  const { worker } = location.state;

  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [setor, setSetor] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPerms, selectPerms] = useState([]);
  const [vacation, setVacation] = useState();
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

    const digits = value.toString().replace(/\D/g, "");

    const limited = digits.slice(0, 3);

    setWorkload(limited);

    const isDeletingH =
      value.toString().endsWith("h") === false && styleWorkload.endsWith("h");

    if (isDeletingH) {
      setStyleWorkload(limited);
      return;
    }

    const formatted = limited ? `${limited}h` : "";
    setStyleWorkload(formatted);
  };

  const togglePerm = (permId) => {
    const newSelected = selectedPerms.includes(permId)
      ? selectedPerms.filter((id) => id !== permId)
      : [...selectedPerms, permId];
    selectPerms(newSelected);

    setAdaptedPerms((prev) =>
      prev.map((perm) => ({
        ...perm,
        isChecked: newSelected.includes(perm.value),
      }))
    );
  };

  const toggleVacation = (value) => {
    setVacation(value);
    setAdaptedVacation((prev) =>
      prev.map((item) => ({
        ...item,
        isChecked: item.value === value,
      }))
    );
  };

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    setName(worker.nome);
    setSetor(worker.setor);
    setEmail(worker.email);
    setVacation(worker.ferias);
    setWorkload(worker.horas_previstas);
    adjustWorkload(worker.horas_previstas);

    const newPerms = [];
    permsBD.forEach((perm) => {
      let checked = false;
      if (perm.id_funcionario.includes(worker.id)) {
        checked = true;
      }
      const data = {
        name: perm.nome_permissao,
        value: perm.id,
        isChecked: checked,
      };

      newPerms.push(data);
    });

    const newVacation = [
      {
        name: "Férias",
        value: true,
        isChecked: worker.ferias,
      },
      {
        name: "Sem férias",
        value: false,
        isChecked: !worker.ferias,
      },
    ];

    setAdaptedPerms(newPerms);
    setAdaptedVacation(newVacation);
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
    <section className="edit-worker-section">
      <div className="edit-worker-vacationdropdown-container">
        <DataDropdown
          isVisible={vacationDropdown}
          datas={adaptedVacation}
          toggleValue={toggleVacation}
          closeCard={() => {
            setVacationDropdown(!vacationDropdown);
          }}
        />
      </div>
      <ReturnArrow lastEndpoint={"/operarios"} sidebar={true} />
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className="edit-worker-container">
        <span className="edit-worker-text-group">
          <h1 className="edit-worker-h1">Editar operário</h1>
          <p>Edite um operário!</p>
        </span>
        <form className="edit-worker-form">
          <span className="edit-worker-input-group">
            <input
              className={`edit-worker-input`}
              type="text"
              placeholder="Nome"
              id="text"
              value={name}
            />
            <input
              className={`edit-worker-input`}
              type="text"
              placeholder="Setor"
              id="text"
              value={setor}
            />
          </span>
          <input
            className={`edit-worker-input`}
            type="text"
            placeholder="E-mail"
            minLength={2}
            maxLength={50}
            id="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <button
            className={`edit-worker-select-perms`}
            type="button"
            onClick={() => {
              setVacationDropdown(!vacationDropdown);
            }}
          >
            <h4>Férias</h4>
            <img src={Dropdown} alt="" />
          </button>
          <span className="edit-worker-input-group">
            <button
              className={`edit-worker-select-perms`}
              type="button"
              onClick={() => {
                setPermsDropdown(!permsDropdown);
              }}
            >
              <h4>Permissões</h4>
              <img src={Enter} alt="" />
            </button>
            <input
              className="edit-worker-input"
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
            className="edit-worker-navigate-code"
            type="button"
            onClick={createWorker}
          >
            Editar
          </button>
        </form>
      </div>
      <div className="edit-worker-permsdropdown-container">
        <DataDropdown
          isVisible={permsDropdown}
          datas={adaptedPerms}
          toggleValue={togglePerm}
          closeCard={() => {
            setPermsDropdown(!permsDropdown);
          }}
          hasCloseNav={true}
        />
      </div>
    </section>
  );
}

export default EditWorker;
