import "./RestrictedAreaMenu.css";
import Info from "../../../assets/info.svg";
import Worker from "../../../assets/worker.svg";
import History from "../../../assets/clock.svg";
import Management from "../../../assets/management.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Notifications from "../../../components/notifications/Notifications";
import { getWorkersByEnterpriseId } from "../../../services/sql/workers/Workers";
import { getPoints } from "../../../services/sql/points/Points";
import Loading from "../../../components/loading/Loading";
import { getLastResponseId } from "../../../services/mongoDB/Forms/Forms";

function RestrictedAreaMenu() {
  const navigate = useNavigate();

  const [history, setHistory] = useState(false);
  const [pointsNot, setPointsNot] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const registeredWorkers = 8;
  const [lastResponse, setLastResponse] = useState("");

  const [funcionariosBD, setFuncionarios] = useState([]);

  const [pontosBD, setPontos] = useState([]);

  useEffect(() => {
    async function getFuncsAndPoints() {
      setLoading(true);
      try {
        const [workersData, pointsData, lastResponseId] = await Promise.all([
          getWorkersByEnterpriseId(JSON.parse(localStorage.getItem("user")).id),
          getPoints(),
          getLastResponseId(JSON.parse(localStorage.getItem("user")).id),
        ]);

        setFuncionarios(workersData);

        const truePoints = pointsData.filter(
          (p) => p.idEmpresa === JSON.parse(localStorage.getItem("user")).id
        );

        setPontos(truePoints);

        console.log("LastResponseId:", lastResponseId);
        console.log("Workers:", workersData);

        const points = [];
        truePoints.forEach((ponto) => {
          const operario = workersData.find(
            (func) => func.id === ponto.idOperario
          )?.nome;

          if (!operario) return;

          const notifyingOpen = {
            data: ponto.horarioEntrada,
            mensagem: `O(a) operário(a) ${operario} bateu o ponto e começou a trabalhar!`,
            tipo: "Abrir ponto",
          };

          const notifyingClose = {
            data: ponto.horarioSaida,
            mensagem: `O(a) operário(a) ${operario} bateu o ponto e terminou seu turno!`,
            tipo: "Fechar ponto",
          };

          points.push(notifyingOpen);
          if (ponto.horario_saida) points.push(notifyingClose);
        });

        workersData.map((worker) => {
          if (worker.id == lastResponseId) {
            setLastResponse(worker.nome);
          }
        });

        setPointsNot(
          points.sort((a, b) => new Date(b.data) - new Date(a.data))
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getFuncsAndPoints();
  }, []);

  const classPrefix = "restricted-area-menu";

  return (
    <section className={`${classPrefix}-section`}>
      {isLoading && (
        <div className={`${classPrefix}-loading`}>
          <Loading />
        </div>
      )}
      <Notifications
        isVisible={history}
        closeNotifications={() => {
          setHistory((prev) => !prev);
        }}
        notifications={pointsNot}
      />
      <section className={`${classPrefix}-content`}>
        <h1>Área restrita</h1>
        <span>
          <div className={`${classPrefix}-registered`}>
            {funcionariosBD.length != 0 ? (
              <h2>{funcionariosBD.length.toString().padStart(2, "0")}</h2>
            ) : (
              <h2>--</h2>
            )}

            <h3>Operários registrados</h3>
          </div>
          <div className={`${classPrefix}-horizontal`}>
            <button
              onClick={() => {
                navigate("/permissoes");
              }}
            >
              <img src={Info} alt="" />
              <h4>Visualizar permissões</h4>
            </button>
            <button
              onClick={() => {
                navigate("/cadastrar-operario");
              }}
            >
              <img src={Worker} alt="" />
              <h4>Cadastrar novo operário</h4>
            </button>
          </div>
          <div className={`${classPrefix}-vertical`}>
            <button
              onClick={() => {
                setHistory((prev) => !prev);
              }}
            >
              <img src={History} alt="" />
              <h4>Histórico de operários</h4>
            </button>
            <button
              onClick={() => {
                navigate("/operarios");
              }}
            >
              <img src={Management} alt="" />
              <h4>Gerenciar operários</h4>
            </button>
          </div>
          <div className={`${classPrefix}-last-response`}>
            {lastResponse ? (
              <h4>
                O(a) operador(a) <strong>{lastResponse}</strong> foi o(a)
                último(a) a responder um formulário
              </h4>
            ) : (
              <h2>-</h2>
            )}
          </div>
        </span>
      </section>
    </section>
  );
}

export default RestrictedAreaMenu;
