import { findAndSlice } from "./StringUtils";
import { sortObjectsByStringProperty } from "./ArrayUtils";
import StringConstants from "../utils/StringConstants.json";
const { PrintPortal } = StringConstants;

export const messagesByLevels = (iteratorObject, hoveredDish, levels) => {
  const sortedIterator = sortObjectsByStringProperty(iteratorObject, levels[0]);
  // Build the array of properties count
  let returnArrays = [];
  // Iterate through all the objects in sortedIterator
  sortedIterator.forEach((obj, index) => {
    // Set the initial count for all the properties as 0
    let counters = [0, 0, 0, 0];
    // Compare the n entry with each entry in the sortedIterator
    for (let k = index; k < sortedIterator.length; k++) {
      // Set reset variable to false
      // Set levels index to 0
      let isReturn = false;
      let i = 0;
      // Compare each object property until reset
      // Store each property count into counters[]
      while (!isReturn && i < levels.length) {
        const debug1 = JSON.stringify(obj[levels[i]]);
        const debug2 = JSON.stringify(sortedIterator[k][levels[i]]);
        if (debug1 != debug2) {
          isReturn = true;
        } else {
          counters[i] += 1;
        }
        i++;
      }
    }
    // Save the results of this entry
    returnArrays.push(counters);
  });

  // Build the array of displayed messages
  // First we get all the messages
  const allMessages = sortedIterator.map((obj, index) => {
    // We create an empty array to store the values
    let messages = [];
    // We iterate through levels
    levels.forEach((prop, index2) => {
      // We compare the hovered dish, if any, ID with the current one
      const prop01 = hoveredDish === undefined ? "" : hoveredDish.id;
      const prop02 = obj.id;
      const isHovered = prop01 === prop02;
      // We push the complete msg [hovered\tpadding\tingredients]
      const thisMessage = `${isHovered ? PrintPortal.Hovered : PrintPortal.NotHovered}\t${index2 + 1}\t${returnArrays[index][index2]} x ${obj[prop]}`;
      messages.push(thisMessage);
    });
    return messages;
  });

  // We now filter the duplicated msgs from allMsgs
  let filteredEntries = [];
  allMessages.forEach((currentArr) => {
    const hoveredIndex = 0;
    const paddingIndex = 1;
    const msgIndex = 2;
    let currentCounter = 0;
    let filteredCounter = 0;
    let arrayWathcDog = true;
    let filteWatchDog = true;
    // Check if the msg exists en the filtered array
    while (arrayWathcDog && filteWatchDog) {
      // Splitted messege into categories [hovered] [padding] [msg]
      const splittedMsg = currentArr[currentCounter].split("\t");
      // Extract message ending
      const stringEnding = findAndSlice("x", splittedMsg[msgIndex]);
      // Is the current msg similar to the filtered one?
      if (
        filteredEntries.length > 0 &&
        filteredEntries[filteredCounter].endsWith(stringEnding)
      ) {
        const splittedFilteredMsg =
          filteredEntries[filteredCounter].split("\t");
        // We update the hovered state with the incoming message
        const hoveredState = booleanHover(
          splittedMsg[hoveredIndex],
          splittedFilteredMsg[hoveredIndex],
        );
        filteredEntries[filteredCounter] =
          `${hoveredState}\t${splittedFilteredMsg[paddingIndex]}\t${splittedFilteredMsg[msgIndex]}`;
        currentCounter++;
        arrayWathcDog = currentCounter < currentArr.length;
      } else {
        filteredCounter++;
        filteWatchDog = filteredCounter < filteredEntries.length;
      }
    }
    // If it doesn't exist, add the remaining array entries to filteredArray
    if (!filteWatchDog) {
      fillFilteredArray(filteredEntries, currentArr, currentCounter);
    }
  });
  // Filter entries with empty string
  const entriesTrimed = filteredEntries.filter((entry) => !entry.endsWith(" "));
  return entriesTrimed;
};

export const fillFilteredArray = (filtered, currentArray, index) => {
  for (let k = index; k < currentArray.length; k++) {
    filtered.push(currentArray[k]);
  }
};

export const booleanHover = (str1, str2) => {
  const isStr1Hovered = str1 === PrintPortal.Hovered;
  const isStr2Hovered = str2 === PrintPortal.Hovered;
  const orOutput = isStr1Hovered || isStr2Hovered;
  const output = orOutput ? PrintPortal.Hovered : PrintPortal.NotHovered;
  return output;
};
