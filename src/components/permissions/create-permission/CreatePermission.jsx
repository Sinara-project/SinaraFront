import "./CreatePermission.css";
import { useState } from "react";
import Snackbar from "../../snackbar/Snackbar";

function CreatePermission({ isVisible, closeCard }) {
    const [permName, setPermName] = useState();

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

  const createPerm = () => {
    // criarPermissão(name)

    if (!permName) {
      showSnackbar("Erro", "A permissão deve ter um nome", "error");
      return;
    }

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
      <Snackbar
        type={snackbar.type}
        title={snackbar.title}
        message={snackbar.message}
        isVisible={snackbar.visible}
      />
      <div className={`create-permission-card ${isVisible ? "active" : ""}`}>
        <h1>Crie uma permissão</h1>
        <input type="text" placeholder="Nome da permissão" onChange={(e) => { setPermName(e.target.value) }} />
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
