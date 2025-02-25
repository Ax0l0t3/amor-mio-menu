export const objectUtil = (obj) => {
  let workingObj = { ...obj };
  const updateObjProp = (newValue, property) =>
    (workingObj[property] = newValue);
  return [workingObj, updateObjProp];
};
