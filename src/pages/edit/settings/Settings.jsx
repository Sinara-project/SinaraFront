import "./Settings.css";
import Restrict from "../../../assets/restrict.svg";
import Edit from "../../../assets/edit.svg";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const types = ["normal", "restrict"];

  const navigateEdit = (type) => { 
    console.log(type);
    
    navigate("/editar", {
      state: { type: type },
    });
  };

  return (
    <section className="settings-section">
      <section className="settings-content">
        <h1>Configurações</h1>
        <div>
          <button
            onClick={() => {
              navigateEdit(types[1]);
            }}
          >
            <img src={Restrict} alt="" />
            <h3>Alterar senha da área restrita</h3>
          </button>
          <button
            onClick={() => {
              navigateEdit(types[0]);
            }}
          >
            <img src={Edit} alt="" />
            <h3>Alterar senha da conta</h3>
          </button>
        </div>
      </section>
    </section>
  );
}

export default Settings;
