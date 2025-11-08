export const returnNowDate = () => {
  const now = new Date();
  const formattedTime = formatDate(now);
  return formattedTime;
};

export const formatDate = (date) => {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use 12-hour format
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};
