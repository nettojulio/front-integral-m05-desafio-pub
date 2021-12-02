import "./style.css";
import ClientDetailTable from "./ClientDetailTable";
import useGlobal from "../../../hooks/useGlobal";

function ClientDetailCharge() {
  const { setOpenChargeModal } = useGlobal();

  return (
    <div className="client-charge">
      <div className="charge-data-title">
        <h2>Cobrança do Cliente</h2>
        <div
          onClick={() => setOpenChargeModal(true)}
          className="btn add-charge"
        >
          + Nova cobrança
        </div>
      </div>

      <ClientDetailTable />
    </div>
  );
}

export default ClientDetailCharge;
