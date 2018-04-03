import React from 'react';
import {Header,Icon, Left, Right, Body, Text, Thumbnail} from 'native-base';
import {StyleSheet, Image, TouchableOpacity, View, Platform} from 'react-native';
import { connect } from 'react-redux';
import Global from '../globals/Globals';
class profileDrawer extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);

    }

    render(){
        const {user} = this.props.user;
        return(
            <View style={{ backgroundColor: 'transparent' }}>
            <Image
            
                style={styles.backgroundImage}
                source={{uri : Global.PHOTO.COVER+user.cover}}
                />
                    <TouchableOpacity>
                    <Header style={styles.drawerHeader}>
                        <Left>
                        <Thumbnail square source={{uri :Global.PHOTO.PROFILE+user.photo}}/>
                        </Left>
                        <Body style={{justifyContent : 'flex-start'}}>
                            <Text style={styles.name}>{user.name+' '+user.lastname} </Text>
                            <Text style={styles.viewProfile}>View your profile </Text>
                        </Body>
                    </Header>
                </TouchableOpacity>
            </View>
        );
    }
}
// const profileDrawer = (props)=> (
//     <View style={{ backgroundColor: 'transparent' }}>
//     <Image
    
//         style={styles.backgroundImage}
//         source={props.userPhoto}
//         />
//             <TouchableOpacity>
//             <Header style={styles.drawerHeader}>
//                 <Left>
//                 <Thumbnail square source={require('../images/profile.jpg')}/>
//                 </Left>
//                 <Body style={{justifyContent : 'flex-start'}}>
//                     <Text style={styles.name}>{props.userName}</Text>
//                     <Text style={styles.viewProfile}>View your profile </Text>
//                 </Body>
//             </Header>
//         </TouchableOpacity>
//     </View>

// );



const styles = StyleSheet.create({
    backgroundImage: {
        height: 150,
        width: "100%",
        alignSelf: "stretch",
        position: "absolute"
    },
    drawerHeader: {
      height: 150,
      backgroundColor:'transparent',
      paddingTop : 50,
    },
    drawerImage: {
      height: 70,
      width: 70,
      borderRadius : 2
    },
    name : {
        shadowColor: 'black',
        shadowOffset :{width : 1, height : -1},
        color : '#ffffff',
        fontSize: 14
    },
    viewProfile : {
        color : 'rgba(255,255,255,0.6)', 
        fontSize : 10,
        shadowColor: 'black',
        shadowOffset :{width : 1, height : -1},
    }
  
  })

  const mapStateToProps = state => {
    return state.user;
  }
export default connect(mapStateToProps)(profileDrawer);