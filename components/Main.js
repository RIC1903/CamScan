import React, { Component } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab=createMaterialBottomTabNavigator();

import Scan from './main/Scan.js';
import Docs from './main/Docs.js';


export class Main extends Component {
    
    render() {
        
        return (
            <Tab.Navigator initialRouteName="Docs" activeColor="#f0edf6"
            inactiveColor="#3e2434"
            barStyle={{ backgroundColor: '#576F90'}}>
                <Tab.Screen name="Docs" component={Docs}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="image"  color={color} size={26}/>
                    )
                }}/>
                <Tab.Screen name="Scan" component={Scan}
                options={{
                    tabBarIcon: ({color,size}) => (
                        <MaterialCommunityIcons name="scanner"  color={color} size={26}/>
                    )
                }}/>
            </Tab.Navigator>
        );
    }
}

export default Main;