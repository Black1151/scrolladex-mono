import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, logoutUserAPI, checkSessionAPI } from "@/api/authAPI";
import { RequestState } from "@/types";
import handleAsyncReducers from "@/utils/handleAsyncReducers";

const initialRequestState = <T>(): RequestState<T> => ({
  data: null,
  status: 'idle',
  error: null
});

type AuthState = {
  isAuthenticated:  RequestState<boolean>;
  login: RequestState<void>;
  logout: RequestState<void>;
};

const initialState: AuthState = { 
  isAuthenticated: initialRequestState<boolean>(),
  login: initialRequestState<void>(),
  logout: initialRequestState<void>(),
};

const handleThunkAPI = async (apiCall: Promise<any>, thunkAPI: any) => {
  try {
    const response = await apiCall;
    return response;
  } catch (error) {
    console.error('Error occurred:', error);
    const err = error as Error;
    return thunkAPI.rejectWithValue({ error: err.message || 'Unknown error occurred' });
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  (credentials: { username: string, password: string }, thunkAPI) => handleThunkAPI(loginUserAPI(credentials), thunkAPI)
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  (_, thunkAPI) => handleThunkAPI(logoutUserAPI(), thunkAPI)
);

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  (_, thunkAPI) => handleThunkAPI(checkSessionAPI(), thunkAPI)
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    handleAsyncReducers({
      builder,
      asyncThunk: loginUser,
      stateKey: 'login',
      onFulfilled: (state) => {
        state.isAuthenticated.data = true;
      }
    });

    handleAsyncReducers({
      builder,
      asyncThunk: logoutUser,
      stateKey: 'logout',
      onFulfilled: (state) => {
        state.isAuthenticated.data = false;
      }
    });

    handleAsyncReducers({
      builder,
      asyncThunk: checkSession,
      stateKey: 'isAuthenticated',
      onFulfilled: (state, action) => {
        state.isAuthenticated.data = action.payload.isAuthenticated;
      }
    });
  },
});

export default authSlice.reducer;
