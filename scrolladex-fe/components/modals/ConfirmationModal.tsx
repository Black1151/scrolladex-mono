import React from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import ModalWrapper from "./ModalWrapper";

interface ConfirmationModalProps {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  isOpen,
  onClose,
  title = "Confirmation",
  message = "Are you sure?",
}) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      titleBarColor="xanthous"
      maxWidth={600}
    >
      <VStack spacing={6} py={4}>
        {message}
      </VStack>
      <HStack mt={4} justifyContent="flex-end">
        <Button variant="red" onClick={onClose} flex={1}>
          Cancel
        </Button>
        <Button
          variant="green"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          flex={1}
        >
          Confirm
        </Button>
      </HStack>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
