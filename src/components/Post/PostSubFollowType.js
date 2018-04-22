import React, {Component} from 'react';
import { HeaderTab } from '../../components/common';
import {View, Text} from 'react-native';
import axios from '../../config/axios/axiosWithToken';
import MultiSelect from 'react-native-multiple-select';
import {Loading} from '../common';
import { Button, Icon} from 'native-base';

class PostSubFollowType extends Component {
    static navigationOptions = {
        tabBarVisible : false,
        drawerLockMode: 'locked-closed',
        swipeEnabled : false
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedItems : [],
            items : [],
            loading : true
        }
      }
    
    componentDidMount(){
        this._getSubFollowType();
    }
    _getSubFollowType = () =>{
        axios.get('/post/followtype/7/subfollowtype')
            .then(res=>{
                this.setState({
                    items : res.data,
                    loading : false
                })
            }).catch(error => {
                this.setState({
                    loading : false
                })
            });
    }
    componentWillMount(){
        this.setState({
            selectedItems : this.props.navigation.state.params.subFollowType
        })
    }
    onSelectedItemsChange= (selectedItems) => {
        this.setState({ selectedItems });
    };


    clearSelectedCategories = () => {
        this._multiSelect.removeAllItems();
     };

    _doneSelection =() => {
        this.props.navigation.state.params.setSubFollowType(this.state.selectedItems)
        this.props.navigation.goBack();
    }

    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            noRight = {true}
            actionButton = 
                {<Button transparent onPress={this._doneSelection}>
                    <Icon  style={{color : '#ffffff'}}  name='check' type='FontAwesome'/>
                </Button>
                }
            title = 'Family Follow Type'
            >
                {this.state.loading === true ? 
                <Loading/> :
                <View style={{
                    flex: 1, 
                    padding: 10, 
                    }}>
                    <MultiSelect
                       // hideTags
                        items={this.state.items}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={this.onSelectedItemsChange}
                        selectedItems={this.state.selectedItems}
                        selectText="Select Family Follow Type(s)"
                        searchInputPlaceholderText="Search Family Follow Type..."
                        tagRemoveIconColor="#CCC"
                        tagBorderColor="#CCC"
                        tagTextColor="#CCC"
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        searchInputStyle={{ 
                            color: '#CCC',
                         }}
                        selectedTextStyle ={{paddingLeft : 18, fontWeight : 'bold'}}
                        submitButtonColor="#CCC"
                        submitButtonText="Submit"
                        displayKey ='title'
                        fixedHeight = {true}
                        autoFocusInput = {true}
                         hideSubmitButton
                        />
                         <View>
                        {this.multiselect ? this.multiselect.getSelectedItemsExt():null}
                        </View>
                </View> 
                    }
            </HeaderTab>
        );
    }
}
export default PostSubFollowType;


