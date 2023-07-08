import { Button, ButtonProps } from "@chakra-ui/react";

interface Props extends ButtonProps {
  label: string;
  colorVariant: string;
  action: () => void;
  drawerOnClose: () => void;
}

const DrawerButton: React.FC<Props> = ({
  label,
  colorVariant,
  action,
  drawerOnClose,
}) => (
  <Button
    w="100%"
    variant={colorVariant}
    onClick={() => {
      drawerOnClose();
      setTimeout(action, 200);
    }}
  >
    {label}
  </Button>
);

export default DrawerButton;
