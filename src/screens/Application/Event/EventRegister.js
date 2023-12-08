//EventRegister
import moment from "moment";
import React, { Component } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { CustumButtom } from "../../../components/CustumButtom/CustumButtom";
import { navigationRef } from "../../../navigation/RootNavigation";
import { Color, Size } from "../../../utils/Constant";
import { width } from "../../../utils/Dimention";

export class EventRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      selectedEndDate: null,
      event: {
        id: "697dc5ed-a91c-4720-a63b-838ef38dd64a",
        name: "Summer With Argilo",
        startDate: "2023-01-04T09:33:47Z",
        endDate: "2023-01-10T09:33:54Z",
        expirationDate: "2023-01-13T09:34:08Z",
        status: false,
        message:
          "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock",
        image: {
          id: "b399f228-ac6d-4c4b-97d9-72e90840407e",
          name: "1672824876706488472trip.webp",
          type: "image/webp",
          hibernateLazyInitializer: {},
        },
        partner: {
          id: "04ff4c4d-2ecf-4ec2-bd72-f3cc7c17de76",
          login: "Unilever@Unilever.com",
          firstName: null,
          lastName: null,
          cin: null,
          role: "PARTNER",
          status: false,
          email: "Unilever@Unilever.com",
          address: "Tunis",
          phone: 20555333,
          name: "Unilever",
          image: {
            id: "38cd0659-798a-4d35-85ac-7aaac5e62b4b",
            name: "1672924437124unilevre.png",
            type: "image/png",
          },
          present: true,
          hibernateLazyInitializer: {},
        },
        products: [
          {
            id: "9ec0433c-0a62-4d57-bae7-9fdab2602cea",
            name: "soin de visage",
            type: "Sport.csv",
            partner: {
              id: "04ff4c4d-2ecf-4ec2-bd72-f3cc7c17de76",
              login: "Unilever@Unilever.com",
              firstName: null,
              lastName: null,
              cin: null,
              role: "PARTNER",
              status: false,
              email: "Unilever@Unilever.com",
              address: "Tunis",
              phone: 20555333,
              name: "Unilever",
              image: {
                id: "38cd0659-798a-4d35-85ac-7aaac5e62b4b",
                name: "1672924437124unilevre.png",
                type: "image/png",
              },
              present: true,
              hibernateLazyInitializer: {},
            },
            image: {
              id: "f5fac844-7abc-4cbb-a267-47d38ecf34b4",
              name: "16729242993971672734624214Panier.PNG",
              type: "image/png",
            },
          },
        ],
        zones: [
          {
            id: 5,
            name: "nabeul",
          },
          {
            id: 4,
            name: "Bizerte",
          },
          {
            id: 3,
            name: "Grand Tunis",
          },
        ],
        locations: [
          {
            id: "7aa249e4-cef5-4ad4-83a6-0821c58fb408",
            name: "Mg ghazela 10 décembre",
            longitude: "20.211235",
            latitude: "36.1022544",
            address: "Ariana",
            zone: {
              id: 3,
              name: "Grand Tunis",
            },
          },
          {
            id: "365b39fb-8cfe-4278-b94d-e6598739aca6",
            name: "magasin2222",
            longitude: "10.23333",
            latitude: "10.1",
            address: "Beni Khallad",
            zone: {
              id: 5,
              name: "nabeul",
            },
          },
          {
            id: "ca571c3c-2d0e-493e-95e6-9ba34aee7303",
            name: "contact@pmi.com",
            longitude: "100",
            latitude: "10",
            address: "Mannouba",
            zone: {
              id: 3,
              name: "Grand Tunis",
            },
          },
        ],
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date, type) {
    console.log("date:", date);

    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
      });
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
      });
    }
  }

  render() {
    const { selectedStartDate, selectedEndDate, event } = this.state;
    const minDate = new Date(event.startDate); // Today
    const maxDate = new Date(event.endDate);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

    return (
      <View style={styles.container}>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={minDate}
          maxDate={maxDate}
          todayBackgroundColor="#f2e6ff"
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
          onDateChange={this.onDateChange}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Sélectionnez la date à laquelle vous êtes disponible
          </Text>
        </View>
        <View style={styles.dateSelectedContainer}>
          <View style={styles.selectedDate}>
            <Text style={styles.textDate}> DATES DE DÉBUT:</Text>
            <Text style={styles.textDate}>{startDate.substring(0, 15)}</Text>
          </View>

          <View style={styles.selectedDate}>
            <Text style={styles.textDate}>DATES DE FIN :</Text>
            <Text style={styles.textDate}>{endDate.substring(0, 16)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttomContainer}
          onPress={() => {
            Alert.alert(
              "Votre candidature ",
              "Est en cours d'analyse, vous serez informé du résultat dans les prochains jours",
              [
                {
                  text: "OK",
                  onPress: () => this.props.navigation.replace("Event"),
                },
              ]
            );
          }}
        >
          <Text
            style={{
              letterSpacing: 1.5,
              fontWeight: "bold",
              fontSize: 16,
              color: Color.light,
              paddingHorizontal: "10%",
            }}
          >
            POSTULER
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: "2%",
  },
  dateSelectedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  titleContainer: { marginTop: "2%", marginBottom: "2%" },
  title: { textAlign: "center", letterSpacing: 1.6 },
  selectedDate: { justifyContent: "center", alignItems: "center" },
  textDate: { color: Color.dark, fontSize: 16, fontWeight: "bold" },
  buttomContainer: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Color.secondary,
    borderRadius: 15,
    padding: 10,
    position: "absolute",
    bottom: "10%",
  },
});
