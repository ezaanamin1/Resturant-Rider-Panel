import React, { useState } from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import InputField from '../../component/InputField';
import CustomButton2 from '../../component/CustomButton2';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { UserContext } from '../../context/context';
import { useContext } from 'react';


const SearchEmail = ({navigation}) => {

    const {Email,SetEmail}=useContext(UserContext)


    
const SearchEmail=()=>{

    console.log(email)


}

const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),

  });


  const handleClick = async (email) => {

    const response = await axios.post(`http://192.168.7.205:9000/riders/find`, {email:email})
  

    .catch((error) => console.log('Error: ', error))
    if(response.data.message=="Email Found")
    {
        SetEmail(response.data.email)
        navigation.navigate('Forgot Password')
    }
    else
    {
        navigation.navigate('Home')
    }



  }

    return (
        <View style={styles.container}>
              <Image    style={{ width: 100, height: 100, alignSelf: 'center',marginTop:20 }}
      source={require("../../assets/email_search.png")}/> 
<Text style={styles.heading}>Recover your forgotten password by searching for your email address and regain access to your account.</Text>

<Formik
      initialValues={{ email: ''}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        //console.log(values);
        handleClick(values.email)
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

        

<CustomButton2 borderRadius={50} width={300} switchOn={false} label="Search User" onPress={handleSubmit} />

   
 </View>
       )}
       </Formik>
       
            
        </View>
    );
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
        error:{
            color:"red",
            marginBottom:10
          },

})

export default SearchEmail;
