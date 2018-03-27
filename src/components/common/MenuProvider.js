import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Menu,{
  MenuProvider,
} from 'react-native-popup-menu';

const menuPopUp = (props) => (
    <MenuProvider customStyles={menuProviderStyles}>
      {props.children}
    </MenuProvider>
  )
const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 30,
    },
    backdrop: {
      backgroundColor: 'red',
      opacity: 0.5,
    }
  });
  
  const menuProviderStyles = {
    menuProviderWrapper: styles.container,
    backdrop: styles.backdrop,
  };
export {menuPopUp}