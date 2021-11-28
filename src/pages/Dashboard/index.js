import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import ResumeBills from "../ResumeBills";
import Client from "../Client";
import Charge from "../Charge";

import ClientModal from "../../components/ClientModal";

import "./style.css";
import useSignup from "../../hooks/useSignup";

function Dashboard() {
  const { changePages, openClientModal } = useSignup();

  return (
    <div className="main">
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
