import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getEmployeesOverviewAPI, 
  createEmployeeAPI, 
  getEmployeeAPI, 
  updateEmployeeAPI, 
  deleteEmployeeAPI 
} from "@/api/employeeApi";
import { EmployeeOverview, EmployeeCreateUpdate, Employee, RequestState, SearchCriteria } from "@/types";
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
  (searchCriteria : SearchCriteria, thunkAPI) => {
    return handleThunkAPI(getEmployeesOverviewAPI(searchCriteria), thunkAPI);
  }
);

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  (id: number, thunkAPI) => handleThunkAPI(getEmployeeAPI(id), thunkAPI)
);

export const createEmployee = createAsyncThunk(
  "departments/createDepartment",
  async (newEmployee: EmployeeCreateUpdate, thunkAPI) => {
    const response = await handleThunkAPI(createEmployeeAPI(newEmployee), thunkAPI);
    if (response) {
      thunkAPI.dispatch(fetchEmployeeOverview({}));
    }
    return response;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (data: EmployeeCreateUpdate, thunkAPI) => {
    const response = await handleThunkAPI(updateEmployeeAPI(data), thunkAPI);
    if (response) {
      thunkAPI.dispatch(fetchEmployeeOverview({}));
    }
    return response;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number, thunkAPI) => {
    const response = await handleThunkAPI(deleteEmployeeAPI(id), thunkAPI);
    if (response) {
      thunkAPI.dispatch(fetchEmployeeOverview({}));
    }
    return response
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleAsyncReducers({
      builder,
      asyncThunk: fetchEmployeeOverview,
      stateKey: 'employeeEntities'
    });
    
    handleAsyncReducers({
      builder,
      asyncThunk: fetchEmployee,
      stateKey: 'employeeDetail'
    });
    
    handleAsyncReducers({
      builder,
      asyncThunk: createEmployee,
      stateKey: 'createEmployee'
    });
    
    handleAsyncReducers({
      builder,
      asyncThunk: updateEmployee,
      stateKey: 'updateEmployee'
    });
    
    handleAsyncReducers({
      builder,
      asyncThunk: deleteEmployee,
      stateKey: 'deleteEmployee'
    });
  },
});



export default employeesSlice.reducer;
