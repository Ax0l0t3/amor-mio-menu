import { findAndSlice } from "./StringUtils";

export const messagesByLevels = (iteratorObject, levels) => {
  // Build the array of properties count
  let returnArrays = [];
  // Iterate through all the objects in iteratorObject
  iteratorObject.forEach((obj, index) => {
    // Set the initial count for all the properties as 0
    let counters = [0, 0, 0, 0];
    // Compare the n entry with each entry in the iteratorObject
    for (let k = index; k < iteratorObject.length; k++) {
      // Set reset variable to false
      // Set levels index to 0
      let isReturn = false;
      let i = 0;
      // Compare each object property until reset
      // Store each property count into counters[]
      while (!isReturn && i < levels.length) {
        const debug1 = JSON.stringify(obj[levels[i]]);
        const debug2 = JSON.stringify(iteratorObject[k][levels[i]]);
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
  const allMessages = iteratorObject.map((obj, index) => {
    let messages = [];
    levels.forEach((prop, index2) => {
      const thisMessage = `${index2 + 1}\t${returnArrays[index][index2]} x ${obj[prop]}`;
      messages.push(thisMessage);
    });
    return messages;
  });

  let filteredEntries = [];
  allMessages.forEach((obj) => {
    obj.forEach((message, index2) => {
      const stringEnding = findAndSlice("x", message);
      const existsInFilteredEntries = filteredEntries.some((entry) =>
        entry.endsWith(stringEnding),
      );
      if (existsInFilteredEntries) return;
      for (let k = index2; k < obj.length; k++) {
        filteredEntries.push(obj[k]);
      }
    });
  });

  const entriesTrimed = filteredEntries.filter((entry) => !entry.endsWith(" "));
  return entriesTrimed;
};
