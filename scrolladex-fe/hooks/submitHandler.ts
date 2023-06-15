import { FormikHelpers } from "formik";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useAsyncAction } from "./async";

interface UseSubmitHandlerOptions<Values> {
    apiFunction: AsyncThunk<any, any, any>;
    successMessage?: string;
    errorMessage?: string;
    showSuccess?: boolean;
    resetForm?: boolean;
    onClose?: () => void;
  }

type SubmitHandlerResult = boolean;


export const useSubmitHandler = <Values = any>(
    options: UseSubmitHandlerOptions<Values>
  ): ((values: Values, actions: FormikHelpers<Values>) => Promise<SubmitHandlerResult>) => {
    const { apiFunction, successMessage, errorMessage, showSuccess, resetForm, onClose } = options;
  
    const executeAction = useAsyncAction({
      action: apiFunction,
      successMessage,
      errorMessage,
      showSuccess
    });
  
    return async (
      values: Values,
      actions: FormikHelpers<Values>
    ): Promise<SubmitHandlerResult> => {
      try {
        await executeAction(values);
        actions.setSubmitting(false);
        if (resetForm) actions.resetForm();
        if (onClose) onClose();
        return true;
      } catch (error) {
        console.error(error);
        actions.setSubmitting(false);
        return false ;
      }
    };
  };