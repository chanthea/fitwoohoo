import React, {Component} from 'react';
import { View, StyleSheet, Platform, TouchableOpacity}  from 'react-native';
import Global from '../globals/Globals';
import Photo from './Photo';
import { Tabs,Tab } from 'native-base';



class LibraryVideo extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false
    }
 
    _renderLibraryPhotoTab(object){
        let lists = object.map((item,i)=>{
            return(<Tab 
                tabBarUnderlineStyle={{backgroundColor :Global.COLOR.MAIN}}
                activeTabStyle={styles.TabStyle} 
                tabStyle={styles.TabStyle} 
                activeTextStyle={{color : Global.COLOR.MAIN}}
                textStyle={{color : 'rgba(0,0,0,0.6)', fontSize : 14}}
                ref={item.heading} 
                key={i} 
                heading={item.heading}>
                    {item.component}
                </Tab>);
          });
          return lists;
    }
   
    render(){
        const PhotoItems = [
            {heading : 'Profile Photos', component : <Photo/>},
            {heading :'Cover Photos', component : <Photo/>},
            {heading : 'Post Photos', component : <Photo/>}
        ];
        return(
            <Tabs 
            tabBarPosition ='bottom'
            tabBarUnderlineStyle={{backgroundColor : 'white'}}
             style={styles.TabBarStyle} 
             initialPage={0}>
                {this._renderLibraryPhotoTab(PhotoItems)}
            </Tabs>
        );
    }
}
const styles = StyleSheet.create({
    TabBarStyle : {
        flex : 1, 
        backgroundColor : '#ffffff', 
        // marginTop : 10,
        borderBottomWidth : 0,
        shadowColor : 'transparent'
    },
    TabStyle : {
        backgroundColor : '#ffffff',
    }, 
    activeTabStyle : {
        backgroundColor : Global.COLOR.MAIN
    }
});
export  default LibraryVideo;
