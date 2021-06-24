import React , {Component} from 'react';
import { Text, View, StyleSheet , Font} from '@react-pdf/renderer';
import Infomation from './infomation';
import ServiceHeader from './serviceheader';
import ServiceRow from './servicerow';

import RobotoFont from './fonts/Roboto-Regular.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';
import RobotoBold from './fonts/Roboto-Regular.ttf';

const formatVal = val => new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "vnd"
}).format(val)

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400
    },
    {
      src: RobotoMedium,
      fontWeight: 500
      
    },
    {
      src: RobotoBold,
     fontWeight: 700
    }
  ],
});

const styles = StyleSheet.create({
  tieccuoi:{
    fontWeight: 400,
    fontFamily: 'Roboto',
    fontSize: 25,
  },
  regular:{
    fontWeight: 400,
    fontFamily: 'Roboto',
  },
  page:{
    width: '21cm',
    margin: 12,
    fontSize: 13,
  },
  tomato:{
    backgroundColor: 'tomato'
  },
  green: {
    color: 'white'
  },
  header: { 
    height: '3cm',
    width : '100%',
    flexDirection: 'row',
  },
      header_left:{
          flexGrow: '2',
          left: 0,
          fontSize: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '12'
      },
      header_right:{
          flexGrow: '1',
          backgroundColor: 'white',
          padding: '1cm 1cm'
      },
  container:{
    marginTop: 24,
    paddingLeft: 12,
    paddingRight: 12,
  },
  footer:{
    flexDirection: 'row',
    marginTop: 24,
    paddingLeft: 12
  },
      note:{
          width: '60%',
      },
      money:{
          width: '40%',
      },
});

class invoice extends Component {
  constructor(props){
      super(props);
      this.state = {
          id: props.bill.id,
          dateOfPayment: convertDateToStringDMY(props.bill.dateOfPayment),

          groomName : props.bill.feast.groomname,
          brideName : props.bill.feast.bridename,
          phone : props.bill.feast.phone,
          weddingDate: convertDateToStringDMY(props.bill.feast.dateOfOrganization),

          totalTablePrice: formatVal(props.bill.totalTablePrice),
          totalServicePrice: formatVal(props.bill.totalServicePrice),
          totalBill: formatVal(props.bill.totalBill),
          deposit: formatVal(props.bill.feast.deposit),
          fine: formatVal(props.bill.totalFine),
          unpaidMoney:formatVal(props.bill.unpaidMoney),
      // 
          services : props.bill.service
      }
  }
   render(){
      
      var elemServiceRow = this.state.services.map((services,index) =>{ // render service, H 
          return (
              <ServiceRow 
                  key = {services.service.id}
                  index = {(index + 1)}
                  name = { services.service.name}
                  quantity = { services.count}
                  unitprice = { services.unitPrice}
                  total = { services.totalPrice}
                  />
          )
      });

      return (
         <View style= {styles.page}>
            <View className="header" style= { styles.header}>
                <View style= { styles.header_left}>
                    <Text style={ styles.tieccuoi }>Hóa đơn tiệc cưới</Text>
                    
                </View>
                
                <View className="id-NgayThanhToan" style = {styles.header_right}>
                  <Text style={ styles.regular }>Số hóa đơn: {this.state.id} </Text>
                  <Text style={ styles.regular }>Ngày thanh toán: {this.state.dateOfPayment}</Text>
                </View>
            </View>
            <View style= { styles.container }>
                <Infomation 
                  groomName = {this.state.groomName}
                  brideName = {this.state.brideName}
                  phone = {this.state.phone}
                  weddingDate = {this.state.weddingDate}
                />
            </View>
            <View style= { styles.container }>
                <ServiceHeader />
                { elemServiceRow}
            </View>
            <View style= { styles.footer }>
                <View style={ styles.note}>
                    <Text style={ styles.regular }>Ghi chú: { this.state.note}</Text>
                </View>
                <View style={ styles.money}>
                    <Text style={ styles.regular }>Tổng tiền bàn: { this.state.totalTablePrice}</Text>
                    <Text style={ styles.regular }>Tổng tiền dịch vụ { this.state.totalServicePrice}</Text>
                    <Text style={ styles.regular }>Tổng tiền hóa đơn: { this.state.totalBill}</Text>
                    <Text style={ styles.regular }>Tiền đặt cọc: { this.state.deposit}</Text>
                    <Text style={ styles.regular }>Tiền Phạt: { this.state.fine}</Text>
                    <Text style={ styles.regular }>Còn lại: { this.state.unpaidMoney}</Text>
                </View>
            </View>
            
         </View> 
    );
  }
}

export default invoice;

function convertDateToStringDMY(date) {
    if (date == null) return;
        let day = date.substring(8, 10);
        let month = date.substring(5, 7);
        let year = date.substring(0, 4);
        let result = day + "/" + month + "/" +  year;
        return result;
}
