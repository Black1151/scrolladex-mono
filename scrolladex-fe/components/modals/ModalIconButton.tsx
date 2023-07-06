import { ButtonProps, Button, Tooltip } from "@chakra-ui/react";

interface ModalIconButtons extends ButtonProps {
  icon: JSX.Element;
  tooltipLabel?: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  bg?: string;
  hover?: object;
}

const ModalIconButton: React.FC<ModalIconButtons> = ({
  icon,
  tooltipLabel,
  onClick,
  bg = "emerald",
  hover = { bg: "emerald" },
  ...props
}) => {
  return (
    <Tooltip label={tooltipLabel} openDelay={500}>
      <Button
        bg={bg}
        border="none"
        color="white"
        _hover={hover}
        onMouseDown={onClick}
        {...props}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ModalIconButton;
