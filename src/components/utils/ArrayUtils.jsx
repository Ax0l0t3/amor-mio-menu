import { removeParenthesis } from "./StringUtils";

export const sortObjectsByStringProperty = (baseArray, property) => {
  const toSortArray = [...baseArray];
  toSortArray.sort((a, b) => {
    const nameA = a[property].toUpperCase();
    const nameB = b[property].toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  return toSortArray;
};

export const cleanParenthesis = (baseArray) => {
    return baseArray.map((el) => removeParenthesis(el));
  };
