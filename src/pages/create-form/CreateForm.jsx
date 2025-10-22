import { useEffect, useState } from "react";
import "./CreateForm.css";
import Close from "../../assets/close-blue.svg";
import CloseRose from "../../assets/close-rose.svg";
import Add from "../../assets/create.svg";
import Dropdown from "../../assets/dropdown.svg";
import Snackbar from "../../components/snackbar/Snackbar";
import PermissionsDropdown from "../../components/permissions/permissions-dropdown/PermissionsDropdown";

function CreateForm() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const user = JSON.parse(localStorage.getItem("user"));

  const [formTitle, setTitle] = useState("");
  const [formDesc, setDesc] = useState("");
  const [formPerms, setFormPerms] = useState([]);
  const [form, editForm] = useState([
    { id: crypto.randomUUID(), type: "write", mandatory: false, name: "" },
  ]);

  const [selectPerms, setSelectPerms] = useState(false);
  const [perms, setPerms] = useState([]);
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const getPerms = () => {
    // perms = await getPerms(user.id)
    setPerms([
      {
        id: 1,
        idEmpresa: 1,
        nome: "Forms de captação",
      },
      {
        id: 2,
        idEmpresa: 1,
        nome: "Forms de pré-tratamento",
      },
      {
        id: 3,
        idEmpresa: 1,
        nome: "Forms de tratamento primário",
      },
    ]);
  };

  useEffect(() => {
    getPerms();
  }, []);

  const showSnackbar = async (title, message, type = "error") => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const togglePermission = (permId) => {
    if (formPerms.includes(permId)) {
      setFormPerms((prev) => prev.filter((item) => item !== permId));
    } else {
      setFormPerms((prev) => [...prev, permId]);
    }
  };

  const updateField = (index, key, value) => {
    editForm((prev) => {
      const newForm = [...prev];
      let field = { ...newForm[index], [key]: value };

      if (key === "type" && value === "choice" && !field.choices) {
        field.choices = ["", ""];
      }

      if (key === "type" && value === "write") {
        delete field.choices;
      }

      newForm[index] = field;
      return newForm;
    });
  };

  const removeQuestion = (index) => {
    if (form.length <= 1) {
      showSnackbar("Erro", "O formulário precisa ter pelo menos uma pergunta");
      return;
    }
    editForm((prev) => prev.filter((_, i) => i !== index));
  };

  const addQuestion = (type) => {
    editForm((prev) => [
      ...prev,
      type === "choice"
        ? {
            id: crypto.randomUUID(),
            type: "choice",
            mandatory: false,
            name: "",
            choices: ["", ""],
          }
        : {
            id: crypto.randomUUID(),
            type: "write",
            mandatory: false,
            name: "",
          },
    ]);
  };

  const addChoice = (fieldIndex) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };
      field.choices = [...(field.choices || []), ""];
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  const updateChoice = (fieldIndex, choiceIndex, value) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };
      const newChoices = [...(field.choices || [])];
      newChoices[choiceIndex] = value;
      field.choices = newChoices;
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  const removeChoice = (fieldIndex, choiceIndex) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };

      if ((field.choices?.length || 0) <= 2) {
        showSnackbar(
          "Erro",
          "Uma pergunta de escolha precisa ter pelo menos duas opções"
        );
        return newForm;
      }

      field.choices = field.choices.filter((_, i) => i !== choiceIndex);
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  const createForm = () => {
    if (!formTitle.trim()) {
      return showSnackbar("Erro", "O formulário precisa de um título");
    }

    if (formPerms.length === 0) {
      return showSnackbar(
        "Erro",
        "O formulário precisa de permissões para ser respondido"
      );
    }

    for (let i = 0; i < form.length; i++) {
      const field = form[i];
      if (!field.name.trim()) {
        return showSnackbar(
          "Erro",
          `A pergunta ${i + 1} precisa ter um campo preenchido`
        );
      }

      if (field.type === "choice") {
        const emptyChoice = field.choices.some((choice) => !choice.trim());
        if (emptyChoice) {
          return showSnackbar(
            "Erro",
            `A pergunta ${i + 1} possui opções vazias. Preencha todas as opções`
          );
        }
      }
    }

    const dataForm = {
      idCriador: user.id,
      titulo: formTitle,
      descricao: formDesc,
      permissoes: formPerms,
      campos: form,
    };

    // criarFormulario(dataForm)
    console.log(dataForm);

    showSnackbar("Sucesso", "Formulário criado com sucesso!", "success");
  };

  return (
    <section className="create-form-section">
      <section className="create-form-content">
        <Snackbar
          type={snackbar.type}
          title={snackbar.title}
          message={snackbar.message}
          isVisible={snackbar.visible}
        />
        <h1 className="create-form-title">Criar formulário</h1>
        <input
          className="create-form-input-title"
          placeholder="Título do formulário*"
          value={formTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="create-form-input-desc"
          placeholder="Descrição do formulário"
          value={formDesc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="create-form-select-perm">
          <button
            onClick={() => {
              setSelectPerms(!selectPerms);
            }}
          >
            <h4>Quem verá?</h4>
            <img src={Dropdown} alt="" />
          </button>
          <PermissionsDropdown
            isVisible={selectPerms}
            permissions={perms}
            togglePermissions={togglePermission}
          />
        </div>
        {form.map((field, i) => (
          <div key={field.id} className="create-form-question">
            <div className="create-form-header">
              <div className="create-form-type-toggle">
                <h4>Tipo: </h4>
                <button
                  className={field.type === "write" ? "active" : ""}
                  onClick={() => updateField(i, "type", "write")}
                >
                  Escrita
                </button>
                <button
                  className={field.type === "choice" ? "active" : ""}
                  onClick={() => updateField(i, "type", "choice")}
                >
                  Escolha
                </button>
              </div>
              <button onClick={() => removeQuestion(i)}>
                <img src={Close} alt="Remover" />
              </button>
            </div>
            <label className="create-form-mandatory">
              <h4>Obrigatório:</h4>
              <input
                type="checkbox"
                checked={field.mandatory}
                onChange={(e) => updateField(i, "mandatory", e.target.checked)}
              />
              <span className="create-form-mandatory-select"></span>
            </label>
            <input
              className="create-form-input-field"
              placeholder="Campo"
              value={field.name}
              onChange={(e) => updateField(i, "name", e.target.value)}
            />
            {field.type === "choice" &&
              (field.choices || []).map((choice, j) => (
                <div key={j} className="create-form-choice">
                  <input
                    value={choice}
                    placeholder={`Opção ${j + 1}`}
                    onChange={(e) => updateChoice(i, j, e.target.value)}
                  />
                  <img
                    src={CloseRose}
                    alt="Remover"
                    onClick={() => removeChoice(i, j)}
                  />
                </div>
              ))}
            {field.type === "choice" && (
              <button
                className="create-form-add-option"
                onClick={() => addChoice(i)}
              >
                <img src={Add} alt="" /> Adicionar opção
              </button>
            )}
          </div>
        ))}
        <div className="create-form-buttons">
          <button
            className="create-form-add-question"
            onClick={() => addQuestion("write")}
          >
            <img src={Add} alt="" /> Adicionar campo
          </button>
        </div>
        <button className="create-form-submit" onClick={createForm}>
          Criar formulário
        </button>
      </section>
    </section>
  );
}

export default CreateForm;
