import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{
  constructor(){
    super();
    this.state={
      hasCameraPermissions : null,
      scanned :false,
      scannedData:'',
      buttonState:'normal'
    }
  }
  getCameraPermissions=async ()=>{
    const {status} =await Permissions.askAsync(Permissions.CAMERA)
    //asking the permissions on the phone
    //{status} is a predefined variable therefore in {}
    this.setState({hasCameraPermissions:status==="granted",buttonState:'clicked',scanned:false})
    //changing the s
  }
handleBarcodeScanned=async({type,data})=>{
this.setState({scanned:true,scannedData:data,buttonState:normal})
}
    render(){
      const hasPermissions= this.state.hasCameraPermissions
      const scanner = this.state.scanned;
      const buttonState = this.state.buttonState;
      if (buttonState==="clicked"&& hasPermissions){
        return (
          <BarCodeScanner onBarCodeScanned={scanner?undefined:this.handleBarcodeScanned}
          style= {StyleSheet.absoluteFillObject}
          />
        )
      }
      else if(buttonState==='normal'){
        return(
            <View style={styles.container}>
                <Image 
style={styles.imageIcon}
source={require('scanner.png')}
/>
                <TouchableOpacity style = {styles.scanButton} 
                onPress = {this.getCameraPermissions}>
                 
                <Text style={styles.buttonText} >Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
      }
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    imageIcon:{
      width:150,
      height:150,
      marginLeft:85,
      marginTop:40
    },
  });
