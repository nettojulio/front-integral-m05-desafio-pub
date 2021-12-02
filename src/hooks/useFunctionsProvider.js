import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

export default function useFunctionProvider() {
  let navigate = useNavigate();
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [open, setOpen] = useState(false);
  const [formSignUp, setFormSignUp] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  });
  const [formsLogin, SetFormsLogin] = useState({ email: "", senha: "" });
  const [messageAlert, setMessageAlert] = useState(false);
  const [stateAlert, setStateAlert] = useState("");
  const [togglePage, setTogglePage] = useState("");
  const [userData, setUserData] = useState("");
  const [clientData, setClientData] = useState([]);
  const [chargeData, setChargeData] = useState([]);

  function handleClose() {
    setOpen(false);
  }

  function handleFormInput(e) {
    setFormSignUp({ ...formSignUp, [e.target.id]: e.target.value });
  }

  async function handleSubmitSignUp(e) {
    e.preventDefault();
    if (
      !formSignUp.email ||
      !formSignUp.nome ||
      !formSignUp.senha ||
      !formSignUp.senhaRepetida
    ) {
      setOpen(true);
      setStateAlert("error");
      setMessageAlert("Erro: Existem alguns campos em branco!");
      return;
    }

    if (formSignUp.senha !== formSignUp.senhaRepetida) {
      setOpen(true);
      setStateAlert("error");
      setMessageAlert("Erro: As senhas digitadas são diferentes!");
      return;
    }

    handleRegister();
  }

  async function handleRegister() {
    const body = {
      nome: formSignUp.nome,
      email: formSignUp.email,
      senha: formSignUp.senha,
    };

    try {
      const response = await fetch(
        `https://api-teste-desafio.herokuapp.com/cadastro`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setOpen(true);
        setStateAlert("error");
        setMessageAlert(`Erro: ${data}`);
      } else {
        setTogglePage("signupDone");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleLogin() {
    const body = {
      email: formsLogin.email,
      senha: formsLogin.senha,
    };

    try {
      const response = await fetch(
        `https://api-teste-desafio.herokuapp.com/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setOpen(true);
        setStateAlert("error");
        setMessageAlert(`Erro: ${data}`);
      } else {
        setToken(data.token);
        setUserData(data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadUserProfile() {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/usuario",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }
      setUserData(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleLogout() {
    removeToken();
    navigate("signin");
  }

  async function loadClients() {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/clientes",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      setClientData(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadCharges() {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/cobrancas",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data);
      }

      setChargeData(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    togglePage,
    setTogglePage,
    formSignUp,
    setFormSignUp,
    handleFormInput,
    handleSubmitSignUp,
    open,
    setOpen,
    handleClose,
    messageAlert,
    setMessageAlert,
    formsLogin,
    SetFormsLogin,
    handleLogin,
    token,
    setToken,
    loadUserProfile,
    handleLogout,
    userData,
    setUserData,
    stateAlert,
    setStateAlert,
    loadClients,
    clientData,
    loadCharges,
    chargeData,
  };
}
