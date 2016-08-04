'use strict';

// Calculate WER
const wer = (reference, hypothesis) => {
  // Calculate the Levenshtein distance between reference and hypothesis
  var levenshteinDistance = distance(reference, hypothesis);

  // Split reference into words [English]
  var referenceArray = reference.split(' ');

  // Return wer
  return (levenshteinDistance / referenceArray.length);
}

// Calculate Levenshtein distance
const distance = (reference, hypothesis) => {
  // Split sentences into words [English]
  var referenceArray = reference.split(' ');
  var hypothesisArray = hypothesis.split(' ');

  // Define matrix to hold Levenshtein distance between reference and hypothesis
  var levenshteinDistance = createMatrix(referenceArray.length + 1, referenceArray.length + 1);

  // Initialize Levenshtein distance matrix 
  for(var i = 0; i <= referenceArray.length; i++) {
    for(var j = 0; j <= hypothesisArray.length; j++) {
      if(0 == i) {
        levenshteinDistance[0][j] = j;
      } else if(0 == j) {
        levenshteinDistance[i][0] = i;
      }
    }
  }

  // Calculate Levenshtein distance
  for(var i = 1; i <= referenceArray.length; i++) {
    for(var j = 1; j <= hypothesisArray.length; j++) {
      if(referenceArray[i -1] === hypothesisArray[j - 1]) {
        levenshteinDistance[i][j] = levenshteinDistance[i - 1][j - 1];
      } else {
        var ins = levenshteinDistance[i][j - 1] + 1;
        var del = levenshteinDistance[i - 1][j] + 1;
        var sub = levenshteinDistance[i - 1][j - 1] + 1;
        levenshteinDistance[i][j] = Math.min(ins, del, sub);
      }
    }
  }

  // Return Levenshtein distance
  return levenshteinDistance[referenceArray.length][hypothesisArray.length];
}

// Create empty matrix
const createMatrix = (rowCount, columnCount) => {
  var matrix = new Array(rowCount);
  for (var i = 0; i < rowCount; i++) {
    matrix[i] = new Array(columnCount);
  }
  return matrix;
}

module.exports.wer = wer;
