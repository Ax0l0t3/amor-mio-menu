export const fetchMethod = async (endpoint) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};
