import React, { Component } from 'react';
import { HeaderTab } from '../components/common';
import { Container, Header, Tab, Tabs, ScrollableTab, Icon, TabHeading, Text  } from 'native-base';
import FitnessWellnessTab from '../components/FitnessWellnessTab';
import {StyleSheet} from 'react-native';
import Global from '../globals/Globals';

const items = [
    { name: 'Trainers',type : 'FontAwesome' }, 
    { name: 'Nutritionists', type : 'FontAwesome' },
    { name: 'M. Therapists', type : 'FontAwesome' },
     { name: 'Yoga Instructors', type : 'FontAwesome' },
    { name: 'Gyms', type : 'FontAwesome' }, 
    { name: 'Massage/SPA', type : 'FontAwesome' }
  ];


class FitnessWellness extends Component {
    static navigationOptions = {
        //tabBarVisible : false,
        drawerLockMode: 'locked-closed',
          //swipeEnabled : false
    }
    _renderTabMenu(object){
        let menu = object.map((item,i)=>{
            return (
            // <Tab  
          
            // ref={item.name} 
         
            // ref={item.name} key={i} 
            //  heading={
            //  <TabHeading 
            //  activeTabStyle={styles.TabStyle} 
            //  tabStyle={styles.TabStyle} 
            //  activeTextStyle={{color : '#ffffff'}}
            //  textStyle={{color : 'rgba(255,255,255,0.8)'}}
            //  >
            // <Icon name={item.icon} type={item.type} />
            // <Text >{item.name}</Text>
            // </TabHeading>}>
            //     <FitnessWellnessTab />
            // </Tab>

            <Tab
            tabBarUnderlineStyle={{color :'#ffffff'}}
            activeTabStyle={styles.TabStyle} 
            tabStyle={styles.TabStyle} 
            activeTextStyle={{color : '#ffffff'}}
            textStyle={{color : 'rgba(255,255,255,0.8)'}}
            ref={item.name} 
            key={i} 
            heading={item.name}>
                <FitnessWellnessTab />
            </Tab>
            
        );

        
        });
        return menu;
    }
  render() {
      const {TabStyle, activeTabStyle} = styles;
    return (
        <HeaderTab 
                goBackPressed = {()=>this.props.navigation.goBack()}
                menuPressed = {()=>this.props.navigation.navigate('DrawerOpen')}
                title='Fitness / Wellness'
                isFitnessWellness = {true}
                >
            <Tabs  onChangeTab={({i,ref })=> console.log(i)}  renderTabBar={()=> <ScrollableTab />}>
                {this._renderTabMenu(items)}
              
                {/* <Tab activeTabStyle={activeTabStyle} tabStyle={TabStyle}  heading="Tab2">
                    <FitnessWellnessTab />
                </Tab>
                <Tab activeTabStyle={activeTabStyle} tabStyle={TabStyle}   heading="Tab3">
                    <FitnessWellnessTab />
                </Tab>
                <Tab activeTabStyle={activeTabStyle} tabStyle={TabStyle}  heading="Tab4">
                    <FitnessWellnessTab />
                </Tab>
                <Tab activeTabStyle={activeTabStyle} tabStyle={TabStyle} heading="Tab5">
                    <FitnessWellnessTab />
                </Tab> */}
            </Tabs>
        </HeaderTab>
    );
  }
}

const styles = StyleSheet.create({
    TabStyle : {
        backgroundColor : Global.COLOR.MAIN,
       // color : '#ffffff'
    }, 
    activeTabStyle : {
        backgroundColor : Global.COLOR.MAIN
    }
});
export  { FitnessWellness };
