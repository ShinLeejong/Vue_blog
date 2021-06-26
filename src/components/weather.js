import axios from "axios";
import { WEATHER_API_KEY } from "../constants";
import { store } from "./store/store";

const onSuccess = (position) => {
  const {
    coords: { latitude, longitude },
  } = position;
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;
  axios
    .get(URL)
    .then((res) => {
      console.log(res.data);
      store.commit("getWeather", res.data);
      document.getElementById("geolocation").innerHTML = res.data.name;
      document.getElementById(
        "weather"
      ).innerHTML = `${res.data.main.temp.toFixed(1)}℃`;
    })
    .catch(() => "Error");
};

const onFail = () => {
  console.log("위치 정보를 불러올 수 없습니다.");
};

export const getGeoInfo = () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onFail);
};
