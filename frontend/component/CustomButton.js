import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import { useState } from 'react';
import { UserContext } from '../context/context';
import { useContext } from 'react';
export default function CustomButton({label, onPress,width,switchOn}) {

  const { toggleState, setToggleState}=useContext(UserContext)


  const onToggle = () => {
    setToggleState(!toggleState);
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#282c34',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        color: '#7fa142',
        width: width,
        flexDirection: switchOn ? 'row' : null,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#7fa142',
          marginRight: 12,
        }}
      >
        {label}
      </Text>
      
      {switchOn ? (
        <SwitchToggle
          containerStyle={{
            width: 72,
            height: 22,
            borderRadius: 16,
            padding: 5,
            backgroundColor: '#ccc',
          }}
          circleStyle={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: 'white',
          }}
          switchOn={toggleState}
          onPress={onToggle}
          circleColorOff="gray"
          circleColorOn="green"
          duration={300}
        />
      ) : null}
    </TouchableOpacity>
  );


}