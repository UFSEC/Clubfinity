import { API } from "./BaseApi";

exports.getEvents = async bearerToken => {
  let axiosResponse = await API.get("/api/event", {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  })
    .then(async response => {
      let { data } = response.data;
      return { events: data };
    })
    .catch(error => {
      console.log(error);
      return {
        errors: error
      };
    });
  return axiosResponse;
};
