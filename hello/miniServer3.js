const express = require('express')
const port = 52520//30057
// const port = 59265

const APIrequest = require('request');
const http = require('http');

//const APIkey = "AIzaSyCSv_GLy2wLNLtQywe-aVYp_sPxd6kexfs";
const APIkey = "AIzaSyBhtPM5vNlbgCTdW8vtuswPJPFsE2nUaEU";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

const sqlite3 = require("sqlite3").verbose();  // use sqlite		//
const fs = require("fs"); // file system				//
									//
const dbFileName = "Flashcards.db";					// Added into loginServer.js
// makes the object that represents the database in our code		//
console.log("Opened Flashcards.db");					//
const db = new sqlite3.Database(dbFileName);  // object, not database.	//

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.animal != undefined) {
      res.json( {"beast" : qObj.animal} );
    } else if (qObj.word != undefined) {
      var reverseStr = qObj.word.split('').reverse().join('');
      var palindrome = qObj.word + reverseStr;
      res.json( {"palindrome" : palindrome} );
    } else {
      next();
    }
}

function translateHandler(req, res, next) {
    let url = req.url;
    let tObj = req.query;
    console.log(tObj);
    if (tObj.english != undefined) {
      makeAPIRequest(tObj.english, res);
    } else {
      next();
    }
}

function storeHandler(req, res, next) {
    console.log("req: ", req);
    let url = req.url;
    let sObj = req.query;
    console.log("OBJECT: ", sObj);
    currentUser = req.user;
    if (sObj.english != undefined) {
      insertFlashcard(currentUser.id, sObj.english, sObj.korean);
      res.send();
    } else {
      next();
    }
}

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
    }

// does what testAPI.js does per request
function makeAPIRequest(english, res) {
    // An object containing the data expressing the query to the
    // translate API.
    // Below, gets stringified and put into the body of an HTTP PUT request.
    let requestObject =
        {
            "source": "en",
            "target": "ko",
            "q": [
                english
            ]
        }

    //console.log("English phrase: ", requestObject.q[0]);

    // The call that makes a request to the API
    // Uses the Node request module, which packs up and sends off
    // an HTTP message containing the request to the API server
    APIrequest(
            { // HTTP header stuff
                url: url,
                method: "POST",
                headers: {"content-type": "application/json"},
                // will turn the given object into JSON
                json: requestObject     },
            // callback function for API request
            APIcallback
        );

    // callback function, called when data is received from API
    function APIcallback(err, APIresHead, APIresBody) {
        // gets three objects as input
        if ((err) || (APIresHead.statusCode != 200)) {
            // API is not working
            //console.log("Got API error");
            //console.log(body);
        } else {
            if (APIresHead.error) {
                // API worked but is not giving you data
                //console.log(APIresHead.error);
            } else {
                //console.log("In Korean: ",
                //APIresBody.data.translations[0].translatedText);
                //console.log("\n\nJSON was:");
                //console.log(JSON.stringify(APIresBody, undefined, 2));
                // print it out as a string, nicely formatted

                res.send(APIresBody);
            }
        }
    } // end callback function
}

// insert new Flashcard into Flashcards table
function insertFlashcard(user, english, korean) {
    let cmdStr = 'INSERT INTO Flashcards (user, english, korean, [times seen], [times correct]) VALUES (@0, @1, @2, 0, 0)';
    db.run(cmdStr, user, english, korean, flashcardInsertionCallback);

    function flashcardInsertionCallback(err) {
        if (err) {
            console.log("Flashcard insertion error",err);
        } else {
            console.log("Inserted 1 Flashcard into Flashcards table");
        }
    }
}

// professor's recommended algorithm
function getScore(card) {
  let correct = card.correct;
  let seen = card.seen;
  let score = ( Math.max(1,5-correct) + Math.max(1,5-seen) + 5*( (seen-correct+1)/(seen + 1)) );

  return score;
}

function requestCard(user) {
    // get user's saved cards library
    db.all ( 'SELECT * FROM flashcards WHERE user = ' + user, chooseCard);
    // after receiving an answer to SQL query, pick a random card from user's saved library
    function chooseCard( err, SavedCards ) {
      numSavedCards = data.length();
      selectRandom = Math.ceil(Math.random() * numSavedCards);

      // select a card that has a score greater than a random number in range {1, 15}
      while ( getScore(SavedCards[selectRandom]) <= Math.ceil(Math.random() * 15) ) {
        selectRandom = Math.ceil(Math.random() * numSavedCards);        
      }
    }
}

// put together the server pipeline
const app = express()
//app.use(express.static('public'));
//app.use(express.static('translateFiles'));  // can I find a static file?
app.use(express.static('public'));
app.get('/query', queryHandler );   // if not, is it a valid query?
app.get('/translate', translateHandler );
app.get('/store', storeHandler );
app.use( fileNotFound );            // otherwise not found

exports.queryHandler = queryHandler;
exports.translateHandler = translateHandler;
exports.storeHandler = storeHandler;
exports.makeAPIRequest = makeAPIRequest
