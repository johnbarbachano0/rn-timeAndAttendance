import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const LineReport = ({ data, labels }) => {
  return (
    <LineChart
      data={{
        labels,
        datasets: [
          {
            data,
          },
          {
            data: [10], //highest graph value
            withDots: false, //a flage to make it hidden
          },
          {
            data: [0], //highest graph value
            withDots: false, //a flage to make it hidden
          },
        ],
      }}
      width={Dimensions.get("window").width} // from react-native
      height={500}
      verticalLabelRotation={90}
      yAxisSuffix="hr"
      yAxisInterval={1} // optional, defaults to 1
      segments={10}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "1",
          stroke: "#ffa726",
        },
      }}
      style={{
        marginVertical: 8,
      }}
    />
  );
};

export default LineReport;
