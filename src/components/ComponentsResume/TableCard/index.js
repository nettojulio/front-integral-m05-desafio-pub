import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";
import useFunctions from "../../../hooks/useFunctions";
import useGlobal from "../../../hooks/useGlobal";
import CircularProgress from '@mui/material/CircularProgress';

function TableCard({ title, bgColor, situation, total }) {

  const { setChargeData } = useFunctions();
  const { setOpenFilteredCard, setValue, loader, setLoader } = useGlobal();
  const navigate = useNavigate();

  const clearLoad = setTimeout(() => {
    setLoader(false);
    clearInterval(clearLoad)
  }, 2000)

  function handlePage() {
    setOpenFilteredCard(false);
    setChargeData(situation);
    navigate('/charge');
    setValue(2);
  }


  return (
    <div className="container-table">
      <div className="title-table">
        <div className="head-card-table">
          <span className="head-card-table-title">{title}</span>
          <div className={`head-card-table-card-value ${bgColor}`}>
            <span className={bgColor}>{String(total).padStart(2, 0)}</span>
          </div>
        </div>
      </div>

      <TableContainer
        component={Paper}
        sx={{ width: 360, height: 300, overflow: 'hidden', border: "none", borderRadius: 0, boxShadow: "none " }}
      >
        <Table sx={{ minWidth: 360 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>ID da Cob.</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loader
              ? <div className="table-card circular-progress"><CircularProgress sx={{ color: 'var(--pink)' }} /></div>
              : situation.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ whiteSpace: 'nowrap', maxWidth: 100 }}
                    className="format-values">
                    {row.cliente.nome}
                  </TableCell>
                  <TableCell className="format-values" align="left">{String(row.id).padStart(9, 0)}</TableCell>
                  <TableCell className="format-values" align="left">{
                    (row.valor / 100)
                      .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer-table">
        <span onClick={handlePage}>Ver todos</span>
      </div>
    </div>
  );
}

export default TableCard;
