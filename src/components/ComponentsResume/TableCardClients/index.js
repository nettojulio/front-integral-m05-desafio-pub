import "./style.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFunctions from "../../../hooks/useFunctions";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../../hooks/useGlobal";
import CircularProgress from "@mui/material/CircularProgress";

function TableCardClients({ title, icon, bgColor, situation, total, seeAll }) {
  const { setClientData } = useFunctions();
  const { setOpenFilteredCard, setValue, loader, setLoader } = useGlobal();
  const navigate = useNavigate();

  const clearLoad = setTimeout(() => {
    setLoader(false);
    clearInterval(clearLoad)
  }, 2000)

  function handlePage() {
    setOpenFilteredCard(false);
    setClientData(seeAll);
    navigate("/client");
    setValue(1);
  }

  return (
    <div className="container-table-clients">
      <div className="title-table-clients">
        <div className="head-card-table-clients">
          <div className="head-card-table-clients-icon">
            <img src={icon} alt={title} />
            <span className="head-card-table-clients-title">{title}</span>
          </div>
          <div className={`head-card-table-clients-card-value ${bgColor}`}>
            <span className={bgColor}>{String(total).padStart(2, 0)}</span>
          </div>
        </div>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          width: 556,
          height: 300,
          overflow: "hidden",
          border: "none",
          borderRadius: 0,
          boxShadow: "none ",
        }}
      >
        <Table sx={{ minWidth: 556 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>ID do Clie.</TableCell>
              <TableCell>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loader ? (
              <div className="table-card-clients circular-progress">
                <CircularProgress sx={{ color: "var(--pink)" }} />
              </div>
            ) : (
              seeAll.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ whiteSpace: "nowrap", maxWidth: 100 }}
                    className="format-values"
                  >
                    {row.nome}
                  </TableCell>
                  <TableCell className="format-values" align="left">
                    {String(row.id).padStart(9, 0)}
                  </TableCell>
                  <TableCell className="format-values" align="left">
                    {`${row.cpf.slice(0, 3)}.${row.cpf.slice(3, 6)}.${row.cpf.slice(6, 9)}-${row.cpf.slice(9)}`}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer-table-clients">
        <span onClick={handlePage}>Ver todos</span>
      </div>
    </div>
  );
}

export default TableCardClients;
