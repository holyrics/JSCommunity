var removeExtension = (inputStr) => replaceLastOccurrence(inputStr, ".pdf", "").trim()

function replaceLastOccurrence(inputStr, searchStr, replacementStr) {
  var result;
  searchStr = searchStr.toLowerCase();
  var originalStr = inputStr.toLowerCase();
  var lastIndex = originalStr.lastIndexOf(searchStr);
  if (!inputStr.endsWith(searchStr)) {
    return inputStr; // The substring is not found
  }

  result = inputStr.slice(0, lastIndex) + replacementStr + inputStr.slice(lastIndex + searchStr.length);
  //recursive
  // if (endsWith(result, searchStr)) return replaceLastOccurrence(result, searchStr, replacementStr);

  return (
    result
  );
}

function toggleLogState(id, log){ 
  h.log.setEnabled(id, log);
}