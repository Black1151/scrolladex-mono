// useErrorToast.tsx
import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();

  const showErrorToast = (description: string) => {
    toast({
      title: "Error",
      description,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  return showErrorToast;
};

export const useSuccessToast = () => {
  const toast = useToast();

  const showSuccessToast = (description: string) => {
    toast({
      title: "Success",
      description,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return showSuccessToast;
};
