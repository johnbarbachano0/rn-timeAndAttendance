import React from "react";
import { Text } from "react-native";

const ErrorText = (props) => {
  return (
    <Text
      {...props}
      style={{
        color: "red",
        fontFamily: "roboto-italic",
        fontSize: 16,
        paddingTop: 0,
        textAlign: "left",
        width: "100%",
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );
};

export default ErrorText;
