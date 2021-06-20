import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { View, Text, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import FoodListElement from './FoodListElement'
import {Picker} from '@react-native-picker/picker';

import Spinner from 'react-native-loading-spinner-overlay';

export default function AddFoodPage(props) {
    const addTextInput = React.createRef();
    const addCategoryInput = React.createRef();

    //const [loading, setLoading] = useState(false)

    const [loading, setLoading] = useState(false);

    const startLoading = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    /*useEffect(()=> {
        setLoading(true)
    }, [])*/
   
      
    return (
        <View style={styles.container}>
            <Spinner
                //visibility of Overlay Loading Spinner
                visible={loading}
                //Text with the Spinner
                textContent={'Loading...'}
                //Text style of the Spinner Text
                //textStyle={styles.spinnerTextStyle}
        />
           <View style={styles.inputContainer}>
                <TextInput 
                    ref={addTextInput}
                    placeholder={'Enter food here...'}
                    style={{backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, borderRadius:10, color: 'black',height: 40, width:200, marginBottom: 10, alignSelf: 'center',}}
                    onChangeText={(text)=> props.onTypeFood(text)}
                    onSubmitEditing={()=> {props.onInsertNewFood();addTextInput.current.clear(); addCategoryInput.current.clear()}}
                    
                    >
                
                </TextInput>
                <TextInput 
                    ref={addCategoryInput}
                    placeholder={'Enter category here...'}
                    style={{backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, borderRadius:10, color: 'black',height: 40, width:200, marginBottom: 10, alignSelf: 'center',}}
                    onChangeText={(text)=> props.onTypeCategory(text)}
                    onSubmitEditing={()=> {props.onInsertNewFood();addCategoryInput.current.clear(); addCategoryInput.current.clear()}}
                    
                    >
                
                </TextInput>
                
                <Button color="green" title="Add new food" onPress={()=>{ props.onInsertNewFood(); addTextInput.current.clear(); addCategoryInput.current.clear(); startLoading()}}></Button>
            </View>
            <View style={styles.headingContainer}>
                <View style={styles.headingName}>
                    <Text style={{color:'white', fontSize:16}}>Name:</Text>
                </View>
                <View style={styles.headingCategory}>
                    <Text
                    style={styles.picker}
                    
                    >
                        Category:
                    </Text>
                </View>
            </View>
            <ScrollView>
            {props.foodArr.map(s=><FoodListElement foodEle= {s} style={styles.foodContainer }key={s.id} id={s.id} name={s.name}  onDeleteClick={props.onDeleteClick} startLoading={startLoading}></FoodListElement>)}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 10,
      backgroundColor: 'black',
    
    },
    foodContainer:{
        backgroundColor: 'white',
        
    },
    inputContainer:{
       marginTop: 50,
       padding:50
       
        
    },
    headingContainer: {
        flexDirection: 'row',
        padding:10,
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'black',       
    },
    headingName:{
        alignItems: 'flex-start',
        flex:3,
        fontSize: 20,
        color:'white'
    },
    headingCategory:{
        alignItems: 'flex-start',
        flex:2,
        color:'white'
    },
    picker:{
        color: 'white',
    
       
       
        fontSize: 16,
      

    },
    gradient: {
        ...StyleSheet.absoluteFillObject
      },
    spinnerTextStyle: {
        color: '#FFF',
      },
  });
