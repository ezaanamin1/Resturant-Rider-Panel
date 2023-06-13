import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import { UserContext } from '../../context/context';
import { useContext } from 'react';
import DashboradButton from '../../component/DashboradButton';
import { useState,useEffect } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
const DashBorad = () => {

  

    const {user,RiderData}=useContext(UserContext)
  


    const [allorders,SetAllOrders]=useState(0)
    const [route,SetRoute]=useState(0)
    const [assignedOrders,SetassignedOrders]=useState(0)

    const data = {
        labels: user.monthlyData.map(item => item.month),
        datasets: [
          {
            data: user.monthlyData.map(item => item.totalOrders),
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Line color
            strokeWidth: 2, // Line width
          },
        ],
      };

    
useEffect(()=>{
  const route = RiderData.filter(item => item.status =="On Route");
  const assigned=RiderData.filter(item=>item.status=="assigned")
  SetAllOrders(RiderData.length)
  SetRoute(route.length)
  SetassignedOrders(assigned.length)
  //console.log(RiderData[0])
//console.log(route)

},[])

const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0',
      strokeWidth: '0',
      stroke: '#ffa726',
    },
    drawGridLines: false, // Hide grid lines
  };


    return (
  <View style={styles.container}>


    <Text style={{position:"absolute", top:30,left:10,fontSize:30,fontWeight:"bold"}}>DASHBOARD</Text>

<View style={styles.item}>
<DashboradButton name={"assignment"}   label={assignedOrders.toString()}  status={"assigned Orders"}/>


</View>

<View style={styles.item}>

<DashboradButton name={"alt-route"}  label={route.toString()} status={" On Route "}/>

</View>


<View style={styles.item}>

<DashboradButton name={"delivery-dining"} label={route.toString()} status={" Delivered Orders "}/>

</View>

<View style={styles.item}>
<DashboradButton name={"fastfood"} label={allorders.toString()} status={" All  Orders "}/>


</View>
<Text style={{marginBottom:20,fontWeight:"bold",fontSize:20}}>Total Orders</Text>


<LineChart
        data={data}
        width={400} // Width of the chart
        height={200} // Height of the chart
       chartConfig={chartConfig}

       
      />


  </View>


    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       justifyContent:"center",
       alignContent:"center",
       flexDirection:"row",
       flexWrap:"wrap"

    },
    item:{
        flexBasis:"50%",
        marginBottom:10
    }



})

export default  DashBorad;
