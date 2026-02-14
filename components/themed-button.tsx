import { Pressable } from "react-native";
import {
  useRestyle,
  spacing,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
} from "@shopify/restyle";

import Text from "@/components/themed-text";
import Box from "./box";
import { Theme } from "@/theme";

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
};

const Button = ({ onPress, label, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <Pressable onPress={onPress}>
      <Box
        backgroundColor={"primary"}
        paddingVertical={"s"}
        paddingHorizontal={"m"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={5}
        {...props}
      >
        <Text variant="button">{label}</Text>
      </Box>
    </Pressable>
  );
};

export default Button;
