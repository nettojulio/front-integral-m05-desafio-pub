import "./style.css";
import inverter from "../../../assets/sortIconHeaders.svg";
import editarIcon from "../../../assets/editBillingsCard.svg";
import excluirIcon from "../../../assets/deleteBillingsCard.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFunctions from "../../../hooks/useFunctions";
import { useEffect } from "react";

function TableCobrancasExib() {
  const { loadAllBillings, chargeData } = useFunctions();

  useEffect(() => {
    loadAllBillings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card-cobrancas">
      <TableContainer component={Paper} sx={{ borderRadius: "30px" }}>
        <Table sx={{ width: "111.6rem" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <img src={inverter} alt="" />
                Cliente
              </TableCell>
              <TableCell>
                <img src={inverter} alt="" />
                ID Cob.
              </TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data de venc.</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chargeData.map((charge) => (
              <TableRow
                key={charge.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {charge.cliente.nome}
                </TableCell>
                <TableCell align="left">{charge.id}</TableCell>
                <TableCell align="left">{(charge.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                <TableCell align="left">
                  {new Date(charge.data_vencimento).toLocaleDateString("pt", {
                    timeZone: "UTC",
                  })}
                </TableCell>
                <TableCell align="center">
                  <div
                    className={
                      charge.situacao === "Vencida"
                        ? "status-red"
                        : charge.situacao === "Pendente"
                          ? "status-yellow"
                          : "status-blue"
                    }
                  >
                    {charge.situacao}
                  </div>
                </TableCell>
                <TableCell align="left">{charge.descricao}</TableCell>
                <TableCell>
                  <div className="container-icon-editar">
                    <img
                      src={editarIcon}
                      className="icone-editar"
                      alt="Ícone de editar"
                      style={{ width: 16 }}
                    />
                    Editar
                  </div>
                </TableCell>
                <TableCell>
                  <div className="container-icon-excluir">
                    <img
                      src={excluirIcon}
                      className="icone-excluir"
                      alt="Ícone de excluir"
                      style={{ width: 16 }}
                    />
                    Excluir
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

export default TableCobrancasExib;
