// useAsyncAction.ts
import { useErrorToast, useSuccessToast } from './toasts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store/store";
import { AsyncThunk, unwrapResult, PayloadAction } from '@reduxjs/toolkit';

interface ExecuteAction {
  (arg?: any): Promise<any>;
}

export const useAsyncAction = (action: AsyncThunk<any, any, any>, showSuccess: boolean = false): ExecuteAction => {
  const dispatch: AppDispatch = useDispatch();
  const showErrorToast = useErrorToast();
  const showSuccessToast = useSuccessToast();

  const executeAction: ExecuteAction = async (arg?: any) => {
    try {
      const resultAction = await dispatch(action(arg));
      const result = unwrapResult(resultAction);
      if (showSuccess) {
        showSuccessToast("Action executed successfully");
      }
      return result;
    } catch (error: any) {
      showErrorToast(`Failed to execute action: ${error.payload}`);
    }
  };

  return executeAction;
};
