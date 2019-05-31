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

    _this.state = { view: "create" };
    return _this;
  }

  _createClass(WholePage, [{
    key: "render",
    value: function render() {
      // for now passes only the CreateCardMain view
      return React.createElement(
        "main",
        null,
        React.createElement(Header, null),
        React.createElement(CreateCardMain, null),
        React.createElement(Footer, null)
      );
    }
  }]);

  return WholePage;
}(React.Component);

function Header() {
  return React.createElement(
    "header",
    { id: "header" },
    React.createElement(
      "h1",
      { id: "logo" },
      "Lango!"
    ),
    React.createElement(
      "button",
      { id: "review-button", type: "button", name: "button" /* onClick={storeResponse}*/ },
      "Start Review"
    )
  );
}

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
          React.createElement("textarea", { id: "english", placeholder: "English" }),
          React.createElement(
            "div",
            { id: "outputDiv" },
            React.createElement("p", { "data-placeholder": "Korean", id: "outputGoesHere" })
          )
        ),
        React.createElement(
          "button",
          { id: "save-button", type: "button", name: "button" },
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

  function ReviewCardMain() {
    _classCallCheck(this, ReviewCardMain);

    return _possibleConstructorReturn(this, (ReviewCardMain.__proto__ || Object.getPrototypeOf(ReviewCardMain)).apply(this, arguments));
  }

  return ReviewCardMain;
}(React.Component);

function Footer() {
  return React.createElement(
    "footer",
    { id: "footer" },
    "Username"
  );
}
// instantiate our html contents and its data
var WholePageInstance = new WholePage();

ReactDOM.render(WholePageInstance.render(), document.getElementById('root'));

