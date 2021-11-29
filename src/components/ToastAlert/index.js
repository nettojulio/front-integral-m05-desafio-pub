import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useSignup from "../../hooks/useSignup";

function ToastAlert() {
  const { open, handleClose, messageAlert, stateAlert } = useSignup();

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      sx={{ width: "50%" }}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={stateAlert}
        sx={{ width: "100%", fontSize: "1.6rem" }}
      >
        {messageAlert}
      </Alert>
    </Snackbar>
  );
}

export default ToastAlert;
