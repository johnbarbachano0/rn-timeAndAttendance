import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMaintenanceData } from "../features/MaintenanceSlice";
import { useGetMaintenanceQuery } from "../services/MaintenanceService";
import AppLoading from "expo-app-loading";
import fetchFonts from "../constants/Fonts";

const LoadApp = ({ onLoad }) => {
  const { data, error, isLoading } = useGetMaintenanceQuery({
    uid: "",
    query: "",
    type: "",
  });
  const [fetchFontError, setFetchFontError] = useState(false);
  const dispatch = useDispatch();

  const setMaintenance = () => dispatch(setMaintenanceData(data));

  const getfont = async () =>
    await fetchFonts().catch((error) => setFetchFontError(true));

  useEffect(() => {
    getfont();
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      setMaintenance();
      onLoad(false);
    }
  }, [data]);

  if (error || fetchFontError || isLoading) {
    onLoad(true);
  }

  return <AppLoading />;
};

export default LoadApp;
