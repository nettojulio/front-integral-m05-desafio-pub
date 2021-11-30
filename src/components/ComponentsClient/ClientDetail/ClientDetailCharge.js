import "./style.css";
import ClientDetailTable from "./ClientDetailTable";

function ClientDetailCharge() {

  return (
    <div className="client-charge">
      <div className="charge-data-title">
        <h2>Cobrança do Cliente</h2>
        <div className="btn add-charge">
          + Nova cobrança
        </div>
      </div>
      <ClientDetailTable />
    </div>
  );
}

export default ClientDetailCharge;