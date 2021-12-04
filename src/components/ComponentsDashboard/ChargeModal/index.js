import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import billings from "../../../assets/billings.svg";
import confirmRadio from "../../../assets/confirmRadio.svg";
import emptyRadio from "../../../assets/emptyRadio.svg";
import "./styles.css";
import useGlobal from "../../../hooks/useGlobal";

function ChargeModal() {
  const [statusValue, setStatusValue] = useState(true);

  const initialForm = {
    descricao: "",
    vencimento: "",
    valor: "",
    status: true
  };

  const [checkPaid, setCheckPaid] = useState(true);
  const [checkExpected, setCheckExpected] = useState(false);
  const { openChargeModal, setOpenChargeModal, clientDetailData, setChargeModalValue } = useGlobal();

  const [formSignupUserModalInputs, setFormSignupUserModalInputs] = useState(initialForm);
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
      !formSignupUserModalInputs.vencimento ||
      !formSignupUserModalInputs.valor
    ) {
      !formSignupUserModalInputs.descricao &&
        setDescricaoErrorMessage("Este campo deve ser preenchido");
      !formSignupUserModalInputs.vencimento &&
        setVencimentoErrorMessage("Este campo deve ser preenchido");
      !formSignupUserModalInputs.valor &&
        setValorErrorMessage("Este campo deve ser preenchido");
      return;
    }

    if (formSignupUserModalInputs.vencimento) {

      const date = formSignupUserModalInputs.vencimento;
      let formatedDate = date;
      let previousDate = "";

      while (formatedDate !== previousDate) {
        previousDate = formatedDate;
        formatedDate = formatedDate.replace('_', '');
        formatedDate = formatedDate.replace('/', '');
      }

      if (formatedDate.length < 8) {
        setVencimentoErrorMessage("Data incompleta");
        return
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

      // if (checkExpected) {
      //   setStatusValue(false);
      // }

      // if (checkExpected) {
      //   const dateInput = new Date(year, month - 1, day);
      //   const dateNow = new Date();
      //   const diff = dateNow - dateInput;
      //   const dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

      //   if (dias <= 0) {
      //     setStatusValue('pendente');
      //   } else {
      //     setStatusValue('vencido');
      //   }
      // } else {
      //   setStatusValue('pago');
      // }

      formSignupUserModalInputs.status = statusValue;
      setOpenChargeModal(false);
    }

    if (formSignupUserModalInputs.valor <= 0) {
      setValorErrorMessage("Valor inválido");
      return;
    }

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
                />
              </label>
            </div>
            <div className="chargeFormGroup descricao">
              <label htmlFor="descricao" className="chargeFormLabels">
                Descrição*
                <input
                  id="descricao"
                  type="descricao"
                  name="descricao"
                  placeholder="Digite a descrição"
                  value={formSignupUserModalInputs.descricao}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputCharge ${descricaoErrorMessage ? "chargeErrorSinalization" : undefined
                    }
                  `}
                />
                {descricaoErrorMessage && (
                  <p className="chargeErrorMessage">{descricaoErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="chargeFormGroup top">
              <label
                htmlFor="dataDeVencimento"
                className="chargeFormLabels split"
              >
                Vencimento:*
                <InputMask
                  id="vencimento"
                  name="vencimento"
                  placeholder="Data de Vencimento"
                  value={formSignupUserModalInputs.vencimento}
                  onChange={(e) => handleChange(e.target)}
                  mask="99/99/9999"
                  className={`inputCharge ${vencimentoErrorMessage ? "chargeErrorSinalization" : undefined
                    }`}
                />
                {vencimentoErrorMessage && (
                  <p className="chargeErrorMessage">{vencimentoErrorMessage}</p>
                )}
              </label>
              <label htmlFor="valor" className="chargeFormLabels split">
                Valor:*
                <InputMask
                  id="valor"
                  name="valor"
                  type="number"
                  placeholder="Digite o valor"
                  value={formSignupUserModalInputs.valor}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputCharge
                    ${valorErrorMessage
                      ? "chargeErrorSinalization"
                      : undefined
                    }
                  `}
                />
                {valorErrorMessage && (
                  <p className="chargeErrorMessage">{valorErrorMessage}</p>
                )}
              </label>
            </div>
            <div className="chargeFormGroup">
              <label htmlFor="status" className="chargeFormLabels">
                Status*
                <div className="status">
                  <img
                    onClick={handleCheckPaid}
                    src={checkPaid ? confirmRadio : emptyRadio}
                    alt=""
                  />
                  <span>Cobrança Paga</span>
                </div>
                <div className="status">
                  <img onClick={handleCheckExpected} src={checkExpected ? confirmRadio : emptyRadio} alt="" />
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
