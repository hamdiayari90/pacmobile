
import React, { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
//import { Button } from './src/components/Button';
import { CustumButtom } from '../CustumButtom/CustumButtom';
//import { CalendarView } from './src/components/CalendarView';
//import { colors } from './src/global/colors';
import { Color } from '../../utils/Constant';
import { CalendarView } from './CalenderView';
// Types erros will be fix when "react-native-calendar-picker" accepts PR

export  function CalenderPicker() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date())
  const [selectedEndDate, setSelectedEndDate] = useState()

  const incrementTimeBy = useCallback(
    (time) => {
      try {
        if (!!selectedEndDate) {
          const actualEndDate = new Date(selectedEndDate)
          actualEndDate.setDate(actualEndDate.getDate() + time)
          setSelectedEndDate(actualEndDate)
        }
      }
      catch (e) {
        if (__DEV__) console.log("Error incrementTimeBy:", e)
      }
    },
    [selectedEndDate, selectedStartDate],
  )


  const clearAll = useCallback(
    () => {
      setSelectedEndDate(null)
      setSelectedStartDate(new Date())
    },
    [],
  )

  return (
    <SafeAreaView style={styles.container}>

      <CalendarView
        endDate={selectedEndDate}
        startDate={selectedStartDate}
        setStartDate={setSelectedStartDate}
        setEndDate={setSelectedEndDate}
      />

      <View style={styles.main}>
        <View style={styles.divider} />

        <View style={[styles.selectOptions, { opacity: !!selectedEndDate ? 1 : 0.8 }]}>
          <View style={styles.row}>
            <CustumButtom
              onPress={() => incrementTimeBy(1)}
              
              title= "Add one"
            />
            <CustumButtom
              onPress={() => incrementTimeBy(3)}
              title= "Add three"

            />
            <CustumButtom
              onPress={() => incrementTimeBy(7)}
              title= "Add seven"
              
            />
          </View>
        </View>

        <View style={styles.textShow}>
          <View>
            <Text style={styles.text}>
              Start date: {selectedStartDate?.toDateString()}
            </Text>

            <Text style={styles.text}>
              End date: {selectedEndDate?.toDateString()}
            </Text>
          </View>
          
          <CustumButtom
           // line
            style={styles.customButton}
            // showIcon={false}
           title="LIMPAR"
            onPress={() => clearAll()}
          />

        </View>
      </View>


    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  selectOptions: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  main: {
    marginHorizontal: 20,
    paddingVertical: 15
  },
  divider: {
    width: "100%",
    backgroundColor:Color.primary,
    height: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  textShow: {
    marginVertical: 30,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  text: {
    fontSize: 14,
    fontWeight: "700"
  },
  customButton: {
    backgroundColor: "transparent",
    borderColor: Color.primary,
    borderWidth: 1,
    borderRadius: 5
  }
});