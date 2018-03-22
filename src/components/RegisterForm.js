import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Item, Input, Icon, Button, Form, Picker} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Global  from '../globals/Globals';



export default class LoginForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      isDateTimePickerVisible: false,
      selectedDate : null,
      selectedAddress: null
    };
  }
  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date);
    this._hideDateTimePicker();
    this.setState({selectedDate : date.toLocaleDateString()});

  };

  _handleAddressPicked = () =>{
    
    this.setState({selectedAddress : 'Address'});
  };

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
    render(){
      const {inputBox} = styles;
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
              <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
              <Text style={{width : 160, fontSize : 14}}>Select a Role : </Text>
              <Picker style={{width : 160}}
                mode="dropdown"
                placeholder="Select a role"
                  selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Item style={inputBox} label="User" value="key0" />
                <Item style={inputBox} label="Trainer" value="key1" />
                <Item style={inputBox} label="Nutritionist" value="key2" />
                <Item style={inputBox} label="Massage Therapist" value="key3" />
                <Item style={inputBox} label="Yoga Instructor" value="key4" />
                <Item style={inputBox} label="Gym Owner" value="key5" />
                <Item style={inputBox} label="Massage / SPA-Business" value="key6" />
                </Picker>
              </View>
              
              <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                <Item style={{width : 160}}>
                  <Input
                  style={inputBox} 
                  underlineColorAndroid='transparent' 
                    placeholder="First Name"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    onSubmitEditing={()=> this.lastname.focus()}/>
                </Item>  
                <Item style={{width : 160}}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Last Name"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => this.lastname = input}/>
                </Item>
              </View>
              <Item style={{width : 320}}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => this.email = input}/>
              </Item>
              <Item style={{width : 320}}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Phone Number"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => this.phone = input}/>
              </Item>
              <Item style={{width : 320}}>
                <Input
                  style={inputBox}   
                  underlineColorAndroid='transparent' 
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.password = input}/>
              </Item>
              <Item style={{width : 320}}>
                <Input  
                  style={inputBox} 
                  underlineColorAndroid='transparent' 
                  placeholder="Re-enter Your Password"
                  secureTextEntry={true}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.confirmPassword = input}/>
              </Item>
              <TouchableOpacity>
                <Button 
                // onPress = {this._handleAddressPicked.bind(this)}
                onPress = {this.props.addressPressed}
                style={styles.selectDate} 
                bordered   transparent >
                  <Text style={{color : this.state.selectedAddress ? '#000000' : '#bdc3c7', paddingLeft : 5 }} >
                  {(this.state.selectedAddress ? this.state.selectedAddress : 'Address')}
                  </Text>
                </Button>
              </TouchableOpacity>
             <TouchableOpacity>
                <Button 
                onPress = {this._showDateTimePicker}
                style={styles.selectDate} 
                bordered   transparent >
                  <Text style={{color : this.state.selectedDate ? '#000000' : '#bdc3c7', paddingLeft : 5 }} >
                  {(this.state.selectedDate ? this.state.selectedDate : 'Select Date of Birth')}
                  </Text>
                </Button>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
              </TouchableOpacity>  
              <TouchableOpacity style={{marginTop:20}}>
                <Button style={styles.button} block>
                  <Text style={styles.buttonText} >Register</Text>
                </Button>
              </TouchableOpacity>   
              <TouchableOpacity style={{marginTop:20}}>
                  <Button small transparent light onPress = {this.props.loginFormPressed}>
                      <Text style={{color :'#95a5a6'}} uppercase={false}>Already have an account ? Sign in Now !</Text>
                  </Button>
              </TouchableOpacity>
                  
  		  </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center'
    },
    inputBox: {height : 40, fontSize : 14},
    button: {
      width:320,
      backgroundColor: Global.COLOR.MAIN
    },
    buttonText: {
      fontSize:16,
      color:'#ffffff',
      textAlign:'center'
    },
    selectDate : {
      width : 320, 
      borderTopWidth : 0, 
      borderLeftWidth : 0, 
      borderRightWidth:  0, 
      borderColor : '#bdc3c7'
    }
  });