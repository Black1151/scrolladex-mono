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
  titleBarColor?: string;
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
  titleBarColor = "emerald",
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
            bg={titleBarColor}
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
                bg={titleBarColor}
                border="none"
                color="white"
                size="xl"
                _hover={{ bg: titleBarColor }}
                onClick={onClose}
                pl={4}
              >
                <FaTimes size={30} />
              </Button>
            </Flex>
          </Flex>
          <ModalBody py={4} bg={bg} borderTopRadius="lg">
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWrapper;
