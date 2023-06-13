import React from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity } from 'react-native';
import { UserContext } from '../../context/context';
import { useContext } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../../component/InputField';
import CustomButton2 from '../../component/CustomButton2';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';




const Profile = ({ navigation }) => {

    const validationSchema = yup.object({
        password: yup.string().required('Password is required'),
        confirmPassword: yup.string().when('password', {
          is: (val) => val && val.length > 0,
          then: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
        }),
      });



  const handleClick = async (email,username,phone) => {

    const response = await axios.post('http://192.168.7.205:9000/riders/update', {email:email,username:username,phone:phone,id:user._id})
    .catch((error) => console.log('Error: ', error))
    console.log(response.data)
 

  }

    const {user}=useContext(UserContext)
  
    const [userName,SetUserName]=useState(user.name)
    const[phone,SetPhone]=useState(user.phone.toString())
    const [email,SetEmail]=useState(user.email)



    return (
        <View style={styles.container}>
        <Text style={styles.heading}>Edit Profile</Text>
 
      <Image  source={require("../../assets/profile_pic.png")} style={{ width: 200, height: 200,borderRadius:150  }} />
    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 10 }}>
    </TouchableOpacity>
 
    <Formik
      initialValues={{email:email, username: userName, phone:phone}}
      onSubmit={(values) => {
        // console.log(values);
        handleClick(values.email,values.username,values.phone)
        //  console.log("hiii")
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
  label="UserName"
  inputType="text"

  fieldButtonFunction={handleSubmit}
  changedText={handleChange('username')}
  handleBlur={handleBlur('username')}
  value={values.username} 
  marginBottom={25}
  
  // Pass the value prop from Formik
/>

{errors.username && touched.username && <Text style={styles.error}>{errors.username}</Text>}
      

<InputField
  label="email"
  inputType="text"

  fieldButtonFunction={handleSubmit}
  changedText={handleChange('email')}
  handleBlur={handleBlur('email')}
  value={values.email} 
  marginBottom={25}
  
  // Pass the value prop from Formik
/>

            

<InputField
          label={'Phone'}
          fieldButtonFunction={handleSubmit}
          changedText={handleChange('phone')}
          handleBlur={handleBlur('phone')}
          value={values.phone}
        
          marginBottom={25}
        />  


<CustomButton2 borderRadius={50} width={300} onPress={()=>  navigation.navigate("Email Screen")} switchOn={false} label="Change Password"  />

   

<CustomButton2 borderRadius={50} width={300} switchOn={false} label="Update User" onPress={handleSubmit} />

   
 </View>
       )}
       </Formik>
       

        </View>
    );
}

const styles = StyleSheet.create({

    heading:{
        marginTop:20,
        fontSize:30,
        marginBottom:10,
        fontWeight:"bold"

    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   
     
      
  
        },

})

export default Profile;
