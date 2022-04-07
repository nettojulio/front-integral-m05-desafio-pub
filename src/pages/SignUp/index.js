import "./style.css";
import "../../styles/global.css";
import SignupStatusBar from "../../components/ComponentsSignUp/SignupStatusBar";
import SignupHome from "../../components/ComponentsSignUp/SignupData/SignupHome";
import SignupPassword from "../../components/ComponentsSignUp/SignupData/SignupPassword";
import SignupDone from "../../components/ComponentsSignUp/SignupData/SignupDone";
import useGlobal from "../../hooks/useGlobal";
import ToastAlert from "../../components/ComponentsGlobal/ToastAlert";

function SignUp() {
  const { togglePage } = useGlobal();

  return (
    <div className="signup">
      <SignupStatusBar />
      {!togglePage && <SignupHome />}
      {togglePage === "signupPassword" && <SignupPassword />}
      {togglePage === "signupDone" && <SignupDone />}
      <ToastAlert />
    </div>
  );
}

export default SignUp;
