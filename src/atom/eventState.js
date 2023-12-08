
import { atom } from "recoil";
export const selectedLocationId = atom({
    key: 'selectedLocationId',
    default: {
      value: '',
      list: [],
      selectedList: [],
      error: '',
    },
  });
  export const briefUploadUrl = atom({
    default: "http://149.202.214.99:8085/PAC/Brief/",
    key: "briefUploadUrl",
  });
  export const eventUploadUrl = atom({
    default: "http://149.202.214.99:8085/PAC/Event/",
    key: "eventUploadUrl",
  });
  export const reclamtionUploadUrl = atom({
    default: "http://149.202.214.99:8085/PAC/Reclamation/",
    key: "reclamtionUploadUrl",
  });
  export const partnerUploadUrl = atom({
    default: "http://149.202.214.99:8085/PAC/Partner/",
    key: "partnerUploadUrl",
  });
  
  export const suiviUploadUrl = atom({
    default: "http://149.202.214.99:8085/PAC/Suivie/",
    key: "suiviUploadUrl",
  });