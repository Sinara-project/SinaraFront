import "./RestrictedAreaMenu.css";
import Info from "../../../assets/info.svg";
import Worker from "../../../assets/worker.svg";
import History from "../../../assets/clock.svg";
import Management from "../../../assets/management.svg";

function RestrictedAreaMenu() {
  const registeredWorkers = 8;
  const lastResponse = "Júlia Ramos";

  const classPrefix = "restricted-area-menu";

  return (
    <section className={`${classPrefix}-section`}>
      <section className={`${classPrefix}-content`}>
        <h1>Área restrita</h1>
        <span>
          <div className={`${classPrefix}-registered`}>
            <h2>{registeredWorkers.toString().padStart(2, "0")}</h2>
            <h3>Operários registrados</h3>
          </div>
          <div className={`${classPrefix}-horizontal`}>
            <button>
              <img src={Info} alt="" />
              <h4>Visualizar permissões</h4>
            </button>
            <button>
              <img src={Worker} alt="" />
              <h4>Cadastrar novo operário</h4>
            </button>
          </div>
          <div className={`${classPrefix}-vertical`}>
            <button>
              <img src={History} alt="" />
              <h4>Histórico de operários</h4>
            </button>
            <button>
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
