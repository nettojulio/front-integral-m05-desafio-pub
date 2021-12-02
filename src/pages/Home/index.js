import "../../styles/global.css";
import MainRoutes from "../../routes";
import { GlobalProvider } from "../../context/GlobalContext";
import { FunctionsProvider } from "../../context/FunctionsContext";
function Home() {
  return (
    <GlobalProvider>
      <FunctionsProvider>
        <MainRoutes />
      </FunctionsProvider>
    </GlobalProvider>
  );
}

export default Home;
