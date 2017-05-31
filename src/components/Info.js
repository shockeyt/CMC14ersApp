'use strict';
 
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// var React = require('react-native');
// var {
//   StyleSheet,
//   View,
//   Text,
//   Component
// } = React;
 
var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82C6E2',
  }
});
 
class Info extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Info page!
        </Text>
      </View>
    );
  }
}
 
module.exports = Info;