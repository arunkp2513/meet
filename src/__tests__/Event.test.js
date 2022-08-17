import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;

  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render event title', () => {
    expect(EventWrapper.find('.event-title')).toHaveLength(1);
  });

  test('render event info', () => {
    expect(EventWrapper.find('.event-info')).toHaveLength(1);
  });
  test('render show details button', () => {
    expect(EventWrapper.find('.details-button')).toHaveLength(1);
  });
  test('Check event title renfers correctly', () => {
    expect(EventWrapper.find('.event-title').text()).toBe(event.summary);
  });

  test('event info renders correctly', () => {
    expect(EventWrapper.find('.event-info').text()).toContain(
      event.start.dateTime
    );
    expect(EventWrapper.find('.event-info').text()).toContain(
      event.end.timeZone
    );
    expect(EventWrapper.find('.event-info').text()).toContain(event.location);
  });

  test('render event show/hide details works correctly', () => {
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
    EventWrapper.setState({
      show: true,
    });
    expect(EventWrapper.find('.event-details').text()).toContain(
      event.description
    );
  });

  test('event info begins hidden', () => {
    EventWrapper = shallow(<Event event={event} />);
    expect(EventWrapper.state('show')).toBe(false);
  });

  test('render when event details hidden,clicking button reveals details', () => {
    EventWrapper.setState({
      show: true,
    });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('show')).toEqual(true);
  });
  test('render when details shown, clicking details button hides details', () => {
    EventWrapper.setState({
      show: false,
    });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('show')).toEqual(false);
  });
});
