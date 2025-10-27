import "./Permissions.css";
import Add from "../../../assets/create.svg";
import Search from "../../../assets/search.svg";
import Delete from "../../../assets/delete.svg";
import ReturnArrow from "../../../components/return-arrow/ReturnArrow";
import { useEffect, useState } from "react";
import CreatePermission from "../../../components/permissions/create-permission/CreatePermission";
import PermissionAddWorker from "../../../components/permissions/add-worker/PermissionAddWorker";
import Loading from "../../../components/loading/Loading";
import {
  editPermission,
  getPermissionsByIdEmpresa,
} from "../../../services/mongoDB/Permissions/Permissions";

function Permissions() {
  const [selectedPerm, selectPerm] = useState();
  const [addWorker, setAdd] = useState(false);
  const [createPerm, setCreate] = useState(false);
  const [perms, setPerms] = useState([]);
  const [allPerms, setAllPerms] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const funcionariosBD = [
    {
      id: 1,
      nome: "João Batista",
      setor: "Abatimento",
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 18, 30) },
    },
    {
      id: 2,
      nome: "Júlia Ramos",
      setor: "Tratamento de água",
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 19, 0) },
    },
    {
      id: 3,
      nome: "Rodrigo Soares",
      setor: "Tratamento de água",
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 20, 30) },
    },
  ];

  const openAddWorker = (perm) => selectPerm(perm);

  const toggleCreatePerm = async () => {
    setLoading(true);
    setCreate(!createPerm);
    try {
      const data = await getPermissionsByIdEmpresa(
        JSON.parse(localStorage.getItem("user")).id
      );
      setPerms(data);
      setAllPerms(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddWorker = async () => {
    setLoading(true);
    setAdd(!addWorker);
    try {
      const data = await getPermissionsByIdEmpresa(
        JSON.parse(localStorage.getItem("user")).id
      );
      setPerms(data);
      setAllPerms(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function getPerms() {
      try {
        const data = await getPermissionsByIdEmpresa(
          JSON.parse(localStorage.getItem("user")).id
        );
        setPerms(data);
        setAllPerms(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    getPerms();
  }, [selectedPerm]);

  const removeWorker = async (idFunc, perm) => {
    setLoading(true);

    const newPerm = { ...perm };

    newPerm.idFuncionario = newPerm.idFuncionario.filter((n) => n !== idFunc);
    try {
      await editPermission(
        perm.id,
        newPerm.idEmpresa,
        newPerm.nomePermissao,
        newPerm.idFuncionario
      );

      const updatedData = await getPermissionsByIdEmpresa(
        JSON.parse(localStorage.getItem("user")).id
      );
      setPerms(updatedData);
      setAllPerms(updatedData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const searchPerm = (item) => {
    if (!item.trim()) {
      setPerms(allPerms);
      return;
    }

    const regex = new RegExp(item, "i");
    const filteredPerms = allPerms.filter((perm) =>
      regex.test(perm.nomePermissao)
    );
    setPerms(filteredPerms);
  };

  return (
    <section className="permissions-section">
      <CreatePermission isVisible={createPerm} closeCard={toggleCreatePerm} />
      <PermissionAddWorker
        isVisible={addWorker}
        closeCard={toggleAddWorker}
        perm={selectedPerm}
      />
      <section className="permissions-content">
        {isLoading && (
          <div className="permission-add-worker-loading">
            <Loading />
          </div>
        )}
        <ReturnArrow lastEndpoint={"/menu-area-restrita"} sidebar={true} />
        <h1>Permissões</h1>

        <div className="permissions-one">
          <div className="permissions-searchbar">
            <img src={Search} alt="" />
            <input
              type="text"
              placeholder="Pesquisar permissão"
              onChange={(e) => searchPerm(e.target.value)}
            />
          </div>

          <button onClick={toggleCreatePerm}>
            <h4>Criar permissão</h4>
            <img src={Add} alt="" />
          </button>
        </div>

        <div className="permissions-container">
          {perms.length > 0 ? (
            perms.map((perm) => (
              <div key={perm.id}>
                <span className="permissions-main-actions">
                  <h2>{perm.nomePermissao}</h2>
                  <button
                    onClick={() => {
                      openAddWorker(perm);
                      toggleAddWorker();
                    }}
                  >
                    <h4>Adicionar</h4>
                    <img src={Add} alt="" />
                  </button>
                </span>
                <hr />
                {funcionariosBD.map(
                  (func) =>
                    Array.isArray(perm.idFuncionario) &&
                    perm.idFuncionario.includes(func.id) && (
                      <span className="permissions-worker" key={func.id}>
                        <div>
                          <span>
                            <h3>{func.nome}</h3>
                            <p>Setor: {func.setor}</p>
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
                          <span
                            className="permissions-delete"
                            onClick={() => {
                              removeWorker(func.id, perm);
                            }}
                          >
                            <img src={Delete} />
                          </span>
                        </div>
                        <hr />
                      </span>
                    )
                )}
              </div>
            ))
          ) : (
            <h2 style={{ marginTop: "80px" }}>
              Sua empresa ainda não tem permissões!
            </h2>
          )}
        </div>
      </section>
    </section>
  );
}

export default Permissions;
