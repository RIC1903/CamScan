import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const  Stack = createStackNavigator();


import Main from './components/Main.js';

export default class App extends Component {
  render(){
    return (
      <View style={{flex:1}}>
        
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component={Main} options={{headerShown:false}}/>
            </Stack.Navigator>
          </NavigationContainer>  
      </View>

    )
  }
}
