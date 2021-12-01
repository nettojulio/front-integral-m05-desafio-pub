import "./style.css";
import editBillings from '../../../assets/editBillingsCard.svg';
import deleteBillings from '../../../assets/deleteBillingsCard.svg';

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ClientDetailTable() {
  function createData(idCob, dataValue, value, status, description) {
    return { idCob, dataValue, value, status, description };
  }
  const rows = [
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips"),
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips"),
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips"),
  ];

  return (
    <div >
      <TableContainer component={Paper} sx={{ border: "none", borderRadius: 0, boxShadow: "none " }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID Cob.</TableCell>
              <TableCell>Data de venc.</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.idCob}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.idCob}
                </TableCell>
                <TableCell align="left">{row.dataValue}</TableCell>
                <TableCell align="left">{row.value}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <div className="table-icons">
                  <div className="table-icons-edit">
                    <img src={editBillings} style={{ width: 16 }} alt="Edit" />
                    <span>Editar</span>
                  </div>
                  <div className="table-icons-del">
                    <img src={deleteBillings} style={{ width: 16 }} alt="Edit" />
                    <span>Deletar</span>
                  </div>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientDetailTable;
