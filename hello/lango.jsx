// Deals with rendering the entire page
// Contains header, and footer
// Depending on the value of this.state, it can contain either CreateCardMain or ReviewCardMain
class WholePage extends React.Component {
  constructor(props) {
    super(props);

    // set the default value of this.state to the create cards view just for now, and testing purposes
    this.state = { view: "create" };
    //this.Header = this.Header.bind(this);
    this.changeToReviewMode = this.changeToReviewMode.bind(this);
    this.changeToCreateMode = this.changeToCreateMode.bind(this);
  }

  render() {
    // for now passes only the CreateCardMain view
    if (this.state.view == "create") {
      return (
        <main>
          <header id="header">
            <h1 id="logo">
              Lango!
            </h1>
            <button id="review-button" type="button" name="button" onClick={this.changeToReviewMode}>
              Start Review
            </button>
          </header>

          <CreateCardMain/>
          <Footer/>
        </main>
      );
    } else {
        return (
          <main>
            <header id="header">
              <h1 id="logo">
                Lango!
              </h1>
              <button id="review-button" type="button" name="button" onClick={this.changeToCreateMode}>
                Add
              </button>
            </header>

            <ReviewCardMain/>
            <Footer/>
          </main>
        );
    }
  }

  componentDidMount() { /*requestUsername();*/ }

  changeToReviewMode() {
    console.log("changeToReviewMode.");
    this.setState({ view: "review" });
  }

  changeToCreateMode() {
    console.log("changeToCreateMode.");
    this.setState({ view: "create" });
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
    return (
      <div className="cards">
        <div className="cardside">
          <textarea id="english" placeholder="English" onKeyPress={this.CheckReturn}></textarea>
          <div id="outputDiv">
            <p data-placeholder="Korean" id="outputGoesHere"></p>
          </div>
        </div>
        <button id="save-button" type="button" name="button" onClick={this.StoreCard}>save</button>
      </div>
    );
  }
}

// Only responsible for the div that displays the review cards portion
class ReviewCardMain extends React.Component {
  constructor(props) {
    super(props);

    this.CheckReturn = this.CheckReturn.bind(this);
    this.NextCard = this.NextCard.bind(this);
    this.ReviewCard = this.ReviewCard.bind(this);
  }

  render() {
    return this.ReviewCard();
  }

  CheckReturn(event) {
    if(event.charCode == 13) {
      console.log("click is triggered?")
      requestComparison();
    }
  }

  NextCard() {
    requestCard();
  }

  ReviewCard() {
    return (
      <div className="cards">
        <div className="review-cardside">
          <div id="displayAnswer">
            <p data-placeholder="Correct answer goes here..." id="correct-answer"></p>
          </div>
          <textarea id="type-answer" placeholder="Type Answer" onKeyPress={this.CheckReturn}></textarea>
        </div>
        <button id="next-button" type="button" name="button" onClick={this.NextCard}>Next</button>
      </div>
    );
  }
}

function Footer() {
  return (
    <footer id="footer"> </footer>
  );
}
// instantiate our html contents and its data
const element = <WholePage/>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
requestUsername();
