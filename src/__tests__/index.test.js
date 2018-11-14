import ReactDOM from 'react-dom';

ReactDOM.render = jest.fn();

describe('application initialization', () => {
  it('renders application to DOM', () => {
    require('../index');
    expect(ReactDOM.render.mock.calls).toMatchSnapshot();
  });
});
