export default function (timestampValue) {
  const match = /^[1-2]{1}[0-9]{3}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}/;
  const res = timestampValue.match(match);
  if (!res) {
    console.log("timestamp error occured on " + timestampValue);
    return;
  }
  const getYear = res[0].match(/^[0-9]{4}/);
  const getMonth = res[0].match(/-[0-9]{2}-/)[0].match(/[0-9]{2}/);
  const getDay = res[0].match(/[0-9]{2}$/);
  return `${getYear}년 ${getMonth}월 ${getDay}일`;
}
