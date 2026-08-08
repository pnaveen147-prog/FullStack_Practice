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

import { forgotPassword } from "../authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const {
    loading,

    error,
  } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      forgotPassword({
        email,
      }),
    );

    if (forgotPassword.fulfilled.match(result)) {
      setSuccess(true);
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
          Forgot Password
        </Typography>

        {success && (
          <Alert
            severity="success"

            sx={{
              mb: 2,
            }}
          >
            If an account exists, a password reset link has been sent.
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"

            sx={{
              mb: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth

            label="Email"

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            margin="normal"

            required
          />

          <Button
            fullWidth

            variant="contained"

            type="submit"

            sx={{
              mt: 2,
            }}

            disabled={loading}
          >
            {loading ? <CircularProgress size={22} /> : "Send Reset Link"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
