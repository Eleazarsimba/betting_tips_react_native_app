import { 
  View, 
  Text, 
  Button
} from 'react-native'
import React from 'react'
import { auth } from '../../firebase-config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adminpage = ({navigation}) => {
  const handleLogout = () => {
    auth
     .signOut()
     .then(user => {
        alert('You are logged out');
        AsyncStorage.clear();
        navigation.replace('Homepage')
     })
     .catch(error => alert(error.message))
 }
  return (
    <View>
      <Text>Adminpage hhjhgcxgsdhjkcvc hjhdfdh</Text>
      <Button
          onPress = {handleLogout}
            title="Logout"
            color="#89ABE3FF"
            accessibilityLabel="Clears async storage"
      />
    </View>
  )
}

export default Adminpage