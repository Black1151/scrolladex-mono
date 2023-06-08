import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const theme = extendTheme({
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
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
