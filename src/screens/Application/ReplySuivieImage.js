import React, {useState, useEffect} from 'react';
import {height, width} from '../../utils/Dimention';
import * as api from '../../service/api';
import {StyleSheet, SafeAreaView, View, Image, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {navigate} from '../../navigation/RootNavigation';
import {Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {suiviUploadUrl} from '../../atom/eventState';
import {showMessage} from 'react-native-flash-message';

export default function ReplySuivieImage({route}) {
  const item = route.params.item;
  console.log('item:', item.media);
  const navigation = useNavigation();
  const imageUrl = useRecoilValue(suiviUploadUrl);

  useEffect(() => {
    getReplayImageFollow()
  }, []);

  const getReplayImageFollow = async () => {

    return false;
  };
  async function ok() {
    api.suivieReply(item.id, 'OK').then(res => {
      showMessage({
        message: "Confirmation d'image a été effectuer avec succes",
        type: 'success',
        autoHide: true,
        icon: 'success',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'Acceuil'}],
      });
    });
  }
  async function notOK() {
    api.suivieReply(item.id, 'NOT_OK').then(res => {
      showMessage({
        message: "Reclamation d'image a été effectuer avec succes",
        type: 'success',
        autoHide: true,
        icon: 'success',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'Acceuil'}],
      });
    });
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          width: width / 1.2,
          // borderWidth: 1,
          alignSelf: 'center',
          margin: '3%',
          padding: 10,
          borderRadius: 10,
        }}>
        <Image
          source={
            item.media.name
              ? {uri: `${imageUrl}${item.media.name}`}
              : require('../../../assets/images/noImage.png')
          }
          resizeMode="center"
          style={styles.image}
        />
      </View>

      <View>
        <View style={{paddingLeft: 16}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Animator : {item.receiver.firstName} {item.receiver.lastName}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Event : {item.event.name}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Date : {item.sendDate}
          </Text>
        </View>

        <View
          style={{
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '5%',
          }}>
          <Button
            style={{marginTop: '10px'}}
            title="Reclamer l'image "
            onPress={() => notOK()}
          />
          <Button title="Confimer l'image " onPress={() => ok()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  card: {
    margin: 2,
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 24,
  },
  image: {
    height: height / 4,
    marginBottom: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  timeAgo: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: 'green',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerDetail: {
    alignSelf: 'center',
  },
});
