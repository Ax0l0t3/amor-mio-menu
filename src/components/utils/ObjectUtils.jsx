const handleEditMode = (obj) => {
  let defaultObject = {
    Title: "",
    Printer: "",
    Extras: [],
    Ingredients: [],
    Name: "",
    Comments: "",
  };
  for (const [key, value] of obj.entries()) {
    if (defaultObject[key] === undefined) {
      const keys = key.split(".");
      if (defaultObject[keys[0]][keys[1]] === undefined) {
        defaultObject[keys[0]] = [
          ...defaultObject[keys[0]],
          { [keys[2]]: value },
        ];
      } else {
        let arr1 = defaultObject[keys[0]][keys[1]]?.[keys[2]] || [];
        arr1.push(value);
        defaultObject[keys[0]][keys[1]][keys[2]] = arr1;
      }
    } else {
      defaultObject[key] = value;
    }
  }
  return defaultObject;
};

const handleModifyMode = (obj) => {
  let json = {};
  for (const [key, value] of obj.entries()) {
    if (json[key]) {
      if (!Array.isArray(json[key])) {
        json[key] = [json[key], value];
      } else json[key] = [...json[key], value];
    } else json[key] = value;
  }
  return json;
};

export const objectUtil = (obj) => {
  let workingObj = { ...obj };
  const updateObjProp = (newValue, property) =>
    (workingObj[property] = newValue);
  return [workingObj, updateObjProp];
};

export const getArrayOfProperty = (objs, property) => {
  const allValues = objs.map((obj) => obj[property]);
  allValues.sort();
  const uniqueValues = Array.from(new Set(allValues));
  return uniqueValues.filter(Boolean);
};

export const getObjectPropValue = (propName, utilObject) => {
  const propValue = utilObject[propName];
  return propValue;
};

export const updateLocalObject = (newValue, objProp, workingObject) => {
  const [thisObject, thisMethod] = objectUtil(workingObject);
  thisMethod(newValue, objProp);
  return thisObject;
};

export const collectionHasProperty = (objs, property) => {
  return objs.some((element) => property in element);
};

export const localJsonSerialize = (obj, modeInteger) => {
  let returnObj = {};
  switch (modeInteger) {
    case 0:
      returnObj = handleModifyMode(obj);
      break;
    case 1:
      returnObj = handleEditMode(obj);
      break;
    case 2:
      returnObj = obj;
      break;
  }
  return returnObj;
};

export const localizePrinters = (attribs, formData) => {
  let thisArray = [];
  let k = 0;
  const entries = Array.from(formData.entries());
  while (k < entries.length) {
    let i = 0;
    let thisObject = {};
    while (i < attribs.length) {
      thisObject = { ...thisObject, [entries[k][0]]: entries[k][1] };
      i++;
      k++;
    }
    thisArray.push(thisObject);
  }
  return thisArray;
};
