import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Color} from '../utils/Constant';
import * as api from '../service/api';

const LinkingId = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocued = useIsFocused()
  console.log('route:', route.params.id);
  useEffect(() => {
    if (isFocued) {

   
    api.getSuivie(route.params.id).then(response => {
      console.log(response);
      if (response.data.demande == 'IMAGE') {
        console.log('replyyyyyy photo');
        navigation.navigate('ReplyImage', {item: response.data});
      } else if (response.data.demande == 'LOCALISATION') {
        console.log('replyyyyyy location');
        navigation.navigate('Replylocalisation', {item: response.data});
      }
    });
  }
  }, [isFocued]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

export default LinkingId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
