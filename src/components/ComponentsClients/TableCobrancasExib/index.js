import "./style.css";
import inverter from "../../../assets/sortIconHeaders.svg";
import editarIcon from '../../../assets/editBillingsCard.svg';
import excluirIcon from '../../../assets/deleteBillingsCard.svg';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableCobrancasExib() {

    function createData(client, idCob, value, dataVenc, status, descricao, iconeEditar,iconeExcluir){
        return { client, idCob, value, dataVenc, status, descricao, iconeEditar,iconeExcluir};
    }

    const rows = [
        createData(
            "Sara Silva",
            "248563147",
            "R$ 500,00", 
            "26/01/2021",
            "Vencida",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Carlos Prado",
            "148563148",
            "R$ 400,00", 
            "26/01/2021",
            "Vencida",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Lara Brito",
            "648563148",
            "R$ 300,00", 
            "26/01/2021",
            "Vencida",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Soraia Neves",
            "5348563145",
            "R$ 900,00", 
            "26/01/2021",
            "Vencida",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Sara Silva",
            "458563145",
            "R$ 2000,00", 
            "27/11/2021",
            "Pendente",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Carlos Prado",
            "368563147",
            "R$ 700,00", 
            "27/11/2021",
            "Pendente",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Lara Brito",
            "488563147",
            "R$ 500,00", 
            "27/11/2021",
            "Pendente",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Darlene Robertson",
            "148563148",
            "R$ 200,00", 
            "26/01/2021",
            "Paga",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),
        createData(
            "Cameron Williamson",
            "148563148",
            "R$ 200,00", 
            "26/01/2021",
            "Paga",
            "lorem ipsum lorem ipsum lorem ...",
            editarIcon,
            excluirIcon
        ),


    ];


    return(
        <div className="card-cobrancas">
            <TableContainer component={Paper} sx={{ borderRadius: "30px" }}>
            <Table sx={{ width: "111.6rem" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell
                >
                    <img src={inverter} alt="" />
                    Cliente
                </TableCell>
                <TableCell
                >
                    <img src={inverter} alt="" />
                    ID Cob.
                </TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data de Vencimento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                <TableRow
                    key={row.client}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell component="th" scope="row">{row.client}
                    </TableCell>
                    <TableCell align="left">{row.idCob}</TableCell>
                    <TableCell align="left">{row.value}</TableCell>
                    <TableCell align="center">{row.dataVenc}</TableCell>
                    <TableCell align="center">
                    <div className={row.status === "Vencida" ? "status-red" : (row.status === "Pendente" ? "status-yellow" :"status-blue") }>{row.status}</div>
                    </TableCell>
                    <TableCell align="left" >
                    {row.descricao}
                    </TableCell>
                    <TableCell >
                    <div className="container-icon-editar">
                            <img
                            src={row.iconeEditar}
                            className="icone-editar"
                            alt="Ícone de editar"
                            style={{ width: 16 }}
                            />
                            Editar
                        </div>
                    </TableCell>
                    <TableCell >
                    <div className="container-icon-excluir">
                            <img
                                src={row.iconeExcluir}
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