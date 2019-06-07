var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Deals with rendering the entire page
// Contains header, and footer
// Depending on the value of this.state, it can contain either CreateCardMain or ReviewCardMain
var WholePage = function (_React$Component) {
  _inherits(WholePage, _React$Component);

  function WholePage(props) {
    _classCallCheck(this, WholePage);

    // set the default value of this.state to the create cards view just for now, and testing purposes
    var _this = _possibleConstructorReturn(this, (WholePage.__proto__ || Object.getPrototypeOf(WholePage)).call(this, props));

    _this.state = { view: "" };
    //this.Header = this.Header.bind(this);
    _this.changeToReviewMode = _this.changeToReviewMode.bind(_this);
    _this.changeToCreateMode = _this.changeToCreateMode.bind(_this);
    return _this;
  }

  _createClass(WholePage, [{
    key: "render",
    value: function render() {
      // for now passes only the CreateCardMain view
      if (this.state.view == "create") {
        return React.createElement(
          "main",
          null,
          React.createElement(
            "header",
            { id: "header" },
            React.createElement(
              "h1",
              { id: "logo" },
              "Lango!"
            ),
            React.createElement(
              "button",
              { id: "review-button", type: "button", name: "button", onClick: this.changeToReviewMode },
              "Start Review"
            )
          ),
          React.createElement(CreateCardMain, null),
          React.createElement(Footer, null)
        );
      } else if (this.state.view == "review") {
        return React.createElement(
          "main",
          null,
          React.createElement(
            "header",
            { id: "header" },
            React.createElement(
              "h1",
              { id: "logo" },
              "Lango!"
            ),
            React.createElement(
              "button",
              { id: "review-button", type: "button", name: "button", onClick: this.changeToCreateMode },
              "Add"
            )
          ),
          React.createElement(ReviewCardMain, null),
          React.createElement(Footer, null)
        );
      } else {
        return null;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.requestState();
    }
  }, {
    key: "requestState",
    value: function requestState() {
      var url = "card?getState=true";
      var xhr = createRequest('GET', url);

      if (!xhr) {
        alert('Request not supported');
        return;
      }

      xhr.onload = function () {
        var responseStr = xhr.responseText;
        var stateObject = JSON.parse(responseStr);

        console.log(stateObject);
        var state = stateObject.view;
        if (state.view === "review") {
          this.changeToCreateMode();
        } else {
          this.changeToReviewMode();
        }
      };

      xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
      };

      // Actually send request to server
      xhr.send();
    }
  }, {
    key: "changeToReviewMode",
    value: function changeToReviewMode() {
      console.log("changeToReviewMode.");
      this.setState({ view: "review" });
      requestCard();
    }
  }, {
    key: "changeToCreateMode",
    value: function changeToCreateMode() {
      console.log("changeToCreateMode.");
      this.setState({ view: "create" });
    }
  }]);

  return WholePage;
}(React.Component);

// Only responsible for the "cards" div and its functionality


var CreateCardMain = function (_React$Component2) {
  _inherits(CreateCardMain, _React$Component2);

  function CreateCardMain(props) {
    _classCallCheck(this, CreateCardMain);

    var _this2 = _possibleConstructorReturn(this, (CreateCardMain.__proto__ || Object.getPrototypeOf(CreateCardMain)).call(this, props));

    _this2.CheckReturn = _this2.CheckReturn.bind(_this2);
    _this2.StoreCard = _this2.StoreCard.bind(_this2);
    _this2.InputCard = _this2.InputCard.bind(_this2);
    return _this2;
  }

  _createClass(CreateCardMain, [{
    key: "render",
    value: function render() {
      return this.InputCard();
    }
  }, {
    key: "CheckReturn",
    value: function CheckReturn(event) {
      if (event.charCode == 13) {
        makeRequest();
      }
    }
  }, {
    key: "StoreCard",
    value: function StoreCard() {
      makeRequest();
      storeResponse();
    }
  }, {
    key: "InputCard",
    value: function InputCard() {
      return React.createElement(
        "div",
        { className: "cards" },
        React.createElement(
          "div",
          { className: "cardside" },
          React.createElement("textarea", { id: "english", placeholder: "English", onKeyPress: this.CheckReturn }),
          React.createElement(
            "div",
            { id: "outputDiv" },
            React.createElement("p", { "data-placeholder": "Korean", id: "outputGoesHere" })
          )
        ),
        React.createElement(
          "button",
          { id: "save-button", type: "button", name: "button", onClick: this.StoreCard },
          "save"
        )
      );
    }
  }]);

  return CreateCardMain;
}(React.Component);

// Only responsible for the div that displays the review cards portion


