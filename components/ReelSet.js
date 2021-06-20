import React, {useState, useEffect, Component} from 'react'
import { render } from 'react-dom'
import { View, Text, StyleSheet, Image } from 'react-native'
import Reel from './Reel'


export default class ReelSet extends Component {
    constructor(props) {
        super(props)
        this.reels=[]

       
     
    }

    randomBetween = (min,max) =>{
        return Math.floor(Math.random() * (max-min +1) +min)
    }

    spin = ()=> {
        console.log(this.randomBetween(50, 200))
     
        this.reels[0].scrollByOffset(this.randomBetween(20, 50))
    }

    renderReels =()=>{
        let reelList = Array.apply(null, Array(1)).map((el, idx) => {
            return <Reel buttonSet={this.props.buttonSet} multipleArrs = {this.props.multipleArrs} foodArr={this.props.foodArr} width={'90%'}  key={idx} index={idx} ref= {(ref) => {this.reels[idx] = ref}} selectedCategory = {this.props.selectedCategory}></Reel>
        })

        return(
            <>
            {reelList}
            </>
        )

    }

    render(){
    

    return (
        <View style={styles.container}>
            
            {this.renderReels()}
            
        </View>
    )
    }


}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 160,
        width: '90%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
       
        
        
        
    },
    pic: {
       height: '100%',
       width: '100%',
       overflow: 'hidden',
        
    }
})