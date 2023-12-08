import axios from 'axios';

let API = axios.create({baseURL: 'http://149.202.214.99:8089'});


export const getEvent = id => API.get(`/event/${id}` );


export const applyOnEvent = (username,idEvent) => API.get(`/candidate/applyOnEvent/${username}/${idEvent}` );

export const getCandidate = id => API.get(`/candidate/${id}` );

export const getSuivie = id => API.get(`/suivie/${id}` );

export const suivieDemande = data => API.post(`/suivie/demandeSuivie`,data );
export const removeDevice = data => API.post(`/notification/removeDevice?token=${data}` );

export const suivieDemandeNotif = id => API.get(`/suivie/demandeNotif/${id}` );

export const suivieReplyNotif = id => API.get(`/suivie/replydemandeNotif/${id}` );

export const suivieReply = (id,body) => API.post(`/suivie/modifyStatus/${id}`,body );


export const suivieAddPhoto = (id,media) => API.post(`/suivie/addImage/${id}`,media ,{
  headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    }
});

export const suivieAddLocation = data => API.put(`/suivie/addLocalisation`,data );


export const getCandidatesByLogin = login => API.get(`/candidate/login/${login}` );

export const getReclamationsByLogin = login => API.get(`/reclamation/reclamationsByUser/${login}` );

export const getItemsByLogin = login => API.get(`/assign/item/AssignItemByLogin/${login}` );

export const addReclamation = data => API.post(`/reclamation/addReclamation`,data );

export const addMediaToReclamation = (id,media) => API.post(`/reclamation/addMediaToReclamation/${id}`,media ,{
    headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
});

export const getBriefsByUser = id => API.get(`/brief/briefsByUser/${id}` );
export const getBriefsByEvent = id => API.get(`/brief/byEvent/${id}` );
export const getBrief = id => API.get(`/brief/${id}` );
export const getUserById = id => API.get(`/user/${id}` );
export const getRegions = () => API.get(`/region/regions` );


