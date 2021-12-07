import "./style.css";
import useGlobal from "../../hooks/useGlobal";
import search from "../../assets/search.svg";
import customerScreen from "../../assets/customerScreen.svg";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
import customersSettings from "../../assets/customersSettings.svg";
import TableClientsExib from "../../components/ComponentsClients/TableClientsExib";
import ClientDetail from "../../components/ComponentsClients/ClientDetail";

function Client() {
  const { setOpenClientModal, openClientDetail } = useGlobal();

  return (
    <div className="clients-page">
      {openClientDetail ? (
        <ClientDetail />
      ) : (
        <>
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
          <TableClientsExib />
          <ToastAlert />
        </>
      )}
    </div>
  );
}

export default Client;
