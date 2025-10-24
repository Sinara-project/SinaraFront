import "./PermissionAddWorker.css";
import Return from "../../../assets/return-arrow.svg";
import Search from "../../../assets/search.svg";
import Add from "../../../assets/create.svg";
import { useEffect, useState } from "react";

function PermissionAddWorker({ isVisible, closeCard, perm }) {
  const [workers, setWorkers] = useState([]);
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

  useEffect(() => {
    setWorkers(funcionariosBD);
    console.log(perm);
    
    
  }, [funcionariosBD]);

  const searchWorker = (item) => {
    const regex = new RegExp(item, "i");
    const filteredWorkers = funcionariosBD.filter((func) => {
      return regex.test(func.nome);
    });
    setWorkers(filteredWorkers);
  };

  const addWorker = (id) => {
    // salvarFuncNaPerm(id, perm.id)

    const filteredWorkers = funcionariosBD.filter((func) => {
        return func.id !== id;
    });
    setFuncionariosBD(filteredWorkers);
  };

  return (
    <section
      className={`permission-add-worker-section ${isVisible ? "active" : ""}`}
    >
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
          {perm &&
            workers.map(
              (func) =>
                !perm?.id_funcionario?.includes(func.id) && (
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
