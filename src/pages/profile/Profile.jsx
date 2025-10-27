import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const image = JSON.parse(localStorage.getItem("user")).image;
  const name = JSON.parse(localStorage.getItem("user")).name;
  const code = JSON.parse(localStorage.getItem("user")).code;
  const cnpj = JSON.parse(localStorage.getItem("user")).cnpj;
  const email = JSON.parse(localStorage.getItem("user")).email;
  const sector = JSON.parse(localStorage.getItem("user")).sector;

  const exit = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("rAreaLogged");

    navigate("/cadastrar");
  };

  return (
    <section className="profile-section">
      <section className="profile-content">
        <h1>Perfil</h1>
        <img src={image} alt="" />
        <div className="profile-main-infos">
          <h2>{name}</h2>
          <h3>Código: {code}</h3>
        </div>
        <div className="profile-sec-infos">
          <div>
            <h4>
              <strong>CNPJ:</strong> {cnpj}
            </h4>
          </div>
          <div>
            <h4>
              <strong>E-mail:</strong> {email}
            </h4>
          </div>
          <div>
            <h4>
              <strong>Ramo de atuação:</strong> {sector}
            </h4>
          </div>
        </div>
        <button onClick={exit}>
          <div></div>
          <h3>Sair</h3>
        </button>
      </section>
    </section>
  );
}

export default Profile;
