import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native'
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react'
import { auth } from '../../firebase-config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Adminlogin = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    const handleSignIn = () => {
      auth
       .signInWithEmailAndPassword(email, password)
       .then(async data => {
            const jwtToken = await data.user.getIdToken();
            AsyncStorage.setItem('token', jwtToken)
            navigation.replace('Adminhome')
       })
       .catch(error => alert(error.message))
   }

  return (
    <View style={styles.container}>
      <Text style={styles.hometopic}>Login</Text>
      
      <TextInput 
        style={styles.homeinput}
        placeholder='Enter Email'
        value={email}
        onChangeText={text => setEmail(text)}
      />

        <TextInput
            style={styles.homeinput}
            value={password}
            placeholder='Enter Password'
            onChangeText={text => setPassword(text)}
            secureTextEntry={passwordVisible}
            right={<TextInput.Icon style={{marginTop: 20}} name={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
            />
        <TouchableOpacity 
        style = {[styles.homebtn, styles.loginbtn]} disabled={!email || !password}
        onPress = {handleSignIn}
        >
            <Text style={styles.logintext}>
               Sign In
            </Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={styles.forgottext}
            onPress={() =>
                navigation.navigate('Forgotpassword')}
            >
               Forgot password?
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Adminlogin

const styles = StyleSheet.create({
  container: {
     flex: 1,
     textAlign: 'center',
     justifyContent: 'center',
  },
  hometopic: {
     fontSize: 30,
     fontWeight: 'bold',
     padding: 15,
     textAlign: 'center',
     justifyContent: 'center',
  },
  homeinput: {
      marginTop: 10,
      width: '80%',
      justifyContent: 'center',
      paddingLeft: 15,
      backgroundColor: '#fff',
      borderRadius: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 8,
      fontSize: 17,
      height: 40,
  },
  homebtn: {
      marginTop: 10,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 15,
      borderRadius: 5,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 8,
      height: 40,
  },
  loginbtn: {
      backgroundColor: '#0782F9',
  },
  registerbtn: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor:'#0782F9',
  },
  logintext: {
      color:'#fff',
      fontSize: 16,
  },
  forgottext: {
      color:'#0782F9',
      marginLeft: '10%',
      padding: 5,
  },
});