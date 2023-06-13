import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from "./screen/About"
import { UserContext } from './context/context';
import React, { useEffect, useState } from 'react';
import MyAccount from './screen/MyAccount';
import { themeContext } from './context/theme';
import Profile from './screen/MyProfile';
import ModalOrders from './component/ModalOrders';
import ForgotPassword from "./screen/ForgotPassword/index"
import SearchEmail from './screen/ForgotPassword/SearchEmail';
const Stack = createNativeStackNavigator();

export default function App() {



  const [user,SetUser]=useState([])
  const [RiderData,SetRiderData]=useState([])
  const [toggleState, setToggleState] = useState(false);
  const [OrderNumber,SetOrderNumber]=useState(0)
  const [modal,SetModal]=useState(false);
  const [customerdata,SetCustomerData]=useState([]);
  const [currentStatus,SetCurrentStatus]=useState("")
  const [Email,SetEmail]=useState("")


  const  value={user,SetUser,RiderData,SetRiderData,toggleState, setToggleState,modal,SetModal,customerdata,SetCustomerData,OrderNumber,SetOrderNumber,currentStatus,SetCurrentStatus,Email,SetEmail}

  return (   
  <UserContext.Provider value={value}>
    <NavigationContainer  > 
   
    <Stack.Navigator >
   

      <Stack.Screen   options={{ headerShown: false }}
 name="Home" component={Login} />

      <Stack.Screen options={{ headerShown: false }} name="About" component={About} />
      <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
      <Stack.Screen options={{ headerShown: false }} name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen options={{ headerShown: false }} name="Email Screen" component={SearchEmail} />


  
    </Stack.Navigator>
  </NavigationContainer>    
  </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});