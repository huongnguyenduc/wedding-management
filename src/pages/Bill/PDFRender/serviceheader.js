import React , {Component} from 'react';
import {  Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import RobotoFont from './fonts/Roboto-Regular.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';
import RobotoBold from './fonts/Roboto-Regular.ttf';

const borderColor = '#90e5fc';

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
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        flexGrow: 1,
    },
    index: {
        width: '8.33%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    name: {
        width: '31.77%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    quantity: {
        width: '16.77%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    unitprice: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    total: {
        width: '23.34%',   
    },
    regular:{
        fontWeight: 400,
        fontFamily: 'Roboto',
    }
  });   

class ServiceHeader extends Component {
  
   render(){
      return (
        <View style={styles.container}>
            <View style= {styles.index } > 
                <Text style={ styles.regular}>STT</Text>
            </View>
            <View style= {styles.name } > 
                <Text style={ styles.regular}>Dịch vụ</Text>
            </View>
            <View style= {styles.quantity } > 
                <Text style={ styles.regular}>Số lượng</Text>
            </View>
            <View style= {styles.unitprice } > 
                <Text style={ styles.regular}>Đơn Giá</Text>
            </View>
            <View style= {styles.total } > 
                <Text style={ styles.regular}>Thành Tiền</Text>
            </View>
        </View>
    );
  }
}

export default ServiceHeader;

//
