import "./Cadastro.css";

function Cadastro() {
  return (
    <section>
        <div className="logon-container">
            <span className="text-group">
                <h1>Faça cadastro</h1>
                <p>Faça o cadastro de sua empresa!</p>
            </span>
            <form action="submit">
                <span className="input-group">
                    <input type="text" placeholder="CNPJ" />
                    <input type="text" placeholder="Ramo de atuação" />
                </span>
                <input type="text" placeholder="E-mail da empresa" />
                <input type="password" placeholder="Senha" />
                <input type="password" placeholder="Confirmar senha" />
                <button>Avançar</button>
            </form>
            <p>Já tem uma conta? Faça login!</p>
        </div>
    </section>
  );
}

export default Cadastro;
