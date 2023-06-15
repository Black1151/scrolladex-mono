import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

interface OutcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error";
  bodyText: string;
}

const OutcomeModal: React.FC<OutcomeModalProps> = ({
  isOpen,
  onClose,
  status,
  bodyText,
}) => {
  const bgColor = useColorModeValue(
    status === "success" ? "green.500" : "red.500",
    status === "success" ? "green.200" : "red.200"
  );
  const color = useColorModeValue("white", "gray.800");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor} color={color}>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="whiteAlpha" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OutcomeModal;
