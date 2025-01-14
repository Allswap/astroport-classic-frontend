import { getColor } from "@chakra-ui/theme-tools";

const styles = {
  baseStyle: {
    field: {
      fontWeight: "500",
    },
  },
  sizes: {
    lg: {
      field: {
        borderRadius: "xl",
        fontSize: "2xl",
        height: "16",
      },
    },
  },
  variants: {
    brand: (props: Record<string, any>) => {
      const { theme } = props;

      return {
        field: {
          border: "1px solid",
          borderColor: "white.200",
          bg: "black.200",
          color: "white",
          textAlign: "right",
          p: "4",
          pt: "0",
          _hover: {
            borderColor: "brand.purple",
          },
          _disabled: {
            opacity: 0.7,
          },
          _focus: {
            zIndex: 1,
            borderColor: "brand.purple",
            boxShadow: `0 0 0 1px ${getColor(theme, "brand.purple")}`,
          },
          _invalid: {
            borderColor: "red.500",
            boxShadow: `0 0 0 1px ${getColor(theme, "red.500")}`,
          },
        },
      };
    },
  },
};

export default styles;
