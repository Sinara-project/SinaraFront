import "./RestrictedAreaMenu.css";
import Info from "../../../assets/info.svg";
import Worker from "../../../assets/worker.svg";
import History from "../../../assets/clock.svg";
import Management from "../../../assets/management.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Notifications from "../../../components/notifications/Notifications";

function RestrictedAreaMenu() {
  const navigate = useNavigate();

  const [history, setHistory] = useState(false);
  const [pointsNot, setPointsNot] = useState([]);

  const registeredWorkers = 8;
  const lastResponse = "Júlia Ramos";

  const funcionariosBD = [
    {
      id: 1,
      nome: "João Batista",
      // Supondo que há query pra isso
      setor: "Abatimento",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 18, 30),
      },
    },
    {
      id: 2,
      nome: "Júlia Ramos",
      setor: "Tratamento de água",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 19, 0),
      },
    },
    {
      id: 3,
      setor: "Tratamento de água",
      nome: "Rodrigo Soares",
      ultimo_ponto: {
        horario_saida: new Date(2025, 9, 21, 20, 30),
      },
    },
  ];

  const pontosBD = [
    {
      id: 1,
      horario_entrada: new Date(2025, 9, 13, 13),
      horario_saida: new Date(2025, 9, 13, 20),
      id_operario: 1,
      id_empresa: 1,
      banco_horas: 0,
      horas_mensais_trabalhadas: 200,
    },
    {
      id: 2,
      horario_entrada: new Date(2025, 9, 13, 12),
      horario_saida: null,
      id_operario: 3,
      id_empresa: 1,
      banco_horas: 0,
      horas_mensais_trabalhadas: 200,
    },
    {
      id: 3,
      horario_entrada: new Date(2025, 9, 13, 14),
      horario_saida: new Date(2025, 9, 13, 18),
      id_operario: 2,
      id_empresa: 1,
      banco_horas: 0,
      horas_mensais_trabalhadas: 200,
    },
  ];

  useEffect(() => {
    const points = [];

    pontosBD.forEach((ponto) => {
      let notifyingOpen = "";
      let notifyingClose = "";
      let operario = "";

      funcionariosBD.map((func) => {
        if (func.id == ponto.id_operario) operario = func.nome;
      });
      notifyingOpen = {
        data: ponto.horario_entrada,
        mensagem: `O(a) operário(a) ${operario} bateu o ponto e começou a trabalhar!`,
        tipo: "Abrir ponto",
      };

      notifyingClose = {
        data: ponto.horario_saida,
        mensagem: `O(a) operário(a) ${operario} bateu o ponto e terminou seu turno!`,
        tipo: "Fechar ponto",
      };

      points.push(notifyingOpen);

      if (ponto.horario_saida) {
        points.push(notifyingClose);
      }
    });

    setPointsNot(points.sort((a, b) => b.data - a.data));
  }, []);

  const classPrefix = "restricted-area-menu";

  return (
    <section className={`${classPrefix}-section`}>
      <Notifications isVisible={history} closeNotifications={() => {setHistory(prev => !prev)}} notifications={pointsNot} />
      <section className={`${classPrefix}-content`}>
        <h1>Área restrita</h1>
        <span>
          <div className={`${classPrefix}-registered`}>
            <h2>{registeredWorkers.toString().padStart(2, "0")}</h2>
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
            <button onClick={() => {setHistory(prev => !prev)}}>
              <img src={History} alt="" />
              <h4>Histórico de operários</h4>
            </button>
            <button onClick={() => {
              navigate("/operarios")
            }}>
              <img src={Management} alt="" />
              <h4>Gerenciar operários</h4>
            </button>
          </div>
          <div className={`${classPrefix}-last-response`}>
            <h4>
              O(a) operador(a) <strong>{lastResponse}</strong> foi o(a)
              último(a) a responder um formulário
            </h4>
          </div>
        </span>
      </section>
    </section>
  );
}

export default RestrictedAreaMenu;
