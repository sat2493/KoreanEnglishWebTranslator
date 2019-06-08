// Deals with rendering the entire page
// Contains header, and footer
// Depending on the value of this.state, it can contain either CreateCardMain or ReviewCardMain
class WholePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { view: "create" }
    this.changeToReviewMode = this.changeToReviewMode.bind(this);
    this.changeToCreateMode = this.changeToCreateMode.bind(this);
  }

  createRequest(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);  // call its open method
    return xhr;
  }

  componentDidMount() {
    let url = "card?getState=true";
    let xhr = createRequest('GET', url);

      if (!xhr) {
       alert('Request not supported');
       return;
      }

      xhr.onload = function() {
        let responseStr = xhr.responseText;
        let object = JSON.parse(responseStr);

        if(object && object.length > 0){
          this.setState({ view: "review" });
          requestCard();
        } else {
          this.setState({view: "create" });
        }
      }.bind(this)

      xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
      };

      // Actually send request to server
      xhr.send();
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

  changeToReviewMode() {
    console.log("changeToReviewMode.");
    this.setState({ view: "review" });
    requestCard();
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

      let card = document.getElementById('card-container');

      if(card.classList.contains("hover")) {
        card.classList.remove("hover");
      } else {
        card.classList.add("hover");
      }

      let typeAnswer = document.getElementById('type-answer');

      typeAnswer.value = "";
    }
  }

  Flip() {
    let card = document.getElementById('card-container');

    if(card.classList.contains("hover")) {
      card.classList.remove("hover");
    } else {
      card.classList.add("hover");
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
              <div id="card-container" className='card-container' onClick={this.Flip}>
                <div className='card-body'>
                  <CardBack />

                  <CardFront />
                </div>
              </div>
          </div>
          <textarea id="type-answer" placeholder="Type Answer" onKeyPress={this.CheckReturn}></textarea>
        </div>
        <button id="next-button" type="button" name="button" onClick={this.NextCard}>Next</button>
      </div>
    );
  }
}

/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:

      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/


const cardContainer = document.querySelector('.react-card');

// React component for form inputs
class CardInput extends React.Component {
  render() {
    return(
      <fieldset>
        <input name={this.props.name} id={this.props.id} type={this.props.type || 'text'} placeholder={this.props.placeholder} required />
      </fieldset>
    )
  }
}

// React component for textarea
class CardTextarea extends React.Component {
  render() {
    return(
      <fieldset>
        <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} required ></textarea>
      </fieldset>
    )
  }
}


// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id="guess-answer"></h2>
        </div>
        <img src="arrows.png" className="arrowsjpg" />
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id="correct-answer" className="correct-answer wrong-answer"></h2>
        </div>
        <img src="arrows.png" className="arrowsjpg" />
      </div>
    )
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
