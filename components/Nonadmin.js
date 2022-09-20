import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

import React from 'react'

import Home from "../pages/Home";
import Dailytips from '../pages/Dailytips';
import Jackpot from '../pages/Jackpot';
import News from '../pages/News';

const Tab = createBottomTabNavigator();

const Nonadmin = () => {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Daily Tips') {
              iconName = focused ? 'football' : 'football-outline';
            } else if (route.name === 'Jackpot') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 15,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false, tabBarBadge: null }} />
        <Tab.Screen name="Daily Tips" component={Dailytips} options={{ headerShown: false, tabBarBadge: null }} />
        <Tab.Screen name="Jackpot" component={Jackpot} 
        options={{ 
          headerShown: false,
          }} />
        <Tab.Screen name="News" component={News} options={{ headerShown: false, tabBarBadge: null }} />
      </Tab.Navigator>
  );
}
export default Nonadmin;
