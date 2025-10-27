import "./PermissionAddWorker.css";
import Return from "../../../assets/return-arrow.svg";
import Search from "../../../assets/search.svg";
import Add from "../../../assets/create.svg";
import { useEffect, useState } from "react";
import { editPermission } from "../../../services/mongoDB/Permissions/Permissions";
import Snackbar from "../../snackbar/Snackbar";
import Loading from "../../loading/Loading";

function PermissionAddWorker({ isVisible, closeCard, perm }) {
  const [workers, setWorkers] = useState([]);
  const [truePerm, setPerm] = useState(perm);
  const [isLoading, setLoading] = useState(false);
  const [funcionariosBD, setFuncionariosBD] = useState([
    {
      id: 1,
      nome: "João Batista",
      // Supondo que há query pra isso
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 18, 30),
      },
    },
    {
      id: 2,
      nome: "Júlia Ramos",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 19, 0),
      },
    },
    {
      id: 3,
      nome: "Rodrigo Soares",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 20, 30),
      },
    },
  ]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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

  useEffect(() => {
    setWorkers(funcionariosBD);
    setPerm(perm);
  }, [funcionariosBD, perm]);

  const searchWorker = (item) => {
    const regex = new RegExp(item, "i");
    const filteredWorkers = funcionariosBD.filter((func) => {
      return regex.test(func.nome);
    });
    setWorkers(filteredWorkers);
  };

  const addWorker = async (id) => {
    setLoading(true);
    const newPerm = truePerm;
    if (!newPerm.idFuncionario.includes(id)) {
      newPerm.idFuncionario.push(id);
      try {
        const data = await editPermission(
          newPerm.id,
          newPerm.idEmpresa,
          newPerm.nomePermissao,
          newPerm.idFuncionario
        );
      } catch (e) {
        showSnackbar(
          "Erro",
          "Ocorreu um erro. Tente novamente mais tarde.",
          "error"
        );
        newPerm.idFuncionario.filter((n) => n != id);
        setLoading(false);
        return;
      }
    }
    showSnackbar("Funcionário adicionado", "O funcionário foi adicionado à permissão!", "success");
    setPerm(newPerm);
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
          onClick={() => {
            closeCard();
          }}
        />
        <h1>Adicionar operários</h1>
        <div className="permission-add-searchbar">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder="Pesquisar operário"
            onChange={(e) => {
              searchWorker(e.target.value);
            }}
          />
        </div>
        <span className="permissions-add-worker-list">
          {truePerm &&
            workers.map(
              (func) =>
                !perm?.idFuncionario?.includes(func.id) && (
                  <div className="permissions-add-worker-worker">
                    <h3>{func.nome}</h3>
                    <p>
                      Último turno:{" "}
                      {func.ultimo_ponto.horario_saida
                        .getDate()
                        .toString()
                        .padStart(2, "0")}
                      /{func.ultimo_ponto.horario_saida.getMonth() + 1}/
                      {func.ultimo_ponto.horario_saida.getFullYear()} -{" "}
                      {func.ultimo_ponto.horario_saida.getHours()}:
                      {func.ultimo_ponto.horario_saida
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </p>
                    <div>
                      <button
                        onClick={() => {
                          addWorker(func.id);
                        }}
                      >
                        <h4>Adicionar</h4>
                        <img src={Add} alt="" />
                      </button>
                    </div>
                  </div>
                )
            )}
        </span>
      </div>
    </section>
  );
}

export default PermissionAddWorker;
