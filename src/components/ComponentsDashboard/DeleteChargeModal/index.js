import "./style.css";
import warning from "../../../assets/warning.svg";
import close from "../../../assets/closeIcon.svg";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";

function DeleteChargeModal() {
  const { setOpenDeleteModal } = useGlobal();
  const { currentCharge, handleConfirmDeleteCharge } = useFunctions();

  return (
    <div className="container-delete-charge-modal">
      <div className="backdrop-delete-charge-modal">
        <div className="card-delete-charge-modal">
          <div className="close-modal">
            <img
              src={close}
              alt="Fechar modal"
              onClick={() => setOpenDeleteModal(false)}
            />
          </div>
          <img src={warning} alt="Alerta" />
          <span>Tem certeza que deseja excluir esta cobrança?</span>
          <div className="btn button-delete-charge">
            <div
              className="btn button-choice cancel"
              onClick={() => setOpenDeleteModal(false)}
            >
              Não
            </div>
            <div
              className="btn button-choice confirm"
              onClick={() => handleConfirmDeleteCharge(currentCharge)}
            >
              Sim
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteChargeModal;
