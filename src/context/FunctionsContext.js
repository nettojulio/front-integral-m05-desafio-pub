import { createContext } from "react";
import useFunctionProvider from "../hooks/useFunctionsProvider";

const FunctionContext = createContext({});

export function FunctionsProvider(props) {
  const functionsProvider = useFunctionProvider();

  return (
    <FunctionContext.Provider value={functionsProvider}>
      {props.children}
    </FunctionContext.Provider>
  );
}

export default FunctionContext;
