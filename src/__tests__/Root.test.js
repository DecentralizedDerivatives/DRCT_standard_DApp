const node_env = process.env.NODE_ENV;

function setup(overrides) {
  const props = { ...overrides };

  const Root = require('../Root').default;
  const wrapper = shallow(<Root {...props} />);

  return {
    wrapper,
  };
}

describe('<Root />', () => {
  beforeAll(() => {
    // cover debug mode
    process.env.NODE_ENV = 'development';
    jest.resetModules();
  });

  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  afterAll(() => {
    process.env.NODE_ENV = node_env;
  });
});
