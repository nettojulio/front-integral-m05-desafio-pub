import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import ResumeBills from "../ResumeBills";
import Client from "../Client";
import Charge from "../Charge";
import { Routes, Route } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/resume" element={<ResumeBills />} />
        <Route path="/client" element={<Client />} />
        <Route path="/charge" element={<Charge />} />
      </Routes>
    </>
  );
}

export default Dashboard;
