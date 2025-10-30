import { useEffect, useState } from "react";
import "./CreateForm.css";
import Close from "../../assets/close-blue.svg";
import CloseRose from "../../assets/close-rose.svg";
import Add from "../../assets/create.svg";
import Dropdown from "../../assets/dropdown.svg";
import Snackbar from "../../components/snackbar/Snackbar";
import PermissionsDropdown from "../../components/permissions/permissions-dropdown/PermissionsDropdown";
import Loading from "../../components/loading/Loading";
import { getPermissionsByIdEmpresa } from "../../services/mongoDB/Permissions/Permissions";
import { createForm } from "../../services/mongoDB/Forms/Forms";

function CreateForm() {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const user = JSON.parse(localStorage.getItem("user"));

  const [formTitle, setTitle] = useState("");
  const [formDesc, setDesc] = useState("");
  const [formPerms, setFormPerms] = useState([]);
  const [form, editForm] = useState([
    { id: crypto.randomUUID(), tipo: "text", obrigatorio: false, label: "" },
  ]);
  const [isLoading, setLoading] = useState(false);
  const [selectPerms, setSelectPerms] = useState(false);
  const [perms, setPerms] = useState([]);
  const [snackbar, setSnackbar] = useState({
    title: "",
    message: "",
    type: "",
    visible: false,
  });

  const showSnackbar = async (title, message, type = "error") => {
    setSnackbar({ title, message, type, visible: true });
    await sleep(4000);
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setFormPerms([]);
    editForm([
      { id: crypto.randomUUID(), tipo: "text", obrigatorio: false, label: "" },
    ]);
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
      const field = { ...newForm[index], [key]: value };
      if (key === "tipo" && value === "select" && !field.opcoes) {
        field.opcoes = ["", ""]; // duas opções iniciais
      }
      if (key === "tipo" && value !== "select") {
        delete field.opcoes;
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

  const addQuestion = (tipo) => {
    editForm((prev) => [
      ...prev,
      tipo === "select"
        ? {
            id: crypto.randomUUID(),
            tipo: "select",
            obrigatorio: false,
            label: "",
            opcoes: ["", ""],
          }
        : { id: crypto.randomUUID(), tipo, obrigatorio: false, label: "" },
    ]);
  };

  const addOption = (fieldIndex) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };
      field.opcoes = [...(field.opcoes || []), ""];
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };
      const newOptions = [...(field.opcoes || [])];
      newOptions[optionIndex] = value;
      field.opcoes = newOptions;
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  const removeOption = (fieldIndex, optionIndex) => {
    editForm((prev) => {
      const newForm = [...prev];
      const field = { ...newForm[fieldIndex] };
      if ((field.opcoes?.length || 0) <= 2) {
        showSnackbar(
          "Erro",
          "Uma pergunta de seleção precisa ter pelo menos duas opções"
        );
        return newForm;
      }
      field.opcoes = field.opcoes.filter((_, i) => i !== optionIndex);
      newForm[fieldIndex] = field;
      return newForm;
    });
  };

  useEffect(() => {
    setLoading(true);
    async function getPerms() {
      try {
        const data = await getPermissionsByIdEmpresa(user.id);
        setPerms(data);
      } catch (e) {
        showSnackbar(
          "Erro",
          "Houve um erro. Tente novamente mais tarde.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    }
    getPerms();
  }, []);

  const createForms = async () => {
    setLoading(true);
    if (!formTitle.trim())
      return showSnackbar("Erro", "O formulário precisa de um título");
    if (formPerms.length === 0)
      return showSnackbar(
        "Erro",
        "O formulário precisa de permissões para ser respondido"
      );

    for (let i = 0; i < form.length; i++) {
      const field = form[i];
      if (!field.label.trim())
        return showSnackbar(
          "Erro",
          `A pergunta ${i + 1} precisa ter um campo preenchido`
        );
      if (field.tipo === "select") {
        const emptyOption = field.opcoes.some((opt) => !opt.trim());
        if (emptyOption)
          return showSnackbar(
            "Erro",
            `A pergunta ${i + 1} possui opções vazias`
          );
      }
    }

    try {
      await createForm(user.id, formTitle, formDesc, form, formPerms);
      showSnackbar("Sucesso", "Formulário criado com sucesso!", "success");
      resetForm();
    } catch (e) {
      showSnackbar(
        "Erro",
        "Houve um erro. Tente novamente mais tarde",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-form-section">
      {isLoading && (
        <div className="create-form-loading">
          <Loading />
        </div>
      )}
      <section className="create-form-content">
        <Snackbar {...snackbar} isVisible={snackbar.visible} />
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
          <button onClick={() => setSelectPerms(!selectPerms)}>
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
                  className={field.tipo === "text" ? "active" : ""}
                  onClick={() => updateField(i, "tipo", "text")}
                >
                  Texto
                </button>
                <button
                  className={field.tipo === "number" ? "active" : ""}
                  onClick={() => updateField(i, "tipo", "number")}
                >
                  Número
                </button>
                <button
                  className={field.tipo === "select" ? "active" : ""}
                  onClick={() => updateField(i, "tipo", "select")}
                >
                  Seleção
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
                checked={field.obrigatorio}
                onChange={(e) =>
                  updateField(i, "obrigatorio", e.target.checked)
                }
              />
            </label>

            <input
              className="create-form-input-field"
              placeholder="Campo"
              value={field.label}
              onChange={(e) => updateField(i, "label", e.target.value)}
            />

            {field.tipo === "select" &&
              (field.opcoes || []).map((opt, j) => (
                <div key={j} className="create-form-choice">
                  <input
                    value={opt}
                    placeholder={`Opção ${j + 1}`}
                    onChange={(e) => updateOption(i, j, e.target.value)}
                  />
                  <img
                    src={CloseRose}
                    alt="Remover"
                    onClick={() => removeOption(i, j)}
                  />
                </div>
              ))}

            {field.tipo === "select" && (
              <button
                className="create-form-add-option"
                onClick={() => addOption(i)}
              >
                <img src={Add} alt="" /> Adicionar opção
              </button>
            )}
          </div>
        ))}

        <div className="create-form-buttons">
          <button
            className="create-form-add-question"
            onClick={() => addQuestion("text")}
          >
            <img src={Add} alt="" /> Adicionar campo
          </button>
        </div>

        <button className="create-form-submit" onClick={createForms}>
          Criar formulário
        </button>
      </section>
    </section>
  );
}

export default CreateForm;