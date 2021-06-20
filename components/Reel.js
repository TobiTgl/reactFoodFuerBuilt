import React, {useState, useEffect, Component} from 'react'
import { render } from 'react-dom'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'
import Symbol from './Symbol'

export default class Reel extends Component {
    constructor(props) {
        super(props)

        /*prepSlotArr = () =>{
            return props.foodArr.map((n) => n.id)
        }*/

        //this.foodArrForSlotPrep = prepSlotArr()
        //this.multipleArrs = []
          
       /* for (let index = 0; index <5; index++) {
            
            this.foodArrForSlotPrep.map((s)=> this.multipleArrs.push(s) ) 
        }
        */
        this.textHeight = 40;
        this.position = (this.props.foodArr.length) - 4.5
        this.currentScrollPos = (this.props.multipleArrs.length-13.5) * 40 * -1;
        this.state = {
            scrollPos: new Animated.Value(this.currentScrollPos),  
        }
    
    }

    
    scrollByOffset=(offset) => {
        console.log("currentposition0=" + this.position)
        console.log("currentcurrentScrollPos0=" + this.currentScrollPos)
        this.currentScrollPos = this.currentScrollPos + (40*offset)
        this.position = this.position - offset
        console.log("currentposition1=" + this.position)
        console.log("currentcurrentScrollPos1=" + this.currentScrollPos)
        
        Animated.timing(
            this.state.scrollPos, 
            {
                toValue: this.currentScrollPos,
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.inOut(Easing.cubic)
            }
        ).start(()=>{})

        if( (((this.props.multipleArrs.length - (this.props.multipleArrs.length - (this.currentScrollPos/40)+ (this.props.foodArr.length))) *40) < (this.props.multipleArrs.length-13.5) * 40 * -1)){
        
            this.position = ((10-2)*10)+ this.position
            this.currentScrollPos = (this.props.multipleArrs.length - (this.props.multipleArrs.length - (this.currentScrollPos/40))) *40
        setTimeout(()=> this.state.scrollPos.setValue(this.currentScrollPos), 2100)
        }else if ((((this.props.multipleArrs.length - (this.props.multipleArrs.length - (this.currentScrollPos/40)+ (this.props.foodArr.length))) *40) > 0)){
            
            this.position = ((10-2)*10)+ this.position
            this.currentScrollPos = (this.props.multipleArrs.length-13.5) * 40 * -1;
            setTimeout(()=> this.state.scrollPos.setValue(this.currentScrollPos), 2100)
        }else{
            
            this.position = ((10-2)*10)+ this.position
            this.currentScrollPos = (this.props.multipleArrs.length - (this.props.multipleArrs.length - (this.currentScrollPos/40)+ (this.props.foodArr.length))) *40
            setTimeout(()=> this.state.scrollPos.setValue(this.currentScrollPos), 2100)
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Animated.View style={{width:'100%', height:'100%', transform: [{translateY: this.state.scrollPos}]}}>
                    {this.props.multipleArrs.map((el, idx) => {
                    return <Symbol foodArr={this.props.foodArr} multipleArrs={this.props.multipleArrs} symbol={el} key={idx} index={idx} width={'100%'} height={this.textHeight}/>
                    })}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        height: '100%',
        width: '100%',
        borderWidth: 0,     
        marginLeft: 0,   
        borderColor: 'black',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    element: {
        height: 40,
        width: '100%',
        
        alignItems: 'center',
        justifyContent: 'center',
    }
})