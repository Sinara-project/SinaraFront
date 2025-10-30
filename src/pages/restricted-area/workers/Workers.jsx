import "./Workers.css";
import Add from "../../../assets/create.svg";
import Search from "../../../assets/search.svg";
import User from "../../../assets/user.svg";
import Edit from "../../../assets/edit-blue.svg";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteWorkerById,
  editWorker,
  getWorkersByEnterpriseId,
} from "../../../services/sql/workers/Workers";
import { getWorkerLastTurn } from "../../../services/sql/points/Points";
import Loading from "../../../components/loading/Loading";

function Workers() {
  const navigate = useNavigate();

  const [loadPage, setLoad] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [selectedPerm, selectPerm] = useState();
  const [createPerm, setCreate] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);

  const openAddWorker = (perm) => {
    selectPerm(perm);
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [loadPage]);

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

  const deleteWorker = async (id) => {
    try {
      setLoading(true);
      console.log(id);
      
      const data = await deleteWorkerById(id);

      console.log(data);
      
      setLoad(!loadPage);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleWorketActivity = async (worker) => {
    try {
      setLoading(true);
      await editWorker(
        worker.id,
        worker.idEmpresa,
        worker.url,
        worker.imagemUrl,
        worker.cpf,
        worker.nome,
        worker.email,
        worker.cargo,
        worker.setor,
        worker.ferias,
        !worker.ativo,
        worker.senha,
        worker.horasPrevistas
      );
      setLoad(!loadPage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="workers-section">
      {isLoading && (
        <div className="workers-loading">
          <Loading />
        </div>
      )}
      <section className="workers-content">
        <ReturnArrow lastEndpoint={"/menu-area-restrita"} sidebar={true} />
        <h1>Gerenciar operários</h1>
        <div className="workers-one">
          <div className="workers-searchbar">
            <img src={Search} alt="" />
            <input
              type="text"
              placeholder="Pesquisar operário"
              onChange={(e) => searchWorker(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              navigate("/visualizar-pontos");
            }}
          >
            <h4>Registros de ponto</h4>
          </button>
        </div>

        <div className="workers-container">
          {workers.map((worker) => (
            <div key={worker.id} className="workers-card">
              <span className="workers-main-actions">
                <img
                  src={worker.imagemUrl || User}
                  className="workers-photo"
                  alt=""
                />
                <div className="workers-infos">
                  <nav className="workers-nav">
                    <div className="workers-main">
                      <h2>{worker.nome}</h2>
                      <div
                        className={`workers-status ${
                          worker.ativo ? "active" : "inactive"
                        }`}
                      ></div>
                    </div>
                    <img
                      src={Edit}
                      className="workers-edit-icon"
                      onClick={() =>
                        navigate("/editar-operario", { state: { worker } })
                      }
                    />
                  </nav>
                  <div className="workers-sec">
                    <p>Setor: {worker.setor}</p>
                    <p>
                      Último turno:{" "}
                      {worker.ultimo_ponto ? worker.ultimo_ponto : "-"}
                    </p>
                  </div>
                  <div className="workers-options">
                    <button
                      className="workers-delete"
                      onClick={() => {
                        deleteWorker(worker.id);
                      }}
                    >
                      Deletar
                    </button>
                    {worker.ativo ? (
                      <button
                        onClick={() => {
                          toggleWorketActivity(worker);
                        }}
                      >
                        Desativar
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          toggleWorketActivity(worker);
                        }}
                      >
                        Ativar
                      </button>
                    )}
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Workers;
