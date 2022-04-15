import React from "react";
import { Caption, Surface, TouchableRipple } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomButton = ({
  buttonColor,
  buttonLabel,
  disabled,
  icon,
  iconColor,
  onPress,
  size,
  ...props
}) => {
  return (
    <Surface
      style={[
        props.style,
        { backgroundColor: buttonColor, elevation: 4 },
        disabled && styles.disabled,
      ]}
    >
      <TouchableRipple
        rippleColor="rgba(255, 255, 255, .95)"
        style={styles.ripple}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.button}>
          <Icon name={icon} size={size} color={iconColor} />
          <Caption>{buttonLabel}</Caption>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  ripple: {
    width: "100%",
  },
  disabled: {
    backgroundColor: "#c2c2c2",
  },
});
