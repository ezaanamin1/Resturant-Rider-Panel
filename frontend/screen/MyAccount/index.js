import React, { useEffect, useState } from 'react';
import {View, StyleSheet,Text,Image,TextInput, TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import {BACKEND} from "@env"
import CustomButton from '../../component/CustomButton';
import SwitchToggle from 'react-native-switch-toggle';
import CustomButton2 from '../../component/CustomButton2';
import InputField from '../../component/InputField';
const MyAccount = ({ navigation }) => {
    const {user,toggleState, setToggleState,RiderData}=useContext(UserContext)  
 

    useEffect(()=>{

      console.log(toggleState)

    },[toggleState])
    return (
        <View style={[styles.container]}>

            <Image
                source={require("../../assets/profile_pic.png")}
                style={{height: 100, width:100, borderRadius: 100, alignSelf: 'center',marginBottom:10}}
              />
        
  <Text style={styles.heading}>{user.name}</Text>
  <Text style={{marginBottom:10}}>{user.email}</Text>
  <CustomButton2  onPress={()=> navigation.navigate('Profile')} borderRadius={50} label={"Edit Profile"} width={200}/>



        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
heading:{
    fontSize:30,

    textAlign:"center",
    marginBottom:10,
},
name:{
    textAlign:"center"
},
input: {
    height: 50,
    margin: 12,
    width:300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#282c34',
    padding: 10,
    borderRadius: 5,
    width:300,
    textAlign:"center",

  },
  buttonText:{
    textAlign:"center",
    color:"#7fa142"
  },
  leftAlignText: {
    textAlign: "left",
  },

})

export default MyAccount;
