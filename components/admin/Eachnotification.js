import { 
    View, 
    Text, 
    TouchableOpacity,
    Alert 
} from 'react-native'
import React from 'react'
import { store } from '../../firebase-config';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Eachnotification = ({route, navigation}) => {
    store
    .collection('notifications')
    .doc(route.params.item.id)
    .update({Read: true})
    .then(() => {
        console.log('Notification read')
    })

const deleteSelected = () => {
    const ref = store
    .collection('notifications')
    .doc(route.params.item.id);
        try {
            Alert.alert(
            'Are you sure?',
            'Are you sure you want to delete?',
            [
                {
                text: 'Cancel',
                onPress: () => null,
                },
                {
                text: 'Delete',
                onPress: async () => {
                    await ref.delete()
                    navigation.navigate('Notifications')
                }
                }
            ]
            )
        } catch (err) {
        console.error(err);
        }
}
  return (
    <View style={{padding: 20}}>
        <Text style={{fontSize: 14, color: '#0000ff'}}>{route.params.item.Time}</Text>
        <Text style={{fontSize: 17}}>{route.params.item.Info}</Text>

        <View style={{ flexDirection: 'row',alignSelf: 'flex-end', marginRight: 2, position: 'absolute', marginTop: 20}}>
            <TouchableOpacity style={{marginTop: -20, padding: 10}} onPress={deleteSelected}>
                <AntDesign name="delete" size={30} color="#000" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Eachnotification 