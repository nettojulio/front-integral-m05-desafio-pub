import "./style.css";
import useSignup from "../../hooks/useSignup";
import search from "../../assets/search.svg";
import customerScreen from "../../assets/customerScreen.svg";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
import customersSettings from "../../assets/customersSettings.svg";

function Client() {
  const { setOpenClientModal } = useSignup();

  return (
    <div className="clients-page">
      <div className="container-clients-page">
        <div className="clients-page-icon">
          <img src={customerScreen} alt="Customers" />
          <span>Clientes</span>
        </div>
        <div className="clients-page-info">
          <button
            onClick={() => setOpenClientModal(true)}
            className="btn add-btn"
          >
            + Adicionar cliente
          </button>
          <div className="clientSettings">
            <img src={customersSettings} alt="Search" />
          </div>
          <div className="input-search">
            <span>Pesquisar</span>
            <img src={search} alt="Search" />
          </div>
        </div>
      </div>

      <ToastAlert />
    </div>
  );
}

export default Client;
