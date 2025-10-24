import { useEffect, useState } from "react";
import "./PointMenu.css";
import Search from "../../../../assets/search.svg";
import Dropdown from "../../../../assets/dropdown.svg";
import ReturnArrow from "../../../../components/return-arrow/ReturnArrow";
import { useNavigate } from "react-router-dom";

function PointMenu() {
  const navigate = useNavigate();

  const [allPoints, setAllPoints] = useState([]);
  const [points, setPoints] = useState([]);
  const [date, setDate] = useState(new Date());

  const funcionariosBD = [
    {
      id: 1,
      nome: "João Batista",
      setor: "Abatimento",
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 18, 30) },
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
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 19, 0) },
      ativo: false,
      imagem_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQz5zW-5LyUpoue1GHUahmDU_g7AscE8wqbA&s",
      email: "juliaramos@friboi.com",
      horas_previstas: 0,
      ferias: true,
    },
    {
      id: 3,
      nome: "Rodrigo Soares",
      setor: "Tratamento de água",
      ultimo_ponto: { horario_saida: new Date(2025, 9, 21, 20, 30) },
      ativo: true,
      imagem_url: "",
      email: "rodrigosoares@friboi.com",
      horas_previstas: 280,
      ferias: false,
    },
  ];

  const pontosBD = [
    {
      id: 1,
      horario_entrada: new Date("2025-10-23T08:00:00"),
      horario_saida: new Date("2025-10-23T17:00:00"),
      idOperario: 1,
      idEmpresa: 1,
    },
    {
      id: 2,
      horario_entrada: new Date("2025-10-23T08:15:00"),
      horario_saida: new Date("2025-10-23T17:10:00"),
      idOperario: 2,
      idEmpresa: 1,
    },
    {
      id: 3,
      horario_entrada: new Date("2025-10-23T07:50:00"),
      horario_saida: new Date("2025-10-23T16:45:00"),
      idOperario: 3,
      idEmpresa: 1,
    },
    {
      id: 4,
      horario_entrada: new Date("2025-10-22T08:05:00"),
      horario_saida: new Date("2025-10-22T17:05:00"),
      idOperario: 1,
      idEmpresa: 1,
    },
    {
      id: 5,
      horario_entrada: new Date("2025-10-22T08:10:00"),
      horario_saida: new Date("2025-10-22T17:00:00"),
      idOperario: 2,
      idEmpresa: 1,
    },
  ];

  const getDiffClass = (hoursDiff, minutesDiff) => {
    const h = parseFloat(hoursDiff) || 0;
    const m = parseFloat(minutesDiff) || 0;
    const totalMinutes = h * 60 + m;
    if (totalMinutes < 0) return "minor";
    if (totalMinutes >= 0) return "bigger";
  };

  useEffect(() => {
    let pontosArray = [];

    pontosBD.forEach((ponto) => {
      funcionariosBD.forEach((func) => {
        if (ponto.idOperario === func.id) {
          const diffMs = ponto.horario_saida
            ? ponto.horario_saida - ponto.horario_entrada
            : 0;

          const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
          const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);

          const horasPrevistasDia = Math.floor(func.horas_previstas / 22);

          const diferencaTotal =
            diffHoras + diffMinutos / 60 - horasPrevistasDia;
          const sign = diferencaTotal >= 0 ? "+" : "-";
          const absDiff = Math.abs(diferencaTotal);
          const horas = Math.floor(absDiff);
          const minutos = Math.round((absDiff - horas) * 60);

          const newPonto = {
            workerID: func.id,
            workerName: func.nome,
            settedHours: Math.floor(horasPrevistasDia),
            firstPoint: `${ponto.horario_entrada
              .getHours()
              .toString()
              .padStart(2, "0")}:${ponto.horario_entrada
              .getMinutes()
              .toString()
              .padStart(2, "0")}`,
            lastPoint: ponto.horario_saida
              ? `${ponto.horario_saida
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${ponto.horario_saida
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`
              : "-",
            hoursDiff: `${sign}${horas.toString().padStart(2, "0")}`,
            minutesDiff: minutos.toString().padStart(2, "0"),
            entryDate: ponto.horario_entrada,
          };

          pontosArray.push(newPonto);
        }
      });
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
          {points.map((point, i) => (
            <div
              className="point-menu-card"
              key={i}
              onClick={() => {
                navigate(`/visualizar-pontos/${point.workerID}`);
              }}
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
          ))}
        </div>
      </section>
    </section>
  );
}

export default PointMenu;
