import React, { Component } from 'react';
import { StyleSheet, Text as RNText, Platform} from 'react-native';
import { BlurView } from 'expo';
import Dialog from "react-native-dialog";
import { List, ListItem, Thumbnail, Body, Left, Right, View, Text, Icon, Button,Badge } from 'native-base';
const styles = StyleSheet.create({
  container : {
    flexDirection : 'column',
    backgroundColor : 'transparent',
   borderBottomWidth  : 0.3,
   borderBottomColor : 'rgba(0,0,0,0.1)'
  },
  topContainer : {
    height : 110,
    marginLeft : 0,
    borderBottomWidth : 0,
  // backgroundColor : 'blue',
   marginBottom : -10
  },
  topBody : {height : '100%',flexGrow :1,  flexDirection : 'column', justifyContent : 'space-between' },
  topBodyText : {fontSize : 16, paddingLeft : 10, fontWeight : 'bold', paddingBottom : 10},
  topBodyViewContainer : {paddingLeft : 15},
  topBodyNote : {fontSize : 10, justifyContent : 'flex-end'},
  topBodyText : { color : '#000000'},
  topBodyTextIcon : {color : 'rgba(0,0,0,0.5)', fontSize : 13},
  topRight : {
    width : 80,
    //backgroundColor: 'white',
    paddingLeft : 30,
  },
  topRightView : {
    height : 80,
    width : 80,
    backgroundColor : '#2ecc71',
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection :'column',
    borderRadius : 3
  },
  day :{fontSize : 40, color : '#ffffff', fontWeight : 'bold', marginBottom : -6, paddingBottom :0},
  month : {fontSize : 28, color : '#ffffff', fontWeight : 'bold', marginTop : -8, marginBottom : 5, paddingTop : 0, },
  bottomContainer : {
    paddingTop : 0,
    borderBottomWidth : 0,
   // backgroundColor : 'green',
    marginTop : -7
  },
  bodyBottom :{borderBottomWidth : 0},
  name : {fontSize : 12, color : '#000000'},
  createat : {fontSize : 9, color :'rgba(0,0,0,0.6)'},
  iconOptionContainer : {flexDirection : 'row' },
  iconOption  : {color : 'rgba(0,0,0,0.6)', padding : 0, marginLeft : 9, marginRight : 9},
  iconButton : {}
});
export default class Activity extends Component{
  constructor(props){
    super(props);
    this.state = {
      dialogVisible: false
    };
  }


 
  showDialog = () => {
    this.setState({ dialogVisible: true });
    console.log('show triggered');
  };
 
  handleCancel = () => {
    this.setState({ dialogVisible: false });
    console.log('cancel triggered');
  };
 
  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
    console.log('delete triggered');
  };
  


  render() {
    
    const blurComponentIOS = (
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="xlight"
        blurAmount={50}
      />
    )
    const DialogPrompt= () => (
        <Dialog.Container
          visible={this.state.dialogVisible}
          blurComponentIOS={blurComponentIOS}
        >
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={()=>this.handleCancel()} />
          <Dialog.Button label="Delete" onPress={()=>this.handleCancel()} />
      </Dialog.Container>
    );
    return (
      <View style={styles.container}>
        <ListItem style={styles.topContainer}>
          <Body style={styles.topBody}>
            <Text numberOfLines={2} style={styles.topBodyText}>Swimming  along with friends 1  along with friends 1  along with friends 1  along with friends 1</Text>
            <View style={styles.topBodyViewContainer}>
               <Text note style={styles.topBodyNote}>
                <Icon style={styles.topBodyTextIcon} name="ios-pricetags-outline"/> Workout
              </Text>
              <Text note style={styles.topBodyNote}>
                <Icon style={styles.topBodyTextIcon} name="ios-pin-outline"/> Phnom Penh
              </Text>
            </View>
           
          </Body>
          <Right style={styles.topRight}>
            <View style={styles.topRightView}>
              <RNText style={styles.day}>14</RNText>
              <RNText style={styles.month}>Dec</RNText>
            </View>
          </Right>
        </ListItem>
          <ListItem avatar style={styles.bottomContainer}>
          <Left>
            <Thumbnail small source={require('../images/profile.jpg')} />
          </Left>
          <Body style={styles.bodyBottom}>
            <Text style={styles.name}>Kumar Pratik</Text>
            <Text note style={styles.createat}>5 minutes ago</Text>
          </Body>
          <Right style={{width : 170}}>
            <View style={styles.iconOptionContainer}>
              <Badge style={{flexDirection : 'row', backgroundColor : '#2ecc71'}}>
              <Icon name="ios-clock" style={{ fontSize: 14, color: "#fff", lineHeight: 25 }}/>
              <Text style={{fontSize: 13, lineHeight : 25}}>9 : 00 AM</Text>
            </Badge>
              <Button style={styles.iconButton} small transparent>
                <Icon style={styles.iconOption} name="ios-contacts-outline" />
              </Button>
              <Button onPress={this.showDialog} style={styles.iconButton} small transparent>
                <Icon style={styles.iconOption} name="md-more" />
              </Button>
            </View>
          </Right>
        </ListItem>
        <DialogPrompt/>
    </View>
    );
  }
};


