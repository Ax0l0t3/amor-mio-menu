export const fetchGet = async (endpoint) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};

export const fetchPostString = async (endpoint, postBody) => {
  const response = await fetch(endpoint, {
    method: "POST",
    body: postBody,
    headers: { "Content-Type": "text/plain" },
  });
  return response;
};

export const fetchPost = async (endpoint, postBody) => {
  const thisBody = JSON.stringify(postBody);
  const response = await fetch(endpoint, {
    method: "POST",
    body: thisBody,
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const fetchPostImage = async (endpoint, postBody) => {
  const formBody = new FormData();
  formBody.append('file', postBody);

  const response = await fetch(endpoint, {
    method: "POST",
    body: formBody
  });
  return response;
};

export const modifyHandler = (json, postObjects) => {
  const tabObj = postObjects.find((obj) => obj.Title === json.Title);
  const optObj = tabObj.Options.find((obj) => obj.Name === json.Name);
  optObj.Extras = Array.isArray(json.Extras) ? json.Extras : [json.Extras];
  optObj.Ingredients = Array.isArray(json.Ingredients)
    ? json.Ingredients
    : [json.Ingredients];
  tabObj.Printer = json.Printer;
  return postObjects;
};

export const editHandler = (json, postObjects, previousObj) => {
  const tabObj = postObjects.find((obj) => obj.Title === previousObj.Tab);
  const optObj = tabObj.Options.find((obj) => obj.Name === previousObj.Dish);
  tabObj.Title = json.Title;
  tabObj.Printer = json.Printer;
  tabObj.Extras = json.Extras;
  tabObj.Ingredients = json.Ingredients;
  optObj.Name = json.Name;
  optObj.Extras = optObj.Extras === null ? [] : optObj.Extras;
  optObj.Ingredients = optObj.Ingredients === null ? [] : optObj.Ingredients;
  return postObjects;
};

export const deleteHandler = (json, postObjects) => {
  const index = postObjects.findIndex(({ Selected }) => Selected);
  for (const [key, value] of json.entries()) {
    if (key === "Title") {
      postObjects.splice(index, 1);
      postObjects[0].Selected = true;
      return postObjects;
    }
    const idSplitted = key.split(".");
    if (Array.isArray(postObjects[index][idSplitted[0]])) {
      const index1 = postObjects[index][idSplitted[0]].find(
        (e) => e[idSplitted[1]] === idSplitted[2],
      );
      if (index1) {
        const thisIndex = index1.Options.indexOf(value);
        index1.Options.splice(thisIndex, 1);
      } else {
        const thisObj = postObjects[index][idSplitted[0]].find(
          (e) => e[idSplitted[1]] === value,
        );
        if (thisObj) {
          const thisIndex = postObjects[index][idSplitted[0]].findIndex(
            (e) => e[idSplitted[1]] === value,
          );
          postObjects[index][idSplitted[0]].splice(thisIndex, 1);
        }
      }
    } else {
      postObjects[index][idSplitted[0]] = "";
    }
  }
  return postObjects;
};
