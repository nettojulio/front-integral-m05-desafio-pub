import "./style.css";
import useFunctions from "../../../hooks/useFunctions";
import { Link } from "react-router-dom";

function SignupData() {
  const {
    formSignUp,
    handleFormInput,
    setTogglePage,
    setOpen,
    setMessageAlert,
    setStateAlert,
    preloadEmail,
  } = useFunctions();

  async function handleNextPage(e) {
    e.preventDefault();
    if (!formSignUp.email || !formSignUp.nome) {
      setOpen(true);
      setStateAlert("error");
      setMessageAlert("Erro: Existem alguns campos em branco!");
      return;
    }
    
    if (await preloadEmail(formSignUp)) {
      return;
    }
    
    setTogglePage("signupPassword");
  }

  return (
    <div className="signup-data">
      <div className="form-data">
        <h3>Adicione seus dados</h3>

        <form onSubmit={(e) => handleNextPage(e)}>
          <label htmlFor="name">
            Nome*
            <input
              className={`signup-input`}
              placeholder="Digite seu nome"
              type="text"
              value={formSignUp && formSignUp.nome}
              id="nome"
              onChange={formSignUp && ((e) => handleFormInput(e))}
            />
          </label>
          <label htmlFor="email">
            E-mail*
            <input
              className="signup-input email"
              placeholder="Digite seu e-mail"
              type="email"
              value={formSignUp && formSignUp.email}
              id="email"
              onChange={formSignUp && ((e) => handleFormInput(e))}
            />
          </label>
          <button className="btn btn-confirm" type="submit">
            Confirmar
          </button>
        </form>
        <span>
          Já possui uma conta? Faça seu{" "}
          <Link className="signup-a" to="/signin">
            Login
          </Link>
        </span>
      </div>
      <div className="status-data">
        <div className="status-bar active-bar"></div>
        <div className="status-bar"></div>
        <div className="status-bar"></div>
      </div>
    </div>
  );
}

export default SignupData;
