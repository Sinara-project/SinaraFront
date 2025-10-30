import "./EditWorker.css";
import { use, useEffect, useState } from "react";
import Snackbar from "../../../components/snackbar/Snackbar";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import Enter from "../../../assets/enter-blue.svg";
import Dropdown from "../../../assets/dropdown-blue.svg";
import DataDropdown from "../../../components/data-dropdown/DataDropdown";
import { useLocation } from "react-router-dom";
import { editWorker } from "../../../services/sql/workers/Workers";
import Loading from "../../../components/loading/Loading";
import {
  editPermission,
  getPermissionById,
  getPermissionsByIdEmpresa,
} from "../../../services/mongoDB/Permissions/Permissions";

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

  const [isLoading, setLoading] = useState(false);

  const { worker } = location.state;

  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPerms, selectPerms] = useState([]);
  const [vacation, setVacation] = useState();
  const [workload, setWorkload] = useState("");

  const [styleWorkload, setStyleWorkload] = useState("");

  const [permsBD, setPerms] = useState([]);

  const adjustWorkload = (value) => {
    if (value == null || value === "") {
      setWorkload("");
      setStyleWorkload("");
      return;
    }

    const digits = value.toString().replace(/\D/g, "");
    const limited = digits.slice(0, 3);
    setWorkload(limited);

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
    console.log(worker);

    setName(worker.nome);
    setSector(worker.setor);
    setEmail(worker.email);
    setVacation(worker.ferias);
    let horas = "";

    if (worker.horasprevistas !== null && worker.horasprevistas !== undefined) {
      const str = worker.horasprevistas.toString();

      const digits = str.match(/\d+/)?.[0] || "";

      horas = digits;
    }

    setWorkload(horas);
    setStyleWorkload(horas ? `${horas}h` : "");

    setLoading(true);

    async function getPerms() {
      try {
        const data = await getPermissionsByIdEmpresa(
          JSON.parse(localStorage.getItem("user")).id
        );

        setPerms(data);

        const newPerms = data.map((perm) => ({
          name: perm.nomePermissao,
          value: perm.id,
          isChecked: perm.idOperario.includes(worker.id),
        }));

        const initialSelectedPerms = newPerms
          .filter((perm) => perm.isChecked)
          .map((perm) => perm.value);

        setAdaptedPerms(newPerms);
        selectPerms(initialSelectedPerms);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    getPerms();

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
    setAdaptedVacation(newVacation);
  }, []);

  const editWorkerIn = async () => {
    setLoading(true);

    const workerEmail = email.trim();
    const workerName = name.trim();
    const workerSector = sector.trim();
    const workerWorkload = parseInt(workload, 10);

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

    try {
      await editWorker(
        worker.id,
        worker.idEmpresa,
        worker.url,
        worker.imagemUrl,
        worker.cpf,
        name,
        email,
        sector,
        sector,
        vacation,
        worker.ativo,
        worker.senha,
        Number(workload)
      );
    } catch (err) {
      showSnackbar(
        "Erro",
        "Houve um erro. Tente novamente mais tarde.",
        "error"
      );
    }

    await Promise.all(
      selectedPerms.map(async (permId) => {
        try {
          const perm = await getPermissionById(permId);

          let updatedIds = [...perm.idOperario];

          if (!updatedIds.includes(worker.id)) {
            updatedIds.push(worker.id);
          }

          const newPerm = {
            ...perm,
            idOperario: updatedIds,
          };

          await editPermission(
            newPerm.id,
            newPerm.idEmpresa,
            newPerm.nomePermissao,
            newPerm.idOperario
          );
        } catch (err) {
          showSnackbar(
            "Erro",
            "Houve um erro ao atualizar as permissões.",
            "error"
          );
        }
      })
    );

    setLoading(false);

    showSnackbar(
      "Funcionário editado",
      `Funcionário editado com sucesso!`,
      "success"
    );
  };

  return (
    <section className="edit-worker-section">
      {isLoading && (
        <div className="edit-worker-loading">
          <Loading />
        </div>
      )}
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
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <input
              className={`edit-worker-input`}
              type="text"
              placeholder="Setor"
              id="text"
              onChange={(e) => {
                setSector(e.target.value);
              }}
              value={sector}
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
            onClick={editWorkerIn}
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
