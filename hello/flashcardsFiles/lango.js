function Header() {
  return React.createElement("header", {
    id: "header"
  }, React.createElement("h1", {
    id: "logo"
  }, "Lango!"), React.createElement("button", {
    id: "review-button",
    type: "button",
    name: "button",
    onClick: function() {
      storeResponse();
    }
  }, "Start Review"));
}

function CheckReturn(event) {
  if(event.charCode == 13) {
    makeRequest();
  }
}

function StoreCard() {
  makeRequest();
  storeResponse();
}

function InputCard() {
  return React.createElement("div", {
    className: "cards"
  }, React.createElement("div", {
    className: "cardside"
  }, React.createElement("textarea", {
    id: "english",
    onKeyPress: CheckReturn
  }), React.createElement("div", {
    id: "outputDiv"
  }, React.createElement("p", {
    id: "outputGoesHere"
  }))), React.createElement("button", {
    id: "save-button",
    type: "button",
    name: "button",
    onClick: StoreCard
  }, "save"));
}

function Footer() {
  return React.createElement("footer", {
    id: "footer"
  }, "Username");
}

var main = React.createElement("main", null, Header(), InputCard(), Footer());
ReactDOM.render(main, document.getElementById('root'));
