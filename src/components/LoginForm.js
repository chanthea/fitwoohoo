import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import {Item, Input, Icon, Button, Spinner, Toast } from 'native-base';
import Global from '../globals/Globals';
import axios from '../config/axios/axiosNoAuth';
import {AsyncStorage} from 'react-native';
import {StoreUserAction} from '../redux/actions/StoreUserAction';
import {connect} from 'react-redux';
import setDefaultParam from '../config/axios/setDefaultParam';
 
class LoginForm extends Component{
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password : '',
        validated : false,
        logging : false
      };
    }
    componentWillReceiveProps(){

    }
    _onLoginPressed = async()=>{
      this.setState({logging : true});
      axios.get('/auth/gettoken',{
        params : {
          email : this.state.email,
          password : this.state.password
        }
      }).then((response) => {
        AsyncStorage.setItem('userToken', response.data.token);
        setDefaultParam(response.data.token);
        this._StoreUserObject(response.data.token);
      }).catch((error) => {
        this.setState({logging : false});
        Toast.show({
          text: error.response.data.error,
          position: 'bottom',
          duration : 5000
        })
      })
      

    
    }

    _StoreUserObject = async(token) =>{
      axios.get('/auth/getuser?token='+token)
      .then((res)=>{
        this.props.StoreUserAction(res.data);
        this.props.loginPressed();
        this.setState({logging : false});
      }).catch((error)=>{
        this.setState({logging : false});
        Toast.show({
          text: error.response.data.error,
          position: 'bottom',
          duration : 5000
        })
      })
   

    }
    
    _onDisableButtonLogin = () => {
      if(this.state.email !== '' && this.state.password !== ''){
        if(this.state.validated === true && this.state.logging === false)  return false;
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
        if(this.state.logging){
          return <Spinner color='white'/>
        }else{
          return <Text style={styles.buttonText} uppercase={false}>Sign up</Text>;
        }
      }
      
    
    render(){
     // this._StoreUserObject();
        return(
            <View style={styles.container}>
            
              <Item style={{width : 320}}>
                <Icon active name='ios-mail-outline' />
                <Input  
                underlineColorAndroid='transparent' 
                  placeholder="example@example.com"
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    keyboardType="email-address"
                  value={this.state.email}
                  onSubmitEditing={()=> this.password._root.focus()}
                 onChangeText={email => this._validateEmail(email.trim())}
                  
                  />
              </Item>  
              <Item style={{width : 320}}>
                <Icon active name='ios-unlock-outline'/>
                <Input  
                  underlineColorAndroid='transparent' 
                  placeholder="password"
                  secureTextEntry={true}
                  value={this.state.password}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.password = input}
                  onChangeText = {password => this.setState({password})}
                  />
              </Item>
              <View style={{ marginTop : 20}}>
                <Button 
                disabled={this._onDisableButtonLogin()}  
                onPress={()=>this._onLoginPressed()} 
                style={[styles.button,{
                  backgroundColor: (this._onDisableButtonLogin() ? Global.COLOR.DISABLE_MAIN : Global.COLOR.MAIN)
                }]} block>
                {this._buttonText()}
                </Button>

                <Button block onPress = {this.props.resetPasswordFormPressed} transparent light>
                <Text style={{color :'#95a5a6'}} uppercase={false}>Forgot Password ?</Text>
                </Button>
              </View>
               
                  
  		</View>
        );
    }
}
const mapDispatchToProps = {
  StoreUserAction
}

export default connect(null,mapDispatchToProps)(LoginForm);

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