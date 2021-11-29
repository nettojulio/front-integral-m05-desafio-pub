import "../../styles/global.css";
import MainRoutes from "../../routes";
import { UserProvider } from "../../context/UserContext";

function Home() {
  return (
    <UserProvider>
      <MainRoutes />
    </UserProvider>
  );
}

export default Home;
