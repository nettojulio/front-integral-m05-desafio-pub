import { useState } from "react";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router-dom";

function useSignupProvider() {
  const [signupPassword, setSignupPassword] = useState([]);
  const [signupDone, setSignupDone] = useState([]);
  const [togglePage, setTogglePage] = useState("");
  const [formSignUp, setFormSignUp] = useState({
    nome: "",
    email: "",
    senha: "",
    senhaRepetida: "",
  });
  const [formsLogin, SetFormsLogin] = useState({ email: "", senha: "" });
  const [open, setOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState(false);
  const [stateAlert, setStateAlert] = useState("");
  const [changePages, setChangePages] = useState("resume");
  /*TESTE*/
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [openChargeModal, setOpenChargeModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openClientDetail, setOpenClientDetail] = useState(false);
  const [userData, setUserData] = useState("");


  const [openOptions, setOpenOptions] = useState(false);

  /*TESTE*/
  let navigate = useNavigate();

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

  return {
    signupPassword,
    setSignupPassword,
    signupDone,
    setSignupDone,
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
    openClientModal,
    setOpenClientModal,
    openEditClientModal,
    setOpenEditClientModal,
    openChargeModal,
    setOpenChargeModal,
    openUserModal,
    setOpenUserModal,
    loadUserProfile,
    handleLogout,
    userData,
    setUserData,
    changePages,
    setChangePages,
    stateAlert,
    setStateAlert,
    openOptions,
    setOpenOptions,
    openClientDetail,
    setOpenClientDetail
  };
}

export default useSignupProvider;
