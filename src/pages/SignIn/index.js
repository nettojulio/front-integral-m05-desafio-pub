import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFunctions from "../../hooks/useFunctions";
import eye from "../../assets/eye.svg";
import eyeHide from "../../assets/eye-hide.svg";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
import { useNavigate } from "react-router";

function SignIn() {
  const [openPass, setOpenPass] = useState(false);
  const {
    setOpen,
    setMessageAlert,
    handleLogin,
    formsLogin,
    SetFormsLogin,
    token,
    setStateAlert,
  } = useFunctions();
  let navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/resume");
    }
    // eslint-disable-next-line
  }, []);

  function handleSubmitLogin() {
    if (!formsLogin.email || !formsLogin.senha) {
      setOpen(true);
      setStateAlert("error");
      setMessageAlert("Erro: Existem alguns campos em branco!");
      return;
    }
    handleLogin();
  }

  function handleFormsLogin(e) {
    SetFormsLogin({ ...formsLogin, [e.target.name]: e.target.value });
  }

  return (
    <div className="signIn">
      <div className="left">
        <p className="left-description">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </p>
      </div>
      <div className="right">
        <div className="signInForm">
          <h1>Faça seu login!</h1>
          <label>E-Mail</label>
          <input
            placeholder="Digite seu e-mail"
            name="email"
            value={formsLogin.email}
            onChange={(e) => handleFormsLogin(e)}
          />
          <label>
            Senha
            <a href="/">Esqueceu a senha?</a>
          </label>
          <input
            placeholder="Digite sua senha"
            type={openPass ? "text" : "password"}
            name="senha"
            value={formsLogin.senha}
            onChange={(e) => handleFormsLogin(e)}
          />
          <img
            className="password-img-toggle-login"
            onClick={() => (openPass ? setOpenPass(false) : setOpenPass(true))}
            src={openPass ? eye : eyeHide}
            alt="Hide Password"
          />
          <button
            className="sign-in-button"
            onClick={() => handleSubmitLogin()}
          >
            Entrar
          </button>

          <span>
            Ainda não possui uma conta? <Link to={"/signup"}>Cadastre-se</Link>
          </span>
        </div>
      </div>
      <ToastAlert />
    </div>
  );
}

export default SignIn;
