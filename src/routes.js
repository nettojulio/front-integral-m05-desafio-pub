import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
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
      <Route path="/resume" element={<Dashboard />} />
      <Route path="/client" element={<Dashboard />} />
      <Route path="/charge" element={<Dashboard />} />
    </Routes>
  );
}

export default MainRoutes;
