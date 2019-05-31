// Deals with rendering the entire page
// Contains header, and footer
// Depending on the value of this.state, it can contain either CreateCardMain or ReviewCardMain
class WholePage extends React.Component {
  constructor(props) {
    super(props);
   
    // set the default value of this.state to the create cards view just for now, and testing purposes
    this.state = { view: "create" };
    this.Header = this.Header.bind(this);
    this.Footer = this.Footer.bind(this);
  }

  render() {
    // for now passes only the CreateCardMain view
    return React.createElement("main", null, this.Header(), new CreateCardMain().render(), this.Footer());
  }

  Header() {
    return React.createElement("header", {
      id: "header"
    }, React.createElement("h1", {
      id: "logo"
    }, "Lango!"), React.createElement("button", {
      id: "review-button",
      type: "button",
      name: "button",
      onClick: function() {
        storeResponse();}    
    }, "Start Review"));
  }

  Footer() {
    return React.createElement("footer", {
      id: "footer"
    }, "Username");
  }
}

// Only responsible for the "cards" div and its functionality
class CreateCardMain extends React.Component {
  constructor(props) {
    super(props);

    this.CheckReturn = this.CheckReturn.bind(this);
    this.StoreCard = this.StoreCard.bind(this);
    this.InputCard = this.InputCard.bind(this);
  }

  render() {
    return this.InputCard();
  }

  CheckReturn(event) {
    if(event.charCode == 13) {
      makeRequest();
    }
  }

  StoreCard() {
    makeRequest();
    storeResponse();
  }

  InputCard() {
    return React.createElement("div", {
      className: "cards"
    }, React.createElement("div", {
      className: "cardside"
    }, React.createElement("textarea", {
      id: "english",
      placeholder: "English",
      onKeyPress: this.CheckReturn
    }), React.createElement("div", {
      id: "outputDiv"
    }, React.createElement("p", {
      "data-placeholder": "Korean",
      contentEditable: true,
      id: "outputGoesHere"
    }))), React.createElement("button", {
      id: "save-button",
      type: "button",
      name: "button",
      onClick: this.StoreCard
    }, "save"));
  }

}

// Only responsible for the div that displays the review cards portion
class ReviewCardMain extends React.Component {}

// instantiate our html contents and its data
const WholePageInstance = new WholePage();

ReactDOM.render(
  WholePageInstance.render(),
  document.getElementById('root')
);
