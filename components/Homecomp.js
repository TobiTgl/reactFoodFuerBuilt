import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useCallback} from 'react'
import { View, Text, Button, StyleSheet, TextInput, Modal } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RandomPage from './randomPage';
import AddFoodPage from './addFoodPage';
import { Ionicons } from 'react-native-vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Homecomp(props) {
    
    const [food, setFood] = useState('Nothing');
    const [randomFood, setRandomFood] = useState('Random Food');
    const [foodCategory, setfoodCategory] = useState('Nothing');
    const [foodArr, setFoodArr] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCategoryList, setSelectedCategoryList] = useState('All');
    const [multipleArrs, setSmultipleArrs] = useState([]);
    
    
    useEffect(()=>{localStoreGet()}, [])
    //useEffect(()=>{slotArrPrep()}, [])
    function useForceUpdate(){
        const [value, setValue] = useState(0); // integer state
        return () => setValue(value => value + 1); // update the state to force render
    }

    const Tab = createBottomTabNavigator();

    slotArrPrep=()=>{
        
         
            let arrprep = foodArr.map((n) => n.id)
            
            let multipleArrss = []

            for (let index = 0; index <7; index++) {
            
                arrprep.map((s)=> multipleArrss.push(s) ) 
            }
            setSmultipleArrs(multipleArrss)
    
          
      
       
    }

    insertNewFood=async()=>{
        const foodName = food
        const id = Math.random()
        console.log(id)
        const category = foodCategory
        let newArr = [...foodArr]
    
        newArr.push({id: id, name: foodName, category: foodCategory})
    
        setFoodArr(newArr)
        const arrForStorage = JSON.stringify(newArr)
        try {

            await AsyncStorage.setItem('foodArr', arrForStorage)
            localStoreGet()
            startLoading()
            //alert("Succesfully added " + foodName + "!");
          } catch (e) {
            // saving error
          }
        
    }
    randomFoodFunct =()=>{
        const arrOhneCat = foodArr
        if(selectedCategory !== 'All'){
            const arrayMitCat = arrOhneCat.filter(food => food.category === selectedCategory)
            const rand = Math.floor(Math.random() * arrayMitCat.length) + 1 ;
        setRandomFood(arrayMitCat[rand-1].name)
        }else{
            const rand = Math.floor(Math.random() * arrOhneCat.length) + 1 ;
            setRandomFood(arrOhneCat[rand-1].name)
        }
        

    }

    eingabeAddFood=(text)=>{
        setFood(text)
    }
    eingabeAddCategory=(text)=>{
        setfoodCategory(text)
        if(selectedCategory !== 'All'){
            const arrayMitCat = foodArr.filter(food => food.category === selectedCategory)
        }
        
        //const forceUpdate = useForceUpdate();
    }

    onDeleteClick=async(id)=>{
        const filteredArr = foodArr.filter(food => food.id !== id)
        const delitem = foodArr.filter(food => food.id === id)
        const delName = delitem[0].name
        console.log(delName)
        setFoodArr(filteredArr)
        const arrForStorage = JSON.stringify(filteredArr)
        debugger;
        console.log("vor delete")
        try {        

            await AsyncStorage.setItem('foodArr', arrForStorage)
            debugger;
            localStoreGet()
            startLoading()
            //alert("Succesfully deleted " + delName + "!");
            
          } catch (e) {
            // saving error
          }
    }

    localStore = async ()=>{
        console.log("Local store add")
        try {
            const arr = [{ "id": "1", "name": "HAMBURGOAR",  "category":"Fast Food"}, { "id": "2", "name": "Pizza",  "category":"Fast Food"}]
            const jsonValue = JSON.stringify(arr)
            setFoodArr([{ "id": "2", "name": "test", "category":"test"}])
           
            await AsyncStorage.setItem('foodArr', jsonValue)
            
          } catch (e) {
            // saving error
          }
    }

    localStoreGet=async()=>{
       try {
                const jsonValue = await AsyncStorage.getItem('foodArr')
                const fok = JSON.parse(jsonValue)
                console.log(fok)
                if(fok!== null){
                fok.sort((a, b) => (a.category > b.category) ? 1 : (a.category === b.category) ? ((a.name > b.name) ? 1 : -1) : -1 )
                console.log("get stuff")
                setFoodArr(fok)
                slotArrPrep()
                }
                return jsonValue != null ? JSON.parse(jsonValue) : null;

            } catch(e) {
                // error reading value

                console.log(e)
            }
    }

    setSelectCategry=(itemValue, itemIndex)=>{
        
        setSelectedCategory(itemValue)
        
        
        
        
    }
    setSelectCategryList=async(itemValue, itemIndex)=>{
        
        setSelectedCategoryList(itemValue)
        /*
        const arrOhneCat = foodArr
        if(selectedCategoryList !== 'All'){
            const arrayMitCat = arrOhneCat.filter(food => food.category === selectedCategoryList)
            console.log(arrayMitCat+"filter" + selectedCategoryList)
            setFoodArr(arrayMitCat)
            
        }else{
            try {
                const jsonValue = await AsyncStorage.getItem('foodArr')
                console.log(jsonValue)
                const fok = JSON.parse(jsonValue)
                fok.sort((a, b) => (a.category > b.category) ? 1 : (a.category === b.category) ? ((a.name > b.name) ? 1 : -1) : -1 )
                console.log(jsonValue+"sorted")
                setFoodArr(fok)
                
                return jsonValue != null ? JSON.parse(jsonValue) : null;
            } catch(e) {
                // error reading value

                console.log(e)
            }
            
        }
        */
    }
    

    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                activeTintColor: 'green',
                style: {
                backgroundColor: '#000000',
                
                                }}}
            lazy={false}                
                                >
                <Tab.Screen  
                    name="Random Food"
                      
                    options={{ 
                    tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="random" color={color} size={size} />)
                }}>
                    {
                        props=> 
                            <RandomPage
                                {...props}
                                multipleArrs = {multipleArrs}
                                foodArr={foodArr}
                                food = {food}
                                key={multipleArrs}
                                randomFood = {randomFood}
                                onRandomClick = {randomFoodFunct}
                                onInsertNewFood = {insertNewFood}
                                localStore = {localStore}
                                localStoreGet = {localStoreGet}
                                selectedCategory = {selectedCategory}
                                setSelectCategry={setSelectCategry}
                            >

                            </RandomPage>
                    }
                
                </Tab.Screen>
                <Tab.Screen  
                    name="Add Food"
                    
                    options={{ 
                    tabBarIcon: ({ color, size }) => (
                    <Entypo name="add-to-list" color={color} size={size} />)
                }}>
{
                        props=> 
                            <AddFoodPage
                                {...props}
                                foodArr={foodArr}
                                food = {food}
                                key={multipleArrs}
                                randomFood = {randomFood}
                                onRandomClick = {randomFoodFunct}
                                onInsertNewFood = {insertNewFood}
                                onTypeFood = {eingabeAddFood}
                                onTypeCategory = {eingabeAddCategory}
                                onDeleteClick = {onDeleteClick}
                                selectedCategory = {selectedCategory}
                                setSelectCategryList={setSelectCategryList}
                                
                            >

                            </AddFoodPage>
                    }
                
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    )
}
