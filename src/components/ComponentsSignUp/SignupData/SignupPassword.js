import "./style.css";
import eye from "../../../assets/eye.svg";
import eyeHide from "../../../assets/eye-hide.svg";
import { useState } from "react";
import useFunctions from "../../../hooks/useFunctions";
import { Link } from "react-router-dom";

function SignupPassword() {
  const [openFirst, setOpenFirst] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const { handleSubmitSignUp, formSignUp, handleFormInput, setTogglePage } =
    useFunctions();

  return (
    <div className="signup-data">
      <div className="form-data">
        <h3>Escolha uma senha</h3>
        <form onSubmit={(e) => handleSubmitSignUp(e)}>
          <label htmlFor="senha">
            Senha*
            <input
              className="signup-input"
              placeholder="Digite sua senha"
              type={openFirst ? "text" : "password"}
              id="senha"
              value={formSignUp.senha}
              onChange={(e) => handleFormInput(e)}
            />
            <img
              className="password-img-toggle"
              onClick={() =>
                openFirst ? setOpenFirst(false) : setOpenFirst(true)
              }
              src={openFirst ? eye : eyeHide}
              alt="Hide Password"
            />
          </label>
          <label htmlFor="senha">
            Repita a senha*
            <input
              className="signup-input"
              placeholder="Digite novamente sua senha"
              type={openSecond ? "text" : "password"}
              id="senhaRepetida"
              value={formSignUp.senhaRepetida}
              onChange={(e) => handleFormInput(e)}
            />
            <img
              className="password-img-toggle"
              onClick={() =>
                openSecond ? setOpenSecond(false) : setOpenSecond(true)
              }
              src={openSecond ? eye : eyeHide}
              alt="Hide Password"
            />
          </label>
          <button className="btn btn-confirm" type="submit">
            Cadastrar
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
        <div className="status-bar" onClick={() => setTogglePage("")}></div>
        <div className="status-bar active-bar"></div>
        <div className="status-bar"></div>
      </div>
    </div>
  );
}

export default SignupPassword;
