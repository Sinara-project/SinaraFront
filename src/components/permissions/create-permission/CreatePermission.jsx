import "./CreatePermission.css";
import { useState } from "react";
import Snackbar from "../../snackbar/Snackbar";
import { createPermission } from "../../../services/mongoDB/Permissions/Permissions";
import Loading from "../../loading/Loading";

function CreatePermission({ isVisible, closeCard }) {
  const [permName, setPermName] = useState();
  const [isLoading, setLoading] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = async (title, message, type) => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const createPerm = async () => {
    setLoading(true);

    if (!permName) {
      showSnackbar("Erro", "A permissão deve ter um nome", "error");
      return;
    }

    try {
      const data = await createPermission(
        JSON.parse(localStorage.getItem("user")).id,
        permName,
        []
      );
    } catch (e) {
      if (e.status == 400) {
        showSnackbar(
          "Erro",
          "A permissão deve ter ao menos 1 operário",
          "error"
        );
        setLoading(false);
        return;
      }
      showSnackbar(
        "Erro",
        "Ocorreu um erro durante a criação da permissão. Tente novamente mais tarde.",
        "error"
      );
      setLoading(false);
      return;
    }

    setLoading(false);

    showSnackbar(
      "Permissão criada",
      `A permissão ${permName} foi criada com sucesso!`,
      "success"
    );
  };
  return (
    <section
      className={`create-permission-section ${isVisible ? "active" : ""}`}
    >
      {isLoading && (
        <div className="create-permission-loading">
          <Loading />
        </div>
      )}
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className={`create-permission-card ${isVisible ? "active" : ""}`}>
        <h1>Crie uma permissão</h1>
        <input
          type="text"
          placeholder="Nome da permissão"
          onChange={(e) => {
            setPermName(e.target.value);
          }}
        />
        <span>
          <button
            className="create-permission-cancel"
            onClick={() => {
              closeCard();
            }}
          >
            <h2>Cancelar</h2>
          </button>
          <button
            className="create-permission-create"
            onClick={(e) => {
              createPerm();
            }}
          >
            <h2>Criar permissão</h2>
          </button>
        </span>
      </div>
    </section>
  );
}

export default CreatePermission;
