import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function InputField({
    label,
    icon,
    inputType,
    keyboardType,
    fieldButtonLabel,
    fieldButtonFunction,
    changedText,
    handleBlur,
    value,
    marginBottom,
    textAlign
  }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom:   marginBottom,
          width: 300,
          marginTop: 10,
        }}
      >
        {icon}
        {inputType === 'password' ? (
          <TextInput
            onBlur={handleBlur}
            placeholder={label}
            keyboardType={keyboardType}
            onChangeText={changedText}
            style={{ flex: 1, paddingVertical: 0,textAlign:textAlign }}
            secureTextEntry={true}
            value={value}
         
          />
        ) : (
          <TextInput
            placeholder={label}
            keyboardType={keyboardType}
            onChangeText={changedText}
            onBlur={handleBlur}
            style={{ flex: 1, paddingVertical: 0,textAlign:textAlign }}
            value={value}
          />
        )}
        <TouchableOpacity onPress={fieldButtonFunction}>
          <Text style={{ color: '#282c34', fontWeight: '700' }}>
            {fieldButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  