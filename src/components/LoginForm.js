import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import {Item, Input, Icon, Button} from 'native-base';
import Global from '../globals/Globals';

export default class LoginForm extends Component{

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
              <Item style={{width : 320}}>
                <Icon active name='ios-unlock-outline'/>
                <Input  
                  underlineColorAndroid='transparent' 
                  placeholder="**********"
                  secureTextEntry={true}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.password = input}/>
              </Item>
              <TouchableOpacity style={{marginTop:20}}>
                <Button onPress={this.props.loginPressed} style={styles.button} block>
                  <Text style={styles.buttonText} uppercase={false}>Sign in</Text>
                </Button>
              </TouchableOpacity>   
              <TouchableOpacity  style={{marginTop : -5}}>
                  <Button onPress = {this.props.resetPasswordFormPressed} transparent light>
                      <Text style={{color :'#95a5a6'}} uppercase={false}>Forgot Password ?</Text>
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