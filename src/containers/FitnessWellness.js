import React, { Component } from 'react';
import { HeaderTab } from '../components/common';
import { Container, Header, Tab, Tabs, ScrollableTab, Icon, TabHeading, Text  } from 'native-base';
import FitnessWellnessTab from '../components/FitnessWellnessTab';
import {StyleSheet} from 'react-native';
import Global from '../globals/Globals';

const items = [
    { name: 'Trainers', icon :'universal-access', code: '#1abc9c', type : 'FontAwesome' }, 
    { name: 'Nutritionists', icon :'balance-scale', code: '#2ecc71', type : 'FontAwesome' },
    { name: 'M. Therapists', icon :'bed', code: '#3498db', type : 'FontAwesome' },
     { name: 'Yoga Instructors', icon : 'child', code: '#9b59b6', type : 'FontAwesome' },
    { name: 'Gyms', icon : 'bicycle',code: '#34495e', type : 'FontAwesome' }, 
    { name: 'Massage/SPA', icon :'hand-paper-o', code: '#16a085', type : 'FontAwesome' }
  ];


class FitnessWellness extends Component {
    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        //  swipeEnabled : false
    }
    _renderTabMenu(object){
        let menu = object.map((item,i)=>{
            return (
            <Tab  ref={item.name} key={i} heading={<TabHeading  ref={item.name} style={styles.TabStyle} >
            <Icon name={item.icon} type={item.type} /><Text>{item.name}</Text></TabHeading>}>
                <FitnessWellnessTab />
            </Tab>);
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
    }, 
    activeTabStyle : {
        backgroundColor : Global.COLOR.MAIN
    }
});
export  { FitnessWellness };
