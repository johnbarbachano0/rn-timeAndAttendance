import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { dateTimeConverter } from "../components/misc";

export const useHistory = (menuId) => {
  const [data, setData] = useState();
  const historyHeaders = [
    {
      id: 1,
      name: "createdAt",
      label: "Date",
      isNum: false,
      multiline: true,
      textAlign: "center",
      renderCell: (row) => {
        return dateTimeConverter(row);
      },
      style: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
    },
    {
      id: 2,
      name: "action",
      label: "Action",
      isNum: false,
      multiline: true,
      textAlign: "center",
      style: { flex: 1.5, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 3,
      name: "message",
      label: "Message",
      isNum: false,
      multiline: true,
      textAlign: "center",
      style: { flex: 1.5, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 4,
      name: "actions",
      label: "Actions",
      isNum: false,
      multiline: false,
      renderCell: (row) => (
        <IconButton
          icon="eye"
          color="green"
          size={20}
          onPress={() => setData({ ...row, type: "view" })}
        />
      ),
      style: { flex: 0.5, alignItems: "center", justifyContent: "center" },
    },
  ];

  return { data, setData, historyHeaders };
};
