import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import {Item, Input, Icon, Button, Spinner, Toast} from 'native-base';
import Global from '../globals/Globals';
import axios from '../config/axios/axiosNoAuth';

export default class ResetPasswordForm extends Component{
  constructor(props){
    super(props);
    this.state = {
        fetching : false,
        email : null,
        validated : false,
    }
  }
   _sendResetingLink = async()=>{
     this.setState({fetching : true});
      axios.post('/auth/resetpassword',{email :this.state.email})
      .then((res)=>{
        console.log(res.data);
        Toast.show({
          text: res.data.message,
          position: 'bottom',
          type : 'success',
          duration : 5000
        })
        this.setState({
          fetching : false,
          email : null
        })
      }).catch((error)=>{
        Toast.show({
          text: error.response.data.message,
          position: 'bottom',
          type : 'warning',
          duration : 5000
        })

        this.setState({fetching : false})
      })
    }
    _onDisableButtonLogin = () => {
      if(this.state.email !== ''){
        if(this.state.validated === true && this.state.fetching === false)  return false;
        return true;
      }
      return true;
    }
    _validateEmail = (email) => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(reg.test(email) === false){
          this.setState({
            email:email,
            validated : false
          })
      }else {
        this.setState({
          email:email,
          validated : true
        })
      }
    }

    _buttonText = () => {
      if(this.state.fetching){
        return <Spinner color='white'/>
      }else{
        return <Text style={styles.buttonText} uppercase={false}>Send Reseting Password Link</Text>;
      }
    }
    render(){
        return(
            <View style={styles.container}>
            
              <Item style={{width : 320}}>
                <Icon active name='ios-mail-outline' />
                <Input  
                  underlineColorAndroid='transparent' 
                  placeholder="example@example.com"
                  value = {this.state.email}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  keyboardType="email-address"
                  onChangeText={email => this._validateEmail(email.trim())}
                />
              </Item>  
              <View style={{marginTop : 20}}>
                <Button 
                  disabled={this._onDisableButtonLogin()}  
                  onPress={this._sendResetingLink} 
                  style={[styles.button,{
                    backgroundColor: (this._onDisableButtonLogin() ? Global.COLOR.DISABLE_MAIN : Global.COLOR.MAIN)
                  }]} block>
                  {this._buttonText()}
                  </Button>
              </View>
              
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
      shadowColor: 'transparent',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      elevation:0
    },
    buttonText: {
      fontSize:16,
      color:'#ffffff',
      textAlign:'center'
    }
    
  });