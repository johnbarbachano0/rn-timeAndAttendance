import React, { useState } from "react";
import { LoginIcon, LogoutIcon } from "../constants/Icons";
import { timeConverter } from "../components/misc";

export const useTimelog = () => {
  const [data, setData] = useState();

  const timelogHeaders = [
    {
      id: 1,
      name: "date",
      label: "Date",
      isNum: false,
      style: { flex: 2, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 2,
      name: "TimeLogTypeId",
      label: "Type",
      isNum: false,
      width: 30,
      renderCell: (type) =>
        type === 1 ? (
          <LoginIcon color="green" size={16} />
        ) : (
          <LogoutIcon color="red" size={16} />
        ),
      style: { flex: 1, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 3,
      name: "datetime",
      label: "Time",
      isNum: false,
      renderCell: (time) => timeConverter(time),
      style: { flex: 2, alignItems: "center", justifyContent: "center" },
    },
    {
      id: 4,
      name: "location",
      label: "Location",
      isNum: false,
      multiline: true,
      textAlign: "center",
      style: {
        display: "flex",
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
      },
    },
  ];
  return { data, setData, timelogHeaders };
};
