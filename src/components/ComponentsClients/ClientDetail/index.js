import "./style.css";
import customerScreen from "../../assets/customerScreen.svg";
import ClientDetailData from './ClientDetailData';
import ClientDetailCharge from './ClientDetailCharge';

function Client() {

  return (
    <div className="client-page">
      <div className="client-page-icon">
        <img src={customerScreen} alt="Customers" />
        <span>Sara Lage Silva</span>
      </div>
      <ClientDetailData />
      <ClientDetailCharge />
    </div>
  );
}

export default Client;
