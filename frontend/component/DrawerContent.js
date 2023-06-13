import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UserContext} from "../context/context"
import { useContext } from 'react';
import {BACKEND} from "@env"

const DrawerContent = (props) => {
    const { user}=useContext(UserContext)

    return (
        <View style={{flex: 1}}>
          <DrawerContentScrollView
            {...props}
            >
       
              <Image
                source={require('../assets/Logo.png')}
                style={{height: 180, width: 180, borderRadius: 40, marginBottom: 10,marginLeft:40}}
              />
    
        
            <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
              
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
          <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
              <View style={{  flex: 1,
    justifyContent: 'flex-start',  alignItems: 'center',
    flexDirection: 'row', }}>
              <Image
                source={{ uri:  BACKEND+`:4000/upload/${user.profile_pic}` }}
                style={{height: 50, width: 50, borderRadius: 40, marginBottom: 10,marginLeft:10,marginRight:10}}
              />
            
            
              </View>
              <Text style={{position:"relative",left:70,bottom:20}}>{user.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
              <View style={{flexDirection: 'row', alignItems: 'center',position:"relative",left:20}}>
                <Ionicons name="exit-outline" size={22} />
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Roboto-Medium',
                    marginLeft: 5,
                  }}>
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
}



export default DrawerContent;
