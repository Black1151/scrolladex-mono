import React, { useRef } from "react";
import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

interface ConfirmationModalProps {
  onConfirm: () => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  isOpen,
  onClose,
  title = "Confirmation",
  message = "Are you sure?",
}) => {
  const closeButtonRef = useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={closeButtonRef}>
      <ModalOverlay />
      <ModalContent borderTopRadius="lg">
        <Flex
          bg="xanthous"
          borderTopRadius="md"
          justifyContent="space-between"
          alignItems="center"
          px={6}
          py={4}
        >
          <Text fontSize="3xl" color="white">
            {title}
          </Text>
          <IconButton
            aria-label="Close"
            onClick={onClose}
            ref={closeButtonRef}
            icon={<FaTimes size={30} />}
            bg="xanthous"
            border="none"
            color="white"
            _hover={{ bg: "xanthous" }}
            _focus={{ outline: 0, borderColor: "white" }}
          />
        </Flex>
        <ModalBody>
          <Text fontSize="xl" mb={6}>
            {message}
          </Text>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
