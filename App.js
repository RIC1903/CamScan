import React, { Component } from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from  "react-native-splash-screen";

const  Stack = createStackNavigator();


import Main from './components/Main.js';
import Converter from './components/main/Converter.js';

export default class App extends Component {
  componentDidMount(){
    SplashScreen.hide();
  }
  render(){
    return (
      <View style={{flex:1}}>
        
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CamScan">
              <Stack.Screen name="CamScan" component={Main} />
              <Stack.Screen name="Converter" component={Converter} options={{headerTitle:'CamScan'}}/>
            </Stack.Navigator>
          </NavigationContainer>  
      </View>
      

    )
  }
}
