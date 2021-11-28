import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// import Example from "./components/Example";
import ResumeBills from "./pages/ResumeBills";
import Client from "./pages/Client";
import Charge from "./pages/Charge";
import Dashboard from "./pages/Dashboard";

// import SideBar from "./components/SideBar";
// import NavBar from "./components/NavBar";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/resume" element={<ResumeBills />} />
      <Route path="/client" element={<Client />} />
      <Route path="/charge" element={<Charge />} />
    </Routes>
  );
}

export default MainRoutes;
