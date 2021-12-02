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

function TableClientsExib() {
  const { setOpenClientDetail } = useGlobal();

  function createData(client, cpf, email, tel, status, iconeCobranca) {
    return { client, cpf, email, tel, status, iconeCobranca };
  }
  const rows = [
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
    createData(
      "Sara Silva",
      "054 365 255 87",
      "sarasilva@cubos.io",
      "71 9 9462 8654",
      "Inadimplente",
      addBilling
    ),
  ];

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
            {rows.map((row) => (
              <TableRow
                key={row.client}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <button
                    onClick={() => setOpenClientDetail(true)}
                    className="btn_detailClient"
                  >
                    {row.client}
                  </button>
                </TableCell>
                <TableCell align="left">{row.cpf}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.tel}</TableCell>
                <TableCell align="left">
                  <div className="status-color">{row.status}</div>
                </TableCell>
                <TableCell align="left">
                  <div className="container-Iconbillings">
                    <img
                      src={row.iconeCobranca}
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
