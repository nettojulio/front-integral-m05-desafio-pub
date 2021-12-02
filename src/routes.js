import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import useFunctions from "./hooks/useFunctions";
import ClientDetail from "./components/ComponentsClients/ClientDetail";

function MainRoutes() {
  function ProtectedRoutes(props) {
    const { token } = useFunctions();

    return token ? props.children : <Navigate to="/signin" />;
  }

  function RedirectRoutes(props) {
    const { token } = useFunctions();

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
              <Dashboard renderPage={"resume"} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoutes>
              <Dashboard renderPage={"client"} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/charge"
          element={
            <ProtectedRoutes>
              <Dashboard renderPage={"charge"} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/clientDetail"
          element={
            <ProtectedRoutes>
              <ClientDetail renderPage={"clientDetail"} />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
