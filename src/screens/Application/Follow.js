import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {Color} from '../../utils/Constant';
import * as api from '../../service/api';

const Follow = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocued = useIsFocused();
  console.log('route:', route.params.id);
  useEffect(() => {
    if (isFocued) {
      api.getSuivie(data.data).then(response => {
        console.log("follooooooooooooooooooooooooooooooooooooooooooooow",response.data.demande);
        if (response.data.demande == 'IMAGE') {
          navigate('Suivie photo', {id: data.data});
        } else if (response.data.demande == 'LOCALISATION') {
          navigate('Suivie localisation', {id: data.data});
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

export default Follow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
