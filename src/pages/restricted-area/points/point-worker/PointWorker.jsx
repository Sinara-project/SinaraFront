import { useEffect, useState } from "react";
import "./PointWorker.css";
import Dropdown from "../../../../assets/dropdown.svg";
import Clear from "../../../../assets/close-blue.svg";
import ReturnArrow from "../../../../components/return-arrow/ReturnArrow";
import { useParams } from "react-router-dom";
import { getWorkerById } from "../../../../services/sql/workers/Workers";
import { getPoints } from "../../../../services/sql/points/Points";
import Loading from "../../../../components/loading/Loading";

function PointWorker() {
  const { workerID } = useParams();
  const workerIdNum = Number(workerID);

  const [points, setPoints] = useState({
    workerName: "",
    totalHoursDiff: "",
    totalMinutesDiff: "",
    data: [],
  });
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getDiffClass = (hoursDiff, minutesDiff) => {
    const h = parseFloat(hoursDiff) || 0;
    const m = parseFloat(minutesDiff) || 0;
    return h * 60 + m < 0 ? "minor" : "bigger";
  };

  useEffect(() => {
    const fetchWorkerPoints = async () => {
      setLoading(true);
      try {
        const func = await getWorkerById(workerIdNum);
        if (!func) {
          setPoints({
            workerName: "",
            totalHoursDiff: "",
            totalMinutesDiff: "",
            data: [],
          });
          return;
        }

        const allPoints = await getPoints();

        const pontosFiltrados = allPoints.filter(
          (p) => Number(p.idOperario) === workerIdNum
        );

        const pontosPorData = date
          ? pontosFiltrados.filter((p) => {
              const entrada = new Date(p.horarioEntrada);
              entrada.setHours(0, 0, 0, 0);
              const alvo = new Date(date);
              alvo.setHours(0, 0, 0, 0);
              return entrada.getTime() === alvo.getTime();
            })
          : pontosFiltrados;

        let pontosArray = [];
        let totalWorkedHours = 0;

        pontosPorData.forEach((p) => {
          const entrada = new Date(p.horarioEntrada);
          const saida = p.horarioSaida ? new Date(p.horarioSaida) : null;
          if (isNaN(entrada)) return;

          let diffHoras = 0;
          let diffMinutos = 0;
          if (saida && !isNaN(saida)) {
            const diffMs = saida - entrada;
            diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
            diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);
            totalWorkedHours += diffHoras + diffMinutos / 60;
          }

          const horasPrevistas = Number(func.horasPrevistas) || 0;
          const diferencaTotal = diffHoras + diffMinutos / 60 - horasPrevistas;
          const sign = diferencaTotal >= 0 ? "+" : "-";
          const absDiff = Math.abs(diferencaTotal);
          const horas = Math.floor(absDiff);
          const minutos = Math.round((absDiff - horas) * 60);

          pontosArray.push({
            workerID: func.id,
            workerName: func.nome,
            settedHours: horasPrevistas,
            firstPoint: entrada.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            lastPoint:
              saida && !isNaN(saida)
                ? saida.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-",
            hoursDiff: `${sign}${horas.toString().padStart(2, "0")}`,
            minutesDiff: minutos.toString().padStart(2, "0"),
            entryDate: entrada,
          });
        });

        pontosArray.sort((a, b) => b.entryDate - a.entryDate);

        const horasPrevistas = Number(func.horasPrevistas) || 0;
        const totalExpectedHours = pontosPorData.length * horasPrevistas;
        const totalDiff = totalWorkedHours - totalExpectedHours;
        const totalSign = totalDiff >= 0 ? "+" : "-";
        const absTotalDiff = Math.abs(totalDiff);
        const totalHours = Math.floor(absTotalDiff);
        const totalMinutes = Math.round((absTotalDiff - totalHours) * 60);

        setPoints({
          workerName: func.nome,
          data: pontosArray,
          totalHoursDiff: `${totalSign}${totalHours
            .toString()
            .padStart(2, "0")}`,
          totalMinutesDiff: totalMinutes.toString().padStart(2, "0"),
        });
      } catch (err) {
        console.error("Erro ao buscar pontos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerPoints();
  }, [workerIdNum, date]);

  return (
    <section className="point-worker-section">
      <ReturnArrow lastEndpoint={"/visualizar-pontos"} sidebar={true} />

      <section className="point-worker-content">
        <h1>Visualizar pontos - {points.workerName}</h1>

        <div className="point-worker-one">
          <div className="point-worker-select-date">
            <button type="button">
              {date ? (
                <>
                  {date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear() && (
                      <h4>Hoje - </h4>
                    )}
                  <h4>{`${String(date.getDate()).padStart(2, "0")}/${String(
                    date.getMonth() + 1
                  ).padStart(2, "0")}/${date.getFullYear()}`}</h4>
                </>
              ) : (
                <h4>Selecionar data</h4>
              )}
              <img src={Dropdown} alt="dropdown icon" />
            </button>
            <input
              type="date"
              onChange={(e) => {
                const [year, month, day] = e.target.value.split("-");
                setDate(new Date(year, month - 1, day));
              }}
            />
            {date && (
              <img src={Clear} alt="limpar" onClick={() => setDate(null)} />
            )}
          </div>

          <h3
            className={`point-worker-bank ${getDiffClass(
              points.totalHoursDiff,
              points.totalMinutesDiff
            )}`}
          >
            Banco de horas:{" "}
            <span>
              {points.totalHoursDiff}:{points.totalMinutesDiff}h
            </span>
          </h3>
        </div>

        {isLoading && (
          <div className="point-worker-loading">
            <Loading />
          </div>
        )}

        <div className="point-worker-cards">
          {points.data.length === 0 ? (
            <p>Nenhum ponto encontrado.</p>
          ) : (
            points.data.map((point, i) => (
              <div className="point-worker-card" key={i}>
                <div className="point-worker-card-left">
                  <h2>
                    {`${point.entryDate
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/${(point.entryDate.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${point.entryDate.getFullYear()}`}
                  </h2>
                  <div>
                    <p>Horas previstas: {point.settedHours}h</p>
                    <p>Ponto inicial: {point.firstPoint}</p>
                    <p>Ponto final: {point.lastPoint}</p>
                  </div>
                </div>
                <h3
                  className={`point-worker-card-diff ${getDiffClass(
                    point.hoursDiff,
                    point.minutesDiff
                  )}`}
                >
                  {point.hoursDiff}:{point.minutesDiff}h
                </h3>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default PointWorker;
