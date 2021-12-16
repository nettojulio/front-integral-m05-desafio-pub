import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import billings from "../../../assets/billings.svg";
import confirmRadio from "../../../assets/confirmRadio.svg";
import emptyRadio from "../../../assets/emptyRadio.svg";
import "./styles.css";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import BRLInputMask from '../../ComponentsGlobal/BRLInputMask';

function ChargeModal() {
  const {
    addBillings,
    formatToDate,
    setOpen,
    setMessageAlert,
    setStateAlert,
    loadAllClients,
  } = useFunctions();
  const {
    openChargeModal,
    setOpenChargeModal,
    clientDetailData,
    setChargeModalValue,
  } = useGlobal();
  const [statusValue, setStatusValue] = useState(true);

  const initialForm = {
    descricao: "",
    data_vencimento: "",
    valor: "",
    status: true,
  };

  const [checkPaid, setCheckPaid] = useState(true);
  const [checkExpected, setCheckExpected] = useState(false);
  const [formSignupUserModalInputs, setFormSignupUserModalInputs] =
    useState(initialForm);
  const [descricaoErrorMessage, setDescricaoErrorMessage] = useState("");
  const [vencimentoErrorMessage, setVencimentoErrorMessage] = useState("");
  const [valorErrorMessage, setValorErrorMessage] = useState("");

  function handleCheckPaid() {
    setCheckPaid(true);
    setCheckExpected(false);
    setStatusValue(true);
  }

  function handleCheckExpected() {
    setCheckPaid(false);
    setCheckExpected(true);
    setStatusValue(false);
  }

  function handleChange(target) {
    handleClearValidations();
    setFormSignupUserModalInputs({
      ...formSignupUserModalInputs,
      [target.name]: target.value,
    });
  }


  async function handleSubmit() {
    handleClearValidations();

    if (
      !formSignupUserModalInputs.descricao ||
      !formSignupUserModalInputs.data_vencimento ||
      !formSignupUserModalInputs.valor
    ) {
      !formSignupUserModalInputs.descricao &&
        setDescricaoErrorMessage("Este campo deve ser preenchido");
      !formSignupUserModalInputs.data_vencimento &&
        setVencimentoErrorMessage("Este campo deve ser preenchido");
      !formSignupUserModalInputs.valor &&
        setValorErrorMessage("Este campo deve ser preenchido");
      return;
    }

    if (formSignupUserModalInputs.data_vencimento) {
      const date = formSignupUserModalInputs.data_vencimento;
      let formatedDate = date;
      let previousDate = "";

      while (formatedDate !== previousDate) {
        previousDate = formatedDate;
        formatedDate = formatedDate.replace("_", "");
        formatedDate = formatedDate.replace("/", "");
      }

      if (formatedDate.length < 8) {
        setVencimentoErrorMessage("Data incompleta");
        return;
      }
      const day = Number(formatedDate.slice(0, 2));
      const month = Number(formatedDate.slice(2, 4));

      if (day < 0 || day > 31) {
        setVencimentoErrorMessage("Data inválida");
        return;
      }
      if (month < 0 || month > 12) {
        setVencimentoErrorMessage("Data inválida");
        return;
      }
    }

    if (formSignupUserModalInputs.valor <= 0) {
      setValorErrorMessage("Valor inválido");
      return;
    }

    formSignupUserModalInputs.status = statusValue;
    formSignupUserModalInputs.valor = formSignupUserModalInputs.valor * 100;
    formSignupUserModalInputs.data_vencimento = formatToDate(
      formSignupUserModalInputs.data_vencimento
    );
    const updateBillings = await addBillings(
      formSignupUserModalInputs,
      clientDetailData.id
    );
    setOpen(true);
    setStateAlert("success");
    setMessageAlert("Cobrança cadastrada com sucesso");
    setOpenChargeModal(false);
    await loadAllClients();
    updateBillings.situacao = updateBillings.status
      ? "Paga"
      : !updateBillings.status &&
        +new Date(updateBillings.data_vencimento) < +new Date()
        ? "Vencida"
        : "Pendente";
    clientDetailData.cobrancas.push(updateBillings);
  }

  function handleClearValidations() {
    setDescricaoErrorMessage(false);
    setVencimentoErrorMessage(false);
    setValorErrorMessage(false);
  }

  function handleClick(event) {
    event.preventDefault();
    handleSubmit();
    setChargeModalValue(formSignupUserModalInputs);
  }

  return (
    openChargeModal && (
      <div className="containerChargeModal">
        <div className="backdropChargeModal" />
        <div className="chargeModal">
          <div className="titleChargeModalContainer">
            <div className="titleChargeModalTitle">
              <img
                className="billingsIcon"
                src={billings}
                alt="Ícone de Clientes"
              />
              <span className="chargeModalTitle">Cadastro de Cobrança</span>
            </div>

            <div className="closeChargeModal">
              <img
                onClick={() => setOpenChargeModal(false)}
                src={closeIcon}
                alt="Fechar"
              />
            </div>
          </div>

          <form className="editChargeForm" onSubmit={handleSubmit}>
            <div className="chargeFormGroup">
              <label htmlFor="nome" className="chargeFormLabels">
                Nome*
                <input
                  disabled
                  id="nome"
                  type="text"
                  name="nome"
                  placeholder={clientDetailData.nome}
                  className="inputCharge"
                  readOnly="true"
                />
              </label>
            </div>
            <div className="chargeFormGroup descricao">
              <label htmlFor="descricao" className="chargeFormLabels">
                Descrição*
                <textarea
                  id="descricao"
                  type="descricao"
                  name="descricao"
                  placeholder="Digite a descrição"
                  value={formSignupUserModalInputs.descricao}
                  onChange={(e) => handleChange(e.target)}
                  className="textCharge"
                />
                {descricaoErrorMessage && (
                  <p className="chargeErrorMessage">{descricaoErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="chargeFormGroup top">
              <label
                htmlFor="data_vencimento"
                className="chargeFormLabels split"
              >
                Vencimento:*
                <InputMask
                  id="data_vencimento"
                  name="data_vencimento"
                  placeholder="Data de Vencimento"
                  value={formSignupUserModalInputs.data_vencimento}
                  onChange={(e) => handleChange(e.target)}
                  mask="99/99/9999"
                  className={`inputCharge ${vencimentoErrorMessage
                    ? "chargeErrorSinalization"
                    : undefined
                    }`}
                />
                {vencimentoErrorMessage && (
                  <p className="chargeErrorMessage">{vencimentoErrorMessage}</p>
                )}
              </label>
              <label htmlFor="valor" className="chargeFormLabels split">
                Valor:*
                {/* <InputMask
                  mask="R$ 99"
                  value={formSignupUserModalInputs.valor}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputCharge
                    ${valorErrorMessage ? "chargeErrorSinalization" : undefined}
                  `}
                /> */}
                <BRLInputMask
                  value={formSignupUserModalInputs.valor}
                  onChange={(e) => handleChange(e.target)}
                  valorErrorMessage={valorErrorMessage}
                  formSignupUserModalInputs={formSignupUserModalInputs}
                  setFormSignupUserModalInputs={setFormSignupUserModalInputs}

                />
                {/* <IntlCurrencyInput
                  placeholder="Digite o valor"
                  currency="BRL"
                  name="valor"
                  config={currencyConfig}
                  onChange={handleChangeValue}
                  className={`inputCharge
                    ${valorErrorMessage ? "chargeErrorSinalization" : undefined}
                  `}
                /> */}
                {valorErrorMessage && (
                  <p className="chargeErrorMessage">{valorErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="chargeFormGroup">
              <label htmlFor="status" className="chargeFormLabels">
                Status*
                <div className="status" onClick={handleCheckPaid}>
                  <img src={checkPaid ? confirmRadio : emptyRadio} alt="" />
                  <span>Cobrança Paga</span>
                </div>
                <div className="status" onClick={handleCheckExpected}>
                  <img src={checkExpected ? confirmRadio : emptyRadio} alt="" />
                  <span>Cobrança Pendente</span>
                </div>
              </label>
            </div>
          </form>
          <div className="splitChargeButtonsContainer">
            <button
              onClick={() => setOpenChargeModal(false)}
              className="cancelEditChargeChanges"
            >
              Cancelar
            </button>
            <button onClick={handleClick} className="applyEditChargeChanges">
              Aplicar
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default ChargeModal;
