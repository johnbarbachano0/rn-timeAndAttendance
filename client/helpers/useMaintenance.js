import React, { useState } from "react";
import { IconButton } from "react-native-paper";

export const useMaintenance = (menuId) => {
  const [data, setData] = useState();

  const maintenanceHeaders =
    menuId === 9
      ? [
          {
            id: 1,
            name: "role",
            label: "Role",
            isNum: false,
            multiline: false,
            style: { flex: 1, alignItems: "center", justifyContent: "center" },
          },
          {
            id: 2,
            name: "permission",
            label: "Permission",
            isNum: false,
            multiline: false,
            style: { flex: 2, alignItems: "center", justifyContent: "center" },
          },
          {
            id: 3,
            name: "status",
            label: "Status",
            isNum: false,
            multiline: false,
            renderCell: (val) => (val === true ? "Active" : "Inactive"),
            style: { flex: 1, alignItems: "center", justifyContent: "center" },
          },
          {
            id: 4,
            name: "actions",
            label: "Actions",
            isNum: false,
            multiline: false,
            renderCell: (row) => (
              <IconButton
                icon="circle-edit-outline"
                color="green"
                size={20}
                onPress={() => setData({ ...row, type: "edit" })}
              />
            ),
            style: { flex: 1, alignItems: "center", justifyContent: "center" },
          },
        ]
      : [
          {
            id: 1,
            name: menuId === 5 ? "fullname" : "id",
            label: menuId === 5 ? "Fullname" : "Id",
            isNum: false,
            multiline: false,
            style: {
              flex: menuId === 5 ? 1.5 : 0.5,
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: 2,
            name: menuId === 5 ? "username" : "title",
            label: menuId === 5 ? "Username" : "Title",
            isNum: false,
            multiline: false,
            style: { flex: 2, alignItems: "center", justifyContent: "center" },
          },
          {
            id: 3,
            name: "status",
            label: "Status",
            isNum: false,
            multiline: false,
            renderCell: (val) => (val === true ? "Active" : "Inactive"),
            style: { flex: 1, alignItems: "center", justifyContent: "center" },
          },
          {
            id: 4,
            name: "actions",
            label: "Actions",
            isNum: false,
            multiline: false,
            renderCell: (row) => (
              <IconButton
                icon="circle-edit-outline"
                color="green"
                size={20}
                onPress={() => setData({ ...row, type: "edit" })}
              />
            ),
            style: { flex: 1, alignItems: "center", justifyContent: "center" },
          },
        ];

  return { data, setData, maintenanceHeaders };
};
