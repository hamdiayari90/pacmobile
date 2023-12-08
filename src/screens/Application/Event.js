import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {Avatar, Card, Layout, Text} from '@ui-kitten/components';
import {CustumButtom} from '../../components/CustumButtom/CustumButtom';
import {height, width} from '../../utils/Dimention';
import moment from 'moment';
import {Color} from '../../utils/Constant';
import {navigate} from '../../navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as api from '../../service/api';

export default function Event({route}) {
  const {id} = route.params;
  console.log('id in event screeen =====> \n:', id);
  const [event, setEvent] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    api.getEvent(id).then(response => {
      setEvent(() => response.data);
    });
  }, []);

  async function submit() {
    const value = await AsyncStorage.getItem('user').then(res => {
      setUser(JSON.parse(res));
      api.applyOnEvent(JSON.parse(res).login, event.id).then(res => {
        navigate('Acceuil');
      });
    });
  }

  const Header = props => (
    <View {...props} style={[styles.header]}>
      <Avatar
        source={{
          uri: `http://149.202.214.99:8085/PAC/Partner/${event.globalEvent.partner.image.name}`,
        }}
        style={styles.avatar}
      />
      <View>
        <Text category="h6">{event.name}</Text>
        <Text category="s1">{event.products[0].name}</Text>
      </View>
    </View>
  );

  // ===============================================================================
  // ======================== Footer  ==============================================
  // ===============================================================================
  const Footer = props => (
    <>
      <View {...props} style={[styles.footerContainer]}>
        <Text category="s1">
          Start{' '}
          <Text category="s2" style={styles.timeAgo}>
            {' '}
            {moment(event.startDate).endOf('day').fromNow()}
          </Text>
        </Text>
        <Text category="s2" style={styles.timeAgo}>
          <Text category="s1">Postuler avant </Text>
          {moment(event.expirationDate).endOf('day').locale('fr').fromNow()}
        </Text>
      </View>

      <View style={styles.footerDetail}>
        <View>
          <Text style={{fontWeight: 'bold', letterSpacing: 1.5}}>
            Cet événement commance dans{' '}
            <Text style={[styles.timeAgo, {textDecorationLine: 'underline'}]}>
              {moment(event.endDate).endOf('day').fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <>
      {event ? (
        <SafeAreaView style={{flex: 1}}>
          <Layout style={styles.container}>
            <Card style={styles.card} header={Header} footer={Footer}>
              <Image
                source={{
                  uri: `http://149.202.214.99:8085/PAC/Event/${event.image.name}`,
                }}
                style={styles.image}
              />
              <Text>{event.message}</Text>
            </Card>
          </Layout>
          <View>
            <Text
              style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>
              Lieux de deroulement de l'événement
            </Text>
            <View>
              <FlatList
                data={event.zone.locations}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        marginLeft: width / 6,
                        flexDirection: 'row',
                        marginVertical: '1%',
                      }}>
                      <View
                        style={{
                          width: '50%',
                          flexDirection: 'row',
                          marginVertical: '1%',
                        }}>
                        <EvilIcons name="location" size={24} color="black" />
                        <Text style={{fontWeight: 'bold'}}>{item.name} </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <Text style={{}}> zone {event.zone.name} </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustumButtom
              color={Color.secondary}
              title="anuller"
              onPress={() => navigate('Acceuil')}
            />
            <CustumButtom
              color={Color.secondary}
              title="postuler"
              onPress={() => submit()}
              visible={true}
            />
          </View>
        </SafeAreaView>
      ) : (
        <ActivityIndicator size={25} color={Color.primary} />
      )}
    </>
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
