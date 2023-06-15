import { useErrorToast, useSuccessToast } from './toasts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/store/store";
import { AsyncThunk, unwrapResult } from '@reduxjs/toolkit';

interface ExecuteAction {
  (arg?: any): Promise<any>;
}

interface UseAsyncActionOptions {
  action: AsyncThunk<any, any, any>;
  successMessage?: string;
  errorMessage?: string;
  showSuccess?: boolean;
}

export const useAsyncAction = (options: UseAsyncActionOptions): ExecuteAction => {
  const { action, successMessage = "Action executed successfully", errorMessage = "Failed to execute action", showSuccess = false } = options;
  const dispatch: AppDispatch = useDispatch();
  const showErrorToast = useErrorToast();
  const showSuccessToast = useSuccessToast();

  const executeAction: ExecuteAction = async (arg?: any) => {
    try {
      const resultAction = await dispatch(action(arg));
      const result = unwrapResult(resultAction);
      if (showSuccess) {
        showSuccessToast(successMessage);
      }
      return result;
    } catch (error: any) {
      if (error.payload) {
        showErrorToast(`${errorMessage}: ${error.payload}`);
      } else {
        showErrorToast(errorMessage);
      }
    }
  };

  return executeAction;
};
