import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {Avatar, Card, Layout, Text} from '@ui-kitten/components';
import {height, width} from '../../utils/Dimention';
import moment from 'moment/min/moment-with-locales';
import * as api from '../../service/api';
import { Color, Font } from "../../utils/Constant";

export default function Candidate({route}) {
  const {id} = route.params.id;
  const [candidate, setCandidate] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    api.getCandidate(route.params.id).then(response => {
      setCandidate(response.data);
      setLoading(false);
    });  }, []);



  const Header = props => (
    <View {...props} style={[styles.header]}>
      <Avatar
        source={{
          uri: `http://149.202.214.99:8085/PAC/Partner/${candidate.event.globalEvent.partner.image.name}`,
        }}
        resizeMode="center"
        style={styles.avatar}
      />
      <View>
        <Text category="h6">{candidate.event.name}</Text>
        <Text category="s1">{candidate.event.globalEvent.partner.name}</Text>
      </View>
    </View>
  );

  // ===============================================================================
  // ======================== Footer  ==============================================
  // ===============================================================================
  const Footer = props => (
    <>
      <View {...props}>
        <View style={styles.footerDetail}>
          <Text style={{fontWeight: 'bold', letterSpacing: 1.5}}>
            Vous êtes accepter de travailler dans cet événement
          </Text>
        </View>
        <View style={styles.footerDetail}>
          <Text category="s1">
            Start{' '}
            <Text category="s2" style={styles.timeAgo}>
              {' '}
              {moment(candidate.event.startDate).locale('fr').fromNow()}
            </Text>
          </Text>
        </View>
      </View>

      <View style={styles.footerDetail}>
        <View>
          <Text style={{fontWeight: 'bold', letterSpacing: 1.5}}>
            Cet événement se termine{' '}
            <Text style={[styles.timeAgo, {textDecorationLine: 'underline'}]}>
              {moment(candidate.event.endDate).locale('fr').fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <>
    {!candidate ? (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <ActivityIndicator size={50} color={Color.primary} />
        <Text style={{ fontFamily: Font.primary, fontSize: 16 }}>
          authentication ...
        </Text>
      </View>
    ) :(
    <KeyboardAvoidingView style={{flex: 1}}>
      <Layout style={styles.container}>
        <Card style={styles.card} header={Header} footer={Footer}>
          <Image
            source={{
              uri: `http://149.202.214.99:8085/PAC/Event/${candidate.event.image.name}`,
            }}
            style={styles.image}
            resizeMode="center"
          />
          <Text>{candidate.event.message}</Text>
        </Card>
      </Layout>
      <View>
        <Text style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>
          Date et lieux de travail
        </Text>
        <View>
          <FlatList
            data={candidate.locationdates}
            renderItem={({item, index}) => {
              console.log('item:.date', item.dates);
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
                    <View style={{width: '50%'}}>
                      <Text style={{}}> {item.location.name} </Text>
                    </View>
                    <FlatList
                      data={item.dates}
                      renderItem={({item, index}) => {
                        return (
                          <Text style={{fontWeight: 'bold'}}>
                            {moment(item.date).format('DD-MM-yyyy hh:mm')}
                            {'heures '}
                          </Text>
                        );
                      }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
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
