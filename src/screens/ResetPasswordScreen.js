import React, {Component} from 'react';
import {StyleSheet, View, Image,TouchableOpacity,ImageBackground,KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text } from 'native-base';
import ResetPasswordForm from '../components/ResetPasswordForm';
import AuthHeader from './AuthHeader/AuthHeader';
import Global from '../globals/Globals';

class ResetPasswordScreen extends Component{
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
                    boldText='Reseting password,' 
                    firstLine=' this helps' 
                    secondLine='in case you do not remember your password' />
                </View>
                <View style={{flex : 3}}>
                <ResetPasswordForm/>
                <View style={styles.otherOption}>
                    <View style={styles.createAccount}>
                        <TouchableOpacity>
                        <Button 
                        onPress={()=> this.props.navigation.navigate('Login')} 
                        block  
                        bordered 
                        style={{borderColor : '#95a5a6', width : 300}}>
                            <Text style={{color :'#95a5a6', fontSize : 13}} uppercase={false}>Go back to Sign in !</Text>
                        </Button>
                        </TouchableOpacity>
                    </View>
                    
                </View>
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
    otherOption : {flexGrow :1, flexDirection: 'column',justifyContent: 'space-between'},
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

export default ResetPasswordScreen;