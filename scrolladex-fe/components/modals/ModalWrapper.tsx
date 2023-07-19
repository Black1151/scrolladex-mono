import React, { useEffect, useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  Text,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Box,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
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
  const modalContentProps = fitContent ? {} : { maxW: maxWidth };

  const iconSize = useBreakpointValue([20, 20, 30]);
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <ModalOverlay />
        <ModalContent {...modalContentProps} borderTopRadius="lg">
          <Flex
            bg={titleBarColor}
            borderTopRadius="md"
            justifyContent="space-between"
            alignItems="center"
            px={[4, 6]}
            py={4}
          >
            <Text fontSize={["xl", null, "2xl"]} color="white" isTruncated>
              {title}
            </Text>
            <Flex>
              {!isMobile &&
                extraButtons.map((button, index) => (
                  <ModalIconButton {...button} key={index} />
                ))}
              {!isMobile && (
                <Button
                  bg={titleBarColor}
                  border="none"
                  color="white"
                  size={"xl"}
                  _hover={{ bg: titleBarColor }}
                  onClick={onClose}
                  pl={4}
                >
                  <FaTimes style={{ fontSize: iconSize }} />
                </Button>
              )}
              {isMobile && extraButtons.length > 0 && (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<GiHamburgerMenu />}
                    bg={titleBarColor}
                    border="none"
                    color="white"
                    _hover={{ bg: titleBarColor }}
                  />
                  <MenuList>
                    {extraButtons.map((button, index) => (
                      <MenuItem key={index} onClick={button.onClick}>
                        <HStack spacing={2}>
                          <Box minW={6}>{button.icon}</Box>
                          <Text>{button.tooltipLabel}</Text>
                        </HStack>
                      </MenuItem>
                    ))}
                    <MenuItem onClick={onClose}>
                      <HStack spacing={2}>
                        <Box minW={6}>
                          <FaTimes />
                        </Box>
                        <Text>Close</Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
              {isMobile && extraButtons.length === 0 && (
                <Button
                  bg={titleBarColor}
                  border="none"
                  color="white"
                  size={"xl"}
                  _hover={{ bg: titleBarColor }}
                  onClick={onClose}
                  pl={4}
                >
                  <FaTimes style={{ fontSize: iconSize }} />
                </Button>
              )}
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
