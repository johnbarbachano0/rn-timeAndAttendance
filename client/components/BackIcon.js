import React from "react";
import { IconButton } from "react-native-paper";

const BackIcon = ({ onPress }) => {
  return <IconButton icon="arrow-left" size={20} onPress={onPress} />;
};

export default BackIcon;
