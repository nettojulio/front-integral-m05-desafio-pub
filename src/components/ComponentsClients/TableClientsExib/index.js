import "./style.css";
import addBilling from "../../../assets/addBilling.svg";
import noResults from '../../../assets/noResults.svg';
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

function TableClientsExib({ cardNotFound }) {
  const { setOpenChargeModal, setClientDetailData, openFilteredCard, setOpenClientDetail, orderClient, setOrderClient, searchClient } = useGlobal();
  const { loadAllClients, loadAllBillings, clientData } = useFunctions();

  function handleClientDetail(client) {
    setOpenClientDetail(true);
    setClientDetailData(client);
  }

  function handleChargeModal(client) {
    setOpenChargeModal(client);
    setClientDetailData(client);
  }

  useEffect(() => {
    openFilteredCard && loadAllClients();
    loadAllBillings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (orderClient === 'asc') {
      clientData.sort((a, b) => (a.nome).localeCompare(b.nome));
    } else {
      clientData.sort((a, b) => (b.nome).localeCompare(a.nome));
    }
    // eslint-disable-next-line
  }, [orderClient]);
  // eslint-disable-next-line

  return (
    <div className="table-clients">
      <TableContainer component={Paper} sx={{ borderRadius: "30px", minWidth: '1120px' }}>
        {cardNotFound ?
          <>
            <div className="card-not-found">
              <img src={noResults} alt="Nenhum resultado encontrado" />
              <p>Nenhum resultado foi encontrado!</p>
              <p>Verifique se a escrita está correta</p>
            </div>
          </>
          :
          <Table sx={{ width: "111.6rem" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="cursor-pointer" onClick={() => setOrderClient(orderClient === 'asc' ? 'desc' : 'asc')} sx={{ display: "flex", alignItems: "center" }}>
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
              {searchClient.map((client) => (
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
                  <TableCell align="left">{`${client.cpf.slice(0,3)}.${client.cpf.slice(3,6)}.${client.cpf.slice(6,9)}-${client.cpf.slice(9)}`}</TableCell>
                  <TableCell align="left">{client.email}</TableCell>
                  <TableCell align="left">{`(${client.telefone.slice(0,2)}) ${client.telefone.slice(2,7)}-${client.telefone.slice(7)}`}</TableCell>
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
        }
      </TableContainer>
    </div>
  );
}

export default TableClientsExib;
