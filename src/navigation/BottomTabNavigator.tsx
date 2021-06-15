import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard';
import Details from '../screens/Details';
import Filter from '../screens/Filter';
import Settings from '../screens/Settings';
import Favorite from '../screens/Favorite';
import Add from '../screens/Add';
import {
  BottomTabParamList,
  DashboardParamList,
  DetailsParamList,
  FavoriteParamList,
  AddParamList,
  SettingsParamList,
} from '../types';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
  parseIconFromClassName,
} from 'react-native-fontawesome';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Dashboard">
      <BottomTab.Screen 
        name="Dashboard" 
        component={DashboardNavigator} 
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <FontAwesome
              style={{color:'white', fontSize: 24}}
              icon={SolidIcons.mapMarkedAlt}
            />
          ),
        }}
    />
      <BottomTab.Screen 
        name="Favorite" 
        component={FavoriteNavigator}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: () => (
            <FontAwesome
              style={{color:'white', fontSize: 24}}
              icon={SolidIcons.heart}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add" 
        component={AddNavigator} 
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: () => (
            <FontAwesome
              style={{color:'white', fontSize: 24}}
              icon={SolidIcons.plusCircle}
            />
          ),
        }}
      />
      <BottomTab.Screen 
        name="Settings" 
        component={SettingsNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => (
            <FontAwesome
              style={{color:'white', fontSize: 24}}
              icon={SolidIcons.userCog}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardNavigator() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false, headerTitle: 'Dashboard Title'}}
      />
      <DashboardStack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false, headerTitle: 'Details Title'}}
      />
      <DashboardStack.Screen
        name="Filter"
        component={Filter}
        options={{headerShown: false, headerTitle: 'Details Title'}}
      />
    </DashboardStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator<FavoriteParamList>();

function FavoriteNavigator() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="Favorite"
        component={Favorite}
        options={{headerShown: false, headerTitle: 'Favorite Title'}}
      />
    </FavoriteStack.Navigator>
  );
}

const AddStack = createStackNavigator<AddParamList>();

function AddNavigator() {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="Add"
        component={Add}
        options={{headerShown: false, headerTitle: 'Profile Title'}}
      />
    </AddStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false, headerTitle: 'Profile Title'}}
      />
    </SettingsStack.Navigator>
  );
}
