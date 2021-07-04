export default (): string => {
  if (localStorage.getItem("randomColor") !== "true") return "indigo";

  const random = Math.floor(Math.random() * 6);
  let color;
  switch (random) {
    case 5:
      color = "error";
      break;
    case 4:
      color = "indigo";
      break;
    case 3:
      color = "success";
      break;
    case 2:
      color = "primary";
      break;
    case 1:
      color = "info";
      break;
    case 0:
      color = "pink lighten-2";
      break;
    default:
      color = "error";
  }
  return color;
};
