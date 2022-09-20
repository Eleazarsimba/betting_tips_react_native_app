import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import React, {useState} from 'react'
import { auth } from '../../firebase-config';

const Resetpassword = () => {
    const [r_email, setEmail] = useState('');

    const handleReset = () => {
        auth
        .sendPasswordResetEmail(r_email)
        .then(() => {
            alert(`Your reset email was sent to ${r_email}`)
        })
        .catch((error) => {
            alert(error.message)
        });
     }

  return (
    <View style={styles.container}>
      <Text style={styles.hometopic}>Reset password</Text>
      
      <TextInput 
        style={styles.homeinput}
        placeholder='Enter Email'
        value={r_email}
        onChangeText={text => setEmail(text)}
      />

        <TouchableOpacity 
        style = {[styles.homebtn, styles.resetbtn]} disabled={!r_email}
        onPress = {handleReset}
        >
            <Text style={styles.resettext}>
               Send reset email
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Resetpassword

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
    },
    resetbtn: {
        backgroundColor: '#0782F9',
        height: 40,
    },
    resettext: {
        color:'#fff',
        fontSize: 16,
    },
  });