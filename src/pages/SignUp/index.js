import "./style.css";
import "../../styles/global.css";
import SignupStatusBar from "../../components/SignupStatusBar";
import SignupHome from "../../components/SignupData/SignupHome";
import SignupPassword from "../../components/SignupData/SignupPassword";
import SignupDone from "../../components/SignupData/SignupDone";
import useSignup from "../../hooks/useSignup";
import ToastAlert from "../../components/ToastAlert";

function SignUp() {
  const { togglePage } = useSignup();

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
