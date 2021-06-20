import React from 'react'
import { View, Text, StyleSheet, Button, TouchableHighlight } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 


export default function FoodListElement(props) {
    return (
        <View style={styles.container}>
            <View style={styles.name}>
                <Text style={{color:'white'} }>{props.foodEle.name}</Text>
            </View>
            <View style={styles.category}>
                <Text style={{color:'white'} }>{props.foodEle.category}</Text>
            </View>
            <TouchableHighlight onPress={()=> {props.onDeleteClick(props.id); props.startLoading()}}>
                <View style={styles.cross} >
                    <Entypo name="circle-with-cross" size={24} color="white" />
                </View>
            </TouchableHighlight>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding:10,
       
        backgroundColor: 'black',
        alignItems: 'center',
       
    },
    name: {
        flex:3
    },
    category: {
        flex:1.5
    },
    cross: {
        flex:0.3
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
      }
    
  });
