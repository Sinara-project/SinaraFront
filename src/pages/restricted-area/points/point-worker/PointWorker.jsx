import { useEffect, useState } from "react";
import "./PointWorker.css";
import Dropdown from "../../../../assets/dropdown.svg";
import Clear from "../../../../assets/close-blue.svg";
import ReturnArrow from "../../../../components/return-arrow/ReturnArrow";
import { useParams } from "react-router-dom";

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

  const funcionariosBD = [
    { id: 1, nome: "João Batista", horas_previstas: 230 },
    { id: 2, nome: "Júlia Ramos", horas_previstas: 0 },
    { id: 3, nome: "Rodrigo Soares", horas_previstas: 280 },
  ];

  const pontosBD = [
    {
      id: 1,
      horario_entrada: new Date("2025-10-23T08:00:00"),
      horario_saida: new Date("2025-10-23T17:00:00"),
      idOperario: 1,
    },
    {
      id: 2,
      horario_entrada: new Date("2025-10-23T08:15:00"),
      horario_saida: new Date("2025-10-23T17:10:00"),
      idOperario: 2,
    },
    {
      id: 3,
      horario_entrada: new Date("2025-10-23T07:50:00"),
      horario_saida: new Date("2025-10-23T16:45:00"),
      idOperario: 3,
    },
    {
      id: 4,
      horario_entrada: new Date("2025-10-22T08:05:00"),
      horario_saida: new Date("2025-10-22T17:05:00"),
      idOperario: 1,
    },
    {
      id: 5,
      horario_entrada: new Date("2025-10-22T08:10:00"),
      horario_saida: new Date("2025-10-22T17:00:00"),
      idOperario: 2,
    },
  ];

  const getDiffClass = (hoursDiff, minutesDiff) => {
    const h = parseFloat(hoursDiff) || 0;
    const m = parseFloat(minutesDiff) || 0;
    return h * 60 + m < 0 ? "minor" : "bigger";
  };

  useEffect(() => {
    let pontosArray = [];

    const func = funcionariosBD.find((f) => f.id === workerIdNum);
    if (!func) {
      setPoints({
        workerName: "",
        totalHoursDiff: "",
        totalMinutesDiff: "",
        data: [],
      });
      return;
    }

    const pontosFiltrados = pontosBD.filter(
      (p) => p.idOperario === workerIdNum
    );

    const pontosFiltradosPorData = date
      ? pontosFiltrados.filter((p) => {
          const entrada = new Date(p.horario_entrada);
          entrada.setHours(0, 0, 0, 0);
          const target = new Date(date);
          target.setHours(0, 0, 0, 0);
          return entrada.getTime() === target.getTime();
        })
      : pontosFiltrados;

    let totalWorkedHours = 0;

    pontosFiltradosPorData.forEach((p) => {
      const diffMs = p.horario_saida - p.horario_entrada;
      const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);
      totalWorkedHours += diffHoras + diffMinutos / 60;

      const horasPrevistasDia = Math.floor(func.horas_previstas / 22);
      const diferencaTotal = diffHoras + diffMinutos / 60 - horasPrevistasDia;
      const sign = diferencaTotal >= 0 ? "+" : "-";
      const absDiff = Math.abs(diferencaTotal);
      const horas = Math.floor(absDiff);
      const minutos = Math.round((absDiff - horas) * 60);

      pontosArray.push({
        workerID: func.id,
        workerName: func.nome,
        settedHours: horasPrevistasDia,
        firstPoint: `${p.horario_entrada
          .getHours()
          .toString()
          .padStart(2, "0")}:${p.horario_entrada
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        lastPoint: p.horario_saida
          ? `${p.horario_saida
              .getHours()
              .toString()
              .padStart(2, "0")}:${p.horario_saida
              .getMinutes()
              .toString()
              .padStart(2, "0")}`
          : "-",
        hoursDiff: `${sign}${horas.toString().padStart(2, "0")}`,
        minutesDiff: minutos.toString().padStart(2, "0"),
        entryDate: p.horario_entrada,
      });
    });

    const horasPrevistasDia = Math.floor(func.horas_previstas / 22);
    const totalExpectedHours =
      pontosFiltradosPorData.length * horasPrevistasDia;

    const totalDiff = totalWorkedHours - totalExpectedHours;
    const totalSign = totalDiff >= 0 ? "+" : "-";
    const absTotalDiff = Math.abs(totalDiff);
    const totalHours = Math.floor(absTotalDiff);
    const totalMinutes = Math.round((absTotalDiff - totalHours) * 60);

    setPoints({
      workerName: func.nome,
      data: pontosArray,
      totalHoursDiff: `${totalSign}${totalHours.toString().padStart(2, "0")}`,
      totalMinutesDiff: totalMinutes.toString().padStart(2, "0"),
    });
  }, [date]);

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
              <img
                src={Clear}
                alt=""
                onClick={() => {
                  setDate(null);
                }}
              />
            )}
          </div>
          <h3
            className={`point-worker-bank ${getDiffClass(
              points.totalHoursDiff,
              points.totalMinutesDiff
            )}`}
          >
            Banco de horas: <span>{points.totalHoursDiff}:{points.totalMinutesDiff}h</span>
          </h3>
        </div>

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
                    <p>Horas previstas: {point.settedHours}</p>
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
