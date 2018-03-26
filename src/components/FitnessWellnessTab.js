import React, { Component } from 'react';
import { Container, Header, Content, List, Icon, ListItem, Thumbnail, Button, Text, Body, Right } from 'native-base';
import {StyleSheet} from 'react-native';
import Global from '../globals/Globals';

const items = [
  {name : 'Emmanuel Niyenzima', mile : 17, isFollow : 'Pending'},
  {name : 'Nguoun Lykhim', mile : 12, isFollow : 'Following'},
  {name : 'Chanthea Tai', mile : 10, isFollow : 'noFollow'},
  {name : 'Nguoun Lykhim', mile : 12, isFollow : 'Following'},
  {name : 'Chanthea Tai', mile : 10, isFollow : 'noFollow'},
  {name : 'Nguoun Lykhim', mile : 12, isFollow : 'Following'},
  {name : 'Chanthea Tai', mile : 10, isFollow : 'noFollow'},
];
export default class FitnessWellnessTab extends Component {
  


  _renderFollow(object){
    let lists = object.map((item,i)=>{
      let mainColor = '';
      let type = '';
      let name = '';
      let text = '';
      if(item.isFollow === 'Pending'){
        mainColor = '#e67e22';
        type = 'MaterialCommunityIcons';
        name = 'reload';
        text = 'Pending';
      }else if(item.isFollow === 'noFollow'){
        mainColor = Global.COLOR.MAIN;
        type = 'FontAwesome';
        name = 'user-plus';
        text = 'Follow';
      }else if(item.isFollow === 'Following'){
        mainColor = '#27ae60';
        type = 'MaterialIcons';
        name = 'verified-user';
        text = 'Following';
      }
      
      return (
        <ListItem key={i} button onPress={()=>console.log(123)}>
            <Thumbnail size={80} source={require('../images/profile.jpg')} />
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.mile} Mile(s)</Text>
            </Body>
            <Right>
              <Button onPress={()=>console.log(321)} style = {[styles.button,{borderColor : mainColor}]} iconLeft small bordered>
                <Icon 
                style = {[styles.buttonIcon,{color : mainColor}]} 
                type = {type}
                name={name}/>
                <Text style = {[styles.buttonTexT,{color : mainColor}]} uppercase={false}>{text}</Text>
              </Button>
          </Right>
        </ListItem>
      );
    });
    return lists;
    
  }
  render() {

  

    return (
      <Container>
        <Content>
          <List>
            {this._renderFollow(items)}
           
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width : 100,
      justifyContent : 'center',
      borderColor : Global.COLOR.MAIN
    },
    buttonTexT : {
      fontSize : 13
    },
    buttonIcon  : {
      color : Global.COLOR.MAIN,
      fontSize : 15
    }
});
