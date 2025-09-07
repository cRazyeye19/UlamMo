"use client";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";

interface SnackbarAlertProps {
  message: string | null;
  severity: "error" | "warning" | "info" | "success";
  onClose: () => void;
}

const SnackbarAlert = ({ message, severity, onClose }: SnackbarAlertProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
