<<<<<<< HEAD
// import "./style.css";
// import useSignup from "../../hooks/useSignup";
// import search from "../../assets/search.svg";
// import customerScreen from "../../assets/customerScreen.svg";
// import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
// import customersSettings from "../../assets/customersSettings.svg";
=======
import "./style.css";
import useSignup from "../../hooks/useSignup";
import search from "../../assets/search.svg";
import customerScreen from "../../assets/customerScreen.svg";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";
import customersSettings from "../../assets/customersSettings.svg";
import TableClientsExib from "../../components/ComponentsClients/TableClientsExib";
>>>>>>> 46651f41e4d9cd02da9fcee16bbdde25bc11af02

// function Client() {
//   const { setOpenClientModal } = useSignup();

//   return (
//     <div className="clients-page">
//       <div className="container-clients-page">
//         <div className="clients-page-icon">
//           <img src={customerScreen} alt="Customers" />
//           <span>Clientes</span>
//         </div>
//         <div className="clients-page-info">
//           <button
//             onClick={() => setOpenClientModal(true)}
//             className="btn add-btn"
//           >
//             + Adicionar cliente
//           </button>
//           <div className="clientSettings">
//             <img src={customersSettings} alt="Search" />
//           </div>
//           <div className="input-search">
//             <span>Pesquisar</span>
//             <img src={search} alt="Search" />
//           </div>
//         </div>
//       </div>

<<<<<<< HEAD
//       <ToastAlert />
//     </div>
//   );
// }
=======
      <TableClientsExib />

      <ToastAlert />
    </div>
  );
}
>>>>>>> 46651f41e4d9cd02da9fcee16bbdde25bc11af02

// export default Client;
