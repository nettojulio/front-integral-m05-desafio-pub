import "./style.css";
import editBillings from "../../../assets/editBillingsCard.svg";
import deleteBillings from "../../../assets/deleteBillingsCard.svg";
import sort from "../../../assets/sortIconHeaders.svg";
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
import DeleteChargeModal from "../../ComponentsDashboard/DeleteChargeModal";
import ToastAlert from "../../../components/ComponentsGlobal/ToastAlert";

function ClientDetailTable() {
  const {
    clientDetailData,
    openDeleteModal,
    orderClient,
    setOrderClient,
    filter,
    setFilter,
  } = useGlobal();
  const {
    loadAllBillings,
    handleDeleteCharge,
    handleEditCharge,
    handleDetailCharge,
  } = useFunctions();

  useEffect(() => {
    loadAllBillings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientDetailData]);

  useEffect(() => {
    if (filter === "dataVenc") {
      orderClient === "asc" ? handleOrderAsc() : handleOrderDesc();
    }
    if (filter === "idCob") {
      orderClient === "asc" ? handleOrderAsc() : handleOrderDesc();
    }
    // eslint-disable-next-line
  }, [filter, orderClient]);

  function handleOrderAsc() {
    clientDetailData.cobrancas.sort((a, b) => orderColumnAsc(a, b, filter));
  }

  function handleOrderDesc() {
    clientDetailData.cobrancas.sort((a, b) => orderColumnDesc(a, b, filter));
  }

  function handleChangeFilter(type) {
    setFilter(type);
    setOrderClient(orderClient === "asc" ? "desc" : "asc");
  }

  function orderColumnAsc(a, b, by) {
    if (by === "dataVenc") {
      return new Date(a.data_vencimento) - new Date(b.data_vencimento);
    }

    if (by === "idCob") {
      return [a.id] - [b.id];
    }
  }

  function orderColumnDesc(a, b, by) {
    if (by === "dataVenc") {
      return new Date(b.data_vencimento) - new Date(a.data_vencimento);
    }

    if (by === "idCob") {
      return [b.id] - [a.id];
    }
  }

  return (
    <div>
      {openDeleteModal ? (
        <DeleteChargeModal />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ border: "none", borderRadius: 0, boxShadow: "none " }}
        >
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <div
                    onClick={() => handleChangeFilter("idCob")}
                    className="cursor-pointer table-filter"
                  >
                    <img src={sort} alt="Filter" />
                    <span>ID Cob.</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    onClick={() => handleChangeFilter("dataVenc")}
                    className="cursor-pointer table-filter"
                  >
                    <img src={sort} alt="Filter" />
                    <span>Data de venc.</span>
                  </div>
                </TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientDetailData.cobrancas.map((client) => (
                <TableRow
                  key={client.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textAlign: "center",
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="div-details"
                    onClick={() => handleDetailCharge(client)}
                  >
                    {`${client.id}`.padStart(9, 0)}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="div-details"
                    onClick={() => handleDetailCharge(client)}
                  >
                    {new Date(client.data_vencimento).toLocaleDateString("pt", {
                      timeZone: "UTC",
                    })}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="div-details"
                    onClick={() => handleDetailCharge(client)}
                  >
                    {(client.valor / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell
                    align="left"
                    className="div-details"
                    onClick={() => handleDetailCharge(client)}
                  >
                    <div
                      className={`table-status ${
                        client.situacao === "Paga"
                          ? "paid"
                          : client.situacao === "Pendente"
                          ? "expected"
                          : "overdue"
                      }`}
                    >
                      {client.situacao}
                    </div>
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      width: 348,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                    className="div-details"
                    onClick={() => handleDetailCharge(client)}
                  >
                    {client.descricao}
                  </TableCell>
                  <TableCell align="left">
                    <div className="table-icons">
                      <div
                        onClick={() =>
                          handleEditCharge(client, clientDetailData.id)
                        }
                        className="table-icons-edit"
                      >
                        <img
                          className="table-btn"
                          src={editBillings}
                          style={{ width: 16 }}
                          alt="Edit"
                        />
                        <span>Editar</span>
                      </div>
                      <div
                        onClick={() => handleDeleteCharge(client)}
                        className="table-icons-del"
                      >
                        <img
                          className="table-btn"
                          src={deleteBillings}
                          style={{ width: 16 }}
                          alt="Edit"
                        />
                        <span>Deletar</span>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <ToastAlert />
    </div>
  );
}

export default ClientDetailTable;
