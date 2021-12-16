import "./style.css";
import { useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import useFunctions from "../../hooks/useFunctions";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import customerScreen from "../../assets/customerScreen.svg";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
import customersSettings from "../../assets/customersSettings.svg";
import TableClientsExib from "../../components/ComponentsClients/TableClientsExib";
import ClientDetail from "../../components/ComponentsClients/ClientDetail";

function Client() {
  const {
    setOpenClientModal,
    openClientDetail,
    setSearchClient,
    inputValue,
    setInputValue,
    cardNotFound,
    setCardNotFound,
  } = useGlobal();
  const { clientData, handleResetFilter, handleSearch } = useFunctions();

  useEffect(() => {
    setSearchClient(clientData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientData]);

  function handleClickSearch(e) {
    e.preventDefault();
    const cliente = [];

    // eslint-disable-next-line
    clientData.filter((client) => {
      if (inputValue === "") {
        setCardNotFound(false);
        setSearchClient(clientData);
        // eslint-disable-next-line
        return;
      } else if (
        client.nome.toLowerCase().includes(inputValue.toLowerCase()) ||
        client.cpf.toString().includes(inputValue) ||
        client.email.includes(inputValue)
      ) {
        setCardNotFound(false);
        cliente.push(client);
        return setSearchClient(cliente);
      } else if (cliente.length === 0) {
        setCardNotFound(true);
      }
      setInputValue("");
    });
  }

  return (
    <div className="clients-page">
      {openClientDetail ? (
        <ClientDetail />
      ) : (
        <>
          <div className="container-clients-page">
            <div className="menu-clientes">
              <div className="clients-page-icon">
                <img src={customerScreen} alt="Customers" />
                <span>Clientes</span>
              </div>
              <div className="clients-page-info">
                <button
                  onClick={() => setOpenClientModal(true)}
                  className="btn add-btn"
                >
                  + Adicionar cliente
                </button>
                <div className="clientSettings">
                  <img
                    onClick={handleResetFilter}
                    src={customersSettings}
                    alt="Search"
                  />
                </div>
                <Paper
                  component="form"
                  sx={{
                    p: "7px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 318,
                    height: 39,
                    borderRadius: "10px",
                  }}
                >
                  <InputBase
                    sx={{
                      ml: 1,
                      flex: 1,
                      fontSize: "14px",
                      fontFamily: "Nunito",
                    }}
                    placeholder="Pesquisar"
                    inputProps={{ "aria-label": "pesquisar" }}
                    value={inputValue}
                    onChange={handleSearch}
                  />
                  <IconButton
                    onClick={handleClickSearch}
                    type="submit"
                    sx={{ p: "0px" }}
                    aria-label="search"
                  >
                    <SearchIcon sx={{ width: "3rem", height: "3rem" }} />
                  </IconButton>
                </Paper>
              </div>
            </div>
          </div>
          <TableClientsExib cardNotFound={cardNotFound} />
          <ToastAlert />
        </>
      )}
    </div>
  );
}

export default Client;
