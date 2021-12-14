import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import secure from "../../../assets/eye-hide.svg";
import exposed from "../../../assets/eye.svg";
import "./styles.css";
import checkIcon from "../../../assets/check-icon.svg";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";

function UserModal() {
  const initialForm = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  };

  const { token, userData, loadUserProfile } = useFunctions();
  const { openUserModal, setOpenUserModal } = useGlobal();
  const [formEditUserModalInputs, setFormEditUserModalInputs] =
    useState(initialForm);
  const [visibleTypingPassword, setVisibleTypingPassword] = useState(false);
  const [visibleTypingRepeatPassword, setVisibleTypingRepeatPassword] =
    useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [cpfErrorMessage, setCpfErrorMessage] = useState(false);
  const [telefoneErrorMessage, setTelefoneErrorMessage] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    handleClearValidations();
  }, [password, repeatPassword]);

  useEffect(() => {
    setFormEditUserModalInputs(userData);
    // eslint-disable-next-line
  }, [openUserModal]);

  async function editUserProfile(body) {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/usuario",
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

      setComplete(true);
      loadUserProfile();
      const tasks = setInterval(() => {
        setComplete(false);
        setOpenUserModal(false);
        clearInterval(tasks);
      }, 3000);
    } catch (error) {
      updateValidations(error);
    }
  }

  function updateValidations(error) {
    if (error.message.includes("nome") || error.message.includes("Nome")) {
      setNameErrorMessage(error.message);
    } else if (
      error.message.includes("Email") ||
      error.message.includes("email")
    ) {
      error.message.includes("O email já existe!")
        ? setEmailErrorMessage("E-mail já cadastrado")
        : setEmailErrorMessage(error.message);
    } else if (
      error.message.includes("senha") ||
      error.message.includes("Senha")
    ) {
      setPasswordErrorMessage(error.message);
    }
  }

  function handleChange(target) {
    handleClearValidations();
    setFormEditUserModalInputs({
      ...formEditUserModalInputs,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    handleClearValidations();

    if (!formEditUserModalInputs.nome || !formEditUserModalInputs.email) {
      !formEditUserModalInputs.nome &&
        setNameErrorMessage("Este campo deve ser preenchido");
      !formEditUserModalInputs.email &&
        setEmailErrorMessage("Este campo deve ser preenchido");
      return;
    }

    if (formEditUserModalInputs.cpf) {
      formEditUserModalInputs.cpf = formEditUserModalInputs.cpf
        .replace(".", "")
        .replace(".", "")
        .replace("-", "")
        .trim();
    }

    if (isNaN(formEditUserModalInputs.cpf)) {
      setCpfErrorMessage("CPF Inválido!");
      return;
    }

    if (formEditUserModalInputs.telefone) {
      formEditUserModalInputs.telefone = formEditUserModalInputs.telefone
        .replace(" ", "")
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace("_", "");
    }

    if (
      isNaN(Number(formEditUserModalInputs.telefone)) ||
      (formEditUserModalInputs.telefone.length < 10 &&
        formEditUserModalInputs.telefone.length !== 0)
    ) {
      setTelefoneErrorMessage("Telefone inválido!");
      return;
    }

    const updateUser = {
      nome: formEditUserModalInputs.nome.trim(),
      email: formEditUserModalInputs.email,
      cpf: formEditUserModalInputs.cpf,
      telefone: formEditUserModalInputs.telefone,
    };

    if (password || repeatPassword) {
      if (password !== repeatPassword) {
        setPasswordErrorMessage("As senhas não coincidem");
        return;
      } else if (password.length < 6) {
        setPasswordErrorMessage("Senha deve ter o mínimo de 6 caracteres");
        return;
      }
      updateUser.senha = password;
    }
    editUserProfile(updateUser);
  }

  function handleClearValidations() {
    setNameErrorMessage(false);
    setEmailErrorMessage(false);
    setCpfErrorMessage(false);
    setTelefoneErrorMessage(false)
    setPasswordErrorMessage(false);
  }

  function handleModalOptions(e) {
    e.stopPropagation();
    complete && setOpenUserModal(false);
  }

  return (
    <div
      className={`backdrop ${!openUserModal && "hidden"}`}
      onClick={(e) => handleModalOptions(e)}
    >
      {!complete && (
        <div className="userModal">
          <img
            className="closeModal"
            onClick={() => setOpenUserModal(false)}
            src={closeIcon}
            alt="Fechar"
          />
          <span className="modalTitle">Edite seu cadastro</span>
          <form className="editUserForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="nome" className="formLabels">
                Nome*
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={formEditUserModalInputs.nome}
                  onChange={(e) => handleChange(e.target)}
                  className={nameErrorMessage && "errorSinalization"}
                />
                {nameErrorMessage && (
                  <p className="errorMessage">{nameErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label htmlFor="email" className="formLabels">
                E-mail*
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={formEditUserModalInputs.email}
                  onChange={(e) => handleChange(e.target)}
                  className={
                    emailErrorMessage ? "errorSinalization" : undefined
                  }
                />
                {emailErrorMessage && (
                  <p className="errorMessage">{emailErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label htmlFor="cpf" className="formLabels split">
                CPF
                <InputMask
                  id="cpf"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={
                    formEditUserModalInputs.cpf &&
                    formEditUserModalInputs.cpf.trim()
                  }
                  onChange={(e) => handleChange(e.target)}
                  mask="999.999.999-99"
                  className={
                    cpfErrorMessage ? "errorSinalization" : undefined
                  }
                />
                {cpfErrorMessage && (
                  <p className="errorMessage">{cpfErrorMessage}</p>
                )}
              </label>
              <label htmlFor="telefone" className="formLabels split">
                Telefone
                <InputMask
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu Telefone"
                  value={formEditUserModalInputs.telefone}
                  onChange={(e) => handleChange(e.target)}
                  mask="(99) 99999-9999"
                  className={
                    telefoneErrorMessage ? "errorSinalization" : undefined
                  }
                />
                {telefoneErrorMessage && (
                  <p className="errorMessage">{telefoneErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="formGroup">
              <label htmlFor="senha" className="formLabels">
                Nova Senha*
                <input
                  id="senha"
                  type={visibleTypingPassword ? "text" : "password"}
                  name="senha"
                  placeholder="Digite a nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    passwordErrorMessage ? "errorSinalization" : undefined
                  }
                />
                <img
                  className="passwordVisibilityToggle"
                  onClick={() =>
                    setVisibleTypingPassword(!visibleTypingPassword)
                  }
                  src={visibleTypingPassword ? exposed : secure}
                  alt="Alterar visibilidade da senha"
                />
              </label>
              <label htmlFor="confirmarSenha" className="formLabels">
                Confirmar Senha*
                <input
                  id="confirmarSenha"
                  type={visibleTypingRepeatPassword ? "text" : "password"}
                  name="confirmarSenha"
                  placeholder="Repita a nova senha"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className={
                    passwordErrorMessage ? "errorSinalization" : undefined
                  }
                />
                <img
                  className="passwordVisibilityToggle"
                  onClick={() =>
                    setVisibleTypingRepeatPassword(!visibleTypingRepeatPassword)
                  }
                  src={visibleTypingRepeatPassword ? exposed : secure}
                  alt="Alterar visibilidade da senha"
                />
              </label>
              {passwordErrorMessage && (
                <div className="errorMessage errorMessagePassword">
                  {passwordErrorMessage}
                </div>
              )}
            </div>
            <button className="applyEditUserChanges">Aplicar</button>
          </form>
        </div>
      )}
      {complete && (
        <div className="editComplete">
          <img src={checkIcon} alt="Check Icon" />
          <span className="message">Cadastro Alterado com sucesso!</span>
        </div>
      )}
    </div>
  );
}

export default UserModal;
