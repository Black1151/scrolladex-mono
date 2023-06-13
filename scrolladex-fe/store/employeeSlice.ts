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
  employeeDetailData: RequestState<Employee>;
  employeeCreateStatus: RequestState<number>;
  employeeUpdateData: RequestState<Employee>;
  employeeDeleteStatus: RequestState<void>;
};

const initialState: EmployeesState = { 
  employeeEntities: initialRequestState<EmployeeOverview[]>(),
  employeeDetailData: initialRequestState<Employee>(),
  employeeCreateStatus: initialRequestState<number>(),
  employeeUpdateData: initialRequestState<Employee>(),
  employeeDeleteStatus: initialRequestState<void>(),
};

const handleThunkAPI = async (apiCall: Promise<any>, thunkAPI: any) => {
  try {
    const response = await apiCall;
    return response;
  } catch (error) {
    const err = error as Error;
    return thunkAPI.rejectWithValue({ error: err.message });
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
  (newEmployee: EmployeeCreateUpdate, thunkAPI) => handleThunkAPI(createEmployeeAPI(newEmployee), thunkAPI)
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  (data: EmployeeCreateUpdate, thunkAPI) => handleThunkAPI(updateEmployeeAPI(data), thunkAPI)
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  (id: number, thunkAPI) => handleThunkAPI(deleteEmployeeAPI(id), thunkAPI)
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncReducers(builder, fetchEmployeeOverview, 'loading', 'employeeEntities', 'fetchError');
    handleAsyncReducers(builder, fetchEmployee, 'loading', 'employeeDetail', 'fetchError');
    handleAsyncReducers(builder, createEmployee, 'createStatus', null, 'createError');
    handleAsyncReducers(builder, updateEmployee, 'updateStatus', 'employeeDetail', 'updateError');
    handleAsyncReducers(builder, deleteEmployee, 'deleteStatus', null, 'deleteError');
  },
});

export default employeesSlice.reducer;
