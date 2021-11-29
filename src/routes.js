import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import useSignup from "./hooks/useSignup";

function MainRoutes() {
  function ProtectedRoutes(props) {
    const { token } = useSignup();

    return token ? props.children : <Navigate to="/login" />;
  }

  function RedirectRoutes(props) {
    const { token } = useSignup();

    return token ? <Navigate to="/" /> : props.children;
  }

  return (
    <>
      <Routes>
        <Route
          path="signup"
          element={
            <RedirectRoutes>
              <SignUp />
            </RedirectRoutes>
          }
        />
        <Route
          path="signin"
          element={
            <RedirectRoutes>
              <SignIn />
            </RedirectRoutes>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/charge"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
