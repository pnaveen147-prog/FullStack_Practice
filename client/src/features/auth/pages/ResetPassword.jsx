import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";

import { resetPassword } from "../authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const {
    loading,

    error,
  } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match.");

      return;
    }

    setValidationError("");

    const result = await dispatch(
      resetPassword({
        token,

        password,
      }),
    );

    if (resetPassword.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <Box
      display="flex"

      justifyContent="center"

      mt={8}
    >
      <Paper
        sx={{
          p: 4,

          width: 450,
        }}
      >
        <Typography
          variant="h5"

          mb={3}
        >
          Reset Password
        </Typography>

        {validationError && (
          <Alert
            severity="error"

            sx={{ mb: 2 }}
          >
            {validationError}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"

            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth

            label="New Password"

            type="password"

            margin="normal"

            required

            value={password}

            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            fullWidth

            label="Confirm Password"

            type="password"

            margin="normal"

            required

            value={confirmPassword}

            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            fullWidth

            variant="contained"

            type="submit"

            sx={{ mt: 2 }}

            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Reset Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
