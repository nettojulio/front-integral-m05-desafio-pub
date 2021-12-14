import "./style.css";
import CardBills from "../../components/ComponentsResume/CardBills";
import TableCard from "../../components/ComponentsResume/TableCard";
import TableCardClients from "../../components/ComponentsResume/TableCardClients";
import paidBillings from "../../assets/paidBillings.svg";
import expiredBillings from "../../assets/expiredBillings.svg";
import expectedBillings from "../../assets/expectedBillings.svg";
import defaultingCustomers from "../../assets/defaultingCustomers.svg";
import okCustomers from "../../assets/okCustomers.svg";
import { useEffect } from "react";
import useFunctions from "../../hooks/useFunctions";

function ResumeBills() {
  const { chargeData, clientData, loadAllBillings, loadAllClients } = useFunctions();


  const paidSituation = chargeData.filter(item => item.situacao === "Paga");
  const expectedSituation = chargeData.filter(item => item.situacao === "Pendente");
  const overdueSituation = chargeData.filter(item => item.situacao === "Vencida");
  const inTimeSituation = [...paidSituation, ...expectedSituation];

  const inTimeClientResume = clientData.filter(item => item.status_cliente === "Em dia");
  const overdueClientResume = clientData.filter(item => item.status_cliente === "Inadimplente");


  useEffect(() => {
    loadAllBillings();
    loadAllClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const cardBillsValue = [
    {
      bgColor: "paid",
      title: "Cobranças Pagas",
      img: paidBillings,
      value: (paidSituation
        .reduce((acc, cur) => Number(cur.valor) + acc, 0) / 100)
        .toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
    {
      bgColor: "expected",
      title: "Cobranças Previstas",
      img: expectedBillings,
      value: (expectedSituation
        .reduce((acc, cur) => Number(cur.valor) + acc, 0) / 100)
        .toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      {
        bgColor: "overdue",
        title: "Cobranças Vencidas",
        img: expiredBillings,
        value: (overdueSituation
          .reduce((acc, cur) => Number(cur.valor) + acc, 0) / 100)
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
      },
  ];

  const cardTableValue = [
    {
      bgColor: "paid",
      title: "Cobranças Pagas",
      situation: paidSituation,
      total: paidSituation.length,
    },
    {
      bgColor: "expected",
      title: "Cobranças Previstas",
      situation: expectedSituation,
      total: expectedSituation.length,
    },
    {
      bgColor: "overdue",
      title: "Cobranças Vencidas",
      situation: overdueSituation,
      total: overdueSituation.length,
    },
  ];

  const cardTableClientsValue = [
    {
      title: "Clientes em dia",
      icon: okCustomers,
      bgColor: "paid",
      situation: inTimeSituation,
      total: inTimeClientResume.length,
      seeAll: inTimeClientResume
    },
    {
      title: "Clientes Inadimplentes",
      icon: defaultingCustomers,
      bgColor: "overdue",
      situation: overdueSituation,
      total: overdueClientResume.length,
      seeAll: overdueClientResume
    },
  ];

  return (
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
                situation={cardTable.situation}
                total={cardTable.total}
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
                situation={cardClients.situation}
                total={cardClients.total}
                seeAll={cardClients.seeAll}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResumeBills;
