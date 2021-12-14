import { useEffect } from "react";
import SideBar from "../../components/ComponentsDashboard/SideBar";
import NavBar from "../../components/ComponentsDashboard/NavBar";
import ResumeBills from "../ResumeBills";
import Client from "../Client";
import Charge from "../Charge";

import ClientModal from "../../components/ComponentsDashboard/ClientModal";
import EditClientModal from "../../components/ComponentsDashboard/EditClientModal";
import ChargeModal from "../../components/ComponentsDashboard/ChargeModal";

import "./style.css";
import useGlobal from "../../hooks/useGlobal";
import EditChargeModal from "../../components/ComponentsDashboard/EditChargeModal";

function Dashboard({ renderPage }) {
  const {
    changePages,
    setChangePages,
    openClientModal,
    setOpenOptions,
    openEditClientModal,
    openChargeModal,
    openEditChargeModal
  } = useGlobal();

  useEffect(() => {
    if (renderPage) {
      setChangePages(renderPage);
    }
  }, [renderPage, setChangePages]);

  return (
    <div className="main" onClick={() => setOpenOptions(false)}>
      <div className="first-div">
        <SideBar />
      </div>
      <div className="second-div">
        <NavBar />
        {changePages === "resume" && <ResumeBills />}
        {changePages === "client" && <Client />}
        {changePages === "charge" && <Charge />}
        {openClientModal && <ClientModal />}
        {openEditClientModal && <EditClientModal />}
        {openEditChargeModal && <EditChargeModal />}
        {openChargeModal && <ChargeModal />}
      </div>
    </div>
  );
}

export default Dashboard;
