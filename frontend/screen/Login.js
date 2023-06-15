import { View, Text,Image,StyleSheet,TextInput, TouchableOpacity } from 'react-native'

import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import React, { useContext,useEffect } from 'react'
import { UserContext } from '../context/context';
import {BACKEND} from "@env"
import io from "socket.io-client"
import InputField from '../component/InputField';
import CustomButton from "../component/CustomButton"
import CustomButton2 from '../component/CustomButton2';

const Login = ({ navigation }) => {
  


  const socket=io.connect("http://192.168.7.216:9000/");

  socket.on('connection', data => {


    console.log(data)
 

  });




  const {SetUser,RiderData,SetRiderData}=useContext(UserContext)
  const [error,SetError]=useState("")
 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  useEffect(()=>{

    socket.on('message', data => {
      SetRiderData(data)
      
      });


},[socket])


  const handleClick = async (email,password1) => {

    const response = await axios.post(`http://192.168.7.216:9000/riders/login`, {email:email,password:password1})
  

    .catch((error) => console.log('Error: ', error))
    if(response.data!='Wrong password' || response.data!='Wrong username')
    {
      // console.log(response.data.information)
      SetUser(response.data.information)
      socket.emit('customEventName', response.data.information._id);


      navigation.navigate('About')
    }
    if(response.data=="Password is incorrect" || response.data=='Wrong email')
    {
      SetError(response.data)
      navigation.navigate('Home')
    }


  }
  return (
    <View style={styles.container} > 
   
      <Image    style={{ width: 200, height: 200, alignSelf: 'center' }}
      source={require("../assets/Logo.png")}/> 
      
      <Text style={styles.heading} >Ride with Amin's Restaurant: A Taste Adventure on Wheels</Text>

      <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        //console.log(values);
        handleClick(values.email,values.password)
        // console.log("hiii")
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View> 
          {/* <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            style={styles.input}
          />
          {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
          {error?
       <Text style={styles.error}>{error}</Text>:
       null
       }
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
          {error?
       <Text style={styles.error}>{error}</Text>:
       null
       }
          <Text style={styles.reset}>Reset your password</Text>

      <TouchableOpacity  onPress={handleSubmit} style={styles.button} >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> */}
    <InputField
  label="Email"
  inputType="text"
  keyboardType="email-address"

  fieldButtonFunction={handleSubmit}
  changedText={handleChange('email')}
  handleBlur={handleBlur('email')}
  value={values.email} 
  marginBottom={25}
  
  // Pass the value prop from Formik
/>

{errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
          {error?
       <Text style={styles.error}>{error}</Text>:
       null
       }

<InputField
          label={'Password'}
          fieldButtonFunction={()=>  navigation.navigate("Email Screen")}
          changedText={handleChange('password')}
          handleBlur={handleBlur('password')}
          value={values.password}
          inputType="password"
          marginBottom={25}
          fieldButtonLabel={"Forgot Password ?"}
        />  
               {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
          {error?
       <Text style={styles.error}>{error}</Text>:
       null
       }    

<CustomButton2 borderRadius={50} width={300} switchOn={false} label="Login" onPress={handleSubmit} />

   
 </View>
       )}
       </Formik>
       
          
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
 
   
    

      },
    heading: {
    width:250,
    textAlign:"center",
    position:"relative",
    left:-1
    },
    image: {
      width: 200,     
      height: 200,  
      borderRadius: 10, 
      resizeMode: 'cover', 
      backgroundColor:"white",
      marginTop:125,
      

    },
    input: {
        height: 50,
        margin: 12,
        width:300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        paddingVertical:0
      },
      forgot_password:{
        color:"#7fa142"
      },
      button: {
        backgroundColor: '#7fa142',
        padding: 10,
        borderRadius: 5,
        width:300,
        marginBottom:10,
        position:"relative",
      left:15
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign:"center"
      },
      error:{
        color:"red",
        marginBottom:10
      },
      reset:{
        textAlign:"center"
      }

  });
  
export default Login