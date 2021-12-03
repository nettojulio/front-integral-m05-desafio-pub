import { useState } from "react";
import InputMask from "react-input-mask";
import closeIcon from "../../../assets/closeIcon.svg";
import billings from "../../../assets/billings.svg";
import useGlobal from "../../../hooks/useGlobal";
import confirmRadio from "../../../assets/confirmRadio.svg";
import emptyRadio from "../../../assets/emptyRadio.svg";
import "./styles.css";



function ChargeModal() {
    const initialForm = {
        nome: "",
        Descrição: "",
        Vencimento: "",
        Valor: "",
        Status: "",
    };

    const [checkPaid, setCheckPaid] = useState(true);
    const [checkExpected, setCheckExpected] = useState(false);

    function handleCheckPaid() {
        setCheckPaid(true);
        setCheckExpected(false)
    }

    function handleCheckExpected() {
        setCheckPaid(false);
        setCheckExpected(true)
    }

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
                                    placeholder="Sara Lage Silva"
                                    value={formEditUserModalInputs.nome}
                                    onChange={(e) => handleChange(e.target)}
                                    className={`inputCharge ${nameErrorMessage ? "chargeErrorSinalization" : undefined
                                        }`}
                                />
                                {nameErrorMessage && (
                                    <p className="chargeErrorMessage">{nameErrorMessage}</p>
                                )}
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
                                    value={formEditUserModalInputs.email}
                                    onChange={(e) => handleChange(e.target)}
                                    className={`inputCharge ${emailErrorMessage ? "chargeErrorSinalization" : undefined
                                        }
                  `}
                                />
                                {emailErrorMessage && (
                                    <p className="chargeErrorMessage">{emailErrorMessage}</p>
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
                                    id="dataDeVencimento"
                                    name="dataDeVencimento"
                                    placeholder="Data de Vencimento"
                                    value={formEditUserModalInputs.cpf}
                                    onChange={(e) => handleChange(e.target)}
                                    mask="99-99-9999"
                                    className={`inputCharge ${cpfErrorMessage ? "chargeErrorSinalization" : undefined
                                        }`}
                                />
                                {cpfErrorMessage && (
                                    <p className="chargeErrorMessage">{cpfErrorMessage}</p>
                                )}
                            </label>
                            <label htmlFor="telefone" className="chargeFormLabels split">
                                Valor:*
                                <InputMask
                                    id="valor"
                                    name="valor"
                                    placeholder="Digite o valor"
                                    value={formEditUserModalInputs.telefone}
                                    onChange={(e) => handleChange(e.target)}

                                    className={`inputCharge
                    ${telefoneErrorMessage
                                            ? "chargeErrorSinalization"
                                            : undefined
                                        }
                  `}
                                />
                                {telefoneErrorMessage && (
                                    <p className="chargeErrorMessage">{telefoneErrorMessage}</p>
                                )}
                            </label>
                        </div>
                        <div className="chargeFormGroup">
                            <label htmlFor="status" className="chargeFormLabels">
                                Status*
                                <div className="status">
                                    <img onClick={handleCheckPaid} src={checkPaid ? confirmRadio : emptyRadio} alt="" />
                                    <span>Cobrança Paga</span>
                                </div>
                                <div className="status">
                                    <img onClick={handleCheckExpected} src={checkExpected ? confirmRadio : emptyRadio} alt="" />
                                    <span>Cobrança Pendete</span>
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
                        <button onClick={handleSubmit} className="applyEditChargeChanges">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default ChargeModal;
