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

    console.log(cardObject);
    /* insert function(s) that loads new cards onto page */
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
