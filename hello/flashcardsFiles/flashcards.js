// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "../Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.open(dbFileName);  // object, not database.

// Create the XHR object.
function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function makeRequest() {
  let input = document.getElementById("english").value;
  let url = "store?english=" + input;

  let english = document.getElementById("english").value;

  let xhr = createRequest('GET', url);

  // checking if browser does Request
  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    let object = JSON.parse(responseStr);  // turn it into an object

    let output = document.getElementById("outputGoesHere");
    let korean = object.data.translations[0].translatedText;
    output.textContent = korean;

    insertFlashcard(english, korean);
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db

insertFlashcard(english, korean) {
    const cmdStr = 'CREATE TABLE Flashcards (user INT )'
    db.run(cmdStr,tableCreationCallback);


    function tableCreationCallback(err) {
        if (err) {
            console.log("Flashcard insertion error",err);
        } else {
            console.log("Inserted 1 Flashcard");
        }
    }
}
