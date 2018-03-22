import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Platform, ImageBackground  } from 'react-native';
import { Button, Text }  from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../images/logoicon.png';
import GridView from 'react-native-super-grid';
import SearchName from '../components/SearchName';


export default class WelcomeScreen extends Component{
    static navigationOptions = {
        title: 'Welcome',
        header : null
      };
    
    render(){
        const items = [
            { name: 'Trainers', icon :'universal-access', code: '#1abc9c' }, 
            { name: 'Nutritionists', icon :'balance-scale', code: '#2ecc71' },
            { name: 'M. Therapists', icon :'bed', code: '#3498db' },
             { name: 'Yoga Instructors', icon : 'child', code: '#9b59b6' },
            { name: 'Gyms', icon : 'bicycle',code: '#34495e' }, 
            { name: 'Massage/SPA', icon :'hand-paper-o', code: '#16a085' }
          ];


        return(
            <ImageBackground style={{ flex: 1, width: null, height: null}} source={require('../images/bghome.jpg')}>
                <View style = {styles.topContainer}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity>
                            <Button onPress={()=>this.props.navigation.navigate('Register')} bordered rounded light small >
                                <Text uppercase={false} style={{fontSize: 12}}><Icon name='user-plus'/> Register</Text>
                            </Button>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity>
                            <Button onPress={()=>this.props.navigation.navigate('Login')} bordered rounded light small>
                                <Text uppercase={false} style={{fontSize: 12}}><Icon name='sign-in'/> Sign In</Text>
                            </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.logoContainer}>
                        <Image 
                        style={styles.logo}
                        source={Logo} />
                        <Text style={styles.logoTitle}>Welcome to Fitwoohoo :)</Text>
                    </View>
                    
                </View>
                <View style = {styles.bottomContainer}>
                    <View style={{flex : 1, width : '94%', marginLeft : '3%' }}>
                      <SearchName searchNameScreenPressed = {()=>this.props.navigation.navigate('SearchName')}/>
                    </View>
                    <View style={{flex : 7}}>
                    <GridView
                        itemDimension={125}
                        items={items}
                        style={styles.gridView}
                        renderItem={item => (
                        <View style={[styles.itemContainer]}>
                            <TouchableOpacity
                            style={[styles.iconCircle, {backgroundColor:item.code}]}
                            >
                           <Icon size={26} reverse name={item.icon} color='#fff' />
                            </TouchableOpacity>
                            <Text style={styles.itemName}>{item.name}</Text>         
                        </View>
                        )}
                    />
                    </View>    
                </View>
            
            </ImageBackground>
        );
    }

}
const styles = StyleSheet.create({
    container : { flex: 1},
    topContainer : {flex :3, justifyContent : 'center'},
    bottomContainer : {flex :6, justifyContent : 'center'},
    buttonContainer : {flex :1, flexDirection: 'row',justifyContent: 'space-between'},
    buttonStyle : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop :10
    },
    buttonText :  {
        color:'#ffffff',
        fontSize:13,
        fontWeight :'bold'
    },
    logoContainer :{
        flexDirection : 'column',
        alignItems: 'center'
    },
    logo : {
        width : 80,
        height : 80
    },
    logoTitle : {
        color: '#FFF',
        marginTop: 0,
        textAlign :'center',
        opacity : 0.9,
        fontSize: 17,
        fontWeight : 'bold',
        marginBottom : 20
    },
    gridView: {
        paddingTop: 30,
        flex: 1,
      },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 5,
        padding: 10,
        height: 100,
        alignItems : 'center'
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        // textShadowColor: 'rgba(0, 0, 0, 0.9)',
        // textShadowOffset: {width: -1, height: 1},
        // textShadowRadius: 5
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    iconCircle : {
        alignItems:'center',
        justifyContent:'center',
        width:70,
        height:70,
        borderRadius:70,
    }



});

