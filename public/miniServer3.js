const express = require('express')
const port = 52520//30057

function queryHandler(req, res, next) {
    let url = req.url;
    let qObj = req.query;
    console.log(qObj);
    if (qObj.animal != undefined) {
	res.json( {"beast" : qObj.animal} );
    }
    else {
	next();
    }
}

// Sends palindrome object back to the requester
function sendPalindrome(req, res) {
    let url = req.url;
    let word = req.query.word;
    let qObj = req.query;

    if (qObj.word != undefined) {
        for (i = word.length - 1; i >= 0; i--) {
            word += word[i];
        }

        let object = {"palindrome" : word} 

        res.type('text/plain');
        res.send(object);

	// tests to see if right object was received
        // console.log(JSON.stringify(object));
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

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/query', queryHandler );   // if not, is it a valid query?
app.use( sendPalindrome );	    // respond back if it is a word query
app.use( fileNotFound );            // otherwise not found
app.listen(port, function (){console.log('Listening...');} )
 
