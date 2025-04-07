export const MessagesByLevels = (iteratorObject, levels) => {
  let returnArrays = [];
  // Iterate through the options array
  iteratorObject.forEach((obj, index) => {
    // Save the results in an array that corresponds to each significant prop
    let counters = [1, 1, 1, 1];
    // Compare the n entry to each one of the entries
    for (let k = index + 1; k < iteratorObject.length; k++) {
      // Compare each prop from each entry
      levels.forEach((prop, index) => {
        const debug1 = JSON.stringify(obj[prop]);
        const debug2 = JSON.stringify(iteratorObject[k][prop]);
        if (debug1 != debug2) {
          return;
        }
        counters[index] += 1;
      });
    }
    // Save the results of this entry
    returnArrays.push(counters);
  });

  // Build the array of displayed messages
  let messages = [];
  iteratorObject.forEach((obj, index) => {
    levels.forEach((prop, index2) => {
      const thisMessage = `${index2 + 1}\t${returnArrays[index][index2]} x ${obj[prop]}`;
      const includes = messages.some((thisString) =>
        thisString.includes(obj[prop]),
      );
      if (!includes) messages.push(thisMessage);
    });
  });
  return messages;
};
