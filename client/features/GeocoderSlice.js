import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: { lat: 0, lon: 0 },
  address: null,
};

export const GeocoderSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocData: (state, action) => {
      const { addr, coord } = action.payload;
      const address = addr
        .map((data) => {
          const streetNo = data?.streetNumber ? `${data?.streetNumber} ` : "";
          const street = data?.street ? `${data?.street}, ` : "";
          const district = data?.district ? `${data?.district}, ` : "";
          const city = data?.city ? `${data?.city}, ` : "";
          const region = data?.region ? `${data?.region}, ` : "";
          const postal = data?.postalCode ? `${data?.postalCode}` : "";
          return streetNo + street + district + city + region + postal;
        })
        .shift();
      state.coords = coord;
      state.address = address;
    },
  },
});

export const { setLocData } = GeocoderSlice.actions;

export default GeocoderSlice.reducer;
