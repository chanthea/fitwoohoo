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

export default class EditPost extends React.Component{
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
              height : 40,
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

    _saveEditedComment = () => {
        const { params } = this.props.navigation.state;
        params.editcomment(params.item.id,this.state.textValue);
        this.props.navigation.goBack();
    }


    render(){
        const { params } = this.props.navigation.state;
       // console.log(params);
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
                <Button light onPress={()=>this.setState({textValue : ''})} rounded small 
                style={{
                    marginRight : 3,
                }}
                >
                    <NBText style={{color : 'rgba(0,0,0,0.6)'}}>Reset</NBText>
                </Button>
                <Button rounded 
                disabled={this.state.textValue !== params.item.comment ? false : true} 
                onPress={this._saveEditedComment} small 
                style={{
                    marginLeft : 3,
                    backgroundColor : this.state.textValue !== params.item.comment ? '#0984e3' : '#74b9ff'
                }}
                
                >
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