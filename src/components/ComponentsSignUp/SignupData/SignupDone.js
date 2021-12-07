import "./style.css";
import checkIcon from "../../../assets/check-icon.svg";
import { useNavigate } from "react-router";
import useFunctions from "../../../hooks/useFunctions";

function SignupDone() {
  let navigate = useNavigate();
  const { setTogglePage, setFormSignUp } = useFunctions();

  function handlePageLogin() {
    navigate("/signin");
    setTogglePage("");
    setFormSignUp({
      nome: "",
      email: "",
      senha: "",
      senhaRepetida: "",
    });
  }

  return (
    <div className="signup-data">
      <div className="signup-done">
        <img src={checkIcon} alt="Check Icon" />
        <h2>Cadastro realizado com sucesso!</h2>
      </div>
      <button className="btn btn-login " onClick={handlePageLogin}>
        Ir para Login
      </button>
      <div className="status-data">
        <div className="status-bar"></div>
        <div className="status-bar"></div>
        <div className="status-bar active-bar"></div>
      </div>
    </div>
  );
}

export default SignupDone;
