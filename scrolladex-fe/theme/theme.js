import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const theme = extendTheme({
  breakpoints: {
    base: "375px",
    sm: "620px",
    md: "730px",
    lg: "900px",
    xl: "1090px",
    xxl: "1420px",
    xxxl: "1850px",
  },
  colors,
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  fontWeights: {
    thin: 100,
    normal: 300,
    medium: 400,
    bold: 700,
  },
  components: {
    Text: {
      baseStyle: {
        fontWeight: "normal",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderWidth: "1px",
      },
      variants: {
        green: {
          color: "white",
          borderColor: "emerald",
          backgroundColor: "emerald",
          _hover: {
            color: "emerald",
            backgroundColor: "white",
          },
        },
        blue: {
          color: "white",
          borderColor: "pictonBlue",
          backgroundColor: "pictonBlue",
          _hover: {
            color: "pictonBlue",
            backgroundColor: "white",
          },
        },
        orange: {
          color: "white",
          borderColor: "xanthous",
          backgroundColor: "xanthous",
          _hover: {
            color: "xanthous",
            backgroundColor: "white",
          },
        },
        red: {
          color: "white",
          borderColor: "bittersweet",
          backgroundColor: "bittersweet",
          _hover: {
            color: "bittersweet",
            backgroundColor: "white",
          },
        },
      },
    },
  },
});

export default theme;
