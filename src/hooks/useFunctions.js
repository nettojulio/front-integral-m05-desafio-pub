import { useContext } from "react";
import FunctionsContext from "../context/FunctionsContext";

function useFunctions() {
  return useContext(FunctionsContext);
}

export default useFunctions;
