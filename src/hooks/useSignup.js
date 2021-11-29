import { useContext } from "react";
import UserContext from "../context/UserContext";

function useSignup() {
  return useContext(UserContext);
}

export default useSignup;