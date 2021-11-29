import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import useSignup from "./hooks/useSignup";

function MainRoutes() {
  const { token } = useSignup(); 
  return (
    <>
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        {token && <Route path="dashboard" element={<Dashboard />} />}
        {token && <Route path="/resume" element={<Dashboard />} />}
        {token && <Route path="/client" element={<Dashboard />} />}
        {token && <Route path="/charge" element={<Dashboard />} />}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
