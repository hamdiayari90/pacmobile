import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";

export const api = atom({
  //    url server
  key: "url",
  default: "http://149.202.214.99:8089",
});

export const userId = atom({
  // auto login when singup
  key: "userId",
  default: '',
});

export const alreadySingnedIn = atom({
  // if already signed in
  key: "alreadySingnedIn",
  default: false,
});
export const userStorage = atom({
  //  all user information when he is signed in
  key: "userStorage",
  default: {},
});

export const allUserInfo = atom({
  //  all user information when he is signed in
  key: "allUserInfo",
  default: {},
});

export const allZoneSelected = atom({
  //  all zone information
  key: "allZoneSelected",
  default: [],
});

export const genderSelect = atom({
  //  all zone information
  key: "genderSelect",
  default: [],
});

export const civilStateSelect = atom({
  //  all civilStateSelect information
  key: "civilStateSelect",
  default: [],
});

export const languagesSelect = atom({
  //  all civilStateSelect information
  key: "languagesSelect",
  default: [],
});
// professionalSituation
export const professionalSituationSelect = atom({
  //  all civilStateSelect information
  key: "professionalSituationSelect",
  default: [],
});
export const civilState = atom({
  //  all zone information
  key: "civilState",
  default: ["CELIBATAIRE", "MARIEE", "VEUF", "DIVORCÉ", "NON_MENTIONNÉ"],
});
export const languages = atom({
  //  all zone information
  key: "languages",
  default: ["ARABE", "FRANCAIS", "ANGLAIS"],
});
let x = {
  _id: 0,
  value: "ARABE",
};
export const professionalSituation = atom({
  //  all zone information
  key: "professionalSituation",
  default: ["TRAVAILLE", "ETUDIANT", "EN_CHOMAGE"],
});
export const gender = atom({
  //  all gender information
  key: "gender",
  default: ["FEMME", "HOMME"],
});

export const selectedLanguetAtom = atom({
  key: "selectedLanguetAtom",
  default: {
    value: "",
    list: [
      {
        _id: 0,
        value: "ARABE",
      },
      {
        _id: 1,
        value: "FRANCAIS",
      },
      {
        _id: 2,
        value: "ANGLAIS",
      },
    ],
    selectedList: [],
    error: "",
  },
});

export const selectedZoneAtom = atom({
  key: "selectedZone",
  default: {
    value: "",
    list: [],
    selectedList: [],
    error: "",
  },
});

export const selectedSituationAtom = atom({
  key: "selectedSituationAtom",
  default: {
    value: "",
    list: [
      {
        _id: 0,
        value: "TRAVAILLE",
      },
      {
        _id: 1,
        value: "ETUDIANT",
      },
      {
        _id: 2,
        value: "EN_CHOMAGE",
      },
    ],
    selectedList: [],
    error: "",
  },
});

export const selectedCivilAtom = atom({
  key: "selectedCivilAtom",
  default: {
    value: "",
    list: [
      {
        _id: 0,
        value: "CELIBATAIRE",
      },
      {
        _id: 1,
        value: "MARIEE",
      },
      {
        _id: 2,
        value: "VEUF",
      },
      {
        _id: 3,
        value: "DIVORCÉ",
      },
      {
        _id: 4,
        value: "NON_MENTIONNÉ",
      },
    ],
    selectedList: [],
    error: "",
  },
});


export const userToken = selector({
  
  key: "userToken",
  get: async ({get}) => {
   
      let parsedUser = await getUserInformation()
      return parsedUser
  },
});

const getUserInformation = async () => {
  try {
    let token = await AsyncStorage.getItem('user')
    let data = JSON.parse(token)
    return data
  }catch(e) {

  }
}

export const userRole = atom({
  key : "userRole",
  default: null
})