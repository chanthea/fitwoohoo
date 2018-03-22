import React, {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';


export default class AuthHeader extends Component{
    render(){
        return(
            <View style={{flex: 1, justifyContent : 'flex-end', alignItems :'center'}}>
            <Image source={require('../../images/logoicon.png')} style={styles.logo}/>
            <Text style={styles.logoTitle}>Fitwoohoo !</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.textStyle, {fontWeight : 'bold'}]}>{this.props.boldText}</Text>
                <Text style={styles.textStyle}>{this.props.firstLine}</Text>
            </View>
            <Text style={[styles.textStyle, {marginBottom : 10}]}>{this.props.secondLine}</Text>
            </View>
        
        );
    }
    
}
const styles = StyleSheet.create({
    logo : {
        width : 60,
        height : 60
    },
    logoTitle : {
        color: 'rgba(255,255,255,0.9)',
        marginTop: 0,
        textAlign :'center',
        fontSize: 12,
        fontWeight : 'bold',
        marginBottom : 10
    },
    textStyle : {
        color: '#ffffff',
        fontSize: 13,
    },
});

