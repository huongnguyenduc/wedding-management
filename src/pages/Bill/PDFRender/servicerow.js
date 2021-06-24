import React , {Component} from 'react';
import { Text, View, StyleSheet, Font} from '@react-pdf/renderer';

import RobotoFont from './fonts/Roboto-Regular.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';
import RobotoBold from './fonts/Roboto-Regular.ttf';
import NumberFormat from 'react-number-format';



Font.register({
  family: 'Roboto',
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
    }
  ]
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        height: 24,
    },
    index: {
        width: '8.33%',   
    },
    name: {
        width: '16.77%',   
    },
    quantity: {
        width: '16.77%',  
    },
    unitprice: {
        width: '25%',
    },
    total: {
        width: '33.34%', 
    },
    regular:{
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
  });   

class ServiceRow extends Component {
   render(){
      return (
        <View style={styles.container}>
            <View style={styles.index}>
                <Text> { this.props.index } </Text>
            </View>
            <View style={styles.name}>
                <Text style= { styles.regular }> { this.props.name } </Text>
            </View>
            <View style={styles.quantity}>
                <Text> { this.props.quantity } </Text>
            </View>
            <View style={styles.unitprice}>
                <Text> <NumberFormat value={this.props.unitprice} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} /> </Text>
            </View>
            <View style={styles.total}>
                <Text> <NumberFormat value={this.props.total} displayType={'text'} thousandSeparator={true} suffix={' đ'} style={{marginLeft: "-2px"}} /> </Text>
            </View>
        </View>
    );
  }
  
}

export default ServiceRow;
            //<Text style={styles.index}>{ this.props.index }</Text>
            //<Text style={styles.name}>{ this.props.name }</Text>
            //<Text style={styles.quantity}>{ this.props.quantity }</Text>
            //<Text style={styles.unitprice}>{ this.props. unitprice }</Text>
            //<Text style={styles.total}>{ this.props.total }</Text> 
//
