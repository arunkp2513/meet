import React, { Component } from 'react';
import { shallow } from 'enzyme';

import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    renderNumber: 1,
  };
  handleInputChanged = event => {
    let newValue = parseInt(event.target.value);
    if (newValue < 1 || newValue > 32) {
      this.setState({
        renderNumber: newValue,
        errorText: 'Please enter a number between 1 and 32',
      });
    } else {
      this.setState({
        renderNumber: newValue,
        errorText: '',
      });
    }
    this.props.updateEvents(undefined, newValue);
  };
  constructor() {
    super();
    this.state = {
      renderNumber: 32,
      errorText: '',
    };
  }

  render() {
    //const { renderNumber } = this.state;
    return (
      <div className="number-of-events">
        <p className="input-label">Number of Events:</p>

        <input
          className="render-number"
          type="number"
          onChange={this.handleInputChanged}
          value={this.state.renderNumber}
        ></input>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
