import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import customerScreen from "../../../assets/customerScreen.svg";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import "./styles.css";

function EditClientModal() {
  const {
    openEditClientModal,
    setOpenEditClientModal,
    clientDetailData,
    setOpenClientDetail,
  } = useGlobal();

  const initialForm = {
    nome: clientDetailData.nome,
    email: clientDetailData.email,
    cpf: clientDetailData.cpf,
    telefone: clientDetailData.telefone,
    endereco: clientDetailData.endereco,
    complemento: clientDetailData.complemento,
    cep: clientDetailData.cep,
    bairro: clientDetailData.bairro,
    cidade: clientDetailData.cidade,
    uf: clientDetailData.estado,
  };

  console.log(clientDetailData);
  const { token, setOpen, setMessageAlert, setStateAlert } = useFunctions();

  const [formEditUserModalInputs, setFormEditUserModalInputs] =
    useState(initialForm);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [cpfErrorMessage, setCpfErrorMessage] = useState("");
  const [telefoneErrorMessage, setTelefoneErrorMessage] = useState("");
  const [cepErrorMessage, setCepErrorMessage] = useState("");

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

      setOpenEditClientModal(false);
      setOpenClientDetail(false);
      setOpen(true);
      setStateAlert("success");
      setMessageAlert("Edições do cadastro concluídas com sucesso");
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
    } else if (error.message.includes("CEP")) {
      setCepErrorMessage("CEP inválido!");
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

  function handleSubmit(event) {
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

    if (formEditUserModalInputs.cep.includes(" ")) {
      formEditUserModalInputs.cep = formEditUserModalInputs.cep.trim();
    }

    if (formEditUserModalInputs.cep.includes("-")) {
      formEditUserModalInputs.cep = formEditUserModalInputs.cep.replace(
        "-",
        ""
      );
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

    editRegisteredClient(updateUser, clientDetailData.id);
  }

  function handleClearValidations() {
    setNameErrorMessage(false);
    setEmailErrorMessage(false);
    setCpfErrorMessage(false);
    setTelefoneErrorMessage(false);
  }

  return (
    openEditClientModal && (
      <div className="containerEditClientModal">
        <div className="backdropEditClientModal" />
        <div className="editClientModal">
          <div className="titleEditClientModalContainer">
            <div className="titleEditClientModalTitle">
              <img
                className="customerIcon"
                src={customerScreen}
                alt="Ícone de Clientes"
              />
              <span className="editClientModalTitle">Editar Cliente</span>
            </div>
            <div className="closeEditClientModal">
              <img
                className="closeEditClientModal"
                onClick={() => setOpenEditClientModal(false)}
                src={closeIcon}
                alt="Fechar"
              />
            </div>
          </div>

          <form className="editClientForm" onSubmit={handleSubmit}>
            <div className="editClientFormGroup">
              <label htmlFor="nome" className="editClientFormLabels">
                Nome*
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  value={formEditUserModalInputs.nome}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputEditClient ${
                    nameErrorMessage ? "editClientErrorSinalization" : undefined
                  }`}
                />
                {nameErrorMessage && (
                  <p className="editClientErrorMessage">{nameErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="editClientFormGroup">
              <label htmlFor="email" className="editClientFormLabels">
                E-mail*
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={formEditUserModalInputs.email}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputEditClient ${
                    emailErrorMessage
                      ? "editClientErrorSinalization"
                      : undefined
                  }
                  `}
                />
                {emailErrorMessage && (
                  <p className="editClientErrorMessage">{emailErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="editClientFormGroup">
              <label htmlFor="cpf" className="editClientFormLabels split">
                CPF:*
                <InputMask
                  id="cpf"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formEditUserModalInputs.cpf}
                  onChange={(e) => handleChange(e.target)}
                  mask="999.999.999-99"
                  className={`inputClient ${
                    cpfErrorMessage ? "editClientErrorSinalization" : undefined
                  }`}
                />
                {cpfErrorMessage && (
                  <p className="editClientErrorMessage">{cpfErrorMessage}</p>
                )}
              </label>
              <label htmlFor="telefone" className="editClientFormLabels split">
                Telefone:*
                <InputMask
                  id="telefone"
                  name="telefone"
                  placeholder="Digite seu telefone"
                  value={formEditUserModalInputs.telefone}
                  onChange={(e) => handleChange(e.target)}
                  mask="(99) 99999-9999"
                  className={`inputEditClient
                    ${
                      telefoneErrorMessage
                        ? "editClientErrorSinalization"
                        : undefined
                    }
                  `}
                />
                {telefoneErrorMessage && (
                  <p className="editClientErrorMessage">
                    {telefoneErrorMessage}
                  </p>
                )}
              </label>
            </div>
            <div className="editClientFormGroup">
              <label htmlFor="endereco" className="editClientFormLabels">
                Endereço
                <input
                  id="endereco"
                  type="text"
                  name="endereco"
                  placeholder="Digite seu endereço"
                  value={formEditUserModalInputs.endereco}
                  onChange={(e) => handleChange(e.target)}
                  className="inputEditClient"
                />
              </label>
              <label htmlFor="complemento" className="editClientFormLabels">
                Complemento
                <input
                  id="complemento"
                  type="text"
                  name="complemento"
                  placeholder="Digite um Complemento"
                  value={formEditUserModalInputs.complemento}
                  onChange={(e) => handleChange(e.target)}
                  className="inputEditClient"
                />
              </label>
              <div className="splitEditClientContainer">
                <label htmlFor="cep" className="editClientFormLabels split">
                  CEP:
                  <InputMask
                    id="cep"
                    name="cep"
                    placeholder="Digite seu CEP"
                    value={formEditUserModalInputs.cep}
                    onChange={(e) => handleChange(e.target)}
                    onBlur={(e) => handleViaCep(e)}
                    mask="99999-999"
                    className={`inputEditClient
                    ${
                      cepErrorMessage
                        ? "editClientErrorSinalization"
                        : undefined
                    }
                  `}
                  />
                  {cepErrorMessage && (
                    <p className="editClientErrorMessage">{cepErrorMessage}</p>
                  )}
                </label>
                <label htmlFor="bairro" className="editClientFormLabels split">
                  Bairro
                  <input
                    id="bairro"
                    type="text"
                    name="bairro"
                    placeholder="Digite seu bairro"
                    value={formEditUserModalInputs.bairro}
                    onChange={(e) => handleChange(e.target)}
                    className="inputEditClient"
                  />
                </label>
              </div>
              <div className="splitEditClientContainer">
                <label
                  htmlFor="cidade"
                  className="editClientFormLabels split cidadeForm"
                >
                  Cidade
                  <input
                    id="cidade"
                    type="text"
                    name="cidade"
                    placeholder="Digite sua cidade"
                    value={formEditUserModalInputs.cidade}
                    onChange={(e) => handleChange(e.target)}
                    className="inputEditClient"
                  />
                </label>
                <label
                  htmlFor="uf"
                  className="editClientFormLabels split ufForm"
                >
                  UF
                  <InputMask
                    id="uf"
                    type="text"
                    name="uf"
                    mask="aa"
                    placeholder="Digite a UF"
                    value={formEditUserModalInputs.uf.trim()}
                    onChange={(e) => handleChange(e.target)}
                    className="inputEditClient"
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="splitEditClientButtonsContainer">
            <button
              onClick={() => setOpenEditClientModal(false)}
              className="cancelEditClientChanges"
            >
              Cancelar
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className="applyEditClientChanges"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditClientModal;
