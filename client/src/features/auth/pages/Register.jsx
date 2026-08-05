import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import authAPI from "../authAPI";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "User",
    },
  });

  const password = watch("password");

  const onSubmit = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: Number(formData.age),
        email: formData.email,
        password: formData.password,
        role: formData.role || "User",
      };

      const response = await authAPI.register(payload);

      setSuccessMessage(response.message);

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
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
          width: 500,
          padding: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>

        <Typography
          align="center"
          sx={{
            marginBottom: 3,
          }}
        >
          Register to continue
        </Typography>

        {successMessage && (
          <Alert
            severity="success"
            sx={{
              marginBottom: 2,
            }}
          >
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              marginBottom: 2,
            }}
          >
            {errorMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Age"
            type="number"
            {...register("age", {
              required: "Age is required",
              min: {
                value: 18,
                message: "Minimum age is 18",
              },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />

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
                value: 8,
                message: "Password must contain at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                message:
                  "Must contain uppercase, lowercase, number and special character",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="register-role-label">Role</InputLabel>
            <Select
              labelId="register-role-label"
              label="Role"
              defaultValue="User"
              {...register("role", {
                required: "Role is required",
              })}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              marginTop: 3,
              height: 50,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <Typography
          align="center"
          sx={{
            marginTop: 3,
          }}
        >
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Register;
