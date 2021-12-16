import "./style.css";
import { useState } from "react";

import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import billings from "../../../assets/billings.svg";
import closeIcon from "../../../assets/closeIcon.svg";

function DetailChargeModal() {
  const { setOpenDetailChargeModal, openDetailChargeModal, clientDetailData } =
    useGlobal();
  const { currentCharge } = useFunctions();

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

  const [formSignupUserModalInputs] = useState(initialForm);

  return (
    openDetailChargeModal && (
      <div className="containerDetailChargeModal">
        <div className="backdropDetailChargeModal" />
        <div className="detailChargeModal">
          <div className="closeDetailChargeModal">
            <img
              onClick={() => setOpenDetailChargeModal(false)}
              src={closeIcon}
              alt="Fechar"
            />
          </div>
          <div className="titleDetailChargeModalTitle">
            <img
              className="billingsIcon"
              src={billings}
              alt="Ícone de Clientes"
            />
            <span className="detailChargeModalTitle">Detalhe da Cobrança</span>
          </div>

          <div className="resto">
            <div className="chargeDados">
              <div className="dado-nome dados">
                <label htmlFor="nome" className="chargenome">
                  Nome
                  <input
                    disabled
                    type="text"
                    name="nome"
                    value={
                      clientDetailData
                        ? clientDetailData.nome
                        : currentCharge.cliente.nome
                    }
                    className="input nome"
                  />
                </label>
              </div>
              <div className="dado-descricao dados">
                <label htmlFor="descricao" className="descricao-label">
                  Descrição
                  <input
                    disabled
                    type="text"
                    name="descricao"
                    value={currentCharge.descricao}
                    className="input descricao"
                  />
                </label>
              </div>

              <div className="dado-vencimento dados">
                <label className="vencimento-label">
                  Vencimento
                  <input
                    disabled
                    name="data_vencimento"
                    value={formSignupUserModalInputs.data_vencimento}
                    className="input vencimento"
                  />
                </label>

                <label className="dado-valor">
                  Valor
                  <input
                    disabled
                    id="valor"
                    type="valor"
                    name="valor"
                    value={`RS ${formSignupUserModalInputs.valor},00`}
                    className="input valor"
                  ></input>
                </label>
              </div>

              <div className="ultimo">
                <div className="div-id">
                  <label className="dado-cobranca dados">
                    ID Cobranças
                    <input
                      disabled
                      type="valor"
                      name="valor"
                      value={currentCharge.id}
                      className="input valor"
                    ></input>
                  </label>
                </div>

                <div className="div-status">
                  <label className="dado-status dados">
                    Status
                    <input
                      disabled
                      type="valor"
                      name="valor"
                      value={currentCharge.situacao}
                      className={
                        currentCharge.situacao === "Vencida"
                          ? "status-red"
                          : currentCharge.situacao === "Pendente"
                          ? "status-yellow"
                          : "status-blue"
                      }
                    ></input>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default DetailChargeModal;
