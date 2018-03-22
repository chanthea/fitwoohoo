import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Main</Text>
                <Button onPress={() => this.props.navigation.navigate("Detail")} title="Go to Detail" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MainScreen;