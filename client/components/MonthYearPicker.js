import React, { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { months } from "../constants/Months";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const MonthYearPicker = ({ showDialog, setShowDialog, date, onSelect }) => {
  const { month, year } = date;
  const { colors } = useTheme();
  const [selMonth, setSelMonth] = useState(month);
  const [selYear, setSelYear] = useState(year);
  const years = [year, year - 1, year - 2];

  const hideDialog = () => setShowDialog(false);

  const handleDone = () => {
    onSelect(selMonth, selYear);
    hideDialog();
  };

  return (
    <Portal>
      <Dialog visible={showDialog} onDismiss={hideDialog}>
        <Dialog.Title>Filter</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Picker
            selectedValue={selMonth}
            onValueChange={(value) => setSelMonth(value)}
            style={styles.picker}
            itemStyle={{ color: colors.text }}
          >
            {months.map((mon) => (
              <Picker.Item key={mon.id} label={mon.name} value={mon.id} />
            ))}
          </Picker>
          <Picker
            selectedValue={selYear}
            onValueChange={(value) => setSelYear(value)}
            style={styles.picker}
            itemStyle={{ color: colors.text }}
          >
            {years.map((yr, index) => (
              <Picker.Item key={index} label={JSON.stringify(yr)} value={yr} />
            ))}
          </Picker>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleDone}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MonthYearPicker;

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 0,
  },
  picker: {
    flex: 1,
  },
});
