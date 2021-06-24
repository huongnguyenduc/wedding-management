import React , {Component} from 'react';
import { Page, Text, View, Document, StyleSheet , Font} from '@react-pdf/renderer';


import RobotoFont from './fonts/Roboto-Regular.ttf';
import RobotoMedium from './fonts/Roboto-Medium.ttf';
import RobotoBold from './fonts/Roboto-Bold.ttf';


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

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container:{
        marginTop: 12,
        flexDirection: 'row'
    },
    grid:{
        flexGrow: 1,
        
    },
    regular:{
        fontFamily: 'Roboto',
        fontWeight: 400,
    }
});

class infomation extends Component {
    constructor(props){
        super(props);
        this.state = {
            groomName : this.props.groomName,
            brideName : this.props.brideName,
            phone : this.props.phone,
            weddingDate : this.props.weddingDate
        }
    }
   render(){
      return (
        <View style={styles.container}>
            <View style= { styles.grid}>
              <Text style= { styles.regular }>Khu phố 6, phường Linh Trung</Text>
                <Text style= { styles.regular }>Quận Thủ Đức</Text>
                <Text>01234546789</Text>
               <Text>uit@gm.uit.edu.vn</Text>
          </View>
          <View style= { styles.grid}>
               <Text style= { styles.regular }>Chú rể: {this.state.groomName}</Text>
               <Text style= { styles.regular }>Cô dâu: {this.state.brideName}</Text>
               <Text style= { styles.regular }>Số điện thoại:{this.state.phone}</Text>
               <Text style= { styles.regular }>Ngày đãi tiệc:{this.state.weddingDate} </Text>
            </View>
        </View>
    );
  }
  
}

export default infomation;

//
