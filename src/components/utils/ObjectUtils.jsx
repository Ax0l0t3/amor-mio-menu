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

export const localJsonSerialize = (obj) => {
  let toJson = {};
  for (const [key, value] of obj.entries()) {
      if (toJson[key]) {
        if (!Array.isArray(toJson[key])) {
          toJson[key] = [toJson[key]];
        }
        toJson[key] = [...toJson[key], value];
      }
      else toJson[key] = value;
    }
    return toJson;
}
