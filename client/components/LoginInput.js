import React from "react";
import { TextInput } from "react-native-paper";
import ErrorText from "./ErrorText";

const LoginInput = ({
  error,
  label,
  value,
  onChange,
  icon,
  iconColor,
  ...props
}) => {
  return (
    <>
      <TextInput
        style={props.style}
        mode="outlined"
        placeholder={label}
        error={error ? true : false}
        value={value}
        onChangeText={onChange}
        maxLength={50}
        autoCapitalize={"none"}
        left={<TextInput.Icon name={icon} color={iconColor} />}
        {...props}
      />
      {error && (
        <ErrorText style={{ width: "80%" }}>
          &#x26A0; {error?.message}
        </ErrorText>
      )}
    </>
  );
};

export default LoginInput;
