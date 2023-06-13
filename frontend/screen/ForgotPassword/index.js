import React, { useState } from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import InputField from '../../component/InputField';
import CustomButton2 from '../../component/CustomButton2';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik'
import { UserContext } from '../../context/context';
import { useContext } from 'react';
const ForgetPassword = () => {

    const {Email}=useContext(UserContext)


const validationSchema = Yup.object().shape({
    password: Yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match!"),

  });


  const handleClick = async (email,password) => {

    const response = await axios.post(`http://192.168.7.205:9000/riders/change`, {email:email,password:password})
  

    // .catch((error) => console.log('Error: ', error))
    if(response.data=="Sucess")
    {
        navigation.navigate('Home')
    }
    else
    {
      
    }



  }

    return (
        <View style={styles.container}>
              <Image    style={{ width: 100, height: 100, alignSelf: 'center',marginTop:20 }}
      source={require("../../assets/forget.png")}/> 
<Text style={styles.heading}>Recover your password by initiating a search for forgotten passwords.</Text>

<Formik
      initialValues={{ password: '',confirmPassword:''}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        //console.log(values);
        handleClick(Email,values.password)
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
          label={'Password'}
          changedText={handleChange('password')}
          handleBlur={handleBlur('password')}
          value={values.password}
          inputType="password"
          marginBottom={25}
        />  

         {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}
   
            <InputField
          label={' Confirm  Password'}
          changedText={handleChange('confirmPassword')}
          handleBlur={handleBlur('confirmPassword')}
          value={values.confirmPassword}
          inputType="password"
          marginBottom={25}
        />  
            


{errors.confirmPassword && touched.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

        

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

export default ForgetPassword;
