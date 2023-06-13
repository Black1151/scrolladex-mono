import { AsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type State = Record<string, any>;

const handleAsyncReducers = <ThunkArg, ThunkConfig>(
  builder: any,
  asyncThunk: AsyncThunk<ThunkArg, ThunkConfig, {}>,
  statusKey: string,
  dataKey: string | null,
  errorKey: string | null
) => {
  const pendingReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state) => {
    state[statusKey] = "loading";
    if (errorKey) {
      state[errorKey] = null;
    }
  };
  
  const fulfilledReducer: CaseReducer<State, PayloadAction<ThunkArg, string, any, any>> = (state, action) => {
    state[statusKey] = "idle";
    if (dataKey) {
      console.log(`Setting state.${dataKey}.data with payload:`, action.payload);
      state[dataKey].data = action.payload;
    }
  };
  
  const rejectedReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state, action) => {
    state[statusKey] = "failed";
    if (errorKey) {
      state[errorKey] = action.error.message;
    }
  };
  
  builder.addCase(asyncThunk.pending, pendingReducer);
  builder.addCase(asyncThunk.fulfilled, fulfilledReducer);
  builder.addCase(asyncThunk.rejected, rejectedReducer);
};

export default handleAsyncReducers;
