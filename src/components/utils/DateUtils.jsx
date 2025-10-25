export const returnNowDate = () => {
  const now = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  };
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);
  return formattedTime;
};
