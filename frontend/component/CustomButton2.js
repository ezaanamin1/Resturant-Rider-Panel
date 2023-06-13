import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { useState } from 'react';



const CustomButton2 = ({label, onPress,width,borderRadius}) => {


    return (
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: '#282c34',
            padding: 10,
            borderRadius: 10,
            marginBottom: 30,
            color: '#7fa142',
            width: width,
            borderRadius:borderRadius
         
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: '#7fa142',
              marginRight: 12,
            }}
          >
            {label}
          </Text>
          
    
        </TouchableOpacity>
      );
}


export default CustomButton2;
