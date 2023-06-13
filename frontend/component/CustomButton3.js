import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { useState } from 'react';



const CustomButton3 = ({label,onPressFunction,orderStatus1,orderStatus}) => {


    return (
        <TouchableOpacity
        onPress={onPressFunction}
        
            >
              <Text
                style={{
                  marginRight:25,
                  color:orderStatus==orderStatus1?"#7fa142":"grey",
                  fontWeight:orderStatus==orderStatus1?"bold":"normal",
                  textDecorationLine:orderStatus==orderStatus1?"underline":"none"
                }}
              >
               {label}
                </Text>
                </TouchableOpacity>
      );
}


export default CustomButton3;
