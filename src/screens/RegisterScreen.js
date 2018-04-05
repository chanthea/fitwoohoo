import React, {Component} from 'react';
import {StyleSheet, View, Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import axios from '../config/axios/axiosNoAuth';
import RegisterForm from '../components/RegisterForm';
import AuthHeader from './AuthHeader/AuthHeader';
import Global from '../globals/Globals';
// import {Loader} from '../components/common';

export default class RegisterScreen extends Component{
    static navigationOptions = {
        headerTransparent:true,
        headerTintColor: 'white',
        headerStyle : {
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          }
      };
    constructor(props){
        super(props);
        this.state = {
            loading : true,
            roles : [],
            location : {}
        }   

    }
    _returnData(address, lat, lng) {
        this.setState({location : {address: address, lat: lat, lng : lng}});
    }
   
    componentDidMount(){
        axios.get('/role').then(res=>{
          this.setState({
            roles : res.data,
            loading : false
          });
       });
    }

    render(){
        
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <AuthHeader 
                    boldText='Register' 
                    firstLine=' as a Trainer, Nutritionist, Massage' 
                    secondLine='Therapist, GYM admin, Massage/SPA-Business or User' />
                </View>
                {/* <Loader loading={this.state.loading} /> */}
                <View style={{flex : 3}}>
                {this.state.loading ? (
                    <View style={{flex :1, justifyContent :'center'}}>
                        <ActivityIndicator size='large'/>
                    </View>
                ) :(
                <RegisterForm 
                address = {this.state.location}
                roles ={this.state.roles}
                addressPressed = {()=> this.props.navigation.navigate('GooglePlace',{returnData: this._returnData.bind(this)})}

                 loginFormPressed = {()=> this.props.navigation.navigate('Login')}/>
                )
                }
                </View>
               
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container : { flex: 1, backgroundColor : Global.COLOR.BACKGROUND},
    titleContainer :{
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor : Global.COLOR.MAIN,
    },
    otherOption : {flex :2, flexDirection: 'column',justifyContent: 'space-between'},
    forgotPassword : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    createAccount : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom : 20
    }
    

});

