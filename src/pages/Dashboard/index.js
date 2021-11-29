// import { useEffect } from "react";
import SideBar from "../../components/ComponentsDashboard/SideBar";
import NavBar from "../../components/ComponentsDashboard/NavBar";
import ResumeBills from "../ResumeBills";
import Client from "../Client";
import Charge from "../Charge";

import ClientModal from "../../components/ComponentsDashboard/ClientModal";

import "./style.css";
import useSignup from "../../hooks/useSignup";

function Dashboard() {
  const { changePages, openClientModal, setOpenOptions } = useSignup();

  // useEffect(() => {
  //   if (token) {
  //     loadUserProfile();
  //   }
  // }, []);

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
      </div>
    </div>
  );
}

export default Dashboard;
