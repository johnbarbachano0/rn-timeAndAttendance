import React, { useState } from "react";
import { isApple } from "../constants/isApple";
import { dateConverter, timeConverter } from "./misc";
import { Modal, Portal, TextInput, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import ErrorText from "./ErrorText";

const DatePicker = ({
  type,
  label,
  disabled,
  error,
  value,
  onChange,
  display,
  maximumDate,
  minimumDate,
  ...props
}) => {
  const { colors, dark } = useTheme();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(value));

  const handleDateChange = (event, val) => {
    const value = val || new Date();
    setShow(isApple);
    setDate(value);
    onChange(value);
  };

  const handleCalendar = () => {
    setShow((prev) => !prev);
  };

  const handleDisplay = () => {
    const isDate = type === "date";
    return isDate ? dateConverter(date) : timeConverter(date);
  };

  return (
    <>
      <TextInput
        mode="outlined"
        label={label}
        placeholder={label}
        error={error ? true : false}
        value={handleDisplay()}
        autoCapitalize={"words"}
        dense={true}
        disabled={disabled}
        editable={false}
        right={
          <TextInput.Icon
            name="calendar"
            onPress={handleCalendar}
            disabled={disabled}
          />
        }
        {...props}
      />

      {show && isApple && (
        <Portal>
          <Modal
            visible={show}
            onDismiss={() => setShow(false)}
            contentContainerStyle={[
              styles.containerStyle,
              dark && { backgroundColor: colors.surface },
            ]}
          >
            <DateTimePicker
              value={date}
              mode={type}
              display={display ? display : "spinner"}
              onChange={handleDateChange}
              style={styles.picker}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          </Modal>
        </Portal>
      )}

      {show && !isApple && (
        <DateTimePickerAndroid
          value={date}
          mode={type}
          display={display ? display : "default"}
          onChange={handleDateChange}
          style={styles.picker}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {error && (
        <ErrorText style={{ width: "100%" }}>
          &#x26A0; {error?.message}
        </ErrorText>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    fontSize: 20,
    padding: 10,
    color: "black",
  },
  picker: {
    width: "100%",
    position: "relative",
    left: 0,
  },
  containerStyle: { backgroundColor: "white", margin: 20 },
});
