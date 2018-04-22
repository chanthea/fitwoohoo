import React, {Component} from 'react';
import { HeaderTab } from '../../components/common';
import {View, Text} from 'react-native';
import axios from '../../config/axios/axiosWithToken';
import MultiSelect from 'react-native-multiple-select';
import {Loading} from '../common';

class PostFollowType extends Component {
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
        this._getFollowType();
    }
    _getFollowType = () =>{
        axios.get('/post/followtype')
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
            selectedItems : [this.props.navigation.state.params.followType.id]
        })
    }
    onSelectedItemsChangeSingle = (selectedItems) => {
       const { params } = this.props.navigation.state
        let type = this._getTypeTitle(selectedItems[0]);
        params.setFollowType(selectedItems[0],type)
        this.props.navigation.goBack();
    };

    _getTypeTitle = (id) => {
        let type;
        this.state.items.map((val,i)=>{
            if(val.id === id){
                type = val.type
            } 
        });
        return type;
    }

    render(){
        return(
            <HeaderTab 
            goBackPressed = {()=>this.props.navigation.goBack()}
            noRight = {false}
            title = 'Follow Type'
            >
                {this.state.loading === true ? 
                <Loading/> :
                <View style={{
                    flex: 1, 
                    padding: 10, 
                    }}>
                    <MultiSelect
                        single
                        items={this.state.items}
                        uniqueKey="id"
                        onSelectedItemsChange={this.onSelectedItemsChangeSingle}
                        selectedItems={this.state.selectedItems}
                        selectText="Select Follow Type"
                        searchInputPlaceholderText="Search Follow Type..."
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
                        displayKey ='type'
                         hideSubmitButton
                        />
                </View> 
                    }
            </HeaderTab>
        );
    }
}
export default PostFollowType;


