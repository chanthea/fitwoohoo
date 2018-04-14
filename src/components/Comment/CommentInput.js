import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {Button, Icon} from 'native-base';
import Global from '../../globals/Globals';

export default class CommentInput extends React.PureComponent{
    constructor(){
        super();
        this.state = {
              textValue: '',
              marginBottom : 22,
              height : 40
            };
        
    }
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{
            this.setState({marginBottom: 22});
        });
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',()=>{
            this.setState({marginBottom:0});
        });
      }
    
    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
  _onChange(event) {
    this._onCheckKeyboard()
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
                maxHeight={70}
                minHeight={40}
                autoCorrect={false}
                enableScrollToCaret
                autoFocus = {true}
                underlineColorAndroid= 'transparent'
                ref={(r) => { this._textInput = r; }}
            />
            {this.state.textValue.length > 0 &&
            <Button style={{height : 40, 
            marginTop : 
            this.state.height < 40 ? 0 : 
            this.state.height-40 < 30 ? this.state.height-40 :
            30
            }} 
            transparent>
                {/* <NBText style={{color : Global.COLOR.MAIN, paddingRight : 0}}>Comment</NBText> */}
                <Icon name='send' type="FontAwesome" style={{color : Global.COLOR.MAIN  }} />
            </Button>
            }
        </View>
        );
    }
}

const styles = StyleSheet.create({
    commentBox : {flexDirection : 'row',
    padding : 5,
    borderTopColor : Global.COLOR.MAIN,
    borderTopWidth : 1,
    backgroundColor : 'white',
    justifyContent :'flex-start'
},
  textInput: {
    paddingLeft: 10,
    fontSize: 17,
    backgroundColor: 'white',
    borderWidth: 0,
    // borderRadius: IsIOS ? 4 : 0,
    borderRadius : 3,
    flex :1
  },
});