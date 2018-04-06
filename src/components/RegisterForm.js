import React, { Component} from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import {Item, Input, Icon, Button, Form, Picker, ActivityIndicator, Toast,Spinner} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Global  from '../globals/Globals';
import { _checkUserRole } from '../helpers';
import axios from '../config/axios/axiosWithToken';




export default class LoginForm extends Component{
  constructor(props) {
    super(props);

    let xDate = new Date();
    let _minYear = xDate.getFullYear() - 10;
    let _useDate = xDate.setFullYear(_minYear);
    this.state = {
      logging : false,
      pickerSelected: 1,
      currentDate : new Date(_useDate),
      isDateTimePickerVisible: false,
      selectedDate : null,
      selectedAddress: null,
      minDate : new Date(_useDate),
      form : {
        role_id : 1,
        email : null,
        password : null,
        password_confirmation : null,
        day : null,
        month : null,
        year : null,
        phone : null,
        name : null,
        lastname : null,

        lat : '',
        lng : '',
        address : null,
        business_name : null
        
      },
      validate : {
        name : false,
        lastname : false,
        password : false,
       // dob : false,
        address : true,
        email : false,
        business_name : true,
        phone :false,
        password_confirmation : false,
        day : false,
        month : false,
        year : false,

      },
      validateMessage : {
        name : 'Required : letters A-Z, maxlength 25',
        lastname : 'Required : letters A-Z, maxlength 25',
        password : 'Required : uppercase, lowercase and number',
        password_confirmation : 'Required : uppercase, lowercase and number',
        dob : 'Required : required',
        address : 'Required : required',
        email : 'Required : valid email address',
        business_name : 'Required : maxlength 25',
        phone :'Required : can use +, space and number',
        day : 'Required ',
        month : 'Required',
        year : 'Required',
      }  
    };
    this._doRegister = this._doRegister.bind(this);
  }


  componentWillReceiveProps(nextProps){
    this._setAddressState(nextProps.address)
  }

