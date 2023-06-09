import { ButtonProps, Button, Tooltip } from "@chakra-ui/react";

interface ModalIconButtons extends ButtonProps {
  icon: JSX.Element;
  tooltipLabel: string;
  onClick: () => void;
}

const ModalIconButton: React.FC<ModalIconButtons> = ({
  icon,
  tooltipLabel,
  onClick,
  ...props
}) => {
  return (
    <Tooltip label={tooltipLabel} openDelay={1000}>
      <Button
        bg="emerald"
        border="none"
        color="white"
        _hover={{ bg: "emerald" }}
        onClick={onClick}
        {...props}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ModalIconButton;
