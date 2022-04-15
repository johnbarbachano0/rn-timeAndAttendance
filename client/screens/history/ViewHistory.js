import React from "react";
import { Card, Subheading } from "react-native-paper";
import { dateTimeConverter, objectToText } from "../../components/misc";
import { isApple } from "../../constants/isApple";
import { StyleSheet, ScrollView, View } from "react-native";

const ViewHistory = ({ route }) => {
  //Hooks & Constants
  const { data } = route.params;

  const cardData = [
    {
      multiline: true,
      label: "Message",
      value: data?.message,
    },
    {
      multiline: true,
      label: "New Value",
      value: objectToText(data?.newValue),
    },
    {
      multiline: true,
      label: "Previous Value",
      value: objectToText(data?.prevValue),
    },
    {
      multiline: true,
      label: "Error Message",
      value: data?.error,
    },
    { multiline: false, label: "Id", value: data?.id },
    { multiline: false, label: "Action By", value: data?.fullname },
    { multiline: false, label: "Username", value: data?.username },
    {
      multiline: false,
      label: "Created Date",
      value: dateTimeConverter(data?.createdAt),
    },
    {
      multiline: false,
      label: "Updated Date",
      value: dateTimeConverter(data?.updatedAt),
    },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Subheading style={styles.title}>{data?.action}</Subheading>
        {cardData.map((item, i) => {
          return item?.multiline ? (
            <Card style={styles.card} key={i}>
              <Subheading style={{ fontWeight: "bold" }}>
                {item.label}:{" "}
              </Subheading>
              <Subheading>{item.value}</Subheading>
            </Card>
          ) : (
            <View style={styles.textCont} key={i}>
              <Subheading style={{ fontWeight: "bold" }}>
                {item.label}:{" "}
              </Subheading>
              <Subheading>{item.value}</Subheading>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ViewHistory;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  form: {
    flexGrow: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: isApple ? 10 : 5,
    paddingBottom: isApple ? 50 : 5,
    minWidth: isApple ? "95%" : "99%",
    maxWidth: isApple ? "95.01%" : "99.01%",
  },
  card: {
    width: "100%",
    padding: 5,
    paddingBottom: 0,
    marginVertical: 5,
  },
  textCont: { display: "flex", flexDirection: "row" },
  title: { fontWeight: "bold", textAlign: "center", alignSelf: "center" },
});
