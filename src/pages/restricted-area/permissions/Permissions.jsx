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
import { getWorkersByEnterpriseId } from "../../../services/sql/workers/Workers";
import { getWorkerLastTurn } from "../../../services/sql/points/Points";

function Permissions() {
  const [selectedPerm, selectPerm] = useState();
  const [addWorker, setAdd] = useState(false);
  const [createPerm, setCreate] = useState(false);
  const [perms, setPerms] = useState([]);
  const [allPerms, setAllPerms] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [workers, setWorkers] = useState([]);
  const [allWorkers, setAllWorkers] = useState([]);

  const openAddWorker = (perm) => selectPerm(perm);

  const toggleCreatePerm = () => setCreate(!createPerm);
  const toggleAddWorker = () => setAdd(!addWorker);

  useEffect(() => {
    const fetchPermissions = async () => {
      return getPermissionsByIdEmpresa(
        JSON.parse(localStorage.getItem("user")).id
      );
    };

    const fetchWorkers = async () => {
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

      return workersWithLastTurn;
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [permissionsData, workersData] = await Promise.all([
          fetchPermissions(),
          fetchWorkers(),
        ]);

        setPerms(permissionsData);
        setAllPerms(permissionsData);

        setWorkers(workersData);
        setAllWorkers(workersData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [addWorker]);

  const removeWorker = async (idFunc, perm) => {
    setLoading(true);

    const newPerm = { ...perm };
    newPerm.idOperario = (newPerm.idOperario || []).filter((n) => n !== idFunc);

    try {
      await editPermission(
        perm.id,
        newPerm.idEmpresa,
        newPerm.nomePermissao,
        newPerm.idOperario
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
    const query = item.trim();
    if (!query) {
      setPerms(allPerms);
      return;
    }

    const regex = new RegExp(query, "i");
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
                {workers
                  .filter((worker) =>
                    Array.isArray(perm.idOperario)
                      ? perm.idOperario.includes(worker.id)
                      : false
                  )
                  .map((func) => (
                    <span className="permissions-worker" key={func.id}>
                      <div>
                        <span>
                          <h3>{func.nome}</h3>
                          <p>Setor: {func.setor}</p>
                          <p>
                            Último turno:{" "}
                            {func.ultimo_ponto ? func.ultimo_ponto : "-"}
                          </p>
                        </span>
                        <span
                          className="permissions-delete"
                          onClick={() => removeWorker(func.id, perm)}
                        >
                          <img src={Delete} />
                        </span>
                      </div>
                      <hr />
                    </span>
                  ))}
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
