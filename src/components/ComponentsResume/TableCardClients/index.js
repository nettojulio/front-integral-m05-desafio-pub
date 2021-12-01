import "./style.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableCardClients({ title, icon, bgColor, txtColor }) {
  function createData(client, dataValue, value) {
    return { client, dataValue, value };
  }
  const rows = [
    createData("Sara Silva", "03/02/2021", "R$ 1000,00"),
    createData("Carlos Prado", "04/03/2021", "R$ 400,00"),
    createData("Lara Brito", "21/03/2021", "R$ 900,00"),
    createData("Soraia Neves", "08/03/2021", "R$ 700,00"),
  ];

  return (
    <div className="container-table-clients">
      <div className="title-table-clients">
        <div className="head-card-table-clients">
          <div className="head-card-table-clients-icon">
            <img src={icon} alt={title} />
            <span className="head-card-table-clients-title">{title}</span>
          </div>
          <div className={`head-card-table-clients-card-value ${bgColor}`}>
            <span className={bgColor}>08</span>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ width: 556, border: "none", borderRadius: 0, boxShadow: "none " }}>
        <Table sx={{ minWidth: 556 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Data de Vencimento</TableCell>
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
                <TableCell align="left">{row.dataValue}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer-table-clients">
        <span>Ver todos</span>
      </div>
    </div>
  );
}

export default TableCardClients;
