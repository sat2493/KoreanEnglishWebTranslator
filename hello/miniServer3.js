const express = require('express')
const port = 52520//30057
//const port = 59265

const APIrequest = require('request');
const http = require('http');

const APIkey = "AIzaSyCFniUqrrDfGJ5CVjIqcJKRXgHvYtf0ASs";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

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
    let url = req.url;
    let sObj = req.query;
    console.log(sObj);
    if (sObj.english != undefined) {
      makeAPIRequest(sObj.english, res);
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

    console.log("English phrase: ", requestObject.q[0]);

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
            console.log("Got API error");
            console.log(body);
        } else {
            if (APIresHead.error) {
                // API worked but is not giving you data
                console.log(APIresHead.error);
            } else {
                console.log("In Korean: ",
                APIresBody.data.translations[0].translatedText);
                console.log("\n\nJSON was:");
                console.log(JSON.stringify(APIresBody, undefined, 2));
                // print it out as a string, nicely formatted

                res.send(APIresBody);
            }
        }
    } // end callback function
}

// put together the server pipeline
const app = express()
//app.use(express.static('public'));
//app.use(express.static('translateFiles'));  // can I find a static file?
app.use(express.static('flashcardsFiles'));
//app.get('/query', queryHandler );   // if not, is it a valid query?
//app.get('/translate', translateHandler ); 
app.get('/store', storeHandler );
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
