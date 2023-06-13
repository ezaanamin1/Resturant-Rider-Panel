import React from 'react';
import {View, StyleSheet,Text, TouchableOpacity,Image} from 'react-native';

const OrderButton = ({label,status,onPress}) => {
    return (
        <TouchableOpacity
        onPress={onPress}

        style={{marginBottom:20,width:300,height:70,marginLeft:10,marginRight:10,}}
        
            >
               <Image    style={{ width: 100, height: 100,position:"relative",bottom:15 }}
      source={require("../assets/Logo.png")}/>   

      <Text style={{position:"relative",bottom:80,left:100,fontWeight:"bold",fontSize:20}}>
        Order# {label}
        
        </Text>

    <View style={{position:"relative",left:250,bottom:110,backgroundColor:"#282c34",width:80,height:40}}>

    <Text style={{textAlign:"center",color:"#7fa142"}}> Order Details</Text>  

    </View>



    




      
                </TouchableOpacity>
      );
}


const styles = StyleSheet.create({})

export default OrderButton;
