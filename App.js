import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './components/Homepage';
import Nonadmin from './components/Nonadmin';
import Adminlogin from './components/admin/Adminlogin';
import Adminpage from './components/admin/Adminpage';
import Resetpassword from './components/admin/Resetpassword';

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
          options={{ title: 'SIGN IN' }}
        />
         <Stack.Screen
          name='Forgotpassword'
          component={Resetpassword}
          options={{ title: 'RESET PASSWORD' }}
        />
        <Stack.Screen
          name='Adminhome'
          component={Adminpage}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;