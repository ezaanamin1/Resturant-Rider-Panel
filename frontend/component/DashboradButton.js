import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const DashboradButton = ({label,status,name}) => {
    return (
        <View style={styles.button}>
  <Text style={{marginLeft:15,fontSize:20,fontWeight:"bold",marginTop:10,color:"black",textAlign:"center"}}>{label}</Text>
  <Text style={{marginLeft:15,fontSize:15,color:"black",textAlign:"center"}}>{status}</Text>
  <MaterialIcons name={name} style={{position:"relative",left:82}} color={"black"}  size={30}  />


  {/*



*/}


        </View>
    );
}

const styles = StyleSheet.create({

button:{
    height:150,
    width:180,
    backgroundColor:"#d2e1b7",
    marginLeft:10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2.25,
    shadowRadius: 4,
    borderRadius:50,
    color:"black"


}


})

export default DashboradButton;
