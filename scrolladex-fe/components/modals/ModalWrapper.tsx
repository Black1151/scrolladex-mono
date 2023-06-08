import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

interface Props {
  buttonText: string;
  title: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<Props> = ({ buttonText, title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="green" onClick={onOpen}>
        {buttonText}
      </Button>
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
