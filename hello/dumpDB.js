// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

function dumpDB() {
    db.all ( 'SELECT * FROM flashcards', dataCallback);
    function dataCallback( err, data ) {console.log(data)}
}

dumpDB();
