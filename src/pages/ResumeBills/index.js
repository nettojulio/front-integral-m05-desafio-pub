import "./style.css";
import CardBills from "../../components/ComponentsResume/CardBills";
import TableCard from "../../components/ComponentsResume/TableCard";
import TableCardClients from "../../components/ComponentsResume/TableCardClients";
import paidBillings from "../../assets/paidBillings.svg";
import expiredBillings from "../../assets/expiredBillings.svg";
import expectedBillings from "../../assets/expectedBillings.svg";
import defaultingCustomers from "../../assets/defaultingCustomers.svg";
import okCustomers from "../../assets/okCustomers.svg";

function ResumeBills() {
  const cardBillsValue = [
    {
      bgColor: "paid",
      title: "Cobranças Pagas",
      img: paidBillings,
      value: "R$30.000,00",
    },
    {
      bgColor: "overdue",
      title: "Cobranças Vencidas",
      img: expiredBillings,
      value: "R$7.000,00",
    },
    {
      bgColor: "expected",
      title: "Cobranças Previstas",
      img: expectedBillings,
      value: "R$10.000,00",
    },
  ];

  const cardTableValue = [
    {
      bgColor: "paid",
      title: "Cobranças Pagas",
    },
    {
      bgColor: "overdue",
      title: "Cobranças Vencidas",
    },
    {
      bgColor: "expected",
      title: "Cobranças Previstas",
    },
  ];

  const cardTableClientsValue = [
    {
      title: "Clientes Inadimplentes",
      icon: defaultingCustomers,
      bgColor: "overdue",
    },
    {
      title: "Clientes em dia",
      icon: okCustomers,
      bgColor: "paid",
    },
  ];

  return (
    /* TESTE FRAGMENT */
    /* TESTE FRAGMENT */
    <>
      <div className="resume-bills">
        <div className="container-resume-bills">
          <div className="resume-bills-card-bills">
            {cardBillsValue.map((cardValue) => (
              <CardBills
                key={Math.random()}
                bgColor={cardValue.bgColor}
                title={cardValue.title}
                img={cardValue.img}
                value={cardValue.value}
              />
            ))}
          </div>

          <div className="table-cards">
            {cardTableValue.map((cardTable) => (
              <TableCard
                key={Math.random()}
                title={cardTable.title}
                bgColor={cardTable.bgColor}
              />
            ))}
          </div>
          <div className="table-cards-clients">
            {cardTableClientsValue.map((cardClients) => (
              <TableCardClients
                key={Math.random()}
                title={cardClients.title}
                icon={cardClients.icon}
                bgColor={cardClients.bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeBills;
