import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import useGlobal from "../hooks/useGlobal";



export default function useFunctionProvider() {
  const {  setOpenEditClientModal} = useGlobal();
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
  const [stateAlert, setStateAlert] = useState("success");
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
      handleLogout();
      console.log(error.message);
    }
  }

  async function editRegisteredClient(body, id) {
    try {
      const response = await fetch(
        `https://api-teste-desafio.herokuapp.com/clientes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result);
      }

      console.log(result);
      setOpenEditClientModal(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addBillings(body, id) {
    try {
      const response = await fetch(
        `https://api-teste-desafio.herokuapp.com/cobrancas/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result);
      }

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadAllBillings() {
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result);
      }

      setChargeData(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function loadAllClients() {
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result);
      }

      setClientData(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function preloadEmail(body) {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/preload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result);
      }

      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  function formatToDate(date) {
    const [dd, mm, yy] = date.split("/");
    const newrebase = [mm, dd, yy];
    const preChargeDate = newrebase.join("/");
    const exportedDateFormat = new Date(preChargeDate);
    return exportedDateFormat
  }

  function handleLogout() {
    removeToken();
    navigate("signin");
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
    clientData,
    chargeData,
    editRegisteredClient,
    addBillings,
    loadAllBillings,
    loadAllClients,
    preloadEmail,
    formatToDate
  };
}
