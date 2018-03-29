import React, {Component} from 'react';
import { View, StyleSheet, Platform, TouchableOpacity}  from 'react-native';
import { Wrapper } from '../components/common';
import { _paddingAndroid } from '../helpers';
import Global from '../globals/Globals';
import LibraryPhoto from '../components/LibraryPhoto';
import Photo from '../components/Photo';
import Video from '../components/Video';
import Audio from '../components/Audio';
import { 
    Header, 
    Left, 
    Body, 
    Right, 
    Button, 
    Icon, 
    Title,
    Text, 
    Thumbnail, 
    Content, 
    Footer, 
    FooterTab,
    Tabs,
    Tab
     } from 'native-base';



class Library extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false,
        header : null
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

    _renderLibraryTab(object){
        let lists = object.map((item,i)=>{
            return(<Tab 
                tabBarUnderlineStyle={{backgroundColor :Global.COLOR.MAIN}}
                activeTabStyle={styles.TabStyle} 
                tabStyle={styles.TabStyle} 
                activeTextStyle={{color : Global.COLOR.MAIN}}
                textStyle={{color : 'rgba(0,0,0,0.6)'}}
                ref={item.heading} 
                key={i} 
                heading={item.heading}>
                    {item.component}
                </Tab>);
          });
          return lists;
    }
   
    render(){
        const items = [
            {heading : 'Photos', component : <LibraryPhoto PhotoDetail={()=>this.props.navigation.navigate('PhotoDetail')}/>},
            {heading :'Videos', component : <Video VideoDetail={()=>this.props.navigation.navigate('VideoDetail')}/>},
            {heading : 'Audio', component : <Audio AudioDetail={()=>this.props.navigation.navigate('AudioDetail')}/>}
        ];
       
        return(
            
            <Wrapper>
            <Header hasTabs style={{marginTop : _paddingAndroid(), backgroundColor : Global.COLOR.MAIN}}>
            <Left>
                <Button transparent onPress={()=>this.props.navigation.goBack()}>
                <Icon  style={{color : '#ffffff'}} name='arrow-back' />
                </Button>
            </Left>
            <Body style={{flex :2}}>
                <Title style={{color : '#ffffff', fontSize: 17}}>Library</Title>
            </Body>
            </Header>
             <View style={{flex : 1, backgroundColor : '#ffffff'}}>
                <Tabs 
                tabBarUnderlineStyle={{backgroundColor : Global.COLOR.MAIN}}
                style={styles.TabBarStyle} 
                initialPage={0}>
                    {this._renderLibraryTab(items)}
                </Tabs>
            </View>  
            
        </Wrapper>
        );
    }
}
const styles = StyleSheet.create({
    TabBarStyle : {flex : 1, backgroundColor : '#ffffff'},
    TabStyle : {
        backgroundColor : '#ffffff',
    }, 
    activeTabStyle : {
        backgroundColor : Global.COLOR.MAIN
    }
});

export  { Library };
