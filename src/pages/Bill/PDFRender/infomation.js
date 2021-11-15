import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

import RobotoFont from "./fonts/Roboto-Regular.ttf";
import RobotoMedium from "./fonts/Roboto-Medium.ttf";
import RobotoBold from "./fonts/Roboto-Bold.ttf";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
    {
      src: RobotoMedium,
      fontWeight: 500,
    },
    {
      src: RobotoBold,
      fontWeight: 700,
    },
  ],
});

// const borderColor = '#90e5fc'
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
  },
  grid: {
    flexGrow: 1,
  },
  regular: {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});

function Infomation(props) {
  const state = props.state;
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Text style={styles.regular}>Khu phố 6, phường Linh Trung</Text>
        <Text style={styles.regular}>Quận Thủ Đức</Text>
        <Text>0259636896</Text>
        <Text>uit@gm.uit.edu.vn</Text>
      </View>
      <View style={styles.grid}>
        <Text style={styles.regular}>Chú rể: {state.groomname}</Text>
        <Text style={styles.regular}>Cô dâu: {state.bridename}</Text>
        <Text style={styles.regular}>Số điện thoại:{state.phone}</Text>
        <Text style={styles.regular}>
          Ngày đãi tiệc:{state.dateOfOrganization}{" "}
        </Text>
      </View>
    </View>
  );
}

export default Infomation;

//
