import "./style.css";
import customerScreen from "../../../assets/customerScreen.svg";
import ClientDetailData from "./ClientDetailData";
import ClientDetailCharge from "./ClientDetailCharge";
import useGlobal from "../../../hooks/useGlobal";
import DetailChargeModal from "../../ComponentsDashboard/DetailChargeModal";

function Client() {
  const { clientDetailData, openDetailChargeModal } = useGlobal();

  return (
    <div className="client-page">
      <div className="client-page-icon">
        <img src={customerScreen} alt="Customers" />
        <span>{clientDetailData.nome}</span>
      </div>
      <ClientDetailData />
      <ClientDetailCharge />
      {openDetailChargeModal && <DetailChargeModal />}
    </div>
  );
}

export default Client;
