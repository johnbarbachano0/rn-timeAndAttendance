import React, { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { isDisplay } from "../../components/misc";
import { useSelector } from "react-redux";
import MenuList from "../../components/MenuList";

const Reports = ({ navigation }) => {
  //Hooks & Constants
  const { accessData } = useSelector((state) => state.maintenance);
  const handleDisplay = (id) => !isDisplay(id, accessData);
  const menu = [
    {
      id: 1,
      title: "Duration Report",
      icon: "timer-sand",
      style: handleDisplay(13) && { display: "none" },
    },
  ].sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

  //Functions
  const handleNav = (title, id) =>
    navigation.navigate("DurationReport", { title, menuId: id });

  //Backhandler
  const handleBack = () => navigation.goBack();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <MenuList lists={menu} onNav={handleNav} />
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
