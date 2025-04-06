export const objectUtil = (obj) => {
  let workingObj = { ...obj };
  const updateObjProp = (newValue, property) =>
    (workingObj[property] = newValue);
  return [workingObj, updateObjProp];
};

export const getPlainPrinters = (objs) => {
  const allPrinters = objs.map((obj) => obj.printer);
  allPrinters.sort();
  const uniquePrintersArray = Array.from(new Set(allPrinters));
  return uniquePrintersArray;
};

export const getObjectPropValue = (propName, utilObject) => {
  const propValue = utilObject[propName];
  return propValue;
};

export const updateLocalObject = (eValue, objProp, workingObject) => {
  const [thisObject, thisMethod] = objectUtil(workingObject);
  thisMethod(eValue, objProp);
  return thisObject;
};
