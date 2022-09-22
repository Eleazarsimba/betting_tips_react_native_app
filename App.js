import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';
import Nonadmin from './components/Nonadmin';
import Adminlogin from './components/admin/Adminlogin';
import Adminpage from './components/admin/Adminpage';
import Resetpassword from './components/admin/Resetpassword';
import Add_admin from './components/admin/Add_admin';
import DailyTips from './components/admin/DailyTips';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen
          name='Homepage'
          component={Homepage}
          options={{ title: '' }}
        />
        <Stack.Screen
          name='Userhome'
          component={Nonadmin}
          options={{ title: '' }}
        />
        <Stack.Screen
          name='Login'
          component={Adminlogin}
          options={{ title: 'HOME' }}
        />
         <Stack.Screen
          name='Forgotpassword'
          component={Resetpassword}
          options={{ title: 'SIGN IN' }}
        />
        <Stack.Screen
          name='Adminhome'
          component={Adminpage}
          options={{ title: ''}}
        />
        <Stack.Screen
          name='Addadmin'
          component={Add_admin}
          options={{ title: 'DASHBOARD'}}
        />
        <Stack.Screen
          name='AdminTips'
          component={DailyTips}
          options={{ title: 'DASHBOARD'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;