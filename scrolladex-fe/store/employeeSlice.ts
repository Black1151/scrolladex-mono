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
  "employees/createEmployee",
   (newEmployee: EmployeeCreateUpdate, thunkAPI) => handleThunkAPI(createEmployeeAPI(newEmployee), thunkAPI)
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  (data: EmployeeCreateUpdate, thunkAPI) => handleThunkAPI(updateEmployeeAPI(data), thunkAPI)
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: number, thunkAPI) => handleThunkAPI(deleteEmployeeAPI(id), thunkAPI)
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
