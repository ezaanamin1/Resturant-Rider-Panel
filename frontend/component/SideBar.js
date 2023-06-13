
import { Button, View,Text } from 'react-native';


import { StyleSheet } from 'react-native';
import { UserContext } from '../context/context';
import React, { useContext,useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashBorad from '../screen/dashborad';
import ContactCustomer from '../screen/Contact Customer';
import MyAccount from '../screen/MyAccount';

import DrawerContent from './DrawerContent';
import MyOrders from '../screen/My Order';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyProfile from "../screen/MyProfile/index"


const Drawer = createDrawerNavigator();
const Tab=createBottomTabNavigator()
//#0ff0df
const OrdersName = "My Orders";
const dashborad="Dashborad"
const location="Locations"
const account="My Profile"

const SideBar = () => {
    return (
      <Tab.Navigator
      initialRouteName={OrdersName}
     
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === OrdersName) {
            iconName = focused ? 'food' : 'food-outline';

          } else if (rn === dashborad) {
            iconName = focused ? 'view-dashboard-edit-outline' : 'view-dashboard'
            ;

         

          } 
          else if (rn === account) {
            iconName = focused ? 'account' : 'account';
          }
        

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
       
          headerShown: false, // Hide the header for this screen
      
      })}
      tabBarOptions={{
        activeTintColor: '#7fa142',
        inactiveTintColor: '#282c34',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70}
      }}>

      
   

               <Drawer.Screen name={OrdersName} component={MyOrders} />
          <Drawer.Screen name={ dashborad} component={ DashBorad} />
        
          <Drawer.Screen name={account} component={MyProfile} />

</Tab.Navigator>

   
    );
}

const styles = StyleSheet.create({})

export default SideBar;
