import "./style.css";
import ClientDetailTable from "./ClientDetailTable";
import useSignup from "../../../hooks/useSignup";
import ToastAlert from "../../ComponentsGlobal/ToastAlert";
import TableClientsExib from "../../ComponentsClients/TableClientsExib";
import ClientDetail from "../../ComponentsClients/ClientDetail";

function ClientDetailCharge() {
  const { setOpenChargeModal, openClientDetail } = useSignup();

  return (

    <div className="client-charge">

      <div className="charge-data-title">
        <h2>Cobrança do Cliente</h2>
        <div
          onClick={() => setOpenChargeModal(true)} className="btn add-charge">
          + Nova cobrança
        </div>
      </div>

      <ClientDetailTable />

    </div>

  );
}

export default ClientDetailCharge;