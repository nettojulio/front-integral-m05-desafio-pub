import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import billings from "../../../assets/billings.svg";
import confirmRadio from "../../../assets/confirmRadio.svg";
import emptyRadio from "../../../assets/emptyRadio.svg";
import "./styles.css";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
function EditChargeModal() {
  const {
    editBillings,
    loadAllClients,
    formatToDate,
    setOpen,
    setMessageAlert,
    setStateAlert,
    currentCharge,
  } = useFunctions();
  const {
    openEditChargeModal,
    setOpenEditChargeModal,
    clientDetailData,
    setClientDetailData,
    setChargeModalValue,
    setOpenClientDetail,
  } = useGlobal();
  const [statusValue, setStatusValue] = useState(true);

  const initialForm = {
    descricao: currentCharge.descricao,
    data_vencimento: new Date(currentCharge.data_vencimento).toLocaleDateString(
      "pt",
      {
        timeZone: "UTC",
      }
    ),
    valor: currentCharge.valor / 100,
  };

  const [checkPaid, setCheckPaid] = useState(true);
  const [checkExpected, setCheckExpected] = useState(false);
  const [formSignupUserModalInputs, setFormSignupUserModalInputs] =
    useState(initialForm);
  const [descricaoErrorMessage, setDescricaoErrorMessage] = useState("");
  const [vencimentoErrorMessage, setVencimentoErrorMessage] = useState("");
  const [valorErrorMessage, setValorErrorMessage] = useState("");

  useEffect(() => {
    if (currentCharge.status) {
      setCheckPaid(true);
      setCheckExpected(false);
    } else {
      setCheckPaid(false);
      setCheckExpected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    editBillings(formSignupUserModalInputs, currentCharge.id);

    if (clientDetailData) {
      const allClients = await loadAllClients();
      const attClient = allClients.filter(
        (client) => client.id === currentCharge.id_cliente
      );

      if (clientDetailData === attClient[0]) {
        setOpenClientDetail(false);
      } else {
        setClientDetailData(attClient[0]);
      }
    }

    setOpen(true);
    setStateAlert("success");
    setMessageAlert("Cobrança editada com sucesso");
    setOpenEditChargeModal(false);
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
    openEditChargeModal && (
      <div className="containerEditChargeModal">
        <div className="backdropEditChargeModal" />
        <div className="editChargeModal">
          <div className="titleEditChargeModalContainer">
            <div className="titleEditChargeModalTitle">
              <img
                className="billingsIcon"
                src={billings}
                alt="Ícone de Clientes"
              />
              <span className="editChargeModalTitle">Edição de Cobrança</span>
            </div>

            <div className="closeEditChargeModal">
              <img
                onClick={() => setOpenEditChargeModal(false)}
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
                  placeholder={
                    clientDetailData
                      ? clientDetailData.nome
                      : currentCharge.cliente.nome
                  }
                  className="inputCharge"
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
                  className={`inputCharge ${descricaoErrorMessage
                    ? "chargeErrorSinalization"
                    : undefined
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
                <InputMask
                  id="valor"
                  name="valor"
                  type="number"
                  placeholder="Digite o valor"
                  value={formSignupUserModalInputs.valor}
                  onChange={(e) => handleChange(e.target)}
                  className={`inputCharge
                    ${valorErrorMessage ? "chargeErrorSinalization" : undefined}
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
              onClick={() => setOpenEditChargeModal(false)}
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

export default EditChargeModal;
