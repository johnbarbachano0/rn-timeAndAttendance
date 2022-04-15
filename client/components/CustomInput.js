import React from "react";
import ErrorText from "./ErrorText";
import { TextInput } from "react-native-paper";

const CustomInput = ({
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
        label={label}
        placeholder={label}
        error={error ? true : false}
        value={value}
        onChangeText={onChange}
        maxLength={50}
        autoCapitalize={"words"}
        dense={true}
        {...props}
      />
      {error && (
        <ErrorText style={{ width: "100%" }}>
          &#x26A0; {error?.message}
        </ErrorText>
      )}
    </>
  );
};

export default CustomInput;
