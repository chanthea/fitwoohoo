import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

const  Loading = () => {
   return  <View style={{flexGrow: 1, backgroundColor : 'white', justifyContent :'center'}}>
    <ActivityIndicator size='large'/>
    <Text style={{textAlign : 'center'}}>Loading....</Text>
    </View>
}
export {Loading};