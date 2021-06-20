import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet,  } from 'react-native'

export default function Symbol(props) {

    const [foodSpin, setFoodSpin] = useState('RandomFoodHook')

    useEffect(()=> {getText()}, [])

    

    /*getText = () => {
        switch (props.symbol){
            case "B":
                setFoodSpin("Burger")
                break;
            case "C":
                setFoodSpin("Chips")
                break;
            case "X":
                setFoodSpin("Xylophon")
                break;
            case "D":
                setFoodSpin("Deine Mum")
                break;
            case "L":
                setFoodSpin("Lol")
                break;
            case "M":
                setFoodSpin("Melone")
                break;
            case "O":
                setFoodSpin("Orange")
                break;
            case "P":
                setFoodSpin("Pflaume")
                break;
             case "7":
                setFoodSpin("Nummer 7")
                break;
            case "S":
                setFoodSpin("Spätzle")
                break;
            default:
                setFoodSpin("Random Food")

        }
    }*/


    getText = () => {

        for (let index = 0; index < props.multipleArrs.length; index++) {
            
            const arrIndex = props.foodArr.findIndex((s) => s.id == props.symbol)
           
            try{
            if (props.foodArr[arrIndex].id != undefined){
            switch (props.symbol){
                case props.foodArr[arrIndex].id:
                    return props.foodArr[arrIndex].name
                    break;
                case props.foodArr[index].id:
                    return props.foodArr[index].name
                    break;
                default:
                    return "Random Food"
            }
            }
        }catch (e) {
            //console.log(e)
        }
        }

       
    }
    let text = getText()

    return (
        
        <View style={styles.container}>
            <Text style={{fontSize:40, color:'white'}} key={text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    }
})