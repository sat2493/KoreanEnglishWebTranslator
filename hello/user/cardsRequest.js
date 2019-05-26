// Create the XHR object.
function createRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function makeRequest() {
  console.log("at makeRequest");
  let input = document.getElementById("english").value;
  let url = "translate?english=" + input;

  let xhr = createRequest('GET', url);

  // checking if browser does Request
  if (!xhr) {
   alert('Request not supported');
   return;
  }

  xhr.onload = function() {
    let responseStr = xhr.responseText;  // get the JSON string
    let object = JSON.parse(responseStr);  // turn it into an object
    console.log("Translation completed! Here is the response string: \n", responseStr);

    let output = document.getElementById("outputGoesHere");
    output.textContent = object.data.translations[0].translatedText;
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

function storeResponse() {
  console.log("at storeResponse");
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

    console.log("Flashcard saved! Here is the response string: \n", responseStr);
  }

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}
