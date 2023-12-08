import { API_URL } from "..";
export const getAllBrieffByIf = async (id, token) => {

  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    };

    let result = await fetch(
      `${API_URL}/brief/briefsByUser/${id}`,
      requestOptions
    );
    return result.json();
  } catch (e) {}
};
