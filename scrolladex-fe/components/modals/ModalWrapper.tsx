import React, { useEffect, useRef } from "react";
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
import ModalIconButton from "./ModalIconButton";

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  fitContent?: boolean;
  bg?: string;
  maxWidth?: number | string | Array<number | string | null>;
  extraButtons?: Array<{
    icon: React.ReactElement;
    tooltipLabel?: string;
    onClick: () => void;
  }>;
}

const ModalWrapper: React.FC<Props> = ({
  title,
  children,
  isOpen,
  onClose,
  fitContent = false,
  bg = "white",
  maxWidth = 1000,
  extraButtons = [],
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const modalContentProps = fitContent ? {} : { maxW: maxWidth };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent {...modalContentProps} borderTopRadius="lg">
          <Flex
            bg="emerald"
            borderTopRadius="md"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={4}
          >
            <Text fontSize="2xl" color="white">
              {title}
            </Text>
            <Flex>
              {extraButtons.map((button, index) => (
                <ModalIconButton {...button} key={index} />
              ))}
              <Button
                ref={closeButtonRef}
                bg="emerald"
                border="none"
                color="white"
                size="xl"
                _hover={{ bg: "emerald" }}
                onClick={onClose}
                pl={4}
              >
                <FaTimes size={30} />
              </Button>
            </Flex>
          </Flex>
          <ModalBody py={8} bg={bg}>
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
