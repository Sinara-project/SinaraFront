import { useEffect, useState } from "react";
import "./PointMenu.css";
import Search from "../../../../assets/search.svg";
import Dropdown from "../../../../assets/dropdown.svg";
import ReturnArrow from "../../../../components/return-arrow/ReturnArrow";
import { useNavigate } from "react-router-dom";
import { getWorkersByEnterpriseId } from "../../../../services/sql/workers/Workers";
import { getPoints } from "../../../../services/sql/points/Points";
import Loading from "../../../../components/loading/Loading";

function PointMenu() {
  const navigate = useNavigate();

  const [allPoints, setAllPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isLoading, setLoading] = useState(false);

  const getDiffClass = (hoursDiff, minutesDiff) => {
    const h = parseFloat(hoursDiff) || 0;
    const m = parseFloat(minutesDiff) || 0;
    const totalMinutes = h * 60 + m;
    if (totalMinutes < 0) return "minor";
    if (totalMinutes >= 0) return "bigger";
  };

  useEffect(() => {
    async function fetchPoints() {
      setLoading(true);
      try {
        const enterpriseId = JSON.parse(localStorage.getItem("user")).id;

        const [workersData, pointsData] = await Promise.all([
          getWorkersByEnterpriseId(enterpriseId),
          getPoints(),
        ]);

        const pontosBD = pointsData.filter(
          (p) => p.idEmpresa === enterpriseId
        );

        const funcionariosBD = workersData;
        let pontosArray = [];

        pontosBD.forEach((ponto) => {
          const func = funcionariosBD.find((f) => f.id === ponto.idOperario);
          if (!func) return;

          const entrada = new Date(ponto.horarioEntrada);
          const saida = ponto.horarioSaida ? new Date(ponto.horarioSaida) : null;

          const diffMs = saida ? saida - entrada : 0;
          const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);

          const diferencaTotal =
            diffHoras + diffMinutos / 60 - func.horasprevistas;
          const sign = diferencaTotal >= 0 ? "+" : "-";
          const absDiff = Math.abs(diferencaTotal);
          const horas = Math.floor(absDiff);
          const minutos = Math.round((absDiff - horas) * 60);

          const newPonto = {
            workerID: func.id,
            workerName: func.nome,
            settedHours: func.horasprevistas,
            firstPoint: `${entrada.getHours().toString().padStart(2, "0")}:${entrada
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
            lastPoint: saida
              ? `${saida.getHours().toString().padStart(2, "0")}:${saida
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`
              : "-",
            hoursDiff: `${sign}${horas.toString().padStart(2, "0")}`,
            minutesDiff: minutos.toString().padStart(2, "0"),
            entryDate: entrada,
          };

          pontosArray.push(newPonto);
        });

        const target = new Date(date);
        target.setHours(0, 0, 0, 0);

        const filtered = pontosArray.filter((ponto) => {
          const entrada = new Date(ponto.entryDate);
          entrada.setHours(0, 0, 0, 0);
          return entrada.getTime() === target.getTime();
        });

        setPoints(filtered);
        setAllPoints(filtered);
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, [date]);

  const searchByWorker = (item) => {
    if (item.trim() === "") {
      setPoints(allPoints);
      return;
    }
    const regex = new RegExp(item, "i");
    const filteredWorkers = allPoints.filter((point) =>
      regex.test(point.workerName)
    );
    setPoints(filteredWorkers);
  };

  return (
    <section className="point-menu-section">
      <ReturnArrow lastEndpoint={"/operarios"} sidebar={true} />

      <section className="point-menu-content">
        <h1>Visualizar pontos</h1>

        <div className="point-menu-one">
          <div className="point-menu-searchbar">
            <img src={Search} alt="" />
            <input
              type="text"
              placeholder="Pesquisar operário"
              onChange={(e) => searchByWorker(e.target.value)}
            />
          </div>

          <div className="point-menu-select-date">
            <button type="button">
              {date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear() && (
                  <h4>Hoje - </h4>
                )}
              <h4>{`${`${date.getDate()}`.padStart(2, "0")}/${`${
                date.getMonth() + 1
              }`.padStart(2, "0")}/${date.getFullYear()}`}</h4>
              <img src={Dropdown} alt="dropdown icon" />
            </button>

            <input
              type="date"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setDate(new Date(year, month - 1, day));
              }}
            />
          </div>
        </div>

        <div className="point-menu-cards">
          {isLoading ? (
            <div className="point-menu-loading">
              <Loading />
            </div>
          ) : points.length > 0 ? (
            points.map((point, i) => (
              <div
                className="point-menu-card"
                key={i}
                onClick={() => navigate(`/visualizar-pontos/${point.workerID}`)}
              >
                <div className="point-menu-card-left">
                  <h2>{point.workerName}</h2>
                  <div>
                    <p>Horas previstas: {point.settedHours}</p>
                    <p>Ponto inicial: {point.firstPoint}</p>
                    <p>Ponto final: {point.lastPoint}</p>
                  </div>
                </div>
                <h3
                  className={`point-menu-card-diff ${getDiffClass(
                    point.hoursDiff,
                    point.minutesDiff
                  )}`}
                >
                  {point.hoursDiff}:{point.minutesDiff}h
                </h3>
              </div>
            ))
          ) : (
            <p className="point-menu-empty">Nenhum ponto encontrado</p>
          )}
        </div>
      </section>
    </section>
  );
}

export default PointMenu;
