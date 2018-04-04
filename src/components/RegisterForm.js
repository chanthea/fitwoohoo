import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Item, Input, Icon, Button, Form, Picker, ActivityIndicator} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Global  from '../globals/Globals';



export default class LoginForm extends Component{
  constructor(props) {
    super(props);

    let xDate = new Date();
    let _minYear = xDate.getFullYear() - 10;
    let _useDate = xDate.setFullYear(_minYear);
    this.state = {
      pickerSelected: 1,
      currentDate : new Date(_useDate),
      isDateTimePickerVisible: false,
      selectedDate : null,
      selectedAddress: null,
      minDate : new Date(_useDate),
      form : {
        role_id : null,
        email : null,
        password : null,
        password_confirmation : null,
        day : null,
        month : null,
        year : null,
        phone : null,
        name : null,
        lastname : null,

        lat : null,
        lng : null,
        address : null,
        business_name : null
        
      },
      validate : {
        name : true,
        lastname : true,
        password : true,
        dob : true,
        address : true,
        email : true,
        business_name : true,
        phone :true,
        password_confirmation : true

      }

    };
  }



  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
      let fullDate = date.toLocaleDateString();
      let arrDate = fullDate.split('/');

      let day = arrDate[1];
      let month = arrDate[0]
      let year = date.getFullYear();

    this.setState({form : {...this.state.form, day : day, month : month, year : year }})
    
