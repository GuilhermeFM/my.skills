import React from "react";

import { Button, ButtonText } from "./styles";

interface ButtomProps {
  children: React.ReactNode;
}

export default function ({ children, ...rest }: ButtomProps) {
  return (
    <Button {...rest}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
}
