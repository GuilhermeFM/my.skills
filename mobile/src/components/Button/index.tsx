import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Button, ButtonText } from "./styles";

interface ButtomProps extends TouchableOpacityProps {
  text: string;
}

export default function ({ text, ...rest }: ButtomProps) {
  return (
    <Button {...rest}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}
