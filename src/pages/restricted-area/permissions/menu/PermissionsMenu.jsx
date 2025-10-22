import "./PermissionsMenu.css";
import Add from "../../../../assets/create.svg";
import Search from "../../../../assets/search.svg";
import ReturnArrow from "../../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import CreatePermission from "../../../../components/permissions/create-permission/CreatePermission";
import PermissionAddWorker from "../../../../components/permissions/add-worker/PermissionAddWorker";

function PermissionsMenu() {
  const [selectedPerm, selectPerm] = useState();
  const [addWorker, setAdd] = useState(false);
  const [createPerm, setCreate] = useState(false);
  const [perms, setPerms] = useState([]);

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
  ];

  const openAddWorker = (perm) => {
    selectPerm(perm);
  };

  useEffect(() => {
    setPerms(permsBD);
    if (selectedPerm) {
      setAdd(true);
    }
  }, [selectedPerm]);

  const searchPerm = (item) => {
    const regex = new RegExp(item, "i");
    const filteredPerms = permsBD.filter((perm) => {
      return regex.test(perm.nome_permissao);
    });
    setPerms(filteredPerms);
  };

  return (
    <section className="permissions-menu-section">
      <CreatePermission
        isVisible={createPerm}
        closeCard={() => {
          setCreate(!createPerm);
        }}
      />
      <PermissionAddWorker
        isVisible={addWorker}
        closeCard={() => {
          setAdd(!addWorker);
        }}
        perm={selectedPerm}
      />
      <section className="permissions-menu-content">
        <ReturnArrow lastEndpoint={"/menu-area-restrita"} sidebar={true} />
        <h1>Permissões</h1>
        <div className="permissions-menu-one">
          <div className="permissions-menu-searchbar">
            <img src={Search} alt="" />
            <input
              type="text"
              placeholder="Pesquisar permissão"
              onChange={(e) => {
                searchPerm(e.target.value);
              }}
            />
          </div>

          <button
            onClick={() => {
              setCreate(!createPerm);
            }}
          >
            <h4>Criar permissão</h4>
            <img src={Add} alt="" />
          </button>
        </div>
        <div className="permissions-menu-container">
          {perms.map((perm) => (
            <div>
              <span className="permissions-menu-main-actions">
                <h2>{perm.nome_permissao}</h2>
                <button
                  onClick={() => {
                    openAddWorker(perm);
                  }}
                >
                  <h4>Adicionar</h4>
                  <img src={Add} alt="" />
                </button>
              </span>
              <hr />
              {funcionariosBD.map(
                (func) =>
                  perm.id_funcionario.includes(func.id) && (
                    <span className="permissions-menu-worker">
                      <div>
                        <span>
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
                        </span>
                        <span className="permissions-menu-delete">
                          <span alt="" />
                        </span>
                      </div>
                      <hr />
                    </span>
                  )
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default PermissionsMenu;
