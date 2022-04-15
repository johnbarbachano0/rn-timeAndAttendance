import React, { useEffect } from "react";
import { capitalize, isDisplay } from "../../components/misc";
import { FAB } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useMaintenance } from "../../helpers/useMaintenance";
import CustomTable from "../../components/CustomTable";

const Maintenance = ({ route, navigation }) => {
  //Hooks & Constants
  const { menuId, title } = route.params;
  const { data, maintenanceHeaders } = useMaintenance(menuId);
  const {
    changeReq,
    modules,
    roles,
    timeLogTypes,
    workStatus,
    permissions,
    permissionRoleTags,
  } = useSelector((state) => state.maintenance.maintenanceData);
  const { allUsers } = useSelector((state) => state.auth);
  const rows =
    menuId === 1
      ? changeReq
      : menuId === 2
      ? modules
      : menuId === 3
      ? roles
      : menuId === 4
      ? timeLogTypes
      : menuId === 5
      ? allUsers
      : menuId === 6
      ? workStatus
      : menuId === 8
      ? permissions
      : menuId === 9
      ? permissionRoleTags
      : [];

  const { accessData } = useSelector((state) => state.maintenance);

  // Listeners
  useEffect(() => {
    data?.type && handleNav(data?.type, data);
  }, [data]);

  //Functions
  const handleNav = (type, dataVal) =>
    navigation.navigate("AddEdit", {
      title: `${capitalize(type)} ${title}`,
      menuId,
      data: dataVal,
    });

  const handleAdd = () => handleNav("add", { type: "add" });

  const handleDisplay = (id) => !isDisplay(id, accessData);

  return (
    <>
      <CustomTable rows={rows} headers={maintenanceHeaders} loading={false} />
      <FAB
        style={[styles.fab, handleDisplay(10) && { display: "none" }]}
        small
        icon="plus"
        onPress={handleAdd}
      />
    </>
  );
};

export default Maintenance;
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    left: 40,
    bottom: 50,
  },
});
