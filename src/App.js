import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 12,
  };
  updateEvents = location => {
    getEvents().then(events => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter(event => event.location === location);
      this.setState({
        events: locationEvents,
      });
    });
  };
  componentDidMount() {
    this.mounted = true;
    getEvents().then(events => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents updateEvents={this.updateEvents} />
      </div>
    );
  }
}

export default App;
