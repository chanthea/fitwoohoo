import React from 'react';
import { TabNavigator,TabBarBottom, StackNavigator } from 'react-navigation';
import LibraryPhoto from '../LibraryPhoto';
import LibraryVideo from '../LibraryVideo';
import LibraryAudio from '../LibraryAudio';
import Global from '../../globals/Globals';
import { Library } from '../../containers';
import PhotoDetail from '../ImageGallery';
import {Ionicons} from 'native-base';
import Photo from '../Photo';

const LibraryStack = StackNavigator({
        ProfilePhotosIndex : {screen : Library },
        PhotoDetail : {screen : PhotoDetail}
    });


export default LibraryStack;
