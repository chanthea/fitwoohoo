import React from 'react';
import {View}  from 'react-native';
import {Platform} from 'react-native';

export const _paddingAndroid = () => Platform.OS === 'android' ?  24 :  0;
export const wrapper = (props) => <View style={{backgroundColor : Global.COLOR.MAIN}}>{this.props.children}</View>;
export const _checkUserRole = (role_id) => {
    let user = [1];
    let trainer = [2,3,4,5];
    let business = [6,7];
    if(user.includes(role_id)) return 'User';
    else if(trainer.includes(role_id)) return 'Trainer';
    else if(business.includes(role_id)) return 'Business';
}