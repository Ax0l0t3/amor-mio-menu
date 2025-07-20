import { findAndSlice } from "./StringUtils";
import { sortObjectsByStringProperty } from "./ArrayUtils";
import StringConstants from "../utils/StringConstants.json";

export const messagesByLevels = (iteratorObject, hoveredDish, levels) => {
  const { PrintPortal } = StringConstants;
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
  allMessages.forEach((obj) => {
    const hoveredIndex = 0;
    const msgIndex = 2;
    obj.forEach((message, index2) => {
      // We splitt the msg by its components [hovered, padding, ingredients]
      const splittedMsg = message.split("\t");
      const stringEnding = findAndSlice("x", splittedMsg[msgIndex]);
      // We find if the current msg exists already in the filtered array
      const foundIndex = filteredEntries.findIndex((entry) =>
        entry.endsWith(stringEnding),
      );
      // If the current msg exists with a different hovered state, we update the msg
      const isHovered = splittedMsg[hoveredIndex] === PrintPortal.Hovered;
      if (foundIndex >= 0) {
        filteredEntries[foundIndex] = isHovered
          ? filteredEntries[foundIndex].replace(
              PrintPortal.NotHovered,
              PrintPortal.Hovered,
            )
          : filteredEntries[foundIndex];
        return;
      }
      for (let k = index2; k < obj.length; k++) {
        filteredEntries.push(obj[k]);
      }
    });
  });

  const entriesTrimed = filteredEntries.filter((entry) => !entry.endsWith(" "));
  return entriesTrimed;
};
