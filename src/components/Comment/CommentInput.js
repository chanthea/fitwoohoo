import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    Keyboard
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {Button, Icon, Toast} from 'native-base';
import Global from '../../globals/Globals';
import axios from '../../config/axios/axiosWithToken';

export default class CommentInput extends React.PureComponent{
    constructor(){
        super();
        this.state = {
              textValue: '',
             // marginBottom : 22,
              height : 40
            };
        
    }
   
  _onChange(event) {
    this.setState({ textValue: event.nativeEvent.text || '' });
  }

  _addComment = (comment,id_post) => {
    axios.post('/comment',{
      id_post: id_post,
      comment : comment
    }).then(res =>{
      this.props.addItem(res.data);
      this.setState({textValue : ''});
      Toast.show({
        text : 'Comment posted',
       });
    }).catch(error => {
        Toast.show({
          text : 'Server not responding',
          type : 'danger'
         });
      });
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
                //onSubmitEditing={Keyboard.dismiss}
                maxHeight={70}
                minHeight={40}
                autoCorrect={false}
                enableScrollToCaret
                autoFocus = {true}
                underlineColorAndroid= 'transparent'
                ref={(r) => { this._textInput = r; }}
            />
            {this.state.textValue.length > 0 &&
            <Button 
            onPress={()=>this._addComment(this.state.textValue,this.props.postId)}
            style={{height : 40, 
            marginTop : 
            this.state.height < 40 ? 0 : 
            this.state.height-40 < 30 ? this.state.height-40 :
            30
            }} 
            transparent>
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