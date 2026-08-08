import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

import { login, clearError } from "../authSlice";

function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/app/dashboard", {
        replace: true,
      });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = (formData) => {
    dispatch(login(formData));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: 420,
          padding: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          TaskFlow
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            marginBottom: 3,
          }}
        >
          Login to your account
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 1,
              mb: 2,
            }}
          >
            <Link
              to="/forgot-password"
              style={{
                textDecoration: "none",
                fontSize: "14px",
                color: "#1976d2",
                fontWeight: 500,
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              height: 50,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>

        <Typography
          align="center"
          sx={{
            marginTop: 3,
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Login;