  _setAddressState(location){
     const {address, lat, lng} = location;
     this.setState({
       form : {...this.state.form, address : address, lat : lat, lng : lng },
       validate : {...this.state.validate, address : true, lat : true, lng : true }
      })
  }


  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      console.log(day,month,year);
      this._hideDateTimePicker();
      this.setState({
          form : {...this.state.form, day : day, month : month, year : year },
          validate : {...this.state.validate, day : true, month: true, year : true},
          selectedDate : day+' / '+month+' / '+year,
          currentDate : date
        })
  };


  _onValueChange(value) {
    this.setState({
      pickerSelected: value,
      form : {...this.state.form, role_id : value }}
    )
  }

  _onSubmit(){
    Keyboard.dismiss();
    const {pickerSelected, form} = this.state;
    let dataSend = {};
    let currentState = Object.assign({}, form);
    let removeProp= [];

    userType = _checkUserRole(pickerSelected);
    if(userType === 'User'){
      removeProps = ['lat','lng','business_name','address'];
      for(index in removeProps){ 
        delete currentState[removeProps[index]]; 
      }
    }else if(userType === 'Trainer'){
      removeProps = ['business_name'];
      for(index in removeProps){ 
        delete currentState[removeProps[index]]; 
      }
    }else if(userType === 'Business'){
      removeProps = ['name','lastname']; 
      for(index in removeProps){ 
        delete currentState[removeProps[index]]; 
      }
    }else{
      Toast.show({
        text: 'Please select a valid role',
        position: 'bottom',
        duraction: 5000
      })
      return false;
    }
    this._updateStateDynamicWithValidate(currentState);
    let HasError = this._hasError(currentState);
    if(HasError > 1){
      Toast.show({
        text: 'Please fill in all required fields',
        position: 'bottom',
       // buttonText: 'Dismiss',
        type : 'danger',
        duration : 3000
      })
      return false;
    }else{
      //console.log(currentState);
    return this._doRegister(currentState)
    }
   
   this._toastErrorValidate(currentState);
  }

  _doRegister = async(currentState)=>{
    try {
      this.setState({logging : true});
      const response = await axios.post('/auth/register',currentState);
      console.log(response.data);
      this.props.registerSuccess('Login', {status : 'success',message:'We sent you an activation link. Please kindly check your mail.'});
      this.setState({logging : false});
    } catch (error) {
      let data= error.response.data;
      let message='';
      if(data.type === 'validate'){
       let msgs = data.message;
        for (let key in msgs) {
          if (msgs.hasOwnProperty(key)) {           
            message += key + ' : '+ msgs[key]+"\n";
         }
        }
      }else message = data.message;
      Toast.show({
        text: message,
        position: 'bottom',
        duration : 3000
      })
      this.setState({logging : false});
    }
  }

  _updateStateDynamicWithValidate(currentState){
    let validate = Object.assign({}, this.state.validate);
    for (let key in currentState) {
      if (currentState.hasOwnProperty(key)) {      
         if(currentState[key] === null){
          validate[key] = false;
         }else this._validateRegister(this.state.form[key],key);
      }
    }
   this.setState({validate});
   
  }

  _hasError(currentState){
    let error = 0;
    for (let key in currentState) {
      if (currentState.hasOwnProperty(key)) {           
         if(this.state.validate[key] === false){
            error++;
         }
      }
    }
    return error;

  }

  _validateRegister(val,type){
    let nameReg = /^[A-Za-z]*$/;
    let mailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9#?!@$%^&*-]).{8,}$/;
    let phoneReg = /^(?=.*[0-9])[- +()0-9]+$/;
    let regex = '';



      if(type === 'name') regex = nameReg;
      else if(type === 'lastname') regex = nameReg;
      else if(type === 'email') regex = mailReg;
      else if(type === 'password') regex = passReg;
      else if(type === 'password_confirmation') regex = passReg;
      else if(type === 'phone') regex=phoneReg

      if(regex !== ''){
        if(regex.test(val)){
          if(type === 'password_confirmation'){
            if(this.state.form.password === val){
              this.setState({validate : {...this.state.validate, [type] : true }})
            }else{
              this.setState({validate : {...this.state.validate, [type] : false }})
              Toast.show({
                text: this.state.validateMessage[type],
                position: 'top',
                type : 'danger',
                duration : 2000,
                style: { marginTop : 24 }
              })
            }
          }else{
            this.setState({validate : {...this.state.validate, [type] : true }})
          }
        }else {
          this.setState({validate : {...this.state.validate, [type] : false }})
          Toast.show({
            text: this.state.validateMessage[type],
            position: 'top',
            type : 'danger',
            duration : 2000,
            style: { marginTop : 24}
          })
        }
      }
      
      this.setState({form : {...this.state.form, [type] : val }})
  }

  _buttonText = () => {
    if(this.state.logging){
      return <Spinner color='white'/>
    }else{
      return <Text style={styles.buttonText} uppercase={false}>Register</Text>;
    }
  }


    render(){
      const {inputBox} = styles;
      // let data = {
      //     message:  {
      //       email:  [
      //         "The email has already been taken.",
      //       ],
      //     },
      //     status: "failed",
      //     type: "validate",
      //   }
      // let msgs = data.message;
          
      //   for (let key in msgs) {
      //     if (msgs.hasOwnProperty(key)) {           
      //       console.log(key + ' : '+ msgs[key]);
      //    }
      //   // message += msgs[key][0];
      //   }

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
                      {/* {!this.state.validate.lastname &&  <Icon name='close-circle' />} */}
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
                    ref={(input) => {this.business_name = input}}
                    onSubmitEditing={()=> this.email._root.focus()}
                    />
                      {/* {!this.state.validate.lastname &&  <Icon name='close-circle' />} */}
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
                    {/* {!this.state.validate.email &&  <Icon name='close-circle' />} */}
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
                     {/* {!this.state.validate.phone &&  <Icon name='close-circle' />} */}
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
                  {/* {!this.state.validate.password &&  <Icon name='close-circle' />} */}
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
                   {/* {!this.state.validate.password_confirmation &&  <Icon name='close-circle' />} */}
              </Item>
              {this.state.pickerSelected !== 1 &&  
              <TouchableOpacity>
                <Button 
                onPress = {this.props.addressPressed}
                style={[styles.selectDate, !this.state.validate.address && styles.error]} 
                bordered   transparent >
                  <Text style={{color : this.state.form.address ? '#000000' : '#bdc3c7', paddingLeft : 5 }} >
                  {(this.state.form.address ? this.state.form.address : 'Address')}
                  </Text>
                </Button>
              </TouchableOpacity>}
             
             <TouchableOpacity>
                <Button 
                onPress = {this._showDateTimePicker}
                style={[styles.selectDate, 
                  !this.state.validate.day && !this.state.validate.month && !this.state.validate.year && styles.error]} 
                bordered   transparent >
                  <Text style={{color : this.state.selectedDate ? '#000000' : '#bdc3c7', paddingLeft : 5}} >
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
                <Button 
                 disabled={this.state.logging}  
                onPress ={this._onSubmit.bind(this)} 
                style={[styles.button,{
                  backgroundColor: this.state.logging ? Global.COLOR.DISABLE_MAIN : Global.COLOR.MAIN
                }]}
                 block>
                  {this._buttonText()}
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
    },
    error : {borderBottomWidth : 0.7, borderColor : 'red'}
  });