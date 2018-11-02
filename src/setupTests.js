import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { initFixtureStore, initStore } from './Root';

global.React = React;

global.shallow = shallow;

global.initStore = initStore;
global.initFixtureStore = initFixtureStore;