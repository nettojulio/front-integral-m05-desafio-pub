import "./style.css";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import billings from "../../../assets/billings.svg";


function DetailChargeModal() {
  const { setOpenDetailChargeModal } = useGlobal();
  const { currentCharge} = useFunctions();

  return (
    <div className="container-detail-charge-modal">
        
          <div className="close-modal">
            <img
              src={close}
              alt="Fechar modal"
              onClick={() => setOpenDetailChargeModal(false)}
            />
          </div>
          <img 
          className="billingsIcon"
          src={billings} 
          alt="Icone de Clientes" />
          <span>Detalhes da Cobrança</span>
          
       
    </div>
  );
}

export default DetailChargeModal;