var ReviewCardMain = function (_React$Component3) {
  _inherits(ReviewCardMain, _React$Component3);

  function ReviewCardMain(props) {
    _classCallCheck(this, ReviewCardMain);

    var _this3 = _possibleConstructorReturn(this, (ReviewCardMain.__proto__ || Object.getPrototypeOf(ReviewCardMain)).call(this, props));

    _this3.CheckReturn = _this3.CheckReturn.bind(_this3);
    _this3.NextCard = _this3.NextCard.bind(_this3);
    _this3.ReviewCard = _this3.ReviewCard.bind(_this3);
    return _this3;
  }

  _createClass(ReviewCardMain, [{
    key: "render",
    value: function render() {
      return this.ReviewCard();
    }
  }, {
    key: "CheckReturn",
    value: function CheckReturn(event) {
      if (event.charCode == 13) {
        console.log("click is triggered?");
        requestComparison();
        // makeRequest("seen/" + this.props.id, 'POST', null);

        var card = document.getElementById('card-container');

        if (card.classList.contains("hover")) {
          card.classList.remove("hover");
        } else {
          card.classList.add("hover");
        }
      }
    }
  }, {
    key: "Flip",
    value: function Flip() {
      var card = document.getElementById('card-container');

      if (card.classList.contains("hover")) {
        card.classList.remove("hover");
      } else {
        card.classList.add("hover");
      }
    }
  }, {
    key: "NextCard",
    value: function NextCard() {
      requestCard();
    }
  }, {
    key: "ReviewCard",
    value: function ReviewCard() {
      return React.createElement(
        "div",
        { className: "cards" },
        React.createElement(
          "div",
          { className: "review-cardside" },
          React.createElement(
            "div",
            { id: "displayAnswer" },
            React.createElement(
              "div",
              { id: "card-container", className: "card-container", onClick: this.Flip },
              React.createElement(
                "div",
                { className: "card-body" },
                React.createElement(CardBack, null),
                React.createElement(CardFront, null)
              )
            )
          ),
          React.createElement("textarea", { id: "type-answer", placeholder: "Type Answer", onKeyPress: this.CheckReturn })
        ),
        React.createElement(
          "button",
          { id: "next-button", type: "button", name: "button", onClick: this.NextCard },
          "Next"
        )
      );
    }
  }]);

  return ReviewCardMain;
}(React.Component);

/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:

      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/

var cardContainer = document.querySelector('.react-card');

// React component for form inputs

var CardInput = function (_React$Component4) {
  _inherits(CardInput, _React$Component4);

  function CardInput() {
    _classCallCheck(this, CardInput);

    return _possibleConstructorReturn(this, (CardInput.__proto__ || Object.getPrototypeOf(CardInput)).apply(this, arguments));
  }

  _createClass(CardInput, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "fieldset",
        null,
        React.createElement("input", { name: this.props.name, id: this.props.id, type: this.props.type || 'text', placeholder: this.props.placeholder, required: true })
      );
    }
  }]);

  return CardInput;
}(React.Component);

// React component for textarea


var CardTextarea = function (_React$Component5) {
  _inherits(CardTextarea, _React$Component5);

  function CardTextarea() {
    _classCallCheck(this, CardTextarea);

    return _possibleConstructorReturn(this, (CardTextarea.__proto__ || Object.getPrototypeOf(CardTextarea)).apply(this, arguments));
  }

  _createClass(CardTextarea, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "fieldset",
        null,
        React.createElement("textarea", { name: this.props.name, id: this.props.id, placeholder: this.props.placeholder, required: true })
      );
    }
  }]);

  return CardTextarea;
}(React.Component);

// React component for the front side of the card


var CardFront = function (_React$Component6) {
  _inherits(CardFront, _React$Component6);

  function CardFront() {
    _classCallCheck(this, CardFront);

    return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
  }

  _createClass(CardFront, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-front" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement("h2", { id: "guess-answer" })
        ),
        React.createElement("img", { src: "arrows.png", className: "arrowsjpg" })
      );
    }
  }]);

  return CardFront;
}(React.Component);

// React component for the back side of the card


var CardBack = function (_React$Component7) {
  _inherits(CardBack, _React$Component7);

  function CardBack() {
    _classCallCheck(this, CardBack);

    return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
  }

  _createClass(CardBack, [{
    key: "render",
    value: function render(props) {
      return React.createElement(
        "div",
        { className: "card-side side-back" },
        React.createElement(
          "div",
          { className: "card-side-container" },
          React.createElement("h2", { id: "correct-answer" })
        ),
        React.createElement("img", { src: "arrows.png", className: "arrowsjpg" })
      );
    }
  }]);

  return CardBack;
}(React.Component);

// React component for the card (main component)
// class Card extends React.Component {
//   render() {
//     return(
//       <div className="cards">
//         <div className="review-cardside">
//           <div id="displayAnswer">
//             <p data-placeholder="Correct answer goes here..." id="correct-answer"></p>
//               <div className='card-container'>
//                 <div className='card-body'>
//                   <CardBack text="Correct!" />
//
//                   <CardFront text="Volare" />
//                 </div>
//               </div>
//           </div>
//           <textarea id="type-answer" placeholder="Type Answer" onKeyPress={this.CheckReturn}></textarea>
//         </div>
//         <button id="next-button" type="button" name="button" onClick={this.NextCard}>Next</button>
//       </div>
//     )
//   }
// }

// Render Card component
// ReactDOM.render(<Card />, cardContainer);


function Footer() {
  return React.createElement(
    "footer",
    { id: "footer" },
    " "
  );
}
// instantiate our html contents and its data
var element = React.createElement(WholePage, null);

ReactDOM.render(element, document.getElementById('root'));
requestUsername();

