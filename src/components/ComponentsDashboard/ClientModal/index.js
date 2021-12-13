import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import customerScreen from "../../../assets/customerScreen.svg";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
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

  const { openClientModal, setOpenClientModal } = useGlobal();
  const { token, setOpen, setMessageAlert, setStateAlert, loadAllClients } =
    useFunctions();

  const [formEditUserModalInputs, setFormEditUserModalInputs] =
    useState(initialForm);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [cpfErrorMessage, setCpfErrorMessage] = useState("");
  const [telefoneErrorMessage, setTelefoneErrorMessage] = useState("");

  async function handleViaCep(e) {
    if (e.target.value.includes("_")) {
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${e.target.value}/json`
      );

      const result = await response.json();

      const complemento = {
        nome: formEditUserModalInputs.nome,
        email: formEditUserModalInputs.email,
        cpf: formEditUserModalInputs.cpf,
        telefone: formEditUserModalInputs.telefone,
        endereco: result.logradouro,
        complemento: formEditUserModalInputs.complemento,
        cep: result.cep,
        bairro: result.bairro,
        cidade: result.localidade,
        uf: result.uf,
      };

      setFormEditUserModalInputs(complemento);
    } catch (error) {}
  }

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
      loadAllClients();
      setOpen(true);
      setStateAlert("success");
      setMessageAlert("Sucesso: Cliente adicionado!");
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

    if (
      !formEditUserModalInputs.nome ||
      !formEditUserModalInputs.email ||
      !formEditUserModalInputs.cpf ||
      !formEditUserModalInputs.telefone
    ) {
      !formEditUserModalInputs.nome &&
        setNameErrorMessage("Este campo deve ser preenchido");
      !formEditUserModalInputs.email &&
        setEmailErrorMessage("Este campo deve ser preenchido");
      !formEditUserModalInputs.cpf &&
        setCpfErrorMessage("Este campo deve ser preenchido");
      !formEditUserModalInputs.telefone &&
        setTelefoneErrorMessage("Este campo deve ser preenchido");
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
    if (formEditUserModalInputs.uf) {
      formEditUserModalInputs.uf.toUpperCase();
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
      estado: formEditUserModalInputs.uf,
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
      <div className="containerClientModal">
        <div className="backdropClientModal" />
        <div className="clientModal">
          <div className="titleClientModalContainer">
            <img
              className="customerIcon"
              src={customerScreen}
              alt="Ícone de Clientes"
            />
            <span className="clientModalTitle">Cadastro do Cliente</span>
          </div>
          <img
            className="closeClientModal"
            onClick={() => setOpenClientModal(false)}
            src={closeIcon}
            alt="Fechar"
          />
          <form className="editClientForm" onSubmit={handleSubmit}>
            <div className="clientFormGroup">
              <label htmlFor="nome" className="clientFormLabels">
                Nome*
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={formEditUserModalInputs.nome}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputClient ${
                    nameErrorMessage ? "clientErrorSinalization" : undefined
                  }`}
                />
                {nameErrorMessage && (
                  <p className="clientErrorMessage">{nameErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="clientFormGroup">
              <label htmlFor="email" className="clientFormLabels">
                E-mail*
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  value={formEditUserModalInputs.email}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputClient ${
                    emailErrorMessage ? "clientErrorSinalization" : undefined
                  }
                  `}
                />
                {emailErrorMessage && (
                  <p className="clientErrorMessage">{emailErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="clientFormGroup">
              <label htmlFor="cpf" className="clientFormLabels split">
                CPF:*
                <InputMask
                  id="cpf"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formEditUserModalInputs.cpf}
                  onChange={(e) => handleChange(e.target)}
                  mask="999.999.999-99"
                  className={`inputClient ${
                    cpfErrorMessage ? "clientErrorSinalization" : undefined
                  }`}
                />
                {cpfErrorMessage && (
                  <p className="clientErrorMessage">{cpfErrorMessage}</p>
                )}
              </label>
              <label htmlFor="telefone" className="clientFormLabels split">
                Telefone:*
                <InputMask
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu Telefone"
                  value={formEditUserModalInputs.telefone}
                  onChange={(e) => handleChange(e.target)}
                  mask="(99) 99999-9999"
                  className={`inputClient
                    ${
                      telefoneErrorMessage
                        ? "clientErrorSinalization"
                        : undefined
                    }
                  `}
                />
                {telefoneErrorMessage && (
                  <p className="clientErrorMessage">{telefoneErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="clientFormGroup">
              <label htmlFor="endereco" className="clientFormLabels">
                Endereço
                <input
                  id="endereco"
                  type="text"
                  name="endereco"
                  placeholder="Digite o endereço"
                  value={formEditUserModalInputs.endereco}
                  onChange={(e) => handleChange(e.target)}
                  className="inputClient"
                />
              </label>
              <label htmlFor="complemento" className="clientFormLabels">
                Complemento
                <input
                  id="complemento"
                  type="text"
                  name="complemento"
                  placeholder="Digite o complemento"
                  value={formEditUserModalInputs.complemento}
                  onChange={(e) => handleChange(e.target)}
                  className="inputClient"
                />
              </label>
              <div className="splitClientContainer">
                <label htmlFor="cep" className="clientFormLabels split">
                  CEP:
                  <InputMask
                    id="cep"
                    name="cep"
                    placeholder="Digite o CEP"
                    value={formEditUserModalInputs.cep}
                    onChange={(e) => handleChange(e.target)}
                    onBlur={(e) => handleViaCep(e)}
                    mask="99999-999"
                    className="inputClient"
                  />
                </label>
                <label htmlFor="bairro" className="clientFormLabels split">
                  Bairro
                  <input
                    id="bairro"
                    type="text"
                    name="bairro"
                    placeholder="Digite o Bairro"
                    value={formEditUserModalInputs.bairro}
                    onChange={(e) => handleChange(e.target)}
                    className="inputClient"
                  />
                </label>
              </div>
              <div className="splitClientContainer">
                <label
                  htmlFor="cidade"
                  className="clientFormLabels split cidadeForm"
                >
                  Cidade
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    placeholder="Digite a cidade"
                    value={formEditUserModalInputs.cidade}
                    onChange={(e) => handleChange(e.target)}
                    className="inputClient"
                  />
                </label>
                <label htmlFor="uf" className="clientFormLabels split ufForm">
                  UF
                  <InputMask
                    id="uf"
                    type="text"
                    name="uf"
                    placeholder="Digite a UF"
                    value={formEditUserModalInputs.uf}
                    onChange={(e) => handleChange(e.target)}
                    mask="aa"
                    alwaysShowMask={false}
                    className="inputClient"
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="splitClientButtonsContainer">
            <button
              onClick={() => setOpenClientModal(false)}
              className="cancelEditClientChanges"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="applyEditClientChanges">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ClientModal;
