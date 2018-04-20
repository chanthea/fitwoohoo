import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {Button, Icon, Text as NBText} from 'native-base';
import Global from '../../globals/Globals';

export default class EditComment extends React.Component{
    static navigationOptions = {
        title : 'Edit comment',
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false,
        headerStyle : {
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
        }
    }
    constructor(){
        super();
        this.state = {
              textValue: '',
              height : 40
            };
    }

    componentWillMount(){
         const { params } = this.props.navigation.state;
         this.setState({
            textValue : params.item.comment
         });
    }

    _onChange(event) {
        this.setState({ textValue: event.nativeEvent.text || '' });
    }


    render(){
        return(
        <View style={[styles.commentBox,{marginBottom : this.state.marginBottom}]}>
            <AutoGrowingTextInput
                value={this.state.textValue}
                onChange={(event) => this._onChange(event)}
                style={[styles.textInput]}
                placeholder='Write your comments...'
                placeholderTextColor='#66737C'
                onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                onSubmitEditing={Keyboard.dismiss}
                maxHeight={200}
                minHeight={40}
                autoCorrect={false}
                enableScrollToCaret
                autoFocus = {true}
                underlineColorAndroid= 'transparent'
                ref={(r) => { this._textInput = r; }}
            />
            <View style={{
                justifyContent : 'center', 
                alignItems : 'center', 
                flex : 1, 
                flexDirection : 'row',
                marginTop : 10
                }}>
                <Button onPress={()=>console.log(2)} small rounded style={{borderColor : 'rgba(0,0,0,0.3)', marginRight : 3}}  bordered>
                    <NBText style={{color : 'rgba(0,0,0,0.3)'}}>Cancel</NBText>
                </Button>
                <Button onPress={() => console.log(321)} small rounded info bordered style={{marginLeft : 3}}>
                    <NBText>Save</NBText>
                </Button>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    commentBox : {
    flexDirection : 'column',
    padding : 5,
    backgroundColor : 'white',
    justifyContent :'flex-start',
    flex :1
},
  textInput: {
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius : 3,
    flex :1,
    textAlignVertical: "top"
  },
});