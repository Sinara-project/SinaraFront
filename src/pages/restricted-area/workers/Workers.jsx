import "./Workers.css";
import Add from "../../../assets/create.svg";
import Search from "../../../assets/search.svg";
import User from "../../../assets/user.svg";
import Edit from "../../../assets/edit-blue.svg";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import CreatePermission from "../../../components/permissions/create-permission/CreatePermission";
import PermissionAddWorker from "../../../components/permissions/add-worker/PermissionAddWorker";
import { useNavigate } from "react-router-dom";

function Workers() {
  const navigate = useNavigate();

  const [selectedPerm, selectPerm] = useState();
  const [createPerm, setCreate] = useState(false);
  const [workers, setWorkers] = useState([]);

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

  // getAllOperarios()

  const funcionariosBD = [
    {
      id: 1,
      nome: "João Batista",
      // Supondo que há query pra isso
      setor: "Abatimento",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 18, 30),
      },
      ativo: true,
      imagem_url: "",
      email: "joaobatista@friboi.com",
      horas_previstas: 230,
      ferias: false,
    },
    {
      id: 2,
      nome: "Júlia Ramos",
      setor: "Tratamento de água",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 19, 0),
      },
      ativo: false,
      imagem_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQz5zW-5LyUpoue1GHUahmDU_g7AscE8wqbA&s",
      email: "juliaramos@friboi.com",
      horas_previstas: 0,
      ferias: true,
    },
    {
      id: 3,
      setor: "Tratamento de água",
      nome: "Rodrigo Soares",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 20, 30),
      },
      ativo: true,
      imagem_url: "",
      email: "rodrigosoares@friboi.com",
      horas_previstas: 400,
      ferias: false,
    },
  ];

  const openAddWorker = (perm) => {
    selectPerm(perm);
  };

  useEffect(() => {
    setWorkers(funcionariosBD);
  }, []);

  const searchWorker = (item) => {
    const regex = new RegExp(item, "i");
    const filteredWorkers = funcionariosBD.filter((func) => {
      return regex.test(func.nome);
    });
    setWorkers(filteredWorkers);
  };

  return (
    <section className="workers-section">
      <section className="workers-content">
        <ReturnArrow lastEndpoint={"/menu-area-restrita"} sidebar={true} />
        <h1>Gerenciar operários</h1>
        <div className="workers-one">
          <div className="workers-searchbar">
            <img src={Search} alt="" />
            <input
              type="text"
              placeholder="Pesquisar operário"
              onChange={(e) => {
                searchWorker(e.target.value);
              }}
            />
          </div>

          <button>
            <h4>Registros de ponto</h4>
          </button>
        </div>
        <div className="workers-container">
          {workers.map((worker) => (
            <div className="workers-card">
              <span className="workers-main-actions">
                {worker.imagem_url ? (
                  <img src={worker.imagem_url} className="workers-photo" />
                ) : (
                  <img src={User} className="workers-photo" />
                )}

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
                      onClick={() => {
                        navigate("/editar-operario", { state: { worker } });
                      }}
                    ></img>
                  </nav>
                  <div className="workers-sec">
                    <p>Setor: {worker.setor}</p>
                    <p>
                      Último turno:{" "}
                      {worker.ultimo_ponto.horario_saida
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                      /{worker.ultimo_ponto.horario_saida.getMonth() + 1}/
                      {worker.ultimo_ponto.horario_saida.getFullYear()} -{" "}
                      {worker.ultimo_ponto.horario_saida.getHours()}:
                      {worker.ultimo_ponto.horario_saida
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </p>
                  </div>
                  <div className="workers-options">
                    <button className="workers-delete">Deletar</button>
                    {worker.ativo ? (
                      <button>Desativar</button>
                    ) : (
                      <button>Ativar</button>
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
