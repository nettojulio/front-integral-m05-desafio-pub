import "./style.css";
import customerScreen from "../../../assets/customerScreen.svg";
import ClientDetailData from './ClientDetailData';
import ClientDetailCharge from './ClientDetailCharge';
import useFunctions from "../../../hooks/useFunctions";

function Client() {
  const { clientDetailData } = useFunctions();

  return (
    <div className="client-page">
      <div className="client-page-icon">
        <img src={customerScreen} alt="Customers" />
        <span>{clientDetailData.nome}</span>
      </div>
      <ClientDetailData />
      <ClientDetailCharge />
    </div>
  );
}

export default Client;
