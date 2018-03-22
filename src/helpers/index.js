import React from 'react';
import {View}  from 'react-native';
import {Platform} from 'react-native';

export const _paddingAndroid = () => Platform.OS === 'android' ?  24 :  0;
export const wrapper = (props) => <View style={{backgroundColor : Global.COLOR.MAIN}}>{this.props.children}</View>;