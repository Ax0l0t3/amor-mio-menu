export const replaceAndLower = (str) => {
  const noCommas = str.replaceAll(",", "-");
  const noSpaces = noCommas.replaceAll(" ", "");
  return noSpaces;
};

export const findAndSlice = (character, string) => {
  const xIndex = string.indexOf(character);
  return string.slice(xIndex);
};

export const removeParenthesis = (el) => el.replace("(", "").replace(")", "");
