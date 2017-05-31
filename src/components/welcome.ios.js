'use strict';
 
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const logo = require('../images/CMC_logo_2010.png');
 
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
 
class Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={logo} />
        <Text style={styles.description}>
          Welcome to the CMC's Guide for 14ers!
        </Text>
      </View>
    );
  }
}
 
module.exports = Welcome;