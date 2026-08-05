import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../services/userAPI";

const initialState = {
  users: [],
  selectedUser: null,

  loading: false,
  error: null,

  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  },

  filters: {
    page: 1,
    limit: 10,
    search: "",
    role: "",
    age: "",
  },
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (query, thunkAPI) => {
    try {
      const response = await userAPI.getUsers(query);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users.",
      );
    }
  },
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const response = await userAPI.createUser(payload);

      thunkAPI.dispatch(fetchUsers(thunkAPI.getState().users.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create user.",
      );
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, payload }, thunkAPI) => {
    try {
      const response = await userAPI.updateUser(id, payload);

      thunkAPI.dispatch(fetchUsers(thunkAPI.getState().users.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user.",
      );
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await userAPI.deleteUser(id);

      thunkAPI.dispatch(fetchUsers(thunkAPI.getState().users.filters));

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete user.",
      );
    }
  },
);

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearFilters(state) {
      state.filters = {
        page: 1,
        limit: 10,
        search: "",
        role: "",
        age: "",
      };
    },

    clearSelectedUser(state) {
      state.selectedUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        const responseData = action.payload?.data ?? action.payload;
        const meta = action.payload?.meta ??
          action.payload?.pagination ?? {
            page: 1,
            limit: 10,
            totalPages: 0,
            totalRecords: 0,
          };

        state.users = Array.isArray(responseData)
          ? responseData
          : (responseData?.data ?? []);

        state.pagination = meta;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearSelectedUser } =
  userSlice.actions;

export default userSlice.reducer;
