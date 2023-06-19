import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalWrapper: React.FC<Props> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={900} w="100%" borderTopRadius="lg">
          <Flex
            bg="emerald"
            borderTopRadius="md"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={4}
          >
            <Text fontSize="3xl" color="white">
              {title}
            </Text>
            <Button
              bg="emerald"
              border="none"
              color="white"
              size="xl"
              _hover={{ bg: "emerald" }}
              onClick={onClose}
            >
              <FaTimes size={30} />
            </Button>
          </Flex>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
