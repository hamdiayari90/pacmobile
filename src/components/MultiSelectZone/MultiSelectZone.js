import React, { useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { height } from "../../utils/Dimention";


import { useRecoilState } from "recoil";
import { allZoneSelected } from "../../atom/authState";

export const MultiSelectZone = ({ zone }) => {
  const ref = useRef();
  const [selectedItems, setSelectedItems] = useRecoilState(allZoneSelected);





  const removeAll = () => {
    ref.current?._removeAllItems();
  };
  const toggle = () => {
    ref.current?._toggleSelector();
  };
  return (
    <View>
      <View
        style={{
          width: "93%",
          alignSelf: "center",
          marginTop: '1%',
          borderColor: "#000",
          backgroundColor: "#fff",
          borderRadius: 7,
          borderWidth: 1,
          height: height / 15,
          marginBottom:'6%'
        }}
      >
        <SectionedMultiSelect
          uniqueKey="id"
          displayKey="name"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
          items={zone}
          ref={ref}
          loading={zone == undefined}
          selectText="Selectionez votre zone"
          confirmText="Confirmer"

          customChipsRenderer={(props) => (
            <ScrollView
              horizontal
              style={
                {
                  //   width: WIDTH,
                }
              }
              contentContainerStyle={{
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 8,
              }}
            ></ScrollView>
          )}
          IconRenderer={MaterialIcons}
          icons={{
            check: {
              name: "check-circle",
              style: {
                color: "#3742fa",
              },
              size: 22,
            },
            search: {
              name: "search",
              color: "#333",
              size: 22,
            },

            arrowUp: {
              name: "keyboard-arrow-up", // dropdown toggle
              size: 22,
              color: "#333",
            },
            arrowDown: {
              name: "keyboard-arrow-down", // dropdown toggle
              size: 22,
              color: "#333",
            },
            selectArrowDown: {
              name: "keyboard-arrow-down", // select
              size: 24,
              color: "#333",
            },
            close: {
              name: "close", // chip close
              size: 16,
              color: "#333",
            },

            cancel: {
              name: "cancel", // cancel button
              size: 18,
              color: "#333",
            },
          }}
        />
      </View>
    </View>
  );
};

