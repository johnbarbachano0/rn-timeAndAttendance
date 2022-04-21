import React, { useState } from "react";
import { dateConverter, timeConverter } from "../components/misc";
import { IconButton } from "react-native-paper";
import { LoginIcon, LogoutIcon } from "../constants/Icons";
import { isApple } from "../constants/isApple";

export const useChangeRequest = () => {
  const [data, setData] = useState();
  const changeReqHeaders = [
    {
      id: 1,
      name: "date",
      label: "Date",
      renderCell: (date) => dateConverter(date),
      isNum: false,
      multiline: false,
      style: { flex: 0.75, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 2,
      name: "datetime",
      label: "Time",
      renderCell: (date) => timeConverter(date),
      isNum: false,
      multiline: false,
      style: { flex: 0.75, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 3,
      name: "TimeLogTypeId",
      label: "Type",
      renderCell: (type) =>
        type === 1 ? (
          <LoginIcon color="green" size={16} />
        ) : (
          <LogoutIcon color="red" size={16} />
        ),
      isNum: false,
      multiline: false,
      style: { flex: 0.25, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 4,
      name: "changeReqStatus",
      label: "Status",
      isNum: false,
      multiline: false,
      style: { flex: 0.75, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 5,
      name: "actions",
      label: "Actions",
      isNum: false,
      multiline: false,
      renderCell: (row) => (
        <IconButton
          icon="circle-edit-outline"
          color="green"
          size={20}
          style={{ display: "flex", position: "relative", top: 20 }}
          onPress={() => setData({ ...row, type: "edit" })}
        />
      ),
      style: { flex: 0.5, alignItems: "center", justifyContent: "center" },
    },
  ];

  const approvalsHeaders = changeReqHeaders.map((item) => {
    if (item.id === 2) {
      return {
        id: 2,
        name: "changeReqStatus",
        label: "Status",
        isNum: false,
        multiline: false,
        style: { flex: 1, alignItems: "center", justifyContent: "center" },
      };
    }
    if (item.id === 4) {
      return {
        id: 4,
        name: "fullname",
        label: "Name",
        isNum: false,
        multiline: false,
        style: { flex: 1, alignItems: "center", justifyContent: "center" },
      };
    }
    return item;
  });

  return { data, setData, changeReqHeaders, approvalsHeaders };
};
