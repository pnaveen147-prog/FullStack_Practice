import { useEffect, useState } from "react";

import { Box, Paper, Typography, Alert, CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useSearchParams } from "react-router-dom";

import { verifyEmail } from "../authSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const {
    loading,

    error,
  } = useSelector((state) => state.auth);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await dispatch(
        verifyEmail({
          token,
        }),
      );

      if (verifyEmail.fulfilled.match(result)) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    if (token) {
      verify();
    }
  }, []);

  return (
    <Box
      display="flex"

      justifyContent="center"

      mt={8}
    >
      <Paper
        sx={{
          p: 4,

          width: 500,
        }}
      >
        <Typography
          variant="h5"

          mb={3}
        >
          Email Verification
        </Typography>

        {loading && <CircularProgress />}

        {success && (
          <Alert severity="success">
            Email verified successfully. Redirecting to Login...
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
    </Box>
  );
};

export default VerifyEmail;
