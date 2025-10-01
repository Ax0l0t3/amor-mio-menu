export const replaceAndLower = (str) => {
  const noCommas = str.replaceAll(",", "-");
  const noSpaces = noCommas.replaceAll(" ", "");
  return noSpaces;
};

export const findAndSlice = (character, string) => {
  const xIndex = string.indexOf(character);
  return string.slice(xIndex);
};

export const removeParenthesis = (el) => {
  if(el) return el.replace("(", "").replace(")", "");
  };

  export const areStringsSimilar = (str1, str2) => {
    if(str1.length > str2.length){
      return str1.includes(str2);
    }
    return str2.includes(str1);
  }
