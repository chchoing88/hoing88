import React, { Component } from 'react';
import Contact from './Contact';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => { this.setState({ name: 'hoing' }); }} />
        <h1>hello!! {this.state.name}</h1>
        <Contact />
      </div>

    );
  }
}

export default App;
