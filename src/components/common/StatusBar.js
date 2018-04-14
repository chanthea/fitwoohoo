import React from 'react';
import Global from '../../globals/Globals'
import {View } from 'react-native';
import { Constants } from 'expo';
const StatusBar = props => (
        <View style={{
            backgroundColor: Global.COLOR.MAIN,
            height: Constants.statusBarHeight,
          }} />
       
        );
export {StatusBar};