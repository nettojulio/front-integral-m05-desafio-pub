import "./style.css";
import inverter from "../../../assets/sortIconHeaders.svg";
import editarIcon from "../../../assets/editBillingsCard.svg";
import excluirIcon from "../../../assets/deleteBillingsCard.svg";
import noResults from "../../../assets/noResults.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFunctions from "../../../hooks/useFunctions";
import useGlobal from "../../../hooks/useGlobal";
import { useEffect } from "react";
import DeleteChargeModal from "../../ComponentsDashboard/DeleteChargeModal";
import DetailChargeModal from "../../ComponentsDashboard/DetailChargeModal";

function TableCobrancasExib({ cardNotFound }) {
  const {
    loadAllBillings,
    loadAllClients,
    chargeData,
    handleDeleteCharge,
    handleDetailCharge,
    handleEditCharge,
  } = useFunctions();
  const {
    openFilteredCard,
    openDeleteModal,
    openDetailChargeModal,
    orderCharge,
    setOrderCharge,
    filter,
    setFilter,
    searchCharge,
    setClientDetailData,
  } = useGlobal();

  useEffect(() => {
    openFilteredCard && loadAllBillings();
    loadAllClients();
    setClientDetailData(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (filter === "clients") {
      orderCharge === "asc" ? handleOrderAsc() : handleOrderDesc();
    }
    if (filter === "idCob") {
      orderCharge === "asc" ? handleOrderAsc() : handleOrderDesc();
    }
    // eslint-disable-next-line
  }, [filter, orderCharge]);

  function handleOrderAsc() {
    chargeData.sort((a, b) => orderColumnAsc(a, b, filter));
  }

  function handleOrderDesc() {
    chargeData.sort((a, b) => orderColumnDesc(a, b, filter));
  }

  function handleChangeFilter(type) {
    setFilter(type);
    setOrderCharge(orderCharge === "asc" ? "desc" : "asc");
  }

  function orderColumnAsc(a, b, by) {
    if (by === "clients") {
      return a.cliente.nome.localeCompare(b.cliente.nome);
    }

    if (by === "idCob") {
      return [a.id] - [b.id];
    }
  }

  function orderColumnDesc(a, b, by) {
    if (by === "clients") {
      return b.cliente.nome.localeCompare(a.cliente.nome);
    }

    if (by === "idCob") {
      return [b.id] - [a.id];
    }
  }

  return (
    <>
      {openDetailChargeModal && <DetailChargeModal />}
      {openDeleteModal ? (
        <DeleteChargeModal />
      ) : (
        <div className="card-cobrancas">
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: "30px",
              width: "111.6rem",
              maxHeight: "60rem",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {cardNotFound ? (
              <>
                <div className="card-not-found">
                  <img src={noResults} alt="Nenhum resultado encontrado" />
                  <p>Nenhum resultado foi encontrado!</p>
                  <p>Verifique se a escrita está correta</p>
                </div>
              </>
            ) : (
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => handleChangeFilter("clients")}
                    >
                      <img src={inverter} alt="" />
                      Cliente
                    </TableCell>
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => handleChangeFilter("idCob")}
                    >
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
                  {searchCharge.map((charge) => (
                    <TableRow
                      key={charge.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        component="th"
                        scope="row"
                      >
                        {charge.cliente.nome}
                      </TableCell>
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        align="left"
                      >
                        {`${charge.id}`.padStart(9, 0)}
                      </TableCell>
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        align="left"
                      >
                        {(charge.valor / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        align="left"
                      >
                        {new Date(charge.data_vencimento).toLocaleDateString(
                          "pt",
                          {
                            timeZone: "UTC",
                          }
                        )}
                      </TableCell>
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        align="center"
                      >
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
                      <TableCell
                        className="div-details"
                        onClick={() => handleDetailCharge(charge)}
                        align="left"
                      >
                        {charge.descricao}
                      </TableCell>
                      <TableCell>
                        <div
                          onClick={() => handleEditCharge(charge)}
                          className="container-icon-editar"
                        >
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
                        <div
                          onClick={() => handleDeleteCharge(charge)}
                          className="container-icon-excluir"
                        >
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
            )}
          </TableContainer>
        </div>
      )}
    </>
  );
}


export default TableCobrancasExib;
