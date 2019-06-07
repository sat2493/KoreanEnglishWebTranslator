// Create the XHR object.
function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function makeRequest() {
  let input = document.getElementById("english").value;
  let url = "translate?english=" + input;

  let xhr = createRequest('GET', url);

  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    let object = JSON.parse(responseStr);  // turn it into an object

    let output = document.getElementById("outputGoesHere");
    output.textContent = object.data.translations[0].translatedText;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

function requestCard() {
  let url = "card?getCard=true";
  let xhr = createRequest('GET', url);

  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;
    let cardObject = JSON.parse(responseStr);

    console.log("HEREEEE");
    console.log(cardObject);
    let cardLangReview = cardObject.korean;
    let displayLang = document.getElementById("guess-answer");
    displayLang.textContent =  cardLangReview;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function requestUsername() {
  let url = "card?getUsername=true";
  let xhr = createRequest('GET', url);

  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;
    let usernameObject = JSON.parse(responseStr);

    console.log(usernameObject);
    let username = usernameObject.username;
    let usernameFooter = document.getElementById("footer");
    usernameFooter.textContent = username;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}


function storeResponse() {
  let english = document.getElementById("english").value;
  let korean = document.getElementById("outputGoesHere").textContent;
  let url = "store?english=" + english + "&korean=" + korean;

  let xhr = createRequest('GET', url);

  // checking if browser does Request
  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function requestComparison() {
  let english = document.getElementById("type-answer").value;
  let korean = document.getElementById("guess-answer").textContent;
  let url = "comparsion?english=" + english + "&korean=" + korean;

  console.log("???????")
  let xhr = createRequest('GET', url);

  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;
    let cardObject = JSON.parse(responseStr);

    console.log("requestComparison!!!!! YESSjj");
    console.log(cardObject);
    english = english.replace(/(\r\n|\n|\r)/gm, "");
    console.log("original: ", english, "+++++");
    console.log("returned: ", cardObject.english, "+++++");
    if(cardObject.english === english){
      console.log("CORRECT");
      let correctAnswerElement = document.getElementById("correct-answer");
      correctAnswerElement.textContent = "CORRECT!";
      correctAnswerElement.style.color = "green";
      correctAnswerElement.style.border = "1px solid green";
    } else {
      console.log("Wrongggg");
      let correctAnswer = cardObject.english;
      let correctAnswerElement = document.getElementById("correct-answer");
      correctAnswerElement.textContent = correctAnswer;
      correctAnswerElement.style.color = "black";
      correctAnswerElement.style.border = "none";
    }


    // let cardLangReview = cardObject.english;
    // let displayLang = document.getElementById("correct-answer");
    // displayLang.textContent =  cardLangReview;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}


function updateSeen() {
  let english = document.getElementById("type-answer").value;
  let korean = document.getElementById("guess-answer").textContent;
  let url = "seen?english=" + english + "&korean=" + korean;

  let xhr = createRequest('GET', url);

  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    let object = JSON.parse(responseStr);  // turn it into an object
    //
    // let output = document.getElementById("outputGoesHere");
    // output.textContent = object.data.translations[0].translatedText;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
