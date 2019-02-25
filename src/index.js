import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {

  /*** Using a constructor to initialise state
    constructor(props) {
      super(props);
      this.state = {
        lat: null,
        errorMessage: ''
      };
    } 
  *******************************************/

  // Usual way of initising state in React
  state = {
    lat: null,
    errorMessage: ''
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        // Call setState to update the state
        this.setState({ lat: position.coords.latitude });
      },
      (err) => {
        this.setState({ errorMessage: err.message });
      }
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }
    return <Loader message="Please accept location request." />
  }

  // React says we have to define render!
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)