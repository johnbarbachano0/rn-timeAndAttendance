import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keysDidShow, setKeysDidShow] = useState(false);
  const [keysDidHide, setKeysDidHide] = useState(false);
  const [keysWillShow, setKeysWillShow] = useState(false);
  const [keysWillHide, setKeysWillHide] = useState(false);

  function onKeyboardDidShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
    setKeysDidShow((prev) => !prev);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
    setKeysDidHide((prev) => !prev);
  }

  function onKeyboardWillShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
    setKeysWillShow((prev) => !prev);
  }

  function onKeyboardWillHide() {
    setKeyboardHeight(0);
    setKeysWillHide((prev) => !prev);
  }

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);
    Keyboard.addListener("keyboardDidHide", onKeyboardDidHide);
    Keyboard.addListener("keyboardWillShow", onKeyboardWillShow);
    Keyboard.addListener("keyboardWillHide", onKeyboardWillHide);
    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", onKeyboardDidShow);
      Keyboard.removeAllListeners("keyboardDidHide", onKeyboardDidHide);
      Keyboard.removeAllListeners("keyboardWillShow", onKeyboardWillShow);
      Keyboard.removeAllListeners("keyboardWillHide", onKeyboardWillHide);
    };
  });

  return {
    keyboardHeight,
    keysDidShow,
    keysWillShow,
    keysWillHide,
    keysDidHide,
  };
};
