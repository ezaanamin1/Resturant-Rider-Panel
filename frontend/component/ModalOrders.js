import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,TouchableOpacity,Image} from 'react-native';
import { UserContext } from '../context/context';
import { useContext } from 'react';
import axios from 'axios';
import { AntDesign } from 'react-native-vector-icons';
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';


import {BACKEND} from "@env"

const ModalOrders = ({status}) => {

  const [name,SetName]=useState("")
  const [address,SetAddress]=useState("")


  useEffect(()=>{

    

    if(customerdata.length!=0)
    {
      SetName(customerdata[0].name)
      SetAddress(customerdata[0].address)
    }



  },[customerdata])
    const {modal,SetModal,OrderNumber,customerdata,orderLength}=useContext(UserContext)

    const convertAddressToCoordinates = async () => {
      try {
        const encodedAddress = encodeURIComponent(customerdata.address);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
        );
  
        if (response.data.length > 0) {
          const result = response.data[0];
          const { lat, lon } = result;
         console.log(lat,lon)
         const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
         Linking.canOpenURL(url)
         .then(supported => {
           if (supported) {
             return Linking.openURL(url);
           } else {
             //console.log("Cannot open Google Maps.");
           }
          })

         
        } else {
          //console.log('No coordinates found for the address');
        }
      } catch (error) {
        //console.error('Error converting address to coordinates:', error);
      }
    };  



    const handleSucess = async () => {

      const response = await axios.post(`http://192.168.7.205:9000/riders/accept`, {order_number:OrderNumber})
      // .catch((error) => console.log('Error: ', error))
      if(response.data=="Sucess")
      {
        SetModal(!modal)
      }
  
  
  
  
    }
    const handleReject = async () => {

      const response = await axios.post(`http://192.168.7.205:9000/riders/reject`, {order_number:OrderNumber})
      // .catch((error) => console.log('Error: ', error))
      if(response.data=="Sucess")
      {
        SetModal(!modal)
      }
  
  
  
    }

    const handleOrder = async () => {
  
      const response = await axios.post(`http://192.168.7.205:9000/riders/route`, {order_number:OrderNumber})
      // .catch((error) => console.log('Error: ', error))


      if(response.data=="Sucess")
      {
        SetModal(!modal)
      }
  
  
  
    }

    return (
      <View style={styles.centeredView}>

        <Modal

        
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {SetModal(!modal);}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={()=>SetModal(false)} style={styles.closeButton} >
          <Icon
            name="close"
            type="antdesign"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        <Image    style={{ width: 100, height: 100, alignSelf: 'center' }}
      source={require("../assets/Logo.png")}/> 
              <Text style={styles.modalText}>


<Text style={styles.heading}>Order's Details</Text>


              </Text>
              <View>

<Text>Number of Orders: {orderLength}</Text>

<Text>Customers Name: {name}</Text>
<Text style={{marginBottom:10}}>Customers Address: {address}</Text>

</View>

              <View style={{display:"flex",flexDirection:"row",marginLeft:22}}>

              { status=="assigned"?
              <View style={{display:"flex",flexDirection:"row",marginLeft:22}}>

                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>handleSucess()}>
  
  
                  <Text style={styles.textStyle}>Accept Order</Text>
                </Pressable>
  
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() =>handleReject()}>
                  <Text style={styles.textStyle}>Reject Order</Text>
                </Pressable>
                </View>


:null

                }


                {
                  status=="On Route"?

                  <View style={{display:"flex",flexDirection:"row",marginLeft:22}}>

                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() =>handleOrder()}>
  
  
                  <Text style={styles.textStyle}>Order Completed</Text>
                </Pressable>
  
                <Pressable
                  style={[styles.button, styles.buttonRoute]}
                  onPress={() =>convertAddressToCoordinates()}>
                  <Text style={styles.textStyle}>Show Route</Text>
                </Pressable>
                </View>

                  :null

                }


{ status=="delivered"?
        null

:null

                }
          
              </View>
            </View>
          </View>
        </Modal>
   
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    heading:{
textAlign:"center",
fontSize:20,

    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },

    closeButton: {
      position: 'absolute',
      top: 10,
      left: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginRight:22
    },
    buttonOpen: {
      backgroundColor: '#ff0000',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },

    buttonRoute:{
      backgroundColor:"#7fa142"

    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });




export default ModalOrders;
