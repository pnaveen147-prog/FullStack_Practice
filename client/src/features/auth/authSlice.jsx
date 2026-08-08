import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authAPI.login(credentials);

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",

  async (_, thunkAPI) => {
    console.log(thunkAPI);
    try {
      await authAPI.logout();
    } catch (error) {
      console.error(error);
      // Even if backend fails,
      // continue logout.
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",

  async (
    payload,

    thunkAPI,
  ) => {
    try {
      const response = await authAPI.forgotPassword(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send reset link.",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",

  async (
    payload,

    thunkAPI,
  ) => {
    try {
      const response = await authAPI.resetPassword(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reset password.",
      );
    }
  },
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",

  async (
    payload,

    thunkAPI,
  ) => {
    try {
      const response = await authAPI.verifyEmail(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email verification failed.",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload?.data ?? action.payload;

        state.user = payload?.user ?? null;
        state.accessToken = payload?.accessToken ?? null;
        state.refreshToken = payload?.refreshToken ?? null;
        state.isAuthenticated = Boolean(payload?.accessToken);

        if (payload?.accessToken) {
          localStorage.setItem("accessToken", payload.accessToken);
        }

        if (payload?.refreshToken) {
          localStorage.setItem("refreshToken", payload.refreshToken);
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthenticated = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.accessToken = null;

        state.refreshToken = null;

        state.loading = false;

        state.error = null;

        state.isAuthenticated = false;

        localStorage.removeItem("accessToken");

        localStorage.removeItem("refreshToken");
      })

      .addCase(
        forgotPassword.pending,

        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        forgotPassword.fulfilled,

        (state) => {
          state.loading = false;
        },
      )

      .addCase(
        forgotPassword.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      )

      .addCase(
        resetPassword.pending,

        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        resetPassword.fulfilled,

        (state) => {
          state.loading = false;
        },
      )

      .addCase(
        resetPassword.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      )

      .addCase(
        verifyEmail.pending,

        (state) => {
          state.loading = true;

          state.error = null;
        },
      )

      .addCase(
        verifyEmail.fulfilled,

        (state) => {
          state.loading = false;
        },
      )

      .addCase(
        verifyEmail.rejected,

        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        },
      );
  },
});

export const {
  logout,

  clearError,
} = authSlice.actions;

export default authSlice.reducer;
