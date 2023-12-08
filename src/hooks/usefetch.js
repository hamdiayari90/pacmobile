import { useRecoilValue } from "recoil";
import { api } from "../atom/authState";

const url = useRecoilValue(api)

export const fetchingData = async (auth, endPoint) => {
    try {
   
  
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${auth}`,
          },
        };
        //let endPoointf =  `${url}/event/currentEventsByUser/${user.id}`
  
        let endPooint = `${url}/event/currentEventsByUser/9bda1c63-db06-49d0-8446-886e6e7d07e8`;

        let distination = `${url}${endPoint}`
        console.log('distination:', distination)
        let result = await fetch(distination, requestOptions);
        return result.json();
      } catch (e) {
        console.log("error");
      }
}