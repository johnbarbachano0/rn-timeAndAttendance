import React, { useState, useEffect } from "react";
import { Modal, Portal, TextInput, useTheme } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import CustomInput from "./CustomInput";

const CustomPicker = ({
  error,
  onSelect,
  label,
  loading,
  pickerOptions,
  stylePicker,
  defaultValue,
  disabled,
  ...props
}) => {
  const { colors, dark } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const getValue = (value) =>
    pickerOptions
      .filter((item) => item?.value === value && item?.label)
      ?.shift()?.label;

  const handlePicker = () => setShowPicker((prev) => !prev);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <>
      <CustomInput
        label={label}
        error={error}
        value={
          selected !== null || selected !== undefined ? getValue(selected) : ""
        }
        editable={false}
        onPress={handlePicker}
        disabled={disabled}
        right={
          <TextInput.Icon
            name={`chevron-${showPicker ? "up" : "down"}`}
            onPress={handlePicker}
            disabled={loading || disabled}
          />
        }
        {...props}
      />
      {showPicker && (
        <Portal>
          <Modal
            visible={showPicker}
            onDismiss={() => setShowPicker(false)}
            contentContainerStyle={[
              styles.containerStyle,
              dark && { backgroundColor: colors.surface },
            ]}
          >
            <Picker
              selectedValue={selected}
              onValueChange={(value) => setSelected(value)}
              style={[styles.picker, stylePicker]}
              itemStyle={{ color: colors.text }}
            >
              {pickerOptions.map((item, i) => (
                <Picker.Item key={i} label={item.label} value={item.value} />
              ))}
            </Picker>
          </Modal>
        </Portal>
      )}
    </>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
  },
  containerStyle: { backgroundColor: "white", margin: 20 },
});
