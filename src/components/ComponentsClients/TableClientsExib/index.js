import "./style.css";
import addBilling from "../../../assets/addBilling.svg";
import sortIconHeaders from "../../../assets/sortIconHeaders.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useGlobal from "../../../hooks/useGlobal";
import useFunctions from "../../../hooks/useFunctions";
import { useEffect } from "react";

function TableClientsExib() {
  const { setOpenClientDetail, setOpenChargeModal, setClientDetailData } = useGlobal();
  const { loadAllClients, clientData, } = useFunctions();

  function handleClientDetail(client) {
    // setOpenClientDetail(true);
    setClientDetailData(client);
  }

  function handleChargeModal(client) {
    setOpenChargeModal(client)
    setClientDetailData(client);
  }

  useEffect(() => {
    loadAllClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="table-clients">
      <TableContainer component={Paper} sx={{ borderRadius: "30px" }}>
        <Table sx={{ width: "111.6rem" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: "flex", alignItems: "center" }}>
                <img src={sortIconHeaders} alt="" />
                Cliente
              </TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Criar Cobrança</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData.map((client) => (
              <TableRow
                key={client.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <button
                    onClick={() => handleClientDetail(client)}
                    className="btn_detailClient"
                  >
                    {client.nome}
                  </button>
                </TableCell>
                <TableCell align="left">{client.cpf}</TableCell>
                <TableCell align="left">{client.email}</TableCell>
                <TableCell align="left">{client.telefone}</TableCell>
                <TableCell align="left">
                  <div
                    className={
                      client.status_cliente === "Inadimplente"
                        ? "status-color color-red"
                        : "status-color color-green"
                    }
                  >
                    {client.status_cliente}
                  </div>
                </TableCell>
                <TableCell align="left">
                  <div
                    className="container-Iconbillings"
                    onClick={() => handleChargeModal(client)}
                  >
                    <img
                      src={addBilling}
                      className="icon-billing"
                      alt="Ícone de adicionar cobrança"
                    />
                    Cobrança
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableClientsExib;
