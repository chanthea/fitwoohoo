import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Button,
  View
} from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {Button as NBButton, Text as NBText, Icon} from 'native-base';

const { ContextMenu, SlideInMenu, Popover } = renderers;

const Btn = () => {
  return (
    <TouchableOpacity  >
                    <Icon style={menuIcon} name='ios-apps-outline' />
                    <Text style={menuText}>More</Text>
                </TouchableOpacity>
  );
}

class PopUpMenu extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.state = { renderer: ContextMenu };
  }



  render() {
    return (
       
           <TouchableOpacity  >
             <Menu
          renderer={this.state.renderer}
          rendererProps={{ anchorStyle: styles.anchorStyle }}
        >
              <MenuTrigger>
                <Icon name='ios-apps-outline' />
                <Text >More</Text>
              </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                <MenuOption text='Context Menu'
                onSelect={() => this.setState({renderer: ContextMenu})}/>
                <MenuOption text='Slide-in Menu'
                />
                <MenuOption text='Popover'
                />
                <MenuOption text='Three (custom)' customStyles={optionStyles}
                />
                </MenuOptions>
            </Menu>
                
            </TouchableOpacity>
        
           
               
       
    );
  }

}

// const BasicExample = () => (
//   <MenuProvider customStyles={menuProviderStyles}>
//     <BasicExampleComponent />
//   </MenuProvider>
// )

export default PopUpMenu;

const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerOuterWrapper: {
    backgroundColor: 'orange',
    padding: 5,
    flex: 1,
  },
  triggerWrapper: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style : {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: 'green',
    padding: 5,
  },
  optionsWrapper: {
    backgroundColor: 'purple',
  },
  optionWrapper: {
    backgroundColor: 'yellow',
    margin: 5,
  },
  optionTouchable: {
    underlayColor: 'gold',
    activeOpacity: 70,
  },
  optionText: {
    color: 'brown',
  },
};

const optionStyles = {
  optionTouchable: {
    underlayColor: 'red',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: 'pink',
    margin: 5,
  },
  optionText: {
    color: 'black',
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 30,
  },
  backdrop: {
    backgroundColor: 'red',
    opacity: 0.5,
  },
  anchorStyle: {
    backgroundColor: 'blue',
  },
});

const menuProviderStyles = {
  menuProviderWrapper: styles.container,
  backdrop: styles.backdrop,
};