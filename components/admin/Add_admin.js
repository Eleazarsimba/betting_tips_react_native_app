import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-paper';
import { auth } from '../../firebase-config'

import axios from 'axios'

const Add_admin = () => {
    const [email, setEmail] = useState('');
    const password = 'OfishoTip'
    const [animate, setAnimate] = useState(false);
    const url = 'https://send-email-for-ofisho-app.herokuapp.com/'

    let data = {
        email: email
    }

    const handleSignUp = () => {
       setAnimate(true)
       auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            axios.post(url, data)
                .then(function (response) {
                    // handle success
                    alert(`${email} has been registered successfully`);
                    setEmail('')
                    setAnimate(false)
                })
                .catch(function (error) {
                    // handle error
                    setAnimate(false)
                    console.log(error.response.data.error);
                })
        })
        .catch(error => {
            alert(error.message)
            setAnimate(false)
        })
    }
  return (
    <View style={styles.container}>
      <Text style={styles.hometopic}>Register</Text>
      <TextInput 
        style={styles.homeinput}
        placeholder='Enter Email'
        value={email}
        onChangeText={text => setEmail(text)}
      />
        <TouchableOpacity 
        style = {[styles.homebtn, styles.registerbtn]}
        disabled={!email}
        onPress = {handleSignUp}
        >
            { animate === false ? <Text style={styles.regtext}>
               Register
            </Text> :
            <ActivityIndicator animating={animate} size="small" />}
        </TouchableOpacity>
    </View>
  )
}

export default Add_admin

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
    registerbtn: {
        backgroundColor: '#0782F9',
    },
    regtext: {
        color:'#fff',
        fontSize: 16,
    },
  });