    this._hideDateTimePicker();
    this.setState({
      selectedDate : day+' / '+month+' / '+year,
      currentDate : date
    });


  };

  _handleAddressPicked = () =>{
    this.setState({selectedAddress : 'Address'});
  };

  _onValueChange(value) {
    this.setState({
      pickerSelected: value
    });
  }
  _onSubmit(){
    
  }

  _validateRegister(val,type){
    let nameReg = /^[A-Za-z]*$/;
    let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,}$/;
    let phoneReg = /^(?=.*[0-9])[- +()0-9]+$/;
      if(type === 'name'){
        if(nameReg.test(val)){
          this.setState({validate : {...this.state.validate, name : true }})
        }else {
          this.setState({validate : {...this.state.validate, name : false }})
        }
        this.setState({form : {...this.state.form, name : val }})
      }else if(type === 'lastname'){
        if(nameReg.test(val)){
          this.setState({validate : {...this.state.validate, lastname : true }})
        }else {
          this.setState({validate : {...this.state.validate, lastname : false }})
        }
        this.setState({form : {...this.state.form, lastname : val }})
      }else if(type === 'email'){
        if(mailReg.test(val)){
          this.setState({validate : {...this.state.validate, email : true }})
        }else {
          this.setState({validate : {...this.state.validate, email : false }})
        }
        this.setState({form : {...this.state.form, email : val }})
      }else if(type === 'password'){
        if(passReg.test(val)){
          this.setState({validate : {...this.state.validate, password : true }})
        }else {
          this.setState({validate : {...this.state.validate, password : false }})
        }
        this.setState({form : {...this.state.form, password : val }})
      }else if(type === 'password_confirmation'){
        if(passReg.test(val)){
          if(this.state.form.password === val){
            this.setState({validate : {...this.state.validate, password_confirmation : true }})
          }else{
            this.setState({validate : {...this.state.validate, password_confirmation : false }})
          }
        }else {
          this.setState({validate : {...this.state.validate, password_confirmation : false }})
        }
        this.setState({form : {...this.state.form, password_confirmation : val }})
      }else if(type === 'phone'){
        if(phoneReg.test(val)){
          this.setState({validate : {...this.state.validate, phone : true }})
        }else {
          this.setState({validate : {...this.state.validate, phone : false }})
        }
        this.setState({form : {...this.state.form, phone : val }})
      }
  }



    render(){
      const {inputBox} = styles;
      //console.log(this.state);
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
              <View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
              <Text style={{width : 160, fontSize : 14}}>Select a Role : </Text>
                  <Picker style={{width : 160}}
                    mode="dropdown"
                    placeholder="Select a role"
                    selectedValue={this.state.pickerSelected}
                    onValueChange={this._onValueChange.bind(this)}
                    onChange
                  >
                   {this.props.roles.map((item,i)=>{
                   return <Item style={inputBox} key={item.id} label={item.title} value={item.id} />
                  })} 
              </Picker>
              </View>
              {this.state.pickerSelected !== 6 && this.state.pickerSelected !== 7 ? 
              (<View style = {{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center'}}>
                <Item style={{width : 160}} error={!this.state.validate.name}> 
                  <Input
                  style={inputBox} 
                  underlineColorAndroid='transparent' 
                    placeholder="First Name"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    value={this.state.email}
                    maxLength = {25}
                    onChangeText={firstName => this._validateRegister(firstName,'name')}
                    onSubmitEditing={()=> this.lastname._root.focus()}
                    blurOnSubmit={false}
                    />
                    {!this.state.validate.name &&  <Icon name='close-circle' />}
                </Item>  
                <Item style={{width : 160}} error={!this.state.validate.lastname}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Last Name"
                    onChangeText={lastname => this._validateRegister(lastname,'lastname')}
                    maxLength = {25}
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => {this.lastname = input}}
                    onSubmitEditing={()=> this.email._root.focus()}
                    />
                      {!this.state.validate.lastname &&  <Icon name='close-circle' />}
                </Item>
              </View>) :  
               (<Item style={{width : 320}} error={!this.state.validate.business_name}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder={this.state.pickerSelected === 6 ? 'What\'s the name of your gym' : 'What\'s your business name '}
                    onChangeText={business_name => this._validateRegister(business_name,'business_name')}
                    maxLength = {25}
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => {this.lastname = input}}
                    onSubmitEditing={()=> this.email._root.focus()}
                    />
                      {!this.state.validate.lastname &&  <Icon name='close-circle' />}
                </Item>)
                }

              <Item style={{width : 320}} error={!this.state.validate.email}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Email"
                    onChangeText={email => this._validateRegister(email,'email')}
                    keyboardType="email-address"
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => this.email = input}
                    onSubmitEditing={()=> this.phone._root.focus()}
                    />
                    {!this.state.validate.email &&  <Icon name='close-circle' />}
              </Item>
              <Item style={{width : 320}} error={!this.state.validate.phone}>
                  <Input  
                    style={inputBox} 
                    underlineColorAndroid='transparent' 
                    placeholder="Phone Number"
                    onChangeText={phone => this._validateRegister(phone,'phone')}
                    placeholderTextColor = {Global.COLOR.LIGHTGREY}
                    ref={(input) => this.phone = input}
                    onSubmitEditing={()=> this.password._root.focus()}
                    />
                     {!this.state.validate.phone &&  <Icon name='close-circle' />}
              </Item>
              <Item style={{width : 320}} error={!this.state.validate.password}>
                <Input
                  style={inputBox}   
                  underlineColorAndroid='transparent' 
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={password => this._validateRegister(password,'password')}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.password = input}
                  onSubmitEditing={()=> this.confirmPassword._root.focus()}
                  />
                  {!this.state.validate.password &&  <Icon name='close-circle' />}
              </Item>
              <Item style={{width : 320}} error={!this.state.validate.password_confirmation}>
                <Input  
                  style={inputBox} 
                  underlineColorAndroid='transparent' 
                  placeholder="Re-enter Your Password"
                  secureTextEntry={true}
                  onChangeText={password_confirmation => this._validateRegister(password_confirmation,'password_confirmation')}
                  placeholderTextColor = {Global.COLOR.LIGHTGREY}
                  ref={(input) => this.confirmPassword = input}
                  />
                   {!this.state.validate.password_confirmation &&  <Icon name='close-circle' />}
              </Item>
              {this.state.pickerSelected !== 1 &&  
              <TouchableOpacity>
                <Button 
                onPress = {this.props.addressPressed}
                style={styles.selectDate} 
                bordered   transparent >
                  <Text style={{color : this.state.selectedAddress ? '#000000' : '#bdc3c7', paddingLeft : 5 }} >
                  {(this.state.selectedAddress ? this.state.selectedAddress : 'Address')}
                  </Text>
                </Button>
              </TouchableOpacity>}
             
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
                date={this.state.currentDate}
                maximumDate={this.state.minDate}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
              </TouchableOpacity>  
                  
              <View style={{ marginTop : 20}}>
                <Button onPress ={this._onSubmit} style={styles.button} block>
                  <Text style={styles.buttonText} >Register</Text>
                </Button>
                <Button block small transparent light onPress = {this.props.loginFormPressed}>
                    <Text style={{color :'#95a5a6'}} uppercase={false}>Already have an account ? Sign in Now !</Text>
                </Button>
              </View>
            
            
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
      shadowColor: 'transparent',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      elevation:0,
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