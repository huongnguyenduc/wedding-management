import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import Infomation from "./infomation";
import ServiceHeader from "./serviceheader";
import ServiceRow from "./servicerow";
import PromotionHeader from "./promotionheader";
import PromotionRow from "./promotionrow";

import RobotoFont from "./fonts/Roboto-Regular.ttf";
import RobotoMedium from "./fonts/Roboto-Medium.ttf";
import RobotoBold from "./fonts/Roboto-Regular.ttf";

const formatVal = (val) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "vnd",
  }).format(val);

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

const styles = StyleSheet.create({
  tieccuoi: {
    fontWeight: 400,
    fontFamily: "Roboto",
    fontSize: 25,
  },
  regular: {
    fontWeight: 400,
    fontFamily: "Roboto",
  },
  page: {
    width: "21cm",
    margin: 12,
    fontSize: 13,
  },
  tomato: {
    backgroundColor: "tomato",
  },
  green: {
    color: "white",
  },
  header: {
    height: "3cm",
    width: "100%",
    flexDirection: "row",
  },
  header_left: {
    flexGrow: "2",
    left: 0,
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "12",
  },
  header_right: {
    flexGrow: "1",
    backgroundColor: "white",
    padding: "1cm 1cm",
  },
  container: {
    marginTop: 24,
    paddingLeft: 12,
    paddingRight: 12,
  },
  footer: {
    flexDirection: "row",
    marginTop: 24,
    paddingLeft: 12,
  },
  note: {
    width: "60%",
  },
  money: {
    width: "40%",
  },
});

function Invoice(props) {
  const bill = props.bill;
  console.log("aaaa", bill);
  const service = props.service;
  const promotions = props.promotions;
  console.log("aaaaaaaaaaaaaaa", promotions);
  const state = {
    id: bill.id,
    dateOfPayment: convertDateToStringDMY(bill.dateOfPayment),
    groomname: bill.feast.groomname,
    bridename: bill.feast.bridename,
    phone: bill.feast.phone,
    dateOfOrganization: convertDateToStringDMY(bill.feast.dateOfOrganization),
    totalTablePrice: formatVal(bill.totalTablePrice),
    totalServicePrice: formatVal(bill.totalServicePrice),
    totalBill: formatVal(bill.totalBill),
    deposit: formatVal(bill.feast.deposit),
    totalFine: formatVal(bill.totalFine),
    unpaidMoney: formatVal(bill.unpaidMoney),
    regimeRefund: formatVal(
      bill.feast.regimeRefund ? bill.feast.regimeRefund : 0
    ),
    weddingRefund: formatVal(
      bill.feast.weddingRefund ? bill.feast.weddingRefund : 0
    ),
    reasonRefund: bill.feast.reasonRefund,
    services: service,
  };
  var elemServiceRow = state.services.map((services, index) => {
    return (
      <ServiceRow
        key={services.service.id}
        index={index + 1}
        name={services.service.name}
        quantity={services.count}
        unitprice={services.unitPrice}
        total={services.totalPrice}
      />
    );
  });
  var elemPromotionRow = promotions.map((promotion, index) => {
    return (
      <PromotionRow
        key={promotion.regime.id}
        index={index + 1}
        name={promotion.regime.description}
        quantity={promotion.regime.percentage}
        unitprice={promotion.regime.minBillPrice}
        total={promotion.regime.refund}
      />
    );
  });
  return (
    <View style={styles.page}>
      <View className="header" style={styles.header}>
        <View style={styles.header_left}>
          <Text style={styles.tieccuoi}>Hóa đơn tiệc cưới</Text>
        </View>

        <View className="id-NgayThanhToan" style={styles.header_right}>
          <Text style={styles.regular}>Số hóa đơn: {state.id} </Text>
          <Text style={styles.regular}>
            Ngày thanh toán: {state.dateOfPayment}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Infomation state={state} />
      </View>
      <View style={styles.container}>
        <ServiceHeader />
        {elemServiceRow}
      </View>
      <View style={styles.container}>
        <PromotionHeader />
        {elemPromotionRow}
      </View>
      <View style={styles.footer}>
        <View style={styles.note}>
          <Text style={styles.regular}>Ghi chú: {state.note}</Text>
          {state.reasonRefund ? (
            <Text style={styles.regular}>
              Lí do hoàn tiền: {state.reasonRefund}
            </Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.money}>
          <Text style={styles.regular}>
            Tổng tiền bàn: {state.totalTablePrice}
          </Text>
          <Text style={styles.regular}>
            Tổng tiền dịch vụ {state.totalServicePrice}
          </Text>
          <Text style={styles.regular}>
            Tổng tiền hóa đơn: {state.totalBill}
          </Text>
          <Text style={styles.regular}>Tiền đặt cọc: {state.deposit}</Text>
          <Text style={styles.regular}>
            Tiền khuyến mãi: {state.regimeRefund}
          </Text>
          <Text style={styles.regular}>Tiền Phạt: {state.totalFine}</Text>
          <Text style={styles.regular}>Hoàn tiền: {state.weddingRefund}</Text>
          <Text style={styles.regular}>Còn lại: {state.unpaidMoney}</Text>
        </View>
      </View>
    </View>
  );
}

export default Invoice;
// export default invoice;

function convertDateToStringDMY(date) {
  if (date == null) return;
  let day = date.substring(8, 10);
  let month = date.substring(5, 7);
  let year = date.substring(0, 4);
  let result = day + "/" + month + "/" + year;
  return result;
}
