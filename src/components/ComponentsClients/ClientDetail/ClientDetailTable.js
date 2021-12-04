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
import useFunctions from "../../../hooks/useFunctions";

function ClientDetailTable() {
  const { clientDetailData } = useFunctions();

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ border: "none", borderRadius: 0, boxShadow: "none " }}
      >
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <div className="table-filter">
                  <img src={sort} alt="Filter" />
                  <span>ID Cob.</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="table-filter">
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
                <TableCell component="th" scope="row">
                  {`${client.id}`.padStart(9, 0)}
                </TableCell>
                <TableCell align="left">
                  {new Date(client.data_vencimento).toLocaleDateString("pt", {
                    timeZone: "UTC",
                  })}
                </TableCell>
                <TableCell align="left">
                  {(client.valor / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell align="left">
                  <div
                    className={`table-status ${client.situacao === "Paga"
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
                >
                  {client.descricao}
                </TableCell>
                <TableCell align="left">
                  <div className="table-icons">
                    <div className="table-icons-edit">
                      <img
                        className="table-btn"
                        src={editBillings}
                        style={{ width: 16 }}
                        alt="Edit"
                      />
                      <span>Editar</span>
                    </div>
                    <div className="table-icons-del">
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
            {/* {rows.map((row) => (
        <TableRow
          key={row.idCob}
          sx={{ "&:last-child td, &:last-child th": { border: 0 }, textAlign: 'center' }}
        >
          <TableCell component="th" scope="row">{row.idCob}</TableCell>
          <TableCell align="left">{row.dataValue}</TableCell>
          <TableCell align="left">{row.value}</TableCell>
          <TableCell align="left">
            <div className="table-status">{row.status}</div>
          </TableCell>
          <TableCell align="left" style={{ width: 348, overflow: 'hidden', whiteSpace: 'nowrap' }}>{row.description}</TableCell>
          <TableCell align="left">
            <div className="table-icons">
              <div className="table-icons-edit">
                <img className="table-btn" src={editBillings} style={{ width: 16 }} alt="Edit" />
                <span>Editar</span>
              </div>
              <div className="table-icons-del">
                <img className="table-btn" src={deleteBillings} style={{ width: 16 }} alt="Edit" />
                <span>Deletar</span>
              </div>
            </div>

          </TableCell>
        </TableRow>
      ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientDetailTable;
