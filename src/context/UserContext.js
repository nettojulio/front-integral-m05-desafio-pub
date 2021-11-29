import { createContext } from "react";
import useSignupProvider from "../hooks/useSignupProvider";

const UserContext = createContext({});

export function UserProvider(props) {
  const useProvider = useSignupProvider();
  return (
    <UserContext.Provider value={useProvider} >{props.children}</UserContext.Provider>
  )
}

export default UserContext;