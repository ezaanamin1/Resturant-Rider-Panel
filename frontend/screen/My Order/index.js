import React, { useState } from 'react';
import {View, StyleSheet,Text,ScrollView, Modal,} from 'react-native';
import { useEffect } from 'react';
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import io from "socket.io-client"
import {BACKEND} from "@env"
import {SearchBar} from "react-native-elements";
import CustomButton3 from '../../component/CustomButton3';
import OrderButton from '../../component/OrderButton';
import ModalOrders from '../../component/ModalOrders';



function MyOrders  () {
    const {SetRiderData,current_id,SetCurrentID,RiderData,modal,SetModal,customerdata,SetCustomerData,SetOrderNumber,currentStatus,SetCurrentStatus,orderLength,SetOrdersLength,user}=useContext(UserContext)
    const [orderStatus,SetOrderStatus]=useState(1);
    const socket=io.connect("http://192.168.7.216:9000/");

    const [serachValue,SetSerachValue]=useState("");
    const [assignedOrders,SetAssignedOrders]=useState([])
    const [routeOrders,SetRoutesOrders]=useState([])
    const [delivered,Setdelivered]=useState([])




useEffect(()=>{

  socket.emit('customEventName', current_id);


},[socket])






    const Orders=(data1)=>{
  //console.log(currentStatus)

    

      socket.emit('customers_data', data1);
      SetOrderNumber(data1);
      SetModal(true)






    }

    const hi=()=>{

      console.log(customerdata)

      // const filtered = RiderData.filter(item => item.order_id  == data1);
      // SetOrdersLength(filtered.length)
 
    }


useEffect(()=>{

  if(customerdata.length!=0)
  {
  
  }

},[customerdata])
    


    useEffect(()=>{



      socket.on('customer_data', data => {
   
        SetCustomerData(data[0].customers);
    


    
      });



},[customerdata])



   useEffect(()=>{

    const route = RiderData.filter(item => item.status =="On Route");
  const assigned=RiderData.filter(item=>item.status=="assigned")
  const delivered=RiderData.filter(item=>item.status=="delivered")
  SetAssignedOrders(assigned)
  SetRoutesOrders(route)
  Setdelivered(delivered)



   },[RiderData])




    return (
      <View style={[styles.container]}>
{
  modal?

  <ModalOrders status={currentStatus}/>:
  null

}

<Text style={styles.mainHeader}>My Orders </Text>

<View style={{position:"absolute",top:120}}>
<SearchBar
  inputStyle={{backgroundColor: 'white'}}
  containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 50,width:350}}
  inputContainerStyle={{backgroundColor: 'white'}}
  placeholderTextColor={'#g5g5g5'}
  placeholder={'Search  Order No.'}
  value={serachValue}
  
  onChangeText={(text) => SetSerachValue(text)}


         
        />   
</View>  

<View style={styles.orders}>




{/* <TouchableOpacity
onPress={()=>SetOrderStatus(1)}

    >
      <Text
        style={{
          marginRight:25,
          color:orderStatus==1?"#7fa142":"grey",
          fontWeight:orderStatus==1?"bold":"normal",
          textDecorationLine:orderStatus==1?"underline":"none"
        }}
      >
        Assigned
        </Text>
        </TouchableOpacity> */}

        <CustomButton3 onPressFunction={()=>SetOrderStatus(1) } orderStatus={orderStatus} label={"Assigned"} orderStatus1={1}/>
        <CustomButton3 onPressFunction={()=>SetOrderStatus(2) } orderStatus={orderStatus} label={"On Route"} orderStatus1={2}/>
        <CustomButton3 onPressFunction={()=>SetOrderStatus(3) } orderStatus={orderStatus} label={"Delivered"} orderStatus1={3}/>





</View>




     
        {/* {RiderData.map((item) => (
        <View key={item.id}>
     
          {item.orders.map((subItem, index) => (
            <Text key={index}>{subItem.name}  </Text>
          ))}
          <Text>{item.order_id}</Text>
        </View>
      ))} */}


      <View style={styles.order}>

<ScrollView style={{position:"relative",left:0,top:50,marginBottom:50}}>
{orderStatus==1?

assignedOrders.map((item) => (
  <View key={item.id}>


<OrderButton  onPress={() => { Orders(item.order_id); SetCurrentStatus(item.status); }}  status={item.status} label={item.order_id}/>
  </View>
)):
null


}

{orderStatus==2?

routeOrders.map((item) => (
  <View key={item.id}>


<OrderButton onPress={() => { Orders(item.order_id); SetCurrentStatus(item.status); console.log(customerdata) }}   status={item.status}  label={item.order_id}/>
  </View>
)):
null


}


{orderStatus==3?

delivered.map((item) => (
  <View key={item.id}>


<OrderButton onPress={() => { Orders(item.order_id); SetCurrentStatus(item.status) }}   status={item.status}  label={item.order_id}/>
  </View>
)):
null


}


   

   


</ScrollView> 
      </View>

 
        </View>
    );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  mainHeader:{
fontSize:30,
fontWeight:"bold",
color:"black",
marginBottom:10,
marginTop:10,
position:"absolute",
left:10,
top:50



  },
  orders:{
    display:"flex",
    flexDirection:"row",
    position:"absolute",
    top:220,
    marginRight:25,



  },
  order:{
    borderWidth: 4,
    borderTopColor: '#282c34',
    borderRightColor: '#282c34',
    borderBottomColor: '#282c34',
    borderLeftColor: '#282c34',
    width: 360,
    height: 470,
    position:"relative",
    top:120,
    borderRadius:40,
    marginLeft:10,
    marginRight:10,

  }

})

export default MyOrders;
