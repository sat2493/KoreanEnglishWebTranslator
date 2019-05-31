// Deals with rendering the entire page
// Contains header, and footer
// Depending on the value of this.state, it can contain either CreateCardMain or ReviewCardMain
class WholePage extends React.Component {
  constructor(props) {
    super(props);
   
    // set the default value of this.state to the create cards view just for now, and testing purposes
    this.state = { view: "create" };
  }

  render() {
    // for now passes only the CreateCardMain view
    return (
      <main>
        <Header/>
        <CreateCardMain/>
        <Footer/>
      </main>
    );
  }
}

function Header() {
  return (
    <header id="header">
      <h1 id="logo">
        Lango!
      </h1>
      <button id="review-button" type="button" name="button"/* onClick={storeResponse}*/>
        Start Review
      </button>
    </header>
  );
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
          <textarea id="english" placeholder="English"></textarea>
          <div id="outputDiv">
            <p data-placeholder="Korean" id="outputGoesHere"></p>
          </div>
        </div>
        <button id="save-button" type="button" name="button">save</button>
      </div>
    );
  }
}

// Only responsible for the div that displays the review cards portion
class ReviewCardMain extends React.Component {}

function Footer() {
  return (
    <footer id="footer">Username</footer>
  ); 
}
// instantiate our html contents and its data
const WholePageInstance = new WholePage();

ReactDOM.render(
  WholePageInstance.render(),
  document.getElementById('root')
);
