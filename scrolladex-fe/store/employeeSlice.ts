import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getEmployeesOverviewAPI, 
  createEmployeeAPI, 
  getEmployeeAPI, 
  updateEmployeeAPI, 
  deleteEmployeeAPI 
} from "@/api/employeeApi";
import { EmployeeOverview, EmployeeCreateUpdate, Employee, RequestState } from "@/types";
import handleAsyncReducers from "@/utils/handleAsyncReducers";

const initialRequestState = <T>(): RequestState<T> => ({
  data: null,
  status: 'idle',
  error: null
});

type EmployeesState = {
  employeeEntities: RequestState<EmployeeOverview[]>;
  employeeDetail: RequestState<Employee>;
  createEmployee: RequestState<number>;
  updateEmployee: RequestState<Employee>;
  deleteEmployee: RequestState<void>;
};

const initialState: EmployeesState = { 
  employeeEntities: initialRequestState<EmployeeOverview[]>(),
  employeeDetail: initialRequestState<Employee>(),
  createEmployee: initialRequestState<number>(),
  updateEmployee: initialRequestState<Employee>(),
  deleteEmployee: initialRequestState<void>(),
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

export const fetchEmployeeOverview = createAsyncThunk(
  "employees/fetchEmployees",
  (_, thunkAPI) => handleThunkAPI(getEmployeesOverviewAPI(), thunkAPI)
);

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  (id: number, thunkAPI) => handleThunkAPI(getEmployeeAPI(id), thunkAPI)
);

export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (newEmployee: EmployeeCreateUpdate, thunkAPI) => {
    const response = await handleThunkAPI(createEmployeeAPI(newEmployee), thunkAPI);
    if (!response.error) {
      thunkAPI.dispatch(fetchEmployeeOverview());
    }
    return response;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  (data: EmployeeCreateUpdate, thunkAPI) => handleThunkAPI(updateEmployeeAPI(data), thunkAPI)
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number, thunkAPI) => {
    const statusCode = await handleThunkAPI(deleteEmployeeAPI(id), thunkAPI);
    if (statusCode === 200 || statusCode === 204) { 
      thunkAPI.dispatch(fetchEmployeeOverview());
    }
    return statusCode;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchEmployeeOverview, 'employeeEntities');
    handleAsyncReducers(builder, fetchEmployee, 'employeeDetail');
    handleAsyncReducers(builder, createEmployee, 'createEmployee');
    handleAsyncReducers(builder, updateEmployee, 'updateEmployee');
    handleAsyncReducers(builder, deleteEmployee, 'deleteEmployee');
  },
});


export default employeesSlice.reducer;
