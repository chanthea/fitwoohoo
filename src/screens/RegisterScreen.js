import React, {Component} from 'react';
import {StyleSheet, View, Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text } from 'native-base';

import RegisterForm from '../components/RegisterForm';
import AuthHeader from './AuthHeader/AuthHeader';
import Global from '../globals/Globals';

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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <AuthHeader 
                    boldText='Register' 
                    firstLine=' as a Trainer, Nutritionist, Massage' 
                    secondLine='Therapist, GYM admin, Massage/SPA-Business or User' />
                </View>
                <View style={{flex : 3}}>
                    <RegisterForm 
                    addressPressed = {()=> this.props.navigation.navigate('GooglePlace')}
                     loginFormPressed = {()=> this.props.navigation.navigate('Login')}/>
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

