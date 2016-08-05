'use strict';

var google = require('googleapis');
var async = require('async');
var fs = require('fs');

var speech = google.speech('v1beta1').speech;

const getAuthClient = (callback) => {
  google.auth.getApplicationDefault(function (err, authClient) {
    if (err) {
      return callback(err);
    }

    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      authClient = authClient.createScoped([
        'https://www.googleapis.com/auth/cloud-platform'
      ]);
    }

    return callback(null, authClient);
  });
}

const  prepareRequest = (wavFilepath, callback) => {
  fs.readFile(wavFilepath, function (err, audioFile) {
    if (err) {
      return callback(err);
    }
    var encoded = new Buffer(audioFile).toString('base64');
    var payload = {
      config: {
        encoding: 'LINEAR16',
        sampleRate: 16000
      },
      audio: {
        content: encoded
      }
    };
    return callback(null, payload);
  });
}

const getBestHypothesis = (res) => {
  var result = {
    "confidence": 0,
    "transcript": ''
  };

  var results = res.results;

  for (var i in results) {
    var alternatives = results[i].alternatives;
    for (var j in alternatives) {
      var alternative = alternatives[j];
      if (result.confidence < alternative.confidence) {
        result.confidence = alternative.confidence;
        result.transcript = alternative.transcript.trim();
      }
    }
  }

  return result;
}

const recognize = (wavFilepath, getHypothesisCallback) => {
  var requestPayload;

  async.waterfall([
    function (cb) {
      prepareRequest(wavFilepath, cb);
    },
    function (payload, cb) {
      requestPayload = payload;
      getAuthClient(cb);
    },
    function sendRequest (authClient, cb) {
      speech.syncrecognize({
        auth: authClient,
        resource: requestPayload
      }, function (err, result) {
        if (err) {
          return cb(err);
        }
        getHypothesisCallback(getBestHypothesis(result).transcript);
      });
    }
   ], console.log);
}

module.exports.recognize = recognize;
