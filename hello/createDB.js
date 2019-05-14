// Globals
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system

const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.

// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
const cmdStr = 'CREATE TABLE Flashcards (user INT )'
db.run(cmdStr,tableCreationCallback);

function addColumns(db) {
    let columns = [];
    columns.push('ALTER TABLE Flashcards ADD english int');
    columns.push('ALTER TABLE Flashcards ADD korean int');
    columns.push('ALTER TABLE Flashcards ADD [times seen] string');
    columns.push('ALTER TABLE Flashcards ADD [times correct] string');

    for (i = 0; i < 4; i++) {
        db.run(columns[i], columnCreationCallback);
    }

    function columnCreationCallback(err) {
        if (err) {
            console.log("Column creation error",err);
        } else {
            console.log("New column created");
        }
    }
    db.close();
}

// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
        addColumns(db);
    }
}

