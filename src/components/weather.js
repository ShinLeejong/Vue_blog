import axios from "axios";

const onSuccess = (position) => {
  const {
    coords: { latitude, longitude },
  } = position;
  console.log(latitude, longitude);
  axios.get().then((data) => {
    console.log(data);
  });
};

const onFail = () => {
  console.log("위치 정보를 불러올 수 없습니다.");
};

export default () => {
  navigator.geolocation.getCurrentPosition(onSuccess, onFail);
  return onSuccess();
};
