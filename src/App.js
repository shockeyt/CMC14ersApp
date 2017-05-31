'use strict';

import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />);

let Welcome = require('./components/welcome.ios');
let COmap = require('./components/COmap');
let Info = require('./components/Info');
let Peak = require('./components/Peak');
let Register = require('./components/Register');
let More = require('./components/more.ios');


export default class CMC14ersApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'welcome'
    };
  }
  render() {
      return (
        <TabBarIOS 
          unselectedTintColor="#82C6E2"
          tintColor="white"
          unselectedItemTintColor="#70CE9B"
          barTintColor="#234F33"
          selectedTab={this.state.selectedTab}>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'welcome'}
            //systemIcon="featured"
            title="Home"
            iconName="tree"
            onPress={() => {
                this.setState({
                    selectedTab: 'welcome',
                });
            }}>
              <Welcome/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'peak'}
            //icon={{uri:'contacts'}}
            //systemIcon="search"
            title="Peaks"
            iconName="picture-o"
            onPress={() => {
                  this.setState({
                      selectedTab: 'peak',
                  });
            }}>
            <Peak/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'comap'}
            //icon={{uri:'contacts'}}
            //systemIcon="bookmarks"
            title="Map"
            iconName="map"
            onPress={() => {
                  this.setState({
                      selectedTab: 'comap',
                  });
            }}>
            <COmap/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'register'}
            //icon={{uri:'contacts'}}
            //systemIcon="history"
            title="Register"
            iconName="pencil"
            onPress={() => {
                  this.setState({
                      selectedTab: 'register',
                  });
            }}>
            <Register/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            selected={this.state.selectedTab === 'info'}
            //icon={{uri:'contacts'}}
            //systemIcon="more"
            title="Info"
            iconName="map-signs"
            onPress={() => {
                  this.setState({
                      selectedTab: 'info',
                  });
            }}>
            <Info/>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      );
    }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });