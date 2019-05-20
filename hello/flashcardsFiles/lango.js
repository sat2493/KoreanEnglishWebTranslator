const lango = React.createElement( 'h1', { id: 'logo' },'Lango!' );

function CheckReturn(event) {
  console.log(event.charCode);
  if(event.charCode == 13) {
    console.log("Return key is pressed!");
    makeRequest();
  }
}

function StoreCard() {
  console.log("about to store");
  makeRequest();
  storeResponse();
}

function InputCard() {
  return React.createElement("div", {
    className: "cardside"
  }, React.createElement("textarea", {
    id: "english",
    onKeyPress: CheckReturn
  }), React.createElement("button", {
    type: "button",
    name: "button",
    onClick: StoreCard
  }, "save"));
}

function ResponseCard() {
  return React.createElement("div", {
    id: "outputDiv"
  }, React.createElement("p", {
    id: "outputGoesHere"
  }));
}

var main = React.createElement("main", null, lango, InputCard(), ResponseCard());
ReactDOM.render(main, document.getElementById('root'));
