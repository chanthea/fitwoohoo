import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import {Item, Input, Icon, Button} from 'native-base';
import Global from '../globals/Globals';

export default class ResetPasswordForm extends Component{

    render(){
        return(
            <View style={styles.container}>
            
              <Item style={{width : 320}}>
                <Icon active name='ios-mail-outline' />
                <Input  
                underlineColorAndroid='transparent' 
                  placeholder="example@example.com"
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  keyboardType="email-address"
                  onSubmitEditing={()=> this.password.focus()}/>
              </Item>  
              <TouchableOpacity style={{marginTop:20}}>
                <Button style={styles.button} block>
                  <Text style={styles.buttonText} uppercase={false}>Send Reseting Password Link</Text>
                </Button>
              </TouchableOpacity>   
  		</View>
        );
    }
}


const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
  
    inputBox: {
      width:320,
      backgroundColor:'rgba(0, 0,0,0.4)',
      borderRadius: 25,
      paddingHorizontal:50,
      fontSize:16,
      color:'rgba(0,0,0,0.6)',
      marginVertical: 20,
      height : 50
    },
    button: {
      width:320,
      backgroundColor:Global.COLOR.MAIN
    },
    buttonText: {
      fontSize:16,
      color:'#ffffff',
      textAlign:'center'
    }
  });