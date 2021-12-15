import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useFunctions from "../../../hooks/useFunctions";

function ToastAlert() {
  const { open, handleClose, messageAlert, stateAlert } = useFunctions();

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
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
