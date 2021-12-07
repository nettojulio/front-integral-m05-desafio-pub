import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableCard({ title, bgColor }) {

  function createData(client, idCob, value) {
    return { client, idCob, value };
  }
  const rows = [
    createData("Sara Silva", 223456787, "R$ 1000,00"),
    createData("Carlos Prado", 223456781, "R$ 400,00"),
    createData("Lara Brito", 223456781, "R$ 900,00"),
    createData("Soraia Neves", 223456787, "R$ 700,00"),
  ];

  return (
    <div className="container-table">
      <div className="title-table">
        <div className="head-card-table">
          <span className="head-card-table-title" >{title}</span>
          <div className={`head-card-table-card-value ${bgColor}`}>
            <span className={bgColor}>10</span>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ width: 360, border: "none", borderRadius: 0, boxShadow: "none " }}>
        <Table sx={{ minWidth: 360 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>ID da Cob.</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.client}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.client}
                </TableCell>
                <TableCell align="left">{row.idCob}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer-table">
        <span>Ver todos</span>
      </div>
    </div>
  );
}

export default TableCard;
