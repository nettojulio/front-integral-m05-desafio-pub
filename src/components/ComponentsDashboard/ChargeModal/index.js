import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import billings from "../../../assets/billings.svg";
import useGlobal from "../../../hooks/useGlobal";
import "./styles.css";

function ChargeModal() {
  const initialForm = {
    nome: "",
    Descrição: "",
    Vencimento: "",
    Valor: "",
    Status: "",
  };

  const { openChargeModal, setOpenChargeModal } = useGlobal();

  const [formEditUserModalInputs, setFormEditUserModalInputs] =
    useState(initialForm);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [cpfErrorMessage, setCpfErrorMessage] = useState("");
  const [telefoneErrorMessage, setTelefoneErrorMessage] = useState("");

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
  }

  function handleClearValidations() {
    setNameErrorMessage(false);
    setEmailErrorMessage(false);
    setCpfErrorMessage(false);
    setTelefoneErrorMessage(false);
  }

  return (
    openChargeModal && (
      <div className="containerClientModal">
        <div className="backdropClientModal" />
        <div className="clientModal">
          <div className="titleClientModalContainer">
            <img
              className="billingsIcon"
              src={billings}
              alt="Ícone de Clientes"
            />
            <span className="clientModalTitle">Cadastro de Cobrança</span>
          </div>
          <img
            className="closeEditClientModal"
            onClick={() => setOpenChargeModal(false)}
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
            <div className="clientFormGroup descricao">
              <label htmlFor="email" className="clientFormLabels">
                Descrição*
                <input
                  id="descricao"
                  type="descricao"
                  name="descricao"
                  placeholder="Digite a descrição"
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
              <label
                htmlFor="dataDeVencimento"
                className="clientFormLabels split"
              >
                Vencimento:*
                <InputMask
                  id="dataDeVencimento"
                  name="dataDeVencimento"
                  placeholder="Data de Vencimento"
                  value={formEditUserModalInputs.cpf}
                  onChange={(e) => handleChange(e.target)}
                  mask="99-99-9999"
                  className={`inputClient ${
                    cpfErrorMessage ? "clientErrorSinalization" : undefined
                  }`}
                />
                {cpfErrorMessage && (
                  <p className="clientErrorMessage">{cpfErrorMessage}</p>
                )}
              </label>
              <label htmlFor="telefone" className="clientFormLabels split">
                Valor:*
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
            <div className="clientFormGroup ">
              <label htmlFor="endereco" className="clientFormLabels">
                Status*
                <input
                  id="status"
                  type="text"
                  name="status"
                  value={formEditUserModalInputs.endereco}
                  onChange={(e) => handleChange(e.target)}
                  className="inputStatus"
                />
                <input
                  id="status"
                  type="text"
                  name="status"
                  value={formEditUserModalInputs.endereco}
                  onChange={(e) => handleChange(e.target)}
                  className="inputStatus"
                />
              </label>
            </div>
          </form>
          <div className="splitClientButtonsContainer">
            <button
              onClick={() => setOpenChargeModal(false)}
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

export default ChargeModal;
