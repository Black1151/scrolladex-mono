import { AsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type State = Record<string, any>;

const handleAsyncReducers = <ThunkArg, ThunkConfig>(
  builder: any,
  asyncThunk: AsyncThunk<ThunkArg, ThunkConfig, {}>,
  stateKey: string
) => {
  const pendingReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state) => {
    state[stateKey].status = "loading";
    state[stateKey].error = null;
  };
  
  const fulfilledReducer: CaseReducer<State, PayloadAction<ThunkArg, string, any, any>> = (state, action) => {
    state[stateKey].status = "idle";
    state[stateKey].data = action.payload;
  };
  
  const rejectedReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state, action) => {
    state[stateKey].status = "failed";
    state[stateKey].error = action.error ? action.error.message : 'Unknown error';
  };
  
  builder.addCase(asyncThunk.pending, pendingReducer);
  builder.addCase(asyncThunk.fulfilled, fulfilledReducer);
  builder.addCase(asyncThunk.rejected, rejectedReducer);
};

export default handleAsyncReducers;
