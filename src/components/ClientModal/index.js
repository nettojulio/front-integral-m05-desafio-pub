import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../assets/closeIcon.svg";
import customerScreen from "../../assets/customerScreen.svg";
import useSignup from "../../hooks/useSignup";
import "./styles.css";

function ClientModal() {
  const initialForm = {
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    endereco: "",
    complemento: "",
    cep: "",
    bairro: "",
    cidade: "",
    uf: "",
  };

  const { token, openClientModal, setOpenClientModal } = useSignup();
  const [formEditUserModalInputs, setFormEditUserModalInputs] = useState(initialForm);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [cpfErrorMessage, setCpfErrorMessage] = useState("");
  const [telefoneErrorMessage, setTelefoneErrorMessage] = useState("");

  // useEffect(() => {
  //   viacep();
  // }, []);

  // async function viacep(cep) {
  //   fetch(`https://viacep.com.br/ws/${cep}/json`)
  //     .then((resposta) => resposta.json())
  //     .then((dados) => console.log(dados));
  // }

  /* remover*/

  async function addNewClient(body) {
    try {
      const response = await fetch(
        "https://api-teste-desafio.herokuapp.com/clientes",
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
      setOpenClientModal(false);
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
      setEmailErrorMessage(error.message);
    } else if (
      error.message.includes("CPF") ||
      error.message.includes("Cpf") ||
      error.message.includes("cpf")
    ) {
      setCpfErrorMessage(error.message);
    } else {
      console.log(error.message);
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

    if (!formEditUserModalInputs.nome) {
      setNameErrorMessage("Este campo deve ser preenchido");
      return;
    }

    if (!formEditUserModalInputs.email) {
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

    if (isNaN(formEditUserModalInputs.cpf) || !formEditUserModalInputs.cpf) {
      setCpfErrorMessage("Este campo deve ser preenchido");
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
      !formEditUserModalInputs.telefone ||
      isNaN(Number(formEditUserModalInputs.telefone)) ||
      (formEditUserModalInputs.telefone.length < 10 &&
        formEditUserModalInputs.telefone.length !== 0)
    ) {
      setTelefoneErrorMessage("Este campo deve ser preenchido");
      return;
    }

    if (formEditUserModalInputs.cep) {
      formEditUserModalInputs.cep = formEditUserModalInputs.cep.replace(
        "-",
        ""
      );
    }

    if (
      isNaN(Number(formEditUserModalInputs.cep)) ||
      (formEditUserModalInputs.cep.length < 8 &&
        formEditUserModalInputs.cep.length !== 0)
    ) {
      return;
    }

    const updateUser = {
      nome: formEditUserModalInputs.nome,
      email: formEditUserModalInputs.email,
      cpf: formEditUserModalInputs.cpf,
      telefone: formEditUserModalInputs.telefone,
      endereco: formEditUserModalInputs.endereco,
      complemento: formEditUserModalInputs.complemento,
      cep: formEditUserModalInputs.cep,
      bairro: formEditUserModalInputs.bairro,
      cidade: formEditUserModalInputs.cidade,
      uf: formEditUserModalInputs.uf,
    };
    addNewClient(updateUser);
  }

  function handleClearValidations() {
    setNameErrorMessage(false);
    setEmailErrorMessage(false);
    setCpfErrorMessage(false);
    setTelefoneErrorMessage(false);
  }

  return (
    openClientModal && (
      <div className="containerModal">
        <div className="backdrop" />
        <div className="userModal">
          <div className="titleModalContainer">
            <img
              className="customerIcon"
              src={customerScreen}
              alt="Ícone de Clientes"
            />
            <span className="modalTitle">Cadastro do Cliente</span>
          </div>
          <img
            className="closeModal"
            onClick={() => setOpenClientModal(false)}
            src={closeIcon}
            alt="Fechar"
          />
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
                  className={nameErrorMessage ? "errorSinalization" : undefined}
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
                CPF:*
                <InputMask
                  id="cpf"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formEditUserModalInputs.cpf}
                  onChange={(e) => handleChange(e.target)}
                  mask="999.999.999-99"
                  className={cpfErrorMessage ? "errorSinalization" : undefined}
                />
                {cpfErrorMessage && (
                  <p className="errorMessage">{cpfErrorMessage}</p>
                )}
              </label>
              <label htmlFor="telefone" className="formLabels split">
                Telefone:*
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
              <label htmlFor="endereco" className="formLabels">
                Endereço
                <input
                  id="endereco"
                  type="text"
                  name="endereco"
                  placeholder="Digite o endereço"
                  value={formEditUserModalInputs.endereco}
                  onChange={(e) => handleChange(e.target)}
                />
              </label>
              <label htmlFor="complemento" className="formLabels">
                Complemento
                <input
                  id="complemento"
                  type="text"
                  name="complemento"
                  placeholder="Digite o complemento"
                  value={formEditUserModalInputs.complemento}
                  onChange={(e) => handleChange(e.target)}
                />
              </label>
              <div className="splitContainer">
                <label htmlFor="cep" className="formLabels split">
                  CEP:
                  <InputMask
                    id="cep"
                    name="cep"
                    placeholder="Digite o CEP"
                    value={formEditUserModalInputs.cep}
                    onChange={(e) => handleChange(e.target)}
                    mask="99999-999"
                  />
                </label>
                <label htmlFor="bairro" className="formLabels split">
                  Bairro
                  <input
                    id="bairro"
                    type="text"
                    name="bairro"
                    placeholder="Digite o Bairro"
                    value={formEditUserModalInputs.bairro}
                    onChange={(e) => handleChange(e.target)}
                  />
                </label>
              </div>
              <div className="splitContainer">
                <label htmlFor="cidade" className="formLabels split cidadeForm">
                  Cidade
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    placeholder="Digite a cidade"
                    value={formEditUserModalInputs.cidade}
                    onChange={(e) => handleChange(e.target)}
                  />
                </label>
                <label htmlFor="uf" className="formLabels split ufForm">
                  UF
                  <input
                    id="uf"
                    type="text"
                    name="uf"
                    placeholder="Digite a UF"
                    value={formEditUserModalInputs.uf}
                    onChange={(e) => handleChange(e.target)}
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="splitButtonsContainer">
            <button
              onClick={() => setOpenClientModal(false)}
              className="cancelEditUserChanges"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="applyEditUserChanges">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ClientModal;
