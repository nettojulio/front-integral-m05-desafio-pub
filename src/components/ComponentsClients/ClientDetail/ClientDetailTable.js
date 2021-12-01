import "./style.css";
import editBillings from '../../../assets/editBillingsCard.svg';
import deleteBillings from '../../../assets/deleteBillingsCard.svg';
import sort from '../../../assets/sortIconHeaders.svg';

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
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips..."),
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips..."),
    createData(248563147, "26/01/2021", "R$ 500,00", "Vencida", "lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips..."),
  ];

  return (
    <div >
      <TableContainer component={Paper} sx={{ border: "none", borderRadius: 0, boxShadow: "none " }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell>
                <div className="table-filter">
                  <img src={sort} alt="Filter" />
                  <span>
                    ID Cob.
                  </span>
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
          <TableBody >
            {rows.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientDetailTable;
