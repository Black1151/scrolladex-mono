import { AsyncThunk, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

type State = Record<string, any>;

type HandleAsyncReducersArgs<ThunkArg, ThunkConfig> = {
  builder: any,
  asyncThunk: AsyncThunk<ThunkArg, ThunkConfig, {}>,
  stateKey: string,
  onFulfilled?: (state: State, action: PayloadAction<ThunkArg, string, any, any>) => void,
  onPending?: (state: State) => void,
  onRejected?: (state: State, action: PayloadAction<null, string, any, any>) => void,
};

const handleAsyncReducers = <ThunkArg, ThunkConfig>({
  builder,
  asyncThunk,
  stateKey,
  onFulfilled,
  onPending,
  onRejected
}: HandleAsyncReducersArgs<ThunkArg, ThunkConfig>) => {
  const pendingReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state) => {
    state[stateKey].status = "loading";
    state[stateKey].error = null;
    if (onPending) {
      onPending(state);
    }
  };

  const fulfilledReducer: CaseReducer<State, PayloadAction<ThunkArg, string, any, any>> = (state, action) => {
    state[stateKey].status = "succeeded";
    state[stateKey].data = action.payload;
    if (onFulfilled) {
      onFulfilled(state, action);
    }
  };

  const rejectedReducer: CaseReducer<State, PayloadAction<null, string, any, any>> = (state, action) => {
    state[stateKey].status = "failed";
    state[stateKey].error = action.error ? action.error.message : 'Unknown error';
    if (onRejected) {
      onRejected(state, action);
    }
  };

  builder.addCase(asyncThunk.pending, pendingReducer);
  builder.addCase(asyncThunk.fulfilled, fulfilledReducer);
  builder.addCase(asyncThunk.rejected, rejectedReducer);
};


export default handleAsyncReducers;
