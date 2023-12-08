import { API_URL } from "..";
export const fetchAllCurrentEvent = async (auth, id) => {

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${auth}`,
      },
    };

    const endPooint = `${API_URL}/event/currentEventsByUser/${id}`;
    const result = await fetch(endPooint, requestOptions);
    return result.json();
  } catch (e) {}
};
