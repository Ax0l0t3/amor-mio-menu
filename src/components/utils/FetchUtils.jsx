export const fetchGet = async (endpoint) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};

export const fetchPost = async (endpoint, postBody) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: { "Content-Type": "application/json" },
  });
  return response;
};
