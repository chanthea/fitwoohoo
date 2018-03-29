import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, SwipeRow, View, Text, Icon, Button } from 'native-base';
class Activity extends Component{
  render() {
    return (
          <SwipeRow
            leftOpenValue={75}
            rightOpenValue={-150}
            left={
              <Button success onPress={() => alert('Add')}>
                <Icon active name="add" />
              </Button>
            }
            body={
              <View>
                <Text>SwipeRow Body Text</Text>
              </View>
            }
            right={
              <View>
                <Button danger onPress={() => alert('Trash')}>
                <Icon active name="trash" />
              </Button>
              <Button danger onPress={() => alert('Trash')}>
              <Icon active name="trash" />
            </Button>
                </View>
              
            }
          />
    );
  }
}
export default Activity;

const styles = StyleSheet.create({

});
