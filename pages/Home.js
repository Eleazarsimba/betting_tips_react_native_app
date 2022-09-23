import {  
    StyleSheet, 
    StatusBar, 
    ScrollView, 
    View, 
    Text, 
    TouchableOpacity,
    Linking,
    TextInput,
    Alert,
    ActivityIndicator
} from 'react-native'
import React, {useState} from 'react'
import { store } from '../firebase-config';

const Home = () => {
    const [game, setGame] = useState('');
    const [tip, setTip] = useState('');
    const [username, setUsername] = useState('');

    const [animate, setAnimate] = useState(false);

    const handleSignIn = () => {
      setAnimate(true)
      store.collection('yourPredictions')
      .add({
        Game: game,
        Tip: tip,
        Username: username,
      })
      .then(() => {
        store.collection('notifications').add({
          Info: `${username} predicted ${tip} in ${game} match`,
          Time: new Date().toLocaleString(),
          Read: false
        })
        //clear all input values in the form
        setGame('');
        setTip('');
        setUsername('')
        setAnimate(false)
        Alert.alert(
          "OFISHO PREDICTION",
          `Your prediction on the match ${game} is ${tip}`,
          [
            {
              text: "Ok",
              onPress: () => Alert.alert("Thanks for yor prediction"),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
          }
        );
      });
        
     }
  return (
    <ScrollView>
    <StatusBar backgroundColor="#79A7D3" barStyle="light-content" />
    <View>
        <View style={styles.titleBar}>
            <Text style={styles.titleName}>OFISHO TIPS</Text>
            <Text style={styles.titleText}>Daily Free Tips and Jackpot Tips.</Text>
        </View>
        <View style={styles.homePage}>
            <Text style={styles.homeText}>
            We use teams performance, table standings and the two teams head to head statistics
            to make our predictions.
            {"\n"}
            {"\n"}
             Our predictions are free and are posted daily by the admin.
            It is not a guarantee that you will win every day but, we can guarantee you that you
            will not loose every day.
            {"\n"}
            {"\n"}
            We offer free jackpot tips which our experts also place their bets. 
            {"\n"}
            {"\n"}
            The Jackpot predictions are mainly for: {"\n"}
           
               <Text>1. Mozzartbet daily jackpot.</Text> {"\n"}
               <Text>2. Mozzart super grand jackport.</Text> {"\n"}            
            {"\n"}
            To join our whatsapp group 
            <Text
                style={{color: 'blue'}}
                onPress={() => {
                Linking.openURL('https://chat.whatsapp.com/JGCoWquRkqr4lU6WhEONOw');
                }}> Click Here
            </Text>
            {"\n"}
            {"\n"}
            <Text>Good Luck All
                {"\n"}
                Give your prediction here:
                {"\n"}
            </Text>
            </Text>
            
            <Text>Username:</Text>
            <TextInput
                style={styles.inputTeams}
                placeholder='eg. John_doe'
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <Text>Teams:</Text>
            <TextInput
                style={styles.inputTeams}
                placeholder='eg. Team A vs Team B'
                onChangeText={text => setGame(text)}
                value={game}
            />
            <Text>Prediction:</Text>
            <TextInput
                style={styles.inputTeams}
                placeholder='eg. Team A Win'
                onChangeText={text => setTip(text)}
                value={tip}
            />
            <TouchableOpacity 
                style = {[styles.predict]} 
                disabled={!game || !tip }
                onPress = {handleSignIn}
                >
            { animate === false ? <Text style={styles.predicttext}>
               Predict
            </Text> :
            <ActivityIndicator animating={animate} size="small" />}
        </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  titleBar: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00008b'
  },
  titleName: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  titleText: {
    color: '#fff',
    fontSize: 12,
    paddingLeft: 130
  },
  homePage: {
    padding: 20,
  },
  homeText: {
    fontSize: 20,
    textAlign: 'justify',
  },
  item: {
    padding: 5,
    fontSize: 18,
    height: 44,
  },
  inputTeams: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  predict: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 40,
    margin: 5,
    backgroundColor: '#6883BC',
},
predicttext: {
    color:'#fff',
    fontSize: 16,
},
});