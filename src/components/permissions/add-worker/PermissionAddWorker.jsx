import "./PermissionAddWorker.css";
import Return from "../../../assets/return-arrow.svg";
import Search from "../../../assets/search.svg";
import Add from "../../../assets/create.svg";
import { useEffect, useState } from "react";
import { insertWorkerInPermission } from "../../../services/mongoDB/Permissions/Permissions";
import Snackbar from "../../snackbar/Snackbar";
import Loading from "../../loading/Loading";
import { getWorkersByEnterpriseId } from "../../../services/sql/workers/Workers";
import { getWorkerLastTurn } from "../../../services/sql/points/Points";

function PermissionAddWorker({ isVisible, closeCard, perm }) {
  const [workers, setWorkers] = useState([]);
  const [truePerm, setPerm] = useState(perm);
  const [isLoading, setLoading] = useState(false);
  const [allWorkers, setAllWorkers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      try {
        const workersData = await getWorkersByEnterpriseId(
          JSON.parse(localStorage.getItem("user")).id
        );

        const workersWithLastTurn = await Promise.all(
          workersData.map(async (dat) => {
            try {
              const lastPoint = await getWorkerLastTurn(dat.id);
              return { ...dat, ultimo_ponto: lastPoint };
            } catch {
              return { ...dat, ultimo_ponto: null };
            }
          })
        );

        setWorkers(workersWithLastTurn);
        setAllWorkers(workersWithLastTurn);
      } catch (err) {
        showSnackbar("Erro", "Não foi possível carregar os trabalhadores.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
    setPerm(perm);
  }, [perm]);

  const searchWorker = (item) => {
    const query = item.trim();
    if (!query) {
      setWorkers(allWorkers);
      return;
    }

    const regex = new RegExp(query, "i");
    const filteredWorkers = allWorkers.filter((func) => regex.test(func.nome));
    setWorkers(filteredWorkers);
  };

  const addWorker = async (id) => {
    setLoading(true);

    const currentIds = Array.isArray(truePerm.idOperario)
      ? [...truePerm.idOperario]
      : [];

    if (!currentIds.includes(id)) {
      const newPerm = { ...truePerm, idOperario: [...currentIds, id] };

      try {
        await insertWorkerInPermission(newPerm.id, [id]);

        showSnackbar(
          "Funcionário adicionado",
          "O funcionário foi adicionado à permissão!",
          "success"
        );
        setPerm(newPerm);
      } catch (e) {
        showSnackbar(
          "Erro",
          "Ocorreu um erro. Tente novamente mais tarde.",
          "error"
        );
      }
    }

    setLoading(false);
  };

  return (
    <section
      className={`permission-add-worker-section ${isVisible ? "active" : ""}`}
    >
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      {isLoading && (
        <div className="permission-add-worker-loading">
          <Loading />
        </div>
      )}
      <div
        className={`permission-add-worker-card ${isVisible ? "active" : ""}`}
      >
        <img
          src={Return}
          alt=""
          className="permission-add-return"
          onClick={() => closeCard()}
        />
        <h1>Adicionar operários</h1>
        <div className="permission-add-searchbar">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Pesquisar operário"
            onChange={(e) => searchWorker(e.target.value)}
          />
        </div>
        <span className="permissions-add-worker-list">
          {truePerm &&
            workers
              .filter((func) => !truePerm.idOperario?.includes(func.id))
              .map((func) => (
                <div className="permissions-add-worker-worker" key={func.id}>
                  <h3>{func.nome}</h3>
                  <p>Último turno: {func.ultimo_ponto ?? "-"}</p>
                  <div>
                    <button onClick={() => addWorker(func.id)}>
                      <h4>Adicionar</h4>
                      <img src={Add} alt="" />
                    </button>
                  </div>
                </div>
              ))}
        </span>
      </div>
    </section>
  );
}

export default PermissionAddWorker;